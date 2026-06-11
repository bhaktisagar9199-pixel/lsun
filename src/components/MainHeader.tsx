/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Landmark, Menu, X, Sun, Moon, Lock, Shield } from 'lucide-react';

interface MainHeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
  isAuthenticated?: boolean;
}

export default function MainHeader({
  activePage,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  isAdminMode,
  onToggleAdminMode,
  isAuthenticated = false
}: MainHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Elite navigation array
  const menuItems = [
    { label: 'Home', value: 'home' },
    { label: 'About Chancellery', value: 'about' },
    { label: 'Academics Majors', value: 'courses' },
    { label: 'Admissions Gateway', value: 'admissions' },
    { label: 'Faculty Senate', value: 'faculty' },
    { label: 'Press releases', value: 'news' },
    { label: 'Campus Gallery', value: 'gallery' },
    { label: 'Verify Credentials', value: 'verification' },
    { label: 'Reach Out', value: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-900 backdrop-blur-md select-none transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Symmetrical Emblem Brand */}
        <button
          onClick={() => { onNavigate('home'); onToggleAdminMode(); if(isAdminMode) onToggleAdminMode(); }}
          className="flex items-center gap-3 cursor-pointer group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-102 transition-transform">
            <Landmark className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-widest text-[#a67132] uppercase block leading-none">
              LS University
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-1 block">
              Apex Academic Institution
            </span>
          </div>
        </button>

        {/* Desktop Elite Menu Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => { onNavigate(item.value); if(isAdminMode) onToggleAdminMode(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activePage === item.value && !isAdminMode
                  ? 'bg-slate-50 dark:bg-slate-905 text-slate-950 dark:text-white border border-slate-100 dark:border-slate-800'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Control Desk Actions Panel */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Aesthetic Dark mode activator */}
          <button 
            onClick={onToggleDarkMode}
            aria-label="Toggle Dark/Light Theme"
            className="p-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-150 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Secure Admin Bypass Toggle */}
          <button 
            id="admin-bypass-toggle"
            onClick={onToggleAdminMode}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all duration-300 border flex items-center gap-2 ${
              isAdminMode 
                ? isAuthenticated 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/20 animate-pulse'
                  : 'bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/20'
                : isAuthenticated
                  ? 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10'
                  : 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 border-transparent'
            }`}
          >
            {isAdminMode ? <Shield className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
            {isAdminMode 
              ? isAuthenticated ? 'Admin Desk Active' : 'Security Login Gate' 
              : isAuthenticated ? 'LSU Admin Desk' : 'Admin Lobby'}
          </button>
        </div>

        {/* Mobile Control Indicators */}
        <div className="flex lg:hidden items-center gap-2">
          <button 
            onClick={onToggleDarkMode}
            aria-label="Toggle Theme Mode"
            className="p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2.5 bg-slate-50 dark:bg-slate-905 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 p-6 space-y-6 shadow-2xl animate-fade-in z-50">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => { onNavigate(item.value); if(isAdminMode) onToggleAdminMode(); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wide tracking-wider cursor-pointer ${
                  activePage === item.value && !isAdminMode
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-205 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-900">
            <button 
              onClick={() => { onToggleAdminMode(); setMobileMenuOpen(false); }}
              className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center cursor-pointer transition-all ${
                isAdminMode 
                  ? isAuthenticated 
                    ? 'bg-emerald-500 text-slate-950 shadow-md animate-pulse'
                    : 'bg-amber-500 text-slate-950 shadow-md'
                  : isAuthenticated
                    ? 'border border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                    : 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
              }`}
            >
              {isAdminMode 
                ? isAuthenticated ? '✓ Admin Desk Active' : '🔓 Admin Security Gate' 
                : isAuthenticated ? 'LSU Admin Desk' : 'Admin Lobby'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
