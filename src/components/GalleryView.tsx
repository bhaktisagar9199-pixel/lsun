/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CMSDatabaseState, GalleryItem } from '../types';
import { Image, Video, Compass } from 'lucide-react';

interface GalleryViewProps {
  state: CMSDatabaseState;
}

export default function GalleryView({ state }: GalleryViewProps) {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Sports', 'Academics', 'Events'];

  const filteredGallery = state.gallery.filter((item) => {
    return selectedCat === 'All' || item.category === selectedCat;
  });

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="gallery-view-container">
      {/* Luxury Page Header */}
      <section className="relative py-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded inline-block">The campus canvas</span>
          <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight">Our Resplendent Campus</h1>
          <p className="text-slate-400 font-sans font-light max-w-2xl mx-auto text-xs md:text-sm">
            Investigate deep architectural geometry, scientific laboratories, student luxury lounges, and sporting complexes.
          </p>
        </div>
      </section>

      {/* Categories select */}
      <section className="max-w-7xl mx-auto px-6 space-y-8" id="gallery-grid-main">
        <div className="flex gap-2 justify-center border-b border-slate-100 dark:border-slate-800 pb-6 w-fit mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-150 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Image Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
              
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between text-white z-10 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-white/10 px-2 py-0.5 rounded backdrop-blur">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-semibold truncate max-w-[200px]">{item.title}</h4>
                </div>
                <div className="p-2 bg-white/20 rounded-full backdrop-blur">
                  {item.type === 'video' ? <Video className="w-4 h-4 text-white" /> : <Image className="w-4 h-4 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in">
          <button 
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full font-mono text-xs font-bold hover:bg-white/20 cursor-pointer"
          >
            ✕ Close
          </button>
          
          <div className="max-w-5xl w-full flex flex-col items-center gap-4">
            <img 
              src={lightboxItem.url} 
              alt={lightboxItem.title} 
              className="max-h-[75vh] max-w-full rounded-2xl border border-white/10 shadow-2xl object-contain" 
            />
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">{lightboxItem.category}</span>
              <h3 className="text-white text-base font-semibold">{lightboxItem.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
