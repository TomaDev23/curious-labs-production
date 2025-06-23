module.exports = {
  content: [
    'src/components/atomic/HeroAtomic.jsx',
    'src/components/navigation/MissionControlNavbar.jsx', 
    'src/App.jsx',
    'index.html',
    'src/main.jsx'
  ],
  css: ['dist/css/index-BhP6tIZI.css'],
  output: 'dist/css/',
  safelist: [
    // Keep essential Tailwind classes
    'html', 'body', 'root',
    // Keep gradient and animation classes
    /^bg-gradient/,
    /^text-gradient/,
    /^animate-/,
    // Keep responsive classes
    /^sm:/,
    /^md:/,
    /^lg:/,
    /^xl:/,
    // Keep essential layout classes
    'flex', 'grid', 'block', 'inline', 'hidden',
    'relative', 'absolute', 'fixed', 'sticky',
    'min-h-screen', 'h-full', 'w-full',
    // Keep cosmic classes
    /^cosmic-/,
    /^glow-/,
    // Keep framer motion classes
    /^framer-/
  ]
} 