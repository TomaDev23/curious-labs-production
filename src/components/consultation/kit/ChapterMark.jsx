import React from 'react';
import { Reveal } from '../ConsultationMotion';

/** Big ghost numeral + rule + label that opens each chapter. */
function ChapterMark({ n, label }) {
  return (
    <Reveal className="cl-chapter" y={18}>
      <span className="cl-chapter__num" aria-hidden="true">{n}</span>
      <span className="cl-chapter__rule" aria-hidden="true" />
      <span className="cl-chapter__label">{label}</span>
    </Reveal>
  );
}

export default ChapterMark;
