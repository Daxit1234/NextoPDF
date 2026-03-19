'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { toolsByCategory } from '../lib/tools';

/**
 * Navbar — Top navigation bar with logo, navigation links, and dark-mode toggle.
 * Uses glassmorphism styling and smooth transitions.
 */
export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') {
      setDark(true);
    }
  }, []);

  // Toggle dark class on <html> and save preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Add background when scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-surface-900/90 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-white/5'
          : 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo + Nav Links */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group mr-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">NextoPDF <span className="text-gray-400 dark:text-gray-500 font-normal text-sm ml-1 transition-colors group-hover:text-primary-500">Pro</span></span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Tools Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className={`flex items-center gap-1.5 font-medium text-[15px] transition-colors px-3 py-2 rounded-md ${isToolsOpen ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-500/10' : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-gray-50 dark:hover:text-primary-400 dark:hover:bg-white/5'}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Tools
                  <svg className={`w-3.5 h-3.5 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mega Dropdown */}
                {isToolsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[850px] max-w-[90vw] bg-white dark:bg-surface-900 rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 p-6 z-50 text-sm">
                    <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                      {Object.entries(toolsByCategory).map(([category, tools], index) => (
                        <div key={category} className="space-y-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-[13px]">{category}</h3>
                          <ul className="space-y-1">
                            {tools.map((tool) => (
                              <li key={tool.slug}>
                                <Link 
                                  href={`/${tool.slug}`}
                                  onClick={() => setIsToolsOpen(false)}
                                  className="block py-1.5 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                  title={tool.description}
                                >
                                  {tool.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Links */}
              {[
                { name: 'Compress', href: '/compress-pdf' },
                { name: 'Convert', href: '/pdf-converter' },
                { name: 'Merge', href: '/merge-pdf' },
                { name: 'Edit', href: '/edit-pdf' },
                { name: 'Sign', href: '/sign-pdf' },
                { name: 'AI PDF', href: '/ai-pdf-assistant' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-[15px] text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-gray-50 dark:hover:text-primary-400 dark:hover:bg-white/5 px-3 py-2 rounded-md transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              id="dark-mode-toggle"
              onClick={() => setDark(!dark)}
              className="relative w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-200 text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {/* Sun icon */}
              <svg
                className={`w-4 h-4 absolute transition-all duration-300 ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {/* Moon icon */}
              <svg
                className={`w-4 h-4 absolute transition-all duration-300 ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            
            {/* Login Button */}
            <Link 
              href="/login"
              className="hidden sm:inline-flex font-medium text-[15px] text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-3 py-2"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
