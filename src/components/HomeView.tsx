/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CMSDatabaseState, HomePageData, Testimonial, UniversityStat, Course, NewsArticle } from '../types';
import { Award, Users, Cpu, TrendingUp, DollarSign, Calendar, ArrowRight, Star, Quote, ChevronRight } from 'lucide-react';

interface HomeViewProps {
  state: CMSDatabaseState;
  onNavigate: (page: string) => void;
}

export default function HomeView({ state, onNavigate }: HomeViewProps) {
  const { homepage, stats, testimonials, courses, news } = state;
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);

  // Map icon name to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case 'Award': return <Award className="w-6 h-6 text-yellow-500" />;
      case 'Users': return <Users className="w-6 h-6 text-blue-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-purple-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-emerald-500" />;
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-amber-500" />;
      default: return <Award className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-24 pb-16 animate-fade-in" id="home-view-container">
      {/* 1. Premium Hero Section */}
      <section className="relative overflow-hidden h-[85vh] flex items-center justify-center bg-slate-950 text-white select-none">
        {/* Soft Ambient Background Image with Dark Vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-[1.03] opacity-65"
          style={{ backgroundImage: `url(${homepage.heroBgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />

        {/* Floating Architectural Light FX */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 select-text">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md animate-pulse">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">Century Peak Prestige</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight leading-[1.1] text-white">
            {homepage.heroTitle}
          </h1>

          <p className="text-sm md:text-lg text-slate-300 font-sans font-light max-w-3xl mx-auto leading-relaxed">
            {homepage.heroSubtitle}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              id="hero-cta-btn"
              onClick={() => onNavigate('admissions')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-slate-100 to-white text-slate-950 font-sans font-semibold rounded-lg tracking-wide hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              {homepage.heroCtaText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              id="hero-secondary-btn"
              onClick={() => onNavigate('courses')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-sans font-medium rounded-lg border border-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Explore Academic Programs
            </button>
          </div>
        </div>

        {/* Symmetrical Bottom Ribbon */}
        <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 border-t border-white/5 backdrop-blur-md py-6 z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-xs font-medium text-slate-400 font-mono tracking-wider uppercase">Placement Rate</p>
              <p className="text-lg md:text-xl font-semibold text-white">{homepage.placementRate}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 font-mono tracking-wider uppercase">Highest Package</p>
              <p className="text-lg md:text-xl font-semibold text-emerald-400">{homepage.highestPackage}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 font-mono tracking-wider uppercase">Average Package</p>
              <p className="text-lg md:text-xl font-semibold text-slate-200">{homepage.averagePackage}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 font-mono tracking-wider uppercase">QS Standard Category</p>
              <p className="text-lg md:text-xl font-semibold text-amber-400 font-sans font-medium">★★★★★ Elite</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Premium Real-Time Live Statistics Panel */}
      <section className="max-w-7xl mx-auto px-6" id="stats-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div 
              key={stat.id || i}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <p className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  {getIcon(stat.iconName)}
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. University Introduction */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="intro-section">
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono tracking-widest uppercase">
            Executive Overview
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            {homepage.introTitle}
          </h2>
          <div className="h-1 w-20 bg-slate-900 dark:bg-white rounded" />
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            {homepage.introDescription}
          </p>
          <div className="pt-4">
            <button 
              id="learn-more-about-btn"
              onClick={() => onNavigate('about')}
              className="px-6 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-lg text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
            >
              Read Full Legacy Timeline
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-slate-900 rounded-3xl rotate-2 scale-98 opacity-5 group-hover:rotate-1 group-hover:scale-100 transition-all duration-500" />
          <img 
            src={homepage.introImage} 
            alt="University Quadrangle" 
            className="relative z-10 w-full h-[400px] object-cover rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800"
          />
        </div>
      </section>

      {/* 4. Why Choose LS University */}
      <section className="bg-slate-50 dark:bg-slate-950 py-20 border-y border-slate-100 dark:border-slate-900" id="why-choose-section">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase">Our Pedigree</p>
            <h2 className="text-3xl md:text-4xl font-sans font-light tracking-tight text-slate-900 dark:text-white">
              {homepage.whyChooseTitle}
            </h2>
            <div className="h-1 w-12 bg-slate-900 dark:bg-white mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepage.whyChoosePoints?.map((point, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-8 rounded-2xl space-y-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {getIcon(point.icon)}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{point.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Career & Placements Highlights */}
      <section className="max-w-7xl mx-auto px-6 space-y-12" id="placements-section">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-slate-500 dark:text-slate-400 font-bold">Unrivaled Career Success</p>
            <h2 className="text-3xl md:text-4xl font-sans font-light text-slate-900 dark:text-white">The Career Gateway</h2>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center gap-6">
            <div>
              <p className="text-xs text-slate-400">Centennial Placement Index</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">100.00% Verified</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Academic Average Starting Package</p>
              <p className="text-lg font-bold text-emerald-500">{homepage.averagePackage}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Executive recruiting company logos */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-[300px]">
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-mono tracking-wider uppercase text-slate-400 font-semibold bg-white/5 border border-white/10 px-2 py-1 rounded inline-block">Direct Global Partners</span>
              <p className="text-xl md:text-2xl font-light text-slate-200">Our students secure roles instantly at legendary global firms.</p>
            </div>
            <div className="relative z-10 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-400 uppercase font-mono tracking-widest mb-4">Prominent Elite Partners</p>
              <div className="flex flex-wrap gap-4 items-center">
                {state.recruiters.map((rec) => (
                  <span key={rec.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono tracking-wide text-slate-300">
                    {rec.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Placements list */}
          <div className="space-y-4">
            {state.placements.map((student) => (
              <div 
                key={student.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-6 hover:shadow-md transition-all duration-300"
              >
                <img 
                  src={student.photo} 
                  alt={student.studentName} 
                  className="w-16 h-16 rounded-xl object-cover shadow border border-slate-200 dark:border-slate-700" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-slate-950 dark:text-white truncate">{student.studentName}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">{student.designation}</p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">{student.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-sans font-medium text-slate-400">Compensation Package</p>
                  <p className="text-sm font-bold text-emerald-500 font-mono">{student.salaryPackage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Courses Showcase */}
      <section className="bg-white dark:bg-slate-900 py-12" id="courses-preview-section">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs font-mono tracking-widest uppercase text-slate-400 font-bold">Unparalleled Academics</p>
              <h2 className="text-3xl md:text-4xl font-sans font-light text-slate-900 dark:text-white">Featured Majors</h2>
            </div>
            <button 
              id="view-all-majors-btn"
              onClick={() => onNavigate('courses')}
              className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100 hover:opacity-85 cursor-pointer flex items-center gap-2 border-b border-slate-900 dark:border-white pb-1"
            >
              View All Majors <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex flex-col gap-2">
              {courses.slice(0, 5).map((course, idx) => (
                <button
                  key={course.id}
                  onClick={() => setActiveCourseIndex(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeCourseIndex === idx
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border-slate-150 dark:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-mono tracking-wider text-slate-400 uppercase block mb-1">{course.category}</span>
                  <span className="font-semibold text-sm ">{course.name}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
              {courses[activeCourseIndex] && (
                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-mono tracking-widest rounded uppercase">
                      {courses[activeCourseIndex].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-sans font-light text-slate-900 dark:text-white mt-4">
                      {courses[activeCourseIndex].name}
                    </h3>
                  </div>

                  <div className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed rich-text-content" dangerouslySetInnerHTML={{ __html: courses[activeCourseIndex].description }} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div>
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Course Duration</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{courses[activeCourseIndex].duration}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Professional Fee</p>
                      <p className="text-sm font-semibold text-emerald-500 font-mono">{courses[activeCourseIndex].fees}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Prime Career Destinations</p>
                    <div className="flex flex-wrap gap-2">
                      {courses[activeCourseIndex].careerOpportunities.map((op, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-xs text-slate-700 dark:text-slate-300">
                          {op}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6">
                <button
                  id="apply-to-major-btn"
                  onClick={() => onNavigate('admissions')}
                  className="w-full py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs tracking-wider uppercase font-bold hover:shadow hover:opacity-90 cursor-pointer"
                >
                  Initiate Dynamic Application Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Admission Open Banner */}
      {homepage.admissionOpen && (
        <section className="max-w-7xl mx-auto px-6" id="admission-banner-section">
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="px-3 py-1 bg-teal-500/15 border border-teal-500/35 text-teal-400 text-xs font-mono tracking-widest uppercase rounded">Admissions Cohort Active</span>
              <h3 className="text-2xl md:text-3xl font-sans font-light tracking-tight leading-tight">{homepage.admissionBannerTitle}</h3>
              <p className="text-slate-300 text-xs md:text-sm font-sans font-light leading-relaxed">{homepage.admissionBannerDesc}</p>
            </div>
            
            <div className="relative z-10 w-full md:w-auto text-center shrink-0">
              <button 
                id="apply-cohort-btn"
                onClick={() => onNavigate('admissions')}
                className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl tracking-wider text-xs uppercase cursor-pointer shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                Apply Online Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 8. Verified Student Testimonials */}
      <section className="max-w-7xl mx-auto px-6 space-y-12" id="testimonials-section">
        <div className="text-center space-y-4">
          <p className="text-xs font-bold text-slate-500 font-mono tracking-widest uppercase">Verified Outcomes</p>
          <h2 className="text-3xl md:text-4xl font-sans font-light text-slate-900 dark:text-white">Student Legacy Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl relative flex flex-col justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-100 dark:text-slate-800 z-0" />
              <div className="relative z-10 space-y-4">
                <div className="flex gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed italic">
                  "{test.review}"
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img 
                  src={test.photo} 
                  alt={test.studentName} 
                  className="w-12 h-12 rounded-full object-cover border border-slate-200" 
                />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{test.studentName}</h4>
                  <p className="text-xs text-slate-400">{test.course} • <span className="font-mono text-slate-500">{test.batch}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. News & Events Spotlight */}
      <section className="max-w-7xl mx-auto px-6 space-y-12" id="news-spotlight">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-slate-400 font-bold">Press & Intelligence</p>
            <h2 className="text-3xl md:text-4xl font-sans font-light text-slate-900 dark:text-white">Global Press & Campus Events</h2>
          </div>
          <button 
            id="view-all-news-btn"
            onClick={() => onNavigate('news')}
            className="text-sm font-bold text-slate-900 dark:text-white hover:opacity-80 border-b border-slate-900 dark:border-white pb-1"
          >
            Review Press Desk
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {news.map((art) => (
            <div 
              key={art.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <img src={art.image} alt={art.title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{art.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-950 dark:text-white text-sm line-clamp-2">{art.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light line-clamp-3 leading-relaxed">
                    {art.content}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => onNavigate('news')}
                    className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 hover:gap-2.5 transition-all text-left"
                  >
                    Read Article <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Symmetrical upcoming event sidebar card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-mono tracking-widest uppercase rounded">Priority Event</span>
              <h3 className="text-lg font-light text-slate-100 leading-snug">Centennial Global AI Summit & Venture Showcase</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Our flagship student venture roundtable. Pitching live prototypes to executive partners.</p>
            </div>
            
            <div className="space-y-2 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>June 22, 2026</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">10:00 AM • Chancellor's Amphitheatre</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
