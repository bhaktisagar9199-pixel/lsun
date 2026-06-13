/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { liveDb, auth, db, isFirebaseConfigured } from './lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { CMSDatabaseState, UserProfile } from './types';
import { Lock, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';

console.log("Firebase config found:", isFirebaseConfigured);

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
import FirebaseGuideView from './components/FirebaseGuideView';

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

  // Listen to Firebase Authenticated state changes dynamically
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', fbUser.uid));
          const hasAdminDoc = adminDoc.exists();

          if (hasAdminDoc || fbUser.email === 'bhaktisagar9199@gmail.com') {
            const loggedUser: UserProfile = {
              id: fbUser.uid,
              email: fbUser.email || '',
              role: hasAdminDoc ? adminDoc.data()?.role || 'Super Admin' : 'Super Admin',
              fullName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Super Admin',
            };
            setAuthenticatedUser(loggedUser);
            sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID', loggedUser.id);
            sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON', JSON.stringify(loggedUser));
          } else {
            // Non-authorized admin attempt, clean up credentials
            await signOut(auth);
            setAuthenticatedUser(null);
            sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID');
            sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON');
          }
        } catch (e) {
          console.error("Error checking admin records during credentials sync:", e);
        }
      } else {
        setAuthenticatedUser(null);
        sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID');
        sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON');
      }
    });

    return () => unsubscribe();
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

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.location.pathname === '/admin-dashboard' || window.location.hash === '#admin-dashboard')) {
      setIsAdminMode(true);
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
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/${target === 'home' ? '' : target}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAdminMode = () => {
    setIsAdminMode((prev) => {
      const nextMode = !prev;
      if (typeof window !== 'undefined') {
        if (nextMode) {
          window.history.pushState(null, '', '/admin-dashboard');
        } else {
          window.history.pushState(null, '', '/');
        }
      }
      return nextMode;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!isFirebaseConfigured) {
      setLoginError('Firebase is not configured. Please define VITE_FIREBASE_API_KEY inside your environment settings or configuration guide.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      const fbUser = userCredential.user;

      const adminDoc = await getDoc(doc(db, 'admins', fbUser.uid));
      const hasAdminDoc = adminDoc.exists();

      if (!hasAdminDoc && fbUser.email !== 'bhaktisagar9199@gmail.com') {
        await signOut(auth);
        setLoginError('Access Denied: Your email address is not registered as an administrator in the Senate records.');
        return;
      }

      // Automatically register the master dev email to the admins registry
      if (!hasAdminDoc && fbUser.email === 'bhaktisagar9199@gmail.com') {
        await setDoc(doc(db, 'admins', fbUser.uid), {
          email: fbUser.email,
          role: 'Super Admin'
        });
      }

      const loggedUser: UserProfile = {
        id: fbUser.uid,
        email: fbUser.email || '',
        role: hasAdminDoc ? adminDoc.data()?.role || 'Super Admin' : 'Super Admin',
        fullName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Super Admin',
      };

      setAuthenticatedUser(loggedUser);
      sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID', loggedUser.id);
      sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON', JSON.stringify(loggedUser));
      setLoginPassword('');
      setLoginError(null);
      setIsAdminMode(true);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', '/admin-dashboard');
      }
    } catch (err: any) {
      setLoginError(`Authentication failed: ${err?.message || err}`);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoginError(null);

    if (!isFirebaseConfigured) {
      setLoginError('Firebase is not configured. Please define VITE_FIREBASE_API_KEY inside your profile settings.');
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const fbUser = userCredential.user;

      const adminDoc = await getDoc(doc(db, 'admins', fbUser.uid));
      const hasAdminDoc = adminDoc.exists();

      if (!hasAdminDoc && fbUser.email !== 'bhaktisagar9199@gmail.com') {
        await signOut(auth);
        setLoginError('Access Denied: Your Google email is not listed in the Senate administrator table.');
        return;
      }

      if (!hasAdminDoc && fbUser.email === 'bhaktisagar9199@gmail.com') {
        await setDoc(doc(db, 'admins', fbUser.uid), {
          email: fbUser.email,
          role: 'Super Admin'
        });
      }

      const loggedUser: UserProfile = {
        id: fbUser.uid,
        email: fbUser.email || '',
        role: hasAdminDoc ? adminDoc.data()?.role || 'Super Admin' : 'Super Admin',
        fullName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Super Admin',
      };

      setAuthenticatedUser(loggedUser);
      sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID', loggedUser.id);
      sessionStorage.setItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON', JSON.stringify(loggedUser));
      setLoginError(null);
      setIsAdminMode(true);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', '/admin-dashboard');
      }
    } catch (err: any) {
      setLoginError(`Google Sign-In failed: ${err?.message || err}`);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setAuthenticatedUser(null);
    sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_ID');
    sessionStorage.removeItem('LS_UNIVERSITY_ADMIN_SESSION_USER_JSON');
    setIsAdminMode(false);
    setActivePage('home');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
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

              {/* Error Box */}
              {loginError ? (
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
                    placeholder="operator@lsu.edu"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginError(null);
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#da9445] focus:outline-none font-mono font-medium"
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
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setLoginError(null);
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 text-slate-900 dark:text-white pl-4 pr-11 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#da9445] focus:outline-none font-mono font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-250 cursor-pointer"
                      title={showPassword ? 'Hide passcode' : 'Show passcode'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-serif font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-99 transition-all"
                  >
                    Authenticate Session <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="relative my-4 flex items-center justify-center">
                    <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
                    <span className="absolute bg-white dark:bg-slate-900 px-3 text-[10px] font-mono text-slate-400">OR</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 bg-white hover:bg-slate-50 dark:bg-slate-955 dark:hover:bg-slate-900 border border-slate-150 dark:border-slate-800 text-slate-700 dark:text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 mr-1 text-slate-700 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.67-.35-1.37-.35-2.09z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
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
      case 'guide':
        return <FirebaseGuideView />;
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
