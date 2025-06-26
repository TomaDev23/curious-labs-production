/**
 * @component ContactTerminalAtomic
 * @description Contact information with terminal styling
 * @version 1.0.0
 * @type atomic
 */

import React, { useState, useEffect, lazy, Suspense, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useInViewLazy } from '../../hooks/useInViewLazy';
import { motion, AnimatePresence } from '../../FramerProvider';
import { useUnifiedMobile } from '../../hooks/useBreakpoint';

// 🎯 INTERSECTION-BASED 3D: Only load ContactGlobeProxy when user scrolls to contact section
// This removes 362KB from critical path, loading only when needed
const ContactGlobeProxy = lazy(() => import('./proxies/ContactGlobeProxy'));

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'contact_terminal_atomic',
  scs: 'SCS-TERMINAL-UI',
  type: 'atomic',
  doc: 'contract_contact_terminal_atomic.md'
};

const ContactTerminalAtomic = () => {
  // 🎯 INTERSECTION-BASED 3D: Load globe when contact section comes into view
  const location = useLocation();
  const routes3D = ['/']; // Only homepage needs 3D currently
  const should3D = routes3D.includes(location.pathname);
  
  // Use intersection observer to load globe only when contact section is visible
  const { ref: contactRef, Comp: LazyContactGlobe } = useInViewLazy(
    () => import('./proxies/ContactGlobeProxy'),
    { rootMargin: '200px' }
  );
  
  // 🎯 UNIFIED MOBILE DETECTION: Replace useState pattern
  const { isMobile, isHydrated } = useUnifiedMobile();
  
  // 🔧 RESTORED: Missing state variables that were accidentally removed
  const [activeTab, setActiveTab] = useState('info');
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  
  const [isTerminalActive, setIsTerminalActive] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Refs
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  
  // Project type options
  const projectTypes = [
    { id: 'web-development', label: 'Web Development' },
    { id: 'ai-integration', label: 'AI Integration' },
    { id: 'code-optimization', label: 'Code Optimization' },
    { id: 'consultation', label: 'Technical Consultation' }
  ];
  
  // Terminal prompt text
  const terminalPrompt = 'need help connecting?';
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission - placeholder only, no actual submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Form submission logic would go here
  };
  
  // Handle responsive behavior and reduced motion preference
  useEffect(() => {
    // 🎯 REMOVED: checkMobile function - now using unified system
    
    const checkMotionPreference = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Listen for changes
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    };

    // 🎯 HYDRATION SAFETY: Only run checks after hydration
    if (isHydrated) {
      checkMotionPreference();
    }
    
    // 🎯 REMOVED: resize listener for mobile detection
  }, [isHydrated]);
  
  // Typing animation effect
  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation for users who prefer reduced motion
      setTypedText(terminalPrompt);
      setTypingComplete(true);
      return;
    }
    
    let currentIndex = 0;
    const textLength = terminalPrompt.length;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < textLength) {
        setTypedText(terminalPrompt.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 70); // Typing speed
    
    return () => clearInterval(typingInterval);
  }, [prefersReducedMotion, terminalPrompt]);
  
  return (
    <section 
      ref={contactRef}
      id="contact" 
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-curious-dark-900"
      aria-labelledby="contact-heading"
    >
      {/* Left Side - Contact Info Terminal */}
      <div className="w-full md:w-1/2 max-w-md mb-16 md:mb-0 md:absolute md:bottom-20 md:left-20 lg:bottom-16 lg:left-32 xl:left-48 2xl:left-64 z-50">
        <h2 id="contact-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Contact <span className="text-lime-400">Terminal</span>
        </h2>
        
        <p className="text-lg text-gray-300 mb-8">
          Ready to {activeTab === 'info' ? 'connect' : 'begin your cosmic journey'}? 
          Reach out through our terminal interface.
        </p>
        
        {/* Terminal Tabs */}
        <div className="flex mb-4 text-sm font-mono" role="tablist" aria-label="Contact options">
          <button
            className={`px-4 py-2 rounded-t-md ${
              activeTab === 'info' 
                ? 'bg-black bg-opacity-70 text-lime-400 border-t border-l border-r border-gray-800' 
                : 'bg-gray-900 bg-opacity-50 text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('info')}
            aria-selected={activeTab === 'info'}
            role="tab"
            aria-controls="contact-panel"
            id="contact-info-tab"
            aria-label="View contact information"
          >
            contact_info
          </button>
          <button
            className={`px-4 py-2 rounded-t-md ml-2 ${
              activeTab === 'form' 
                ? 'bg-black bg-opacity-70 text-lime-400 border-t border-l border-r border-gray-800' 
                : 'bg-gray-900 bg-opacity-50 text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('form')}
            aria-selected={activeTab === 'form'}
            role="tab"
            aria-controls="contact-panel"
            id="contact-form-tab"
            aria-label="Open contact form"
          >
            contact_init
          </button>
        </div>
        
        {/* Terminal-inspired Contact Info */}
        <div 
          className="bg-black bg-opacity-70 border border-gray-800 rounded-lg p-6 backdrop-blur-sm shadow-lg ring-1 ring-lime-900/30"
          role="tabpanel"
          id="contact-panel"
          aria-labelledby={activeTab === 'info' ? 'contact-info-tab' : 'contact-form-tab'}
        >
          {/* Terminal Header */}
          <div className="flex items-center border-b border-gray-800 pb-4 mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true"></div>
              <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400 font-mono">
              curious_labs:~$ {activeTab === 'info' ? 'contact_info' : 'contact_init'}
            </div>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'info' ? (
            // Contact Information Tab
            (<div className="space-y-4 font-mono">
              <div className="text-lime-400 text-sm flex items-start">
                <span className="mr-2">&gt;</span>
                <span>{typedText}</span>
                {!typingComplete && <span className="ml-1 h-4 w-2 bg-lime-400 animate-pulse"></span>}
              </div>
              {typingComplete && (
                <div 
                  className="mt-2 space-y-3 pl-4 border-l border-gray-800 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="text-white flex items-center">
                    <span className="text-lime-400 mr-2">$</span>
                    <span className="text-gray-400 mr-2">EMAIL:</span>
                    <a 
                      href="mailto:hello@curiouslabs.ai" 
                      className="hover:text-lime-400 transition-colors"
                      aria-label="Email us at hello@curiouslabs.ai"
                    >
                      hello@curiouslabs.ai
                    </a>
                  </div>
                  <div className="text-white flex items-center">
                    <span className="text-lime-400 mr-2">$</span>
                    <span className="text-gray-400 mr-2">DISCORD:</span>
                    <span>@CuriousLabs</span>
                  </div>
                  <div className="text-white flex items-center">
                    <span className="text-lime-400 mr-2">$</span>
                    <span className="text-gray-400 mr-2">GITHUB:</span>
                    <a 
                      href="https://github.com/TomaDev23" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-lime-400 transition-colors"
                      aria-label="Visit our GitHub profile"
                    >
                      github.com/TomaDev23
                    </a>
                  </div>
                </div>
              )}
              {/* Terminal Input Simulation */}
              <div 
                className={`mt-6 flex items-center opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]`}
                style={{ animationDelay: typingComplete ? '0.8s' : '0s' }}
              >
                <span className="text-lime-400 mr-2">[terminal] &gt;_</span>
                <span className="text-gray-300">how can we assist?</span>
                <span className="ml-1 h-4 w-2 bg-lime-400 animate-pulse"></span>
              </div>
              {/* Switch to form tab suggestion */}
              <div 
                className={`mt-6 text-center opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]`}
                style={{ animationDelay: typingComplete ? '1.2s' : '0s' }}
              >
                <button 
                  onClick={() => setActiveTab('form')} 
                  className="text-xs text-lime-400 hover:underline"
                  aria-label="Switch to contact form to send a message"
                >
                  need to send a message? switch to contact_init
                </button>
              </div>
            </div>)
          ) : (
            // Contact Form Tab
            (<form onSubmit={handleSubmit} className="space-y-6 font-mono">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-1">$ name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-1">$ email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="project" className="block text-sm text-gray-400 mb-1">$ project_type:</label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400"
                >
                  {projectTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-1">$ message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-black bg-lime-400 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors"
                aria-label="Submit contact form"
              >
                <span>Submit</span>
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              {/* Switch to info tab suggestion */}
              <div className="text-center text-xs text-gray-400 mt-4">
                <button 
                  onClick={() => setActiveTab('info')} 
                  className="text-lime-400 hover:underline"
                  type="button"
                  aria-label="Switch to contact information tab"
                >
                  just need our contact info? switch to contact_info
                </button>
              </div>
            </form>)
          )}
        </div>
      </div>
      {/* Right Side - Visual */}
      {!isMobile && should3D && (
        <div className="w-full h-screen flex justify-center items-center relative">
          {/* Interactive Globe Visualization - Now loads only when contact section is visible */}
          <div className="w-full h-full">
            {LazyContactGlobe ? (
              <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-400">Loading globe...</div>}>
                <LazyContactGlobe />
              </Suspense>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="animate-pulse">Globe loading when visible...</div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactTerminalAtomic; 