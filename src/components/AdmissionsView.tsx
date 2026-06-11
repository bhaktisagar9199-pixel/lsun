/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CMSDatabaseState } from '../types';
import { FileText, Compass, Sparkles, CheckCircle2, ChevronRight, Calculator, Landmark, ShieldCheck } from 'lucide-react';

interface AdmissionsViewProps {
  state: CMSDatabaseState;
}

export default function AdmissionsView({ state }: AdmissionsViewProps) {
  const { admissions } = state;

  // Contact/Application form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: 'B.Tech Computer Science & Engineering',
    qualification: '',
    score: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [generatedRegNum, setGeneratedRegNum] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    // Simulate high-quality enrollment tracking registration ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    setGeneratedRegNum(`REG-${randomSuffix}`);
    setSubmitted(true);
  };

  return (
    <div className="space-y-24 pb-16 animate-fade-in" id="admissions-view-container">
      {/* Dynamic admissions banner */}
      <section className="relative py-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded inline-block">Admissions Hub</span>
          <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight">The Centennial Admissions Gateway</h1>
          <p className="text-slate-400 font-sans font-light max-w-2xl mx-auto text-xs md:text-sm">
            {admissions.introduction}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12" id="process-form-grid">
        {/* Left: Step Process & Scholar criteria */}
        <div className="lg:col-span-7 space-y-12">
          {/* Timeline of process */}
          <div className="space-y-6">
            <h2 className="text-2xl font-sans font-light text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-500 animate-spin" style={{ animationDuration: '6s' }} /> 
              Step-by-Step Admissions Procedure
            </h2>
            <div className="h-1 w-12 bg-slate-950 dark:bg-white rounded mb-6" />

            <div className="grid grid-cols-1 gap-6">
              {admissions.processSteps?.map((step) => (
                <div 
                  key={step.id}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 shrink-0 font-mono flex items-center justify-center font-bold text-sm">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-905 dark:text-white text-sm">{step.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships criteria */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-sans font-light text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Endowment & Scholar Fellowships
            </h2>
            <div className="h-1 w-12 bg-slate-950 dark:bg-white rounded mb-6" />

            <div className="grid grid-cols-1 gap-4">
              {admissions.scholarships?.map((schol) => (
                <div 
                  key={schol.id}
                  className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between gap-6 hover:border-slate-350 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{schol.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light max-w-md">{schol.criteria}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-mono font-bold rounded-full">
                      {schol.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Digital Application Form */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6 sticky top-4">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Secure Admissions Server
              </span>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Cohort Online Application</h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 font-light">
                Fill the fields below to submit your dynamic academic candidate dossier for review by the committee.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleApply} className="space-y-4">
                {/* Full name input */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Candidate Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter full legal name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                  />
                </div>

                {/* Email Address & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@applicant.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Academic major selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Target Cohort Major</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
                  >
                    <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
                    <option value="B.Tech Artificial Intelligence & Deep Learning">B.Tech Artificial Intelligence & Deep Learning</option>
                    <option value="B.Tech Mechanical & Mechatronics">B.Tech Mechanical & Mechatronics</option>
                    <option value="BBA in International Finance & Strategy">BBA in International Finance & Strategy</option>
                    <option value="MBA (Executive Strategy & Leadership)">MBA (Executive Strategy & Leadership)</option>
                    <option value="B.Sc Advanced Data Sciences">B.Sc Advanced Data Sciences</option>
                  </select>
                </div>

                {/* Score and Degree */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Prior Qualification</label>
                    <input 
                      type="text" 
                      placeholder="e.g. High School or B.Sc"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Academic Score / Grade</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 98% or 3.96 GPA"
                      value={formData.score}
                      onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Application Statement notes */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Executive Personal Statement (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Briefly describe your future visions or accomplishments..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Submit Application Portfolio
                </button>
              </form>
            ) : (
              <div className="p-6 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-center rounded-2xl space-y-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-semibold text-slate-905 dark:text-emerald-400">Application Submitted Proudly!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
                  Your academic records and personal dossier have been securely received by the LS University Executive Admissions Cell.
                </p>

                <div className="p-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl space-y-1">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Assigned Registration Number</p>
                  <p className="text-base font-mono font-bold text-slate-950 dark:text-white">{generatedRegNum}</p>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({ fullName: '', email: '', phone: '', program: 'B.Tech Computer Science & Engineering', qualification: '', score: '', notes: '' }); }}
                    className="px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white underline cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Structured fee policy & accreditation notice */}
      <section className="max-w-7xl mx-auto px-6 border-t border-slate-200 dark:border-slate-800 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl w-fit">
            <Calculator className="w-6 h-6 text-indigo-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Analytical Pricing Strategy</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Fees are locked transparently upon admission completion and remain stable during the entire duration of the major program. Tuition includes all digital libraries and labs.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-3 bg-amber-500/10 rounded-xl w-fit">
            <Landmark className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Flexible Student Financing</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Select student partnerships allow for low-rate corporate financing plans in collaboration with major sovereign investment groups and banking clients.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-teal-500/10 rounded-xl w-fit">
            <ShieldCheck className="w-6 h-6 text-teal-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Strict Cohort Cap</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            To prioritize custom coaching, each engineering major caps enrollment strictly at 60 candidates yearly. Early application is heavily recommended.
          </p>
        </div>
      </section>
    </div>
  );
}
