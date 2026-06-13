/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { liveDb, supabase, isSupabaseConfigured, updateSupabaseConfig } from './lib/supabase';
import { CMSDatabaseState, UserProfile } from './types';
import { Lock, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Loaded URL (Auth Login):', supabaseUrl);

// Importing beautiful modular pages
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import CoursesView from './components/CoursesView';
import AdmissionsView from './components/AdmissionsView';
import FacultyView from './components/FacultyView';
import NewsView from './components/NewsView';
import GalleryView from './components/GalleryView';
import CertificateVerification from './components/CertificateVerification';
import ContactView from './components/ContactView';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [cmsState, setCmsState] = useState<CMSDatabaseState>(liveDb.getState());
  const [activePage, setActivePage] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true); // Symmetrical luxury default
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Authenticated state with tab session memory
  const [authenticatedUser, setAuthenticatedUser] = useState<UserProfile | null>(() => {
    const savedUserJson = sessionStorage.getItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON');
    if (savedUserJson) {
      try {
        return JSON.parse(savedUserJson);
      } catch (e) {}
    }
    return null;
  });

  // Login Form Controllers
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Subscribe to real-time database updates instantly!
  useEffect(() => {
    const unsubscribe = liveDb.subscribe((updatedState) => {
      setCmsState(updatedState);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Supabase Auth state changes dynamically
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        const loggedUser: UserProfile = {
          id: session.user.id,
          email: session.user.email || '',
          role: (session.user.user_metadata?.role as any) || 'Super Admin',
          fullName: session.user.user_metadata?.fullName || session.user.email?.split('@')[0] || 'Super Admin',
        };
        setAuthenticatedUser(loggedUser);
        sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID', loggedUser.id);
        sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON', JSON.stringify(loggedUser));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        const loggedUser: UserProfile = {
          id: session.user.id,
          email: session.user.email || '',
          role: (session.user.user_metadata?.role as any) || 'Super Admin',
          fullName: session.user.user_metadata?.fullName || session.user.email?.split('@')[0] || 'Super Admin',
        };
        setAuthenticatedUser(loggedUser);
        sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID', loggedUser.id);
        sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON', JSON.stringify(loggedUser));
      } else {
        setAuthenticatedUser(null);
        sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID');
        sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync Tailwind class for Dark/Light Mode
  useEffect(() => {
    const isDark = localStorage.getItem('LS_UNIVERSITY_THEME_DARK') !== 'false';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleDarkMode = () => {
    const targetDark = !darkMode;
    setDarkMode(targetDark);
    localStorage.setItem('LS_UNIVERSITY_THEME_DARK', String(targetDark));
    if (targetDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNavigatePage = (target: string) => {
    setActivePage(target);
    setIsAdminMode(false); // Clean exit of administrative view upon general routing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAdminMode = () => {
    setIsAdminMode((prev) => !prev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!supabase) {
      setLoginError('Supabase is not configured. Please supply parameters or define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your env configuration.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      if (error) {
        setLoginError(`Authentication failed: ${error.message}`);
        return;
      }

      if (data && data.user) {
        const loggedUser: UserProfile = {
          id: data.user.id,
          email: data.user.email || '',
          role: (data.user.user_metadata?.role as any) || 'Super Admin',
          fullName: data.user.user_metadata?.fullName || data.user.email?.split('@')[0] || 'Super Admin',
        };
        setAuthenticatedUser(loggedUser);
        sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID', loggedUser.id);
        sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON', JSON.stringify(loggedUser));
        setLoginPassword('');
        setLoginError(null);
        
        // Redirect authenticated admins to CMS Dashboard
        setIsAdminMode(true);
      }
    } catch (err: any) {
      setLoginError(`System error during operator sign-in: ${err?.message || err}`);
    }
  };

  const handleAdminLogout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    setAuthenticatedUser(null);
    sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID');
    sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON');
    setIsAdminMode(false);
    
    // Redirect public users to the website homepage
    setActivePage('home');
  };

  // Render matching active page view
  const renderActiveView = () => {
    if (isAdminMode) {
      if (!authenticatedUser) {
        return (
          <div className="max-w-md mx-auto my-16 px-6 animate-fade-in" id="cms-login-viewport">
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
              
              {/* Header Symbol */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#da9445]/10 border border-[#da9445]/20 text-[#da9445] flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-5 h-5 animate-pulse" />
                </div>
                <h2 className="text-xl font-serif font-bold text-slate-950 dark:text-white uppercase tracking-wider">
                  Senate Security Lobby
                </h2>
                <p className="text-xs text-slate-400 font-light">
                  Authenticate your identity to operationalize LSU CMS nodes.
                </p>
              </div>

              {/* Error Box / Configuration Blocker */}
              {!supabase ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs space-y-2 leading-normal">
                  <div className="font-bold flex items-center gap-1.5 font-sans uppercase tracking-wider text-[10px] text-red-650 dark:text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" /> Supabase Connection Blocked
                  </div>
                  <p className="font-light text-slate-650 dark:text-slate-350">
                    The Supabase credentials are missing or not defined at runtime. Please configure <code className="font-mono bg-red-500/10 px-1 py-0.5 rounded text-red-700 dark:text-red-350">VITE_SUPABASE_URL</code> and <code className="font-mono bg-red-500/10 px-1 py-0.5 rounded text-red-700 dark:text-red-350">VITE_SUPABASE_ANON_KEY</code> to enable CMS authentication.
                  </p>
                </div>
              ) : loginError ? (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              ) : null}

              {/* Form Section */}
              <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-450 block">
                    Authorized Master Email
                  </label>
                  <input
                    type="email"
                    required
                    disabled={!supabase}
                    placeholder="operator@lsu.edu"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginError(null);
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#da9445] focus:outline-none font-mono font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-450 block">
                    Secured Passcode PIN
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      disabled={!supabase}
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setLoginError(null);
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 text-slate-900 dark:text-white pl-4 pr-11 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#da9445] focus:outline-none font-mono font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      disabled={!supabase}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-250 cursor-pointer disabled:opacity-50"
                      title={showPassword ? 'Hide passcode' : 'Show passcode'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={!supabase}
                    className="w-full py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-serif font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-99 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Authenticate Session <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigatePage('home')}
                    className="w-full py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-955 dark:hover:bg-slate-900 border border-slate-150 dark:border-slate-850 text-slate-650 dark:text-slate-350 font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer block text-center"
                  >
                    Return to Public Campus
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      } else {
        return <AdminPanel state={cmsState} currentUser={authenticatedUser} onLogout={handleAdminLogout} />;
      }
    }

    switch (activePage) {
      case 'home':
        return <HomeView state={cmsState} onNavigate={handleNavigatePage} />;
      case 'about':
        return <AboutView state={cmsState} />;
      case 'courses':
        return <CoursesView state={cmsState} onNavigate={handleNavigatePage} />;
      case 'admissions':
        return <AdmissionsView state={cmsState} />;
      case 'faculty':
        return <FacultyView state={cmsState} />;
      case 'news':
        return <NewsView state={cmsState} />;
      case 'gallery':
        return <GalleryView state={cmsState} />;
      case 'verification':
        return <CertificateVerification state={cmsState} />;
      case 'contact':
        return <ContactView state={cmsState} />;
      default:
        return <HomeView state={cmsState} onNavigate={handleNavigatePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-slate-100 transition-colors flex flex-col justify-between">
      {/* Symmetrical Elegant Navigation Header */}
      <MainHeader 
        activePage={activePage} 
        onNavigate={handleNavigatePage} 
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isAdminMode={isAdminMode}
        onToggleAdminMode={handleToggleAdminMode}
        isAuthenticated={!!authenticatedUser}
      />

      {/* Main viewport driver */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Symmetrical elegant footer */}
      <MainFooter state={cmsState} onNavigate={handleNavigatePage} />
    </div>
  );
}
