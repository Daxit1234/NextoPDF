'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toolsByCategory } from '../lib/tools';

/**
 * Navbar — Top navigation with logo, tools mega-dropdown, nav links, and dark-mode toggle.
 */
export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Initialize theme
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') {
      setDark(true);
    }
  }, []);

  // Toggle dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsToolsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Compress', href: '/compress-pdf' },
    { name: 'Merge', href: '/merge-pdf' },
    { name: 'Split', href: '/split-pdf' },
    { name: 'Convert', href: '/pdf-to-image' },
    { name: 'Edit', href: '/edit-pdf' },
    { name: 'Sign', href: '/sign-pdf' },
  ];

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
          {/* Left section: Logo + Nav */}
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
                      {Object.entries(toolsByCategory).map(([category, tools]) => (
                        <div key={category} className="space-y-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-[13px] uppercase tracking-wide">{category}</h3>
                          <ul className="space-y-1">
                            {tools.map((tool) => {
                              const isActive = pathname === `/${tool.slug}`;
                              return (
                                <li key={tool.slug}>
                                  <Link
                                    href={`/${tool.slug}`}
                                    onClick={() => setIsToolsOpen(false)}
                                    className={`block py-1.5 transition-colors ${
                                      isActive
                                        ? 'text-primary-600 dark:text-primary-400 font-medium'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                                    }`}
                                    title={tool.description}
                                  >
                                    {tool.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Links */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-medium text-[15px] px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-500/10'
                        : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-gray-50 dark:hover:text-primary-400 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
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
              <svg
                className={`w-4 h-4 absolute transition-all duration-300 ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg
                className={`w-4 h-4 absolute transition-all duration-300 ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Login */}
            <Link
              href="/login"
              className="hidden sm:inline-flex font-medium text-[15px] text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-3 py-2"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-white/10 bg-white dark:bg-surface-900 px-4 py-4 space-y-2 animate-slide-up">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-2.5 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-500/10'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-t border-gray-100 dark:border-white/10 pt-2 mt-2">
            <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">All Tools</p>
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              <div key={category} className="mb-2">
                <p className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">{category}</p>
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className={`block px-6 py-2 text-sm transition-colors ${
                      pathname === `/${tool.slug}`
                        ? 'text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
