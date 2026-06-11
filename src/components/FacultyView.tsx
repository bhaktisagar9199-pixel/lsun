/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CMSDatabaseState, FacultyMember } from '../types';
import { Mail, GraduationCap, Briefcase, Award } from 'lucide-react';

interface FacultyViewProps {
  state: CMSDatabaseState;
}

export default function FacultyView({ state }: FacultyViewProps) {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  
  const departments = ['All', 'Engineering & Advanced AI', 'Management & Venture Strategy'];

  const filteredFaculty = state.faculty.filter((fac) => {
    return selectedDept === 'All' || fac.department.includes(selectedDept.split(' ')[0]);
  });

  return (
    <div className="space-y-16 pb-16 animate-fade-in" id="faculty-view-container">
      {/* Page Header */}
      <section className="relative py-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded inline-block">The Academic Senate</span>
          <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight">Our Preeminent Faculty</h1>
          <p className="text-slate-400 font-sans font-light max-w-2xl mx-auto text-xs md:text-sm">
            Tutored directly by foremost industry architects, venture founders, and globally cited computer science authors.
          </p>
        </div>
      </section>

      {/* Filter and Profiles list */}
      <section className="max-w-7xl mx-auto px-6 space-y-8" id="profiles-section">
        <div className="flex gap-2 justify-center border-b border-slate-100 dark:border-slate-800 pb-6 w-fit mx-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-150 dark:border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFaculty.map((fac) => (
            <div 
              key={fac.id}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
            >
              <img 
                src={fac.image} 
                alt={fac.name} 
                className="w-full md:w-36 h-48 md:h-48 object-cover rounded-2xl border border-slate-200 dark:border-slate-850 shadow-sm" 
              />
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-450 dark:text-slate-400 uppercase block">
                    {fac.department}
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">{fac.name}</h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-amber-400">{fac.designation}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-sans font-light">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Qualifications:</strong> {fac.qualifications}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Professional Experience:</strong> {fac.experience}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <a 
                    href={`mailto:${fac.email}`}
                    className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {fac.email}
                  </a>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" /> Tenure Approved
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredFaculty.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400">
              <p className="text-sm font-sans font-light">No faculty profiles recorded in this selection.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
