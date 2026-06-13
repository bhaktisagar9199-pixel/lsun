/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Database, ShieldCheck, Terminal, AppWindow, Key, Info, CheckCircle, ExternalLink } from 'lucide-react';

export default function FirebaseGuideView() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-fade-in" id="firebase-guide-container">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#da9445]/10 text-[#da9445] px-4 py-1.5 rounded-full text-xs font-mono border border-[#da9445]/20">
          <Database className="w-3.5 h-3.5 animate-bounce" /> SYSTEM DEPLOYMENT MANUAL
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Firebase Configuration Guide
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto">
          Comprehensive master roadmap for onboarding LS University CMS modules onto your standalone Firebase Instance and preparing for perfect Vercel deployment.
        </p>
      </div>

      {/* Grid: Credentials Guide */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Key className="text-[#da9445] w-5 h-5" />
          <h2 className="text-lg font-serif font-bold text-slate-950 dark:text-white">
            1. Master Environment Variables Keys
          </h2>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed">
          Ensure these dynamic property lines are configured inside your production cloud host (such as <strong>Vercel Settings ➔ Environment Variables</strong>) or local key configurations <code>.env</code>:
        </p>

        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-900 overflow-x-auto font-mono text-[11px] text-slate-300 leading-6 space-y-1 shadow-inner">
          <div className="text-slate-500"># FireStore database and Authentication API credentials</div>
          <div><span className="text-[#da9445]">VITE_FIREBASE_API_KEY</span>="AIzaSyA1..."</div>
          <div><span className="text-[#da9445]">VITE_FIREBASE_AUTH_DOMAIN</span>="your-unique-app-name.firebaseapp.com"</div>
          <div><span className="text-[#da9445]">VITE_FIREBASE_PROJECT_ID</span>="your-unique-app-name"</div>
          <div><span className="text-[#da9445]">VITE_FIREBASE_STORAGE_BUCKET</span>="your-unique-app-name.appspot.com"</div>
          <div><span className="text-[#da9445]">VITE_FIREBASE_MESSAGING_SENDER_ID</span>="281039841029"</div>
          <div><span className="text-[#da9445]">VITE_FIREBASE_APP_ID</span>="1:281039841029:web:5d2a931ca0f4..."</div>
        </div>
      </div>

      {/* Layout Content: Deployment Procedure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Auth providers setup */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-semibold">
            <ShieldCheck className="text-[#da9445] w-5 h-5" />
            <h3>2. Enable Authentication Providers</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Go to the <span className="font-semibold text-slate-850 dark:text-slate-200">Firebase Console ➔ Build ➔ Authentication ➔ Sign-in method</span> section and configure the following:
          </p>
          <ul className="text-xs space-y-2.5 text-slate-600 dark:text-slate-450">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#da9445] mt-0.5 shrink-0" />
              <span><strong>Email/Password:</strong> Enable with passcode authentication to allow senate users to register and sign in seamlessly.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#da9445] mt-0.5 shrink-0" />
              <span><strong>Google Provider:</strong> Enable Google popup sign-in, configuring callback redirection so board directors can login with single tap.</span>
            </li>
          </ul>
        </div>

        {/* Database setup */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-semibold">
            <AppWindow className="text-[#da9445] w-5 h-5" />
            <h3>3. Setup Cloud Firestore Mode</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Configure the central database node safely using the default rules file structure:
          </p>
          <ul className="text-xs space-y-2.5 text-slate-600 dark:text-slate-450">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#da9445] mt-0.5 shrink-0" />
              <span>Initialize Firestore database set to <strong>Production Mode</strong>. Choose a regional container closest to your client profiles.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#da9445] mt-0.5 shrink-0" />
              <span>Paste and deploy the security declarations defined inside the root's <code>firestore.rules</code> file. This protects user files from malicious overrides.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Info Callout */}
      <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-4">
        <Info className="text-[#da9445] w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-serif font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Super Admin Onboarding Protocol
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            When you register or sign in with the email <strong className="text-[#da9445]">bhaktisagar9199@gmail.com</strong> (via either Google Provider or Email signup), the application will instantly elevate your identity document inside Firestore's <code>/admins</code> directory as a qualified <strong>Super Admin</strong>. This guarantees your exclusive access, locking other arbitrary addresses out of CMS dashboard controls.
          </p>
        </div>
      </div>

      {/* Primary Call Action */}
      <div className="flex justify-center pt-2">
        <a 
          href="https://console.firebase.google.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 py-3 px-6 bg-[#da9445] hover:bg-[#c58032] text-white font-serif font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-99"
        >
          Access Firebase Console <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
