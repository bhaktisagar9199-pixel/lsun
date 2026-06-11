/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { CMSDatabaseState } from '../types';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface ContactViewProps {
  state: CMSDatabaseState;
}

export default function ContactView({ state }: ContactViewProps) {
  const { contactDetails } = state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setContactSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in" id="contact-view-container">
      {/* Page Header */}
      <section className="relative py-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded inline-block">Direct communications</span>
          <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight">The Chancellery Registry of Operations</h1>
          <p className="text-slate-400 font-sans font-light max-w-2xl mx-auto text-xs md:text-sm">
            Contact the dean\'s panel, verify corporate internships, or request special administrative tours.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-details-grid">
        {/* Left: Contact Info & Address Metaphor */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-sans font-light text-slate-900 dark:text-white">Centennial Campus Hub</h2>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Our central corporate offices are located at the high-density grid coordinates of LSU capital. Feel free to reach out.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800">
              <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Physical Address Coordinates</p>
                <p className="text-xs text-slate-805 dark:text-slate-350 leading-relaxed font-semibold mt-1">
                  {contactDetails.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800">
              <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold font-bold">Hotline Telephone Connection</p>
                <a href={`tel:${contactDetails.phone}`} className="text-xs text-slate-805 dark:text-slate-350 leading-relaxed font-semibold mt-1 block">
                  {contactDetails.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800">
              <Mail className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold font-bold">Encrypted E-Mail Inbox</p>
                <a href={`mailto:${contactDetails.email}`} className="text-xs text-slate-805 dark:text-slate-350 leading-relaxed font-semibold mt-1 block">
                  {contactDetails.email}
                </a>
              </div>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">Broadcast Portals</p>
            <div className="flex gap-2">
              <a href={contactDetails.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href={contactDetails.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href={contactDetails.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href={contactDetails.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-205 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all">
                <Instagram className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            {!contactSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Transmit Direct Transmission</h3>
                  <p className="text-xs text-slate-500 font-light max-w-md">Our high-priority responsive server will review and route your request within 6 hours.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Your Official Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dr. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Electronic Mail ID</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. name@server.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Administrative Subject Group</label>
                  <input 
                    type="text" 
                    placeholder="e.g. PhD Laboratory Funding Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Secured Message Content</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Provide specific, rich details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Transmit Secured Transmission
                </button>
              </form>
            ) : (
              <div className="p-8 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-center rounded-2xl space-y-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-xl font-semibold text-slate-905 dark:text-emerald-400">Transmission Forwarded Proudly!</h4>
                <p className="text-xs text-slate-650 dark:text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
                  Your electronic transmission has been recorded. Our administrators will contact you shortly.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => { setContactSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                    className="px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white underline cursor-pointer"
                  >
                    Send Another Telegram
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Embedded Google Map Component */}
      <section className="max-w-7xl mx-auto px-6" id="embed-map-section">
        <div className="bg-slate-100 dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-150 dark:border-slate-850 h-96 relative group">
          <div className="absolute inset-0 bg-slate-900/10 z-10 pointer-events-none group-hover:bg-slate-900/0 duration-500" />
          <iframe 
            src={contactDetails.googleMapEmbedUrl}
            title="University Location Map"
            className="w-full h-full border-0 relative z-0" 
            loading="lazy" 
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
    </div>
  );
}
