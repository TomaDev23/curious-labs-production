/**
 * LEGACY COMPONENT - DEPRECATED
 * 
 * This NavBar component has been replaced by MissionControlNavbar
 * Located at: src/components/navigation/MissionControlNavbar.jsx
 * 
 * This file is kept for reference and rollback purposes only.
 * Do not use this component in new development.
 * 
 * Migration completed: [Current Date]
 * Replacement: MissionControlNavbar with Mission Control theme
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiInfo, FiMail, FiGrid, FiCode, FiBook, FiStar, FiUsers, FiTool, FiZap, FiCommand } from 'react-icons/fi';
import { RiRocketLine } from 'react-icons/ri';
import { BiPlanet, BiCodeAlt } from 'react-icons/bi';
import { FaBrain, FaRobot, FaSpaceShuttle } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { IoRocketOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { MdOutlineAutoAwesome, MdOutlineRocketLaunch } from 'react-icons/md';
import { TbBrandOpenai } from 'react-icons/tb';
import { VscRobot } from 'react-icons/vsc';
import { SiOpenai } from 'react-icons/si';

// 🚨 SM-3: Replace useGlobalScroll with ScrollManager
import { ScrollManager } from '../utils/ScrollManager';
import { isMobile } from '../utils/deviceTier';
import { IMAGES } from '../constants/images';
import { useBreakpoint } from '../hooks/useBreakpoint.js';

// Simple environment check for development mode
const isDevelopment = process.env.NODE_ENV === 'development';

export default function NavBar() {
  // 🚨 SM-3: Replace useGlobalScroll with local ScrollManager subscription
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const breakpoint = useBreakpoint();
  const isMobileBreakpoint = breakpoint === 'mobile';
  const isMobileDevice = isMobile();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [showHudAtomic1, setShowHudAtomic1] = useState(false);
  const [showHudAtomic2, setShowHudAtomic2] = useState(false);
  
  // 🚨 SM-3: ScrollManager subscription with mobile short-circuit
  useEffect(() => {
    // 🚨 MB-1: Skip scroll listeners on mobile for performance
    if (isMobileDevice) return;
    
    const unsubscribe = ScrollManager.subscribe((newScrollY) => {
      setScrollY(newScrollY);
    });

    return unsubscribe;
  }, [isMobileDevice]);

  // Track scroll for navbar styling
  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close products dropdown when toggling menu
    setIsProductsDropdownOpen(false);
  };

  // Toggle products dropdown (for mobile)
  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProductsDropdownOpen(false);
  }, [location.pathname]);
  
  // Toggle HUD visibility and dispatch custom events
  const toggleHudAtomic1 = () => {
    setShowHudAtomic1(prev => !prev);
    // Dispatch a custom event that the HUD component can listen for
    window.dispatchEvent(new CustomEvent('toggleHudAtomic1'));
    console.log('[HUD ATOMIC 1] Visibility toggled from navbar');
  };
  
  const toggleHudAtomic2 = () => {
    setShowHudAtomic2(prev => !prev);
    // Dispatch a custom event that the HUD component can listen for
    window.dispatchEvent(new CustomEvent('toggleHudAtomic2'));
    console.log('[HUD ATOMIC 2] Visibility toggled from navbar');
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-[#28293D]/95 to-[#1F2040]/95 backdrop-blur-md z-[110] ${isScrolled ? 'shadow-lg' : ''}`}>
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex flex-col items-start relative group">
            <div className="flex items-center">
              <img 
                src={IMAGES.LOGO} 
                alt="CuriousLabs" 
                className="h-8 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 1px rgba(139, 92, 246, 0.3))' }}
              />
              <span className="ml-2 text-xl font-semibold text-white">CuriousLabs</span>
            </div>
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          {/* HUD ATOMIC buttons - only in development mode */}
          {isDevelopment && (
            <div className="flex ml-4 space-x-2">
              <button
                onClick={toggleHudAtomic1}
                className={`px-2 py-1 text-xs rounded-md ${showHudAtomic1 ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-purple-500 transition-colors`}
                title="Toggle HUD ATOMIC 1 (Shift+H+1)"
              >
                HUD 1
              </button>
              <button
                onClick={toggleHudAtomic2}
                className={`px-2 py-1 text-xs rounded-md ${showHudAtomic2 ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-purple-500 transition-colors`}
                title="Toggle HUD ATOMIC 2 (Shift+H+2)"
              >
                HUD 2
              </button>
            </div>
          )}
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/' ? 'text-purple-300' : ''}`}
          >
            Home
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/codelab" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/codelab' ? 'text-purple-300' : ''}`}
          >
            CodeLab
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          {/* Products dropdown */}
          <div className="relative group">
            <Link 
              to="/products" 
              className={`text-white hover:text-purple-300 transition flex items-center relative ${location.pathname.includes('/products') ? 'text-purple-300' : ''}`}
            >
              Products
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {/* Base gradient line (always visible) */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
              {/* Hover effect gradient line (animates on hover) */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
            </Link>
            
            {/* Dropdown menu */}
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#28293D] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <Link to="/products/aegis" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">Aegis</Link>
                <Link to="/products/opspipe" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">OpsPipe</Link>
                <Link to="/products/moonsignal" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">MoonSignal</Link>
                <Link to="/products/curious" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">Curious</Link>
                <Link to="/products/guardian" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">Guardian</Link>
              </div>
            </div>
          </div>
          
          {/* Development mode only links */}
          {isDevelopment && (
            <Link 
              to="/background-sandbox" 
              className={`text-purple-300 hover:text-purple-200 transition relative group ${location.pathname === '/background-sandbox' ? 'text-purple-200' : ''}`}
            >
              BG Sandbox
              {/* Base gradient line (always visible) */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
              {/* Hover effect gradient line (animates on hover) */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
            </Link>
          )}
          
          <Link 
            to="/tools" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/tools' ? 'text-purple-300' : ''}`}
          >
            Tools
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/transmissions" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/transmissions' ? 'text-purple-300' : ''}`}
          >
            Blog
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/docs" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname.includes('/docs') ? 'text-purple-300' : ''}`}
          >
            Docs
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/about" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/about' ? 'text-purple-300' : ''}`}
          >
            About
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/contact" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/contact' ? 'text-purple-300' : ''}`}
          >
            Contact
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1F2040] border-t border-[#383853]">
          <div className="px-4 py-2">
            <Link 
              to="/" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/' ? 'text-purple-300' : ''}`}
            >
              Home
            </Link>
            
            <Link 
              to="/codelab" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/codelab' ? 'text-purple-300' : ''}`}
            >
              CodeLab
            </Link>
            
            {/* Products dropdown (mobile) */}
            <div>
              <button 
                onClick={toggleProductsDropdown}
                className={`flex justify-between items-center w-full rounded-md px-3 py-2 text-left ${location.pathname.includes('/products') ? 'bg-[#383853] text-white' : 'text-gray-300 hover:bg-[#383853] hover:text-white'}`}
              >
                <span>Products</span>
                <svg 
                  className={`w-4 h-4 ml-1 transform transition-transform ${isProductsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`transition-all duration-300 ease-in-out ${isProductsDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <Link to="/products" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">All Products</Link>
                <Link to="/products/aegis" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">Aegis</Link>
                <Link to="/products/opspipe" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">OpsPipe</Link>
                <Link to="/products/moonsignal" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">MoonSignal</Link>
                <Link to="/products/curious" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">Curious</Link>
                <Link to="/products/guardian" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">Guardian</Link>
              </div>
            </div>
            
            {/* Development mode only links (mobile) */}
            {isDevelopment && (
              <Link 
                to="/background-sandbox" 
                className={`block rounded-md px-3 py-2 ${location.pathname === '/background-sandbox' ? 'bg-purple-800 text-white' : 'text-purple-300 hover:bg-purple-800 hover:text-white'}`}
              >
                Background Sandbox
              </Link>
            )}
            
            <Link 
              to="/tools" 
              className={`block rounded-md px-3 py-2 ${location.pathname === '/tools' ? 'bg-[#383853] text-white' : 'text-gray-300 hover:bg-[#383853] hover:text-white'}`}
            >
              Tools
            </Link>
            
            <Link 
              to="/transmissions" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/transmissions' ? 'text-purple-300' : ''}`}
            >
              Blog
            </Link>
            
            <Link 
              to="/docs" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname.includes('/docs') ? 'text-purple-300' : ''}`}
            >
              Docs
            </Link>
            
            <Link 
              to="/about" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/about' ? 'text-purple-300' : ''}`}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/contact' ? 'text-purple-300' : ''}`}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 