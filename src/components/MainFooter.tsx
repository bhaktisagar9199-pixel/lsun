/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CMSDatabaseState } from '../types';
import { Landmark, FileCheck, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface MainFooterProps {
  state: CMSDatabaseState;
  onNavigate: (page: string) => void;
}

export default function MainFooter({ state, onNavigate }: MainFooterProps) {
  const { footerSettings, contactDetails } = state;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-20 pb-12 select-text" id="master-foot-board">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
        
        {/* Left Column Description */}
        <div className="lg:col-span-5 space-y-6">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center">
              <Landmark className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest text-[#da9445] uppercase block leading-none">
                LS University
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1 block">
                Apex Academic Institution
              </span>
            </div>
          </button>
          
          <p className="text-xs md:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-sm">
            {footerSettings.aboutText}
          </p>

          <div className="flex gap-2 pt-2">
            <a href={contactDetails.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2.5 bg-slate-900 hover:bg-slate-850 hover:text-white rounded-lg transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={contactDetails.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="p-2.5 bg-slate-900 hover:bg-slate-850 hover:text-white rounded-lg transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href={contactDetails.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2.5 bg-slate-900 hover:bg-slate-850 hover:text-white rounded-lg transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={contactDetails.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2.5 bg-slate-900 hover:bg-slate-850 hover:text-white rounded-lg transition-all">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Middle Column Quick Links */}
        <div className="lg:col-span-3 space-y-6">
          <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">Registry Pathways</h4>
          <ul className="space-y-3 text-xs md:text-sm">
            {footerSettings.quickLinks?.map((link, i) => (
              <li key={i}>
                <button
                  onClick={() => onNavigate(link.href)}
                  className="hover:text-emerald-400 transition-colors text-left font-light cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column Contacts info */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold flex items-center gap-2">
            The General Registrar Office
          </h4>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4.5 h-4.5 text-[#da9445] shrink-0 mt-0.5" />
              <span className="font-light leading-relaxed text-slate-400">
                {footerSettings.contactAddress}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4.5 h-4.5 text-[#da9445] shrink-0" />
              <a href={`tel:${footerSettings.contactPhone}`} className="font-light hover:text-emerald-400 transition-colors">
                {footerSettings.contactPhone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4.5 h-4.5 text-[#da9445] shrink-0" />
              <a href={`mailto:${footerSettings.contactEmail}`} className="font-light hover:text-emerald-400 transition-colors">
                {footerSettings.contactEmail}
              </a>
            </div>
          </div>

          {/* Dedicated required key action: Certificate verification button! */}
          <div className="pt-4">
            <button
              id="footer-verify-certificate-btn"
              onClick={() => onNavigate('verification')}
              className="w-full py-3 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" /> Certificate Verification Portal
            </button>
          </div>
        </div>

      </div>

      {/* Symmetrical footer banner line */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
        <p>© 2026 LS University Academic Senate. Sovereign digital CMS record. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <Landmark className="w-3.5 h-3.5" /> Powered by Supabase Real-Time Cluster
        </p>
      </div>
    </footer>
  );
}
