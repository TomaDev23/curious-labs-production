/**
 * Shared imports for all components
 * All original import statements gathered in one place
 */

// React core
export { default as React, useState, useEffect, useRef, useMemo } from 'react';

// Framer Motion
export { motion, AnimatePresence } from '../../../../FramerProvider';

// Internal components and hooks
export { StellarMessageComponent } from '../../../StellarMessageGrok';
export { useResponsive, useDeviceCapabilities } from '../../../../hooks/useBreakpoint';

// Animation variants and constants
export const PERSISTENT_ANIMATION_DELAYS = {
  comet1: Math.random() * 3,
  comet2: Math.random() * 3 + 1.5,
  comet3: Math.random() * 3 + 2.8,
  dust1: Math.random() * 3 + 0.8,
  dust2: Math.random() * 3 + 1.2,
  dust3: Math.random() * 3 + 2.2,
  dust4: Math.random() * 3 + 3.5
};

// Product data for the carousel
export const OPS_BENTO_ITEMS = [
  {
    id: 1,
    title: 'OpsPipe',
    summary: 'From paper mess to structured insight',
    features: [
      'Inventory tracking, financial logs, recipes',
      'Export-ready JSON, Markdown, and CLI pipelines', 
      'Validated by dual-agent parsing + audit system'
    ],
    tagline: 'Originally built inside our ghost kitchen',
    backContent: 'OpsPipe parses messy documents (like receipts, notes, PDFs) into structured data, metrics, and reports — delivered via Telegram, CLI, or API. Used in real kitchens. Ready for any ops mess.',
    fullDescription: {
      whatItIs: 'A battle-tested document parsing system with memory, fallback logic, agent routing, and full trace visibility.',
      howItWorks: [
        'Inventory tracking, financial logs, recipes',
        'Export-ready JSON, Markdown, and CLI pipelines',
        'Validated by dual-agent parsing + audit system'
      ],
      whyItMatters: 'Forget babysitting chatbots. OpsPipe turns messy operational data into a reliable work system — with repeatable results, auditable flows, and minimal chaos.'
    },
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6_small.webp',
    accentColor: '#84cc16', // Lime
    theme: 'lime',
    bgGradient: 'from-lime-900/50 to-lime-700/30',
  },
  {
    id: 2,
    title: 'Curious',
    summary: 'Relational AI Presence',
    features: [
      'Synthetic memory that builds over time',
      'Personality tuning and tone presets',
      'Emotional mirroring + presence ("I\'m still here…")'
    ],
    tagline: 'AI that "knows you." Finally.',
    backContent: 'A responsive, emotionally aware AI designed for reflection, companionship, and creative thought. Think: memory-backed journaling, quiet presence, and personalized rituals — all in one living interface.',
    fullDescription: {
      whatItIs: 'A responsive, emotionally aware AI designed for reflection, companionship, and creative thought. Think: memory-backed journaling, quiet presence, and personalized rituals — all in one living interface.',
      howItWorks: [
        'Synthetic memory that builds over time',
        'Personality tuning and tone presets',
        'Emotional mirroring + presence ("I\'m still here…")',
        'Multimodal rituals: journaling, thought prompts, gratitude',
        'Session replay, mood history, and life event recall',
        'User voice, mood, and behavior adapted to context'
      ],
      whyItMatters: 'Most AI tools are transactional. Curious is relational. It doesn\'t just respond — it remembers, reflects, and returns. This is AI that sticks with you.'
    },
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6_small.webp',
    accentColor: '#d946ef', // Magenta
    theme: 'magenta',
    bgGradient: 'from-purple-900/50 to-pink-700/30',
  },
  {
    id: 3,
    title: 'Guardian',
    summary: 'Creative AI for kids',
    features: [
      'Emotional presence with voice + micro-expressions',
      'Adaptive personas (playmate → study buddy → teen mentor)',
      'Curiosity quests, drawing games, music exploration'
    ],
    tagline: 'A digital companion for your child — built to care, not capture.',
    backContent: 'Guardian is a screen-based emotional companion designed for kids. It keeps them engaged with curiosity, creativity, and protection from toxic content — proving AEGIS can drive high-trust, emotionally nuanced, safety-critical AI.',
    fullDescription: {
      whatItIs: 'A screen-based emotional companion designed for kids — Guardian keeps them engaged with curiosity, creativity, and protection from toxic content.',
      howItWorks: [
        'Emotional presence with voice + micro-expressions',
        'Adaptive personas (playmate → study buddy → teen mentor)',
        'Curiosity quests, drawing games, music exploration',
        'Built-in content filters to steer away from junk media',
        'Parent dashboard for controls + insight',
        'Memory that grows with the child'
      ],
      whyItMatters: 'Today\'s screens are addictive — not supportive. Guardian offers an alternative: a digital friend that cares, guides, and encourages healthy screen time — not just grabs attention. Built on the AEGIS runtime with a specialized safe-mode persona engine.'
    },
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6_small.webp',
    accentColor: '#f59e0b', // Amber
    theme: 'amber',
    bgGradient: 'from-amber-900/50 to-orange-700/30',
  },
  {
    id: 4,
    title: 'MoonSignal',
    summary: 'AI Trading Intelligence',
    features: [
      'Custom parser agents trained on market formats',
      'Trading state machine: setup → signal → fallback',
      'Daily summary reports with regime detection'
    ],
    tagline: 'Trade like you\'ve got a team.',
    backContent: 'A GPT-fused quant stack that analyzes price action, sentiment, and macro data — delivering signals to traders through CLI or Telegram. Think: a hedge fund brain in a small terminal.',
    fullDescription: {
      whatItIs: 'A GPT-fused quant stack that analyzes price action, sentiment, and macro data — delivering signals to traders through CLI or Telegram. Think: a hedge fund brain in a small terminal.',
      howItWorks: [
        'Custom parser agents trained on market formats',
        'Trading state machine: setup → signal → fallback',
        'Daily summary reports with regime detection',
        'Real-time alerts for scalping, swing, and momentum',
        'Backtestable YAML logic & test validation',
        'API + manual oversight fallback chain'
      ],
      whyItMatters: 'Most bots spit random indicators. MoonSignal outputs structured, state-driven signals backed by testable logic. No more black box — just raw edge.'
    },
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6_small.webp',
    accentColor: '#22d3ee', // Cyan
    theme: 'cyan',
    bgGradient: 'from-cyan-900/50 to-teal-700/30',
  },
];

// Animation variants for page transitions
export const pageVariants = {
  initial: { x: '100vw', opacity: 0, scale: 0.9 },
  animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { x: '-100vw', opacity: 0, scale: 0.9, transition: { duration: 0.8, ease: 'easeIn' } },
};

// Text reveal animations
export const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.3, ease: 'easeOut' },
  }),
};

// Particle animation
export const particleVariants = {
  animate: {
    y: [0, -10, 0],
    opacity: [0, 1, 0],
    transition: { duration: 2, repeat: Infinity, repeatDelay: Math.random() * 3 },
  },
};

// Shooting star animation
export const shootingStarVariants = {
  animate: {
    x: ['100vw', '-100vw'],
    y: ['-10vh', '110vh'],
    opacity: [0, 1, 0],
    transition: { duration: 3, repeat: Infinity, repeatDelay: Math.random() * 10 + 5 },
  },
};

// Nebula animation
export const nebulaVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.1, 0.2, 0.1],
    transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Card animation variants
export const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' },
  active: { scale: 1.1, boxShadow: '0 0 30px rgba(255,255,255,0.5)' },
};

// Flip animation for cards
export const flipVariants = {
  front: { rotateY: 0, transition: { duration: 0.4 } },
  back: { rotateY: 180, transition: { duration: 0.4 } },
};

// Utility functions
export const generateRandomDelay = () => Math.random() * 6 + 2.5;