/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CMSDatabaseState, Course } from '../types';
import { Search, Compass, BookOpen, GraduationCap, Briefcase, DollarSign, Clock, HelpCircle, CheckCircle } from 'lucide-react';

interface CoursesViewProps {
  state: CMSDatabaseState;
  onNavigate: (page: string) => void;
}

export default function CoursesView({ state, onNavigate }: CoursesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const categories = ['All', 'Engineering', 'Management', 'Computer Applications', 'Commerce', 'Science', 'Arts'];

  // Dynamically filter matching courses
  const filteredCourses = state.courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="courses-view-container">
      {/* Luxury Page Header Banner */}
      <section className="relative py-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded inline-block">Curriculum Catalogue</span>
          <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight">Academic Majors & Global Pathways</h1>
          <p className="text-slate-400 font-sans font-light max-w-2xl mx-auto text-xs md:text-sm">
            Investigate deep logical disciplines designed and taught by leading international minds and research directors.
          </p>
        </div>
      </section>

      {/* Course Explorer Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-8" id="explorer-section">
        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-150 dark:border-slate-800">
          {/* Quick Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search specific course keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-900 focus:outline-none"
            />
          </div>

          {/* Elegant Carousel of Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white border-slate-950 shadow'
                    : 'bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[10px] font-mono tracking-widest uppercase font-bold">
                    {course.category}
                  </span>
                  <p className="text-xs font-semibold text-emerald-500 font-mono tracking-wide">{course.fees}</p>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-amber-400 transition-colors">
                  {course.name}
                </h3>
                
                <div className="text-xs text-slate-500 dark:text-slate-400 font-sans font-light line-clamp-3 leading-relaxed rich-text-content" dangerouslySetInnerHTML={{ __html: course.description }} />

                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">Eligibility: {course.eligibility}</span>
                  </div>
                </div>
              </div>

              {/* Interaction Row */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
                >
                  View Details
                </button>
                
                <button 
                  onClick={() => onNavigate('admissions')}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-50 text-white dark:text-slate-950 text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  Quick Apply
                </button>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400">
              <p className="text-sm font-sans font-light mb-4">No matching academic courses available in our database.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-xs font-bold text-slate-900 dark:text-white underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Course Detail Overlay/Drawer */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl w-full rounded-2xl p-8 max-h-[85vh] overflow-y-auto space-y-6 relative shadow-2xl">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 p-2 bg-slate-55 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full font-mono text-xs font-bold text-slate-500 cursor-pointer"
            >
              ✕ Close
            </button>

            <div className="space-y-4">
              <span className="px-2.5 py-0.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded text-xs font-mono uppercase tracking-wider">
                {selectedCourse.category}
              </span>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-950 dark:text-white leading-tight">
                {selectedCourse.name}
              </h2>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-350 font-light leading-relaxed">
              <div className="rich-text-content text-slate-600 dark:text-slate-350" dangerouslySetInnerHTML={{ __html: selectedCourse.description }} />
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl font-sans">
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Annual Academic Cost</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">{selectedCourse.fees}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Major Duration</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">{selectedCourse.duration}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase font-bold text-slate-900 dark:text-white tracking-widest font-mono">Admission Eligibility Criteria</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-150">
                  {selectedCourse.eligibility}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase font-bold text-slate-900 dark:text-white tracking-widest font-mono">Prime Corporate Career Opportunities</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedCourse.careerOpportunities.map((op, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{op}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-150 dark:border-slate-850 flex gap-4">
              <button 
                onClick={() => { setSelectedCourse(null); onNavigate('admissions'); }}
                className="flex-1 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:shadow transition-shadow"
              >
                Initiate Secure Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
