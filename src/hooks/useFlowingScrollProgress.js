import { useEffect, useRef, useState } from 'react';

export const FLOWING_SCROLL_STIFFNESS = 0.028;
export const FLOWING_SCROLL_FRICTION = 0.9;
export const FLOWING_SCROLL_MAX_STEP_RATIO = 0.14;

const clamp01 = (value) => Math.min(1, Math.max(0, value));

const readSectionProgress = (targetRef) => {
  const node = targetRef?.current;
  if (!node || typeof window === 'undefined') return 0;

  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const total = node.offsetHeight - vh;
  return total > 0 ? clamp01(-rect.top / total) : 0;
};

const readViewportProgress = (startVh, endVh) => {
  if (typeof window === 'undefined') return 0;

  const vh = window.innerHeight || 1;
  const y = window.scrollY || window.pageYOffset || 0;
  const start = vh * startVh;
  const range = vh * (endVh - startVh);
  return range > 0 ? clamp01((y - start) / range) : 0;
};

const readDocumentProgress = () => {
  if (typeof window === 'undefined') return 0;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return maxScroll > 0 ? clamp01((window.scrollY || window.pageYOffset || 0) / maxScroll) : 0;
};

export default function useFlowingScrollProgress({
  targetRef = null,
  mode = 'section',
  startVh = 0,
  endVh = 1,
  stiffness = FLOWING_SCROLL_STIFFNESS,
  friction = FLOWING_SCROLL_FRICTION,
  maxStepRatio = FLOWING_SCROLL_MAX_STEP_RATIO,
  epsilon = 0.0001,
  velocityEpsilon = 0.00002,
  disabled = false,
  stateful = true,
  onUpdate
} = {}) {
  const [progress, setProgress] = useState(0);
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return undefined;

    const readTarget = () => {
      if (mode === 'viewport') return readViewportProgress(startVh, endVh);
      if (mode === 'document') return readDocumentProgress();
      return readSectionProgress(targetRef);
    };

    let raf = 0;
    let current = readTarget();
    let velocity = 0;
    let committed = Number.NaN;

    const commit = (value) => {
      if (stateful && (Number.isNaN(committed) || Math.abs(value - committed) > epsilon)) {
        committed = value;
        setProgress(value);
      }
      onUpdateRef.current?.(value);
    };

    commit(current);

    const tick = () => {
      const target = readTarget();
      const diff = target - current;
      velocity = (velocity + diff * stiffness) * friction;

      if (Math.abs(diff) > epsilon || Math.abs(velocity) > velocityEpsilon) {
        let step = velocity;
        if (Math.sign(step) !== Math.sign(diff)) {
          step = diff * maxStepRatio;
          velocity = step;
        }
        if (Math.abs(step) > Math.abs(diff) * maxStepRatio) {
          step = diff * maxStepRatio;
          velocity = step;
        }

        const next = clamp01(current + step);
        if (next === 0 || next === 1) {
          velocity = 0;
        }
        current = next;
      } else {
        current = target;
        velocity = 0;
      }

      commit(current);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [targetRef, mode, startVh, endVh, stiffness, friction, maxStepRatio, epsilon, velocityEpsilon, disabled, stateful]);

  return progress;
}
