/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CMSDatabaseState, Certificate } from '../types';
import { Search, ShieldAlert, BadgeCheck, FileCheck, Landmark, Printer, Award, UserCheck, Calendar } from 'lucide-react';

interface CertificateVerificationProps {
  state: CMSDatabaseState;
}

export default function CertificateVerification({ state }: CertificateVerificationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundCert, setFoundCert] = useState<Certificate | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toUpperCase();
    
    // Query matching database record
    const match = state.certificates.find((cert) => 
      cert.certificateNumber.toUpperCase() === query || 
      cert.registrationNumber.toUpperCase() === query
    );

    setFoundCert(match || null);
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="certificate-verification-container">
      {/* Page Header */}
      <section className="relative py-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded inline-block">Security Registry</span>
          <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight">Accredited Certificate Verification</h1>
          <p className="text-slate-400 font-sans font-light max-w-2xl mx-auto text-xs md:text-sm">
            Verify academic transcripts, official degree registrations, and postgraduate certificates issued by the LS University registry.
          </p>
        </div>
      </section>

      {/* Main verification widget */}
      <section className="max-w-4xl mx-auto px-6 space-y-8" id="verification-app-main">
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-8 rounded-3xl shadow-sm text-center space-y-6">
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-semibold text-slate-955 dark:text-white">Verify Digital Credentials</h3>
            <p className="text-xs text-slate-500 dark:text-slate-450 font-light leading-relaxed">
              To authenticate, enter either the certificate identification number <span className="font-mono text-slate-600 dark:text-slate-350 bg-slate-50 dark:bg-slate-950 px-1 rounded">(e.g. LSU-2026-9081)</span> or registration ID.
            </p>
          </div>

          <form onSubmit={handleVerify} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input 
                type="text" 
                required
                placeholder="LSU-2026-9081..."
                value={searchQuery}
                aria-label="Certificate Identification Number"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none uppercase font-mono tracking-wider"
              />
            </div>
            <button 
              type="submit"
              className="px-6 py-3 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-50 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-sm transition-all"
            >
              Verify Credentials
            </button>
          </form>
        </div>

        {/* Verification outputs */}
        {searched && (
          <div className="animate-fade-in space-y-8" id="search-outputs-holder">
            {foundCert ? (
              <div className="space-y-6">
                {/* Visual verified confirmation bar */}
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                  foundCert.status === 'Verified' 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-400'
                }`}>
                  <div className="flex items-center gap-3">
                    {foundCert.status === 'Verified' ? (
                      <BadgeCheck className="w-8 h-8 text-emerald-500 shrink-0" />
                    ) : (
                      <ShieldAlert className="w-8 h-8 text-rose-500 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-semibold uppercase font-sans">
                        Record Authenticated: {foundCert.status}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light scale-100">
                        This digital credential matches our active cryptographic university database.
                      </p>
                    </div>
                  </div>
                  <div>
                    <button 
                      onClick={handlePrint}
                      className="px-4 py-2 bg-white dark:bg-slate-950 text-slate-805 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print Diploma
                    </button>
                  </div>
                </div>

                {/* Symmetrical digital copy of credential */}
                <div 
                  id="printable-diploma-grid"
                  className="bg-[#faf7f2] hover:bg-[#faf7f2]/95 dark:bg-slate-950 dark:hover:bg-slate-950/95 text-slate-950 dark:text-slate-100 border-[10px] border-[#da9445]/20 p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between aspect-[1.414/1] shadow-xl"
                  style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.02) 100%)' }}
                >
                  {/* Classical Flourish Corner Borders SVG Pattern */}
                  <div className="absolute top-4 left-4 border-t-2 border-l-2 border-[#da9445]/30 w-16 h-16" />
                  <div className="absolute top-4 right-4 border-t-2 border-r-2 border-[#da9445]/30 w-16 h-16" />
                  <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-[#da9445]/30 w-16 h-16" />
                  <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-[#da9445]/30 w-16 h-16" />

                  {/* Watermark Logo Backing */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                    <Landmark className="w-[300px] h-[300px]" />
                  </div>

                  {/* Classical header */}
                  <div className="text-center space-y-2 relative z-10">
                    <div className="flex justify-center mb-2">
                      <Landmark className="w-10 h-10 text-[#da9445]" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-serif text-[#a67132] tracking-widest font-bold uppercase">
                      LS University
                    </h2>
                    <p className="text-[8px] md:text-[10px] uppercase font-mono tracking-widest text-[#a67132]/80">
                      by charter of the Board of Chancellors
                    </p>
                  </div>

                  {/* Recipient title */}
                  <div className="text-center relative z-10 py-6 space-y-4">
                    <p className="font-serif text-slate-550 dark:text-slate-400 italic text-xs md:text-sm">
                      This formal scroll hereby verifies that the qualification has been proudly awarded to
                    </p>
                    <h3 className="text-2xl md:text-4xl text-slate-905 dark:text-amber-500 font-serif tracking-wide border-b border-[#da9445]/20 pb-2 max-w-xl mx-auto font-light">
                      {foundCert.studentName}
                    </h3>
                    <p className="font-serif text-slate-550 dark:text-slate-400 italic text-xs md:text-sm">
                      who has diligently succeeded in completing the prescribed major curriculum of
                    </p>
                    <h4 className="text-base md:text-lg text-slate-950 dark:text-white font-sans font-bold uppercase tracking-wider">
                      {foundCert.courseName}
                    </h4>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
                      characterized with distinction of <span className="text-[#a67132] font-semibold">{foundCert.grade}</span>
                    </p>
                  </div>

                  {/* Footers of the certificate */}
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[#da9445]/20">
                    <div className="text-center md:text-left space-y-1">
                      <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 font-mono flex items-center justify-center md:justify-start gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Date of Issue: {foundCert.issueDate}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
                        Certificate Registry Code: {foundCert.certificateNumber}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
                        Registration Index: {foundCert.registrationNumber}
                      </p>
                    </div>

                    {/* QR Code visualization */}
                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-inner">
                      {/* Generates a stylized vector visual fallback for QR code validation */}
                      <svg viewBox="0 0 100 100" className="w-14 h-14 text-indigo-950 dark:text-white" fill="currentColor">
                        <rect x="0" y="0" width="30" height="30" />
                        <rect x="5" y="5" width="20" height="20" fill="white" />
                        <rect x="10" y="10" width="10" height="10" />
                        
                        <rect x="70" y="0" width="30" height="30" />
                        <rect x="75" y="5" width="20" height="20" fill="white" />
                        <rect x="80" y="10" width="10" height="10" />

                        <rect x="0" y="70" width="30" height="30" />
                        <rect x="5" y="75" width="20" height="20" fill="white" />
                        <rect x="10" y="80" width="10" height="10" />

                        <rect x="40" y="40" width="20" height="20" />
                        <rect x="45" y="45" width="10" height="10" fill="white" />

                        <rect x="40" y="0" width="10" height="10" />
                        <rect x="0" y="40" width="10" height="10" />
                        <rect x="90" y="90" width="10" height="10" />
                        <rect x="70" y="70" width="10" height="10" />
                        <rect x="50" y="80" width="10" height="10" />
                        <rect x="80" y="50" width="10" height="10" />
                      </svg>
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono tracking-widest text-[#a67132] block uppercase font-bold">Secure Core QR</span>
                        <span className="text-[7px] text-slate-400 block scale-95 font-mono max-w-[80px] break-all leading-tight">
                          {foundCert.qrContent}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 text-center rounded-2xl space-y-4 animate-fade-in">
                <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
                <h4 className="text-lg font-semibold text-rose-900 dark:text-rose-400">Dossier Code Not Discovered</h4>
                <p className="text-xs text-slate-650 dark:text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
                  The registry key entered does not match any certificate in our active student registry records. Please confirm the characters.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
