/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CMSDatabaseState } from '../types';
import { Target, Compass, Award, Calendar, CheckCircle2 } from 'lucide-react';

interface AboutViewProps {
  state: CMSDatabaseState;
}

export default function AboutView({ state }: AboutViewProps) {
  const { aboutPage, timeline } = state;

  return (
    <div className="space-y-24 pb-16 animate-fade-in" id="about-view-container">
      {/* Absolute Luxury Header Banner */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded inline-block">The Academic Guild</span>
          <h1 className="text-4xl md:text-5xl font-sans font-light tracking-tight">Our Legendary Narrative</h1>
          <p className="text-slate-400 font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Exploring human potential by implementing mathematical excellence, engineering discovery, and strategic enterprise creation.
          </p>
        </div>
      </section>

      {/* University Overview & Legacy */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12" id="overview-section">
        <div className="space-y-6">
          <p className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase">The Foundation</p>
          <h2 className="text-3xl font-sans font-light text-slate-900 dark:text-white">A Century of Preeminence</h2>
          <div className="h-1 w-12 bg-slate-900 dark:bg-white rounded" />
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            {aboutPage.overviewText}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            From our early days as an select private computing guild to our modern state-of-the-art supercomputing research nodes, LS University has held a distinct dedication to deep inquiry. We foster absolute intellectual freedom, challenging traditional patterns to engineer real-world legacy.
          </p>
        </div>
        
        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <Compass className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Supreme Academic Vision</h3>
            </div>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              {aboutPage.vision}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Mission of Cultivating Pioneers</h3>
            </div>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              {aboutPage.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Message from Chancellor & Vice Chancellor */}
      <section className="bg-slate-50 dark:bg-slate-950 py-20 border-y border-slate-100 dark:border-slate-900" id="messages-section">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase font-bold">Executive Directives</p>
            <h2 className="text-3xl font-sans font-light text-slate-900 dark:text-white">Messages from our Chancellery</h2>
          </div>

          {/* Chancellor Message */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 shrink-0">
              <img 
                src={aboutPage.chancellorPhoto} 
                alt={aboutPage.chancellorName} 
                className="w-full h-80 object-cover rounded-3xl shadow-lg border border-slate-200 dark:border-slate-850" 
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 text-xs font-mono tracking-wider uppercase rounded font-bold">University Chancellor</span>
              <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{aboutPage.chancellorName}</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light italic">
                "{aboutPage.chancellorMessage}"
              </p>
            </div>
          </div>

          {/* Vice Chancellor Message */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="lg:col-span-8 space-y-4 order-2 lg:order-1">
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 text-xs font-mono tracking-wider uppercase rounded font-bold">University Vice Chancellor</span>
              <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{aboutPage.vcName}</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light italic">
                "{aboutPage.vcMessage}"
              </p>
            </div>
            <div className="lg:col-span-4 shrink-0 order-1 lg:order-2">
              <img 
                src={aboutPage.vcPhoto} 
                alt={aboutPage.vcName} 
                className="w-full h-80 object-cover rounded-3xl shadow-lg border border-slate-200 dark:border-slate-850" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="max-w-4xl mx-auto px-6 space-y-12" id="history-section">
        <div className="text-center space-y-4">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">Legacy Chronicles</p>
          <h2 className="text-3xl font-sans font-light text-slate-900 dark:text-white">Our Masterclass Milestones</h2>
        </div>

        <div className="relative border-l border-slate-200 dark:border-slate-800 space-y-8 pl-8 ml-4">
          {timeline.map((mile) => (
            <div key={mile.id} className="relative space-y-2">
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-slate-950 dark:bg-white border-4 border-white dark:border-slate-950 flex items-center justify-center shadow" />
              <div className="font-mono text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                {mile.year}
              </div>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                {mile.event}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditations & Board Recognition */}
      <section className="max-w-7xl mx-auto px-6 space-y-12" id="accreditations-section">
        <div className="text-center space-y-2">
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold text-center">Global Standards</p>
          <h2 className="text-3xl font-sans font-light text-slate-900 dark:text-white">Approved Accreditations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutPage.accreditations?.map((acc, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex items-start gap-4"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-light">
                {acc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
