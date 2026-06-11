/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CMSDatabaseState, NewsArticle, CampusEvent } from '../types';
import { Calendar, Clock, MapPin, ArrowRight, Rss, BellRing } from 'lucide-react';

interface NewsViewProps {
  state: CMSDatabaseState;
}

export default function NewsView({ state }: NewsViewProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="news-view-container">
      {/* Luxury Page Header */}
      <section className="relative py-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded inline-block">Press Desk</span>
          <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight">The LS Strategic Press & Event Registry</h1>
          <p className="text-slate-400 font-sans font-light max-w-2xl mx-auto text-xs md:text-sm">
            Read critical announcements, revolutionary peer-reviewed publications, global breakthroughs, and priority campus timelines.
          </p>
        </div>
      </section>

      {/* Tabs Selector */}
      <section className="max-w-7xl mx-auto px-6" id="tabs-section">
        <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <button
            onClick={() => { setActiveTab('news'); setSelectedArticle(null); }}
            className={`pb-2 px-4 text-xs md:text-sm font-bold tracking-wider cursor-pointer transition-all uppercase flex items-center gap-2 ${
              activeTab === 'news'
                ? 'border-b-2 border-slate-950 dark:border-white text-slate-950 dark:text-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Rss className="w-4 h-4" /> Media & News Articles
          </button>
          
          <button
            onClick={() => { setActiveTab('events'); setSelectedArticle(null); }}
            className={`pb-2 px-4 text-xs md:text-sm font-bold tracking-wider cursor-pointer transition-all uppercase flex items-center gap-2 ${
              activeTab === 'events'
                ? 'border-b-2 border-slate-950 dark:border-white text-slate-950 dark:text-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BellRing className="w-4 h-4" /> Academic Events Calendar
          </button>
        </div>
      </section>

      {/* Detailed News Overlay */}
      {selectedArticle ? (
        <section className="max-w-4xl mx-auto px-6 space-y-6 animate-fade-in" id="article-detail-view">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
          >
            ← Back to Press desk
          </button>

          <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-[380px] object-cover rounded-3xl" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-slate-500 uppercase tracking-widest">
                {selectedArticle.category}
              </span>
              <p className="text-xs text-slate-400 font-mono">{selectedArticle.date}</p>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-sans font-light tracking-tight text-slate-955 dark:text-white">
              {selectedArticle.title}
            </h1>

            <div className="h-0.5 bg-slate-100 dark:bg-slate-800" />

            <div className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-light leading-relaxed rich-text-content whitespace-normal" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-6" id="listings-section-container">
          {activeTab === 'news' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {state.news.map((art) => (
                <div 
                  key={art.id}
                  className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <img src={art.image} alt={art.title} className="w-full h-56 object-cover" />
                  <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded text-[10px] font-mono uppercase tracking-wider font-bold">
                          {art.category}
                        </span>
                        <span className="text-[10px] text-slate-450 font-mono">{art.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-950 dark:text-white line-clamp-2 leading-snug">
                        {art.title}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-sans font-light line-clamp-3 leading-relaxed rich-text-content" dangerouslySetInnerHTML={{ __html: art.content }} />
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedArticle(art)}
                        className="text-xs font-bold text-slate-950 dark:text-white flex items-center gap-1.5 hover:gap-2.5 transition-all text-left cursor-pointer"
                      >
                        Read Full Release <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {state.events.map((ev) => (
                <div 
                  key={ev.id}
                  className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center hover:shadow-md transition-shadow"
                >
                  <img src={ev.image} alt={ev.title} className="w-full md:w-56 h-40 object-cover rounded-2xl" />
                  
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <span className="px-2.5 py-1 bg-amber-500/5 border border-amber-500/25 text-amber-500 rounded text-[10px] font-mono font-bold uppercase tracking-widest">
                        Priority Academic Event
                      </span>
                      <h3 className="text-xl font-semibold text-slate-950 dark:text-white leading-snug">
                        {ev.title}
                      </h3>
                      <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans font-light leading-relaxed rich-text-content" dangerouslySetInnerHTML={{ __html: ev.description }} />
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Date: {ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>Time: {ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="truncate">Venue: {ev.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
