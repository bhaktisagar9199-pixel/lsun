/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CMSDatabaseState, Course, FacultyMember, Certificate, NewsArticle, CampusEvent, UserProfile, UserRole, Testimonial, GalleryItem, UniversityStat, AdmissionsPageData } from '../types';
import { liveDb, getSupabaseCredentials, updateSupabaseConfig, isSupabaseConfigured } from '../lib/supabase';
import { ShieldAlert, CheckCircle, Save, Trash2, Plus, Edit2, Users, FileCheck, HelpCircle, Lock, LayoutDashboard, FileText, Cpu, Compass, Sliders, Image, Eye, X, RefreshCw, Printer, Award, Calendar, BadgeCheck, Check, Landmark, Database, Globe, Mail, Phone, MapPin, MessageSquare, Settings } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

interface AdminPanelProps {
  state: CMSDatabaseState;
  currentUser: UserProfile;
  onLogout: () => void;
}

export default function AdminPanel({ state, currentUser, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<string>('certificates');

  // Multi-alert states
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Edit Forms state trackers
  const [heroTitle, setHeroTitle] = useState(state.homepage.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(state.homepage.heroSubtitle);
  const [heroBgImage, setHeroBgImage] = useState(state.homepage.heroBgImage);
  const [introTitle, setIntroTitle] = useState(state.homepage.introTitle);
  const [introDescription, setIntroDescription] = useState(state.homepage.introDescription);

  const [aboutOverview, setAboutOverview] = useState(state.aboutPage.overviewText);
  const [aboutVision, setAboutVision] = useState(state.aboutPage.vision);
  const [aboutMission, setAboutMission] = useState(state.aboutPage.mission);
  const [chancellorName, setChancellorName] = useState(state.aboutPage.chancellorName);
  const [chancellorMessage, setChancellorMessage] = useState(state.aboutPage.chancellorMessage);

  // Lists state tracks
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: '', category: 'Engineering', description: '', eligibility: '', duration: '4 Years', fees: '', careerOpportunities: []
  });
  
  const [newFaculty, setNewFaculty] = useState<Partial<FacultyMember>>({
    name: '', department: 'Engineering & Advanced AI', designation: '', qualifications: '', experience: '', image: '', email: ''
  });

  const [newCert, setNewCert] = useState<Partial<Certificate>>({
    certificateNumber: '', registrationNumber: '', studentName: '', courseName: '', issueDate: 'June 11, 2026', grade: 'A+', status: 'Verified'
  });

  const [newNews, setNewNews] = useState<Partial<NewsArticle>>({
    title: '', content: '', date: 'June 11, 2525', image: '', category: 'Academic', featured: false
  });

  const [newEvent, setNewEvent] = useState<Partial<CampusEvent>>({
    title: '', description: '', date: 'June 11, 2026', time: '10:00 AM - 04:00 PM EST', venue: "Chancellor's Grand Amphitheatre", image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
  });

  // Selected certificate for detail & frontend verification
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [verificationProgress, setVerificationProgress] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [verificationLog, setVerificationLog] = useState<string[]>([]);

  // NEW STATES FOR FULL DYNAMIC UNIVERSITY CMS
  const [admissionIntro, setAdmissionIntro] = useState(state.admissions?.introduction || '');
  const [eligibilityCriteria, setEligibilityCriteria] = useState(state.admissions?.eligibilityCriteria || '');
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDesc, setNewStepDesc] = useState('');

  const [newScholTitle, setNewScholTitle] = useState('');
  const [newScholCriteria, setNewScholCriteria] = useState('');
  const [newScholPercent, setNewScholPercent] = useState('');

  const [contactAddress, setContactAddress] = useState(state.contactDetails?.address || '');
  const [contactPhone, setContactPhone] = useState(state.contactDetails?.phone || '');
  const [contactEmail, setContactEmail] = useState(state.contactDetails?.email || '');
  const [googleMapEmbedUrl, setGoogleMapEmbedUrl] = useState(state.contactDetails?.googleMapEmbedUrl || '');
  const [fbUrl, setFbUrl] = useState(state.contactDetails?.facebook || '');
  const [twitterUrl, setTwitterUrl] = useState(state.contactDetails?.twitter || '');
  const [linkedinUrl, setLinkedinUrl] = useState(state.contactDetails?.linkedin || '');
  const [instagramUrl, setInstagramUrl] = useState(state.contactDetails?.instagram || '');

  const [footerAboutText, setFooterAboutText] = useState(state.footerSettings?.aboutText || '');
  const [footerContactEmail, setFooterContactEmail] = useState(state.footerSettings?.contactEmail || '');
  const [footerContactPhone, setFooterContactPhone] = useState(state.footerSettings?.contactPhone || '');
  const [footerContactAddress, setFooterContactAddress] = useState(state.footerSettings?.contactAddress || '');

  const [seoTitle, setSeoTitle] = useState(state.seoSettings?.title || '');
  const [seoDescription, setSeoDescription] = useState(state.seoSettings?.description || '');
  const [seoKeywords, setSeoKeywords] = useState(state.seoSettings?.keywords || '');
  const [seoOgImage, setSeoOgImage] = useState(state.seoSettings?.ogImage || '');
  const [seoRobotsTxt, setSeoRobotsTxt] = useState(state.seoSettings?.robotsTxt || '');
  const [seoSchemaMarkup, setSeoSchemaMarkup] = useState(state.seoSettings?.schemaMarkup || '');

  const [newTestimonialName, setNewTestimonialName] = useState('');
  const [newTestimonialCourse, setNewTestimonialCourse] = useState('');
  const [newTestimonialBatch, setNewTestimonialBatch] = useState('');
  const [newTestimonialReview, setNewTestimonialReview] = useState('');
  const [newTestimonialPhoto, setNewTestimonialPhoto] = useState('');
  const [newTestimonialRating, setNewTestimonialRating] = useState(5);

  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<'Campus' | 'Sports' | 'Academics' | 'Events'>('Campus');

  const [newStatValue, setNewStatValue] = useState('');
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newStatIcon, setNewStatIcon] = useState('Award');

  // Supabase live configuration credentials
  const creds = getSupabaseCredentials();
  const [supabaseUrl, setSupabaseUrl] = useState(creds.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(creds.anonKey);

  // NEW SUBMISSION HANDLERS FOR THE DYNAMIC SECTIONS
  const handleSaveAdmissions = (e: React.FormEvent) => {
    e.preventDefault();
    liveDb.updateState({
      admissions: {
        ...state.admissions,
        introduction: admissionIntro,
        eligibilityCriteria: eligibilityCriteria,
      }
    });
    triggerSaveSuccess();
  };

  const handleAddAdmissionStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStepTitle || !newStepDesc) return;
    const steps = state.admissions?.processSteps || [];
    const addedStep = {
      id: `step-${Date.now()}`,
      stepNumber: steps.length + 1,
      title: newStepTitle,
      desc: newStepDesc
    };
    liveDb.updateState({
      admissions: {
        ...state.admissions,
        processSteps: [...steps, addedStep]
      }
    });
    setNewStepTitle('');
    setNewStepDesc('');
    triggerSaveSuccess();
  };

  const handleDeleteAdmissionStep = (id: string) => {
    const steps = (state.admissions?.processSteps || []).filter(s => s.id !== id);
    const renumberedSteps = steps.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    liveDb.updateState({
      admissions: {
        ...state.admissions,
        processSteps: renumberedSteps
      }
    });
    triggerSaveSuccess();
  };

  const handleAddScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScholTitle || !newScholCriteria) return;
    const schol = state.admissions?.scholarships || [];
    const added = {
      id: `schol-${Date.now()}`,
      title: newScholTitle,
      criteria: newScholCriteria,
      percentage: newScholPercent || '50% Scholarship'
    };
    liveDb.updateState({
      admissions: {
        ...state.admissions,
        scholarships: [...schol, added]
      }
    });
    setNewScholTitle('');
    setNewScholCriteria('');
    setNewScholPercent('');
    triggerSaveSuccess();
  };

  const handleDeleteScholarship = (id: string) => {
    liveDb.updateState({
      admissions: {
        ...state.admissions,
        scholarships: (state.admissions?.scholarships || []).filter(s => s.id !== id)
      }
    });
    triggerSaveSuccess();
  };

  const handleSaveContactDetails = (e: React.FormEvent) => {
    e.preventDefault();
    liveDb.updateState({
      contactDetails: {
        address: contactAddress,
        phone: contactPhone,
        email: contactEmail,
        googleMapEmbedUrl: googleMapEmbedUrl,
        facebook: fbUrl,
        twitter: twitterUrl,
        linkedin: linkedinUrl,
        instagram: instagramUrl
      }
    });
    triggerSaveSuccess();
  };

  const handleSaveFooterSettings = (e: React.FormEvent) => {
    e.preventDefault();
    liveDb.updateState({
      footerSettings: {
        ...state.footerSettings,
        aboutText: footerAboutText,
        contactEmail: footerContactEmail,
        contactPhone: footerContactPhone,
        contactAddress: footerContactAddress
      }
    });
    triggerSaveSuccess();
  };

  const handleSaveSeoSettings = (e: React.FormEvent) => {
    e.preventDefault();
    liveDb.updateState({
      seoSettings: {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
        ogImage: seoOgImage,
        robotsTxt: seoRobotsTxt,
        schemaMarkup: seoSchemaMarkup
      }
    });
    triggerSaveSuccess();
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonialName || !newTestimonialReview) return;
    const added: Testimonial = {
      id: `test-${Date.now()}`,
      studentName: newTestimonialName,
      course: newTestimonialCourse || 'B.Tech Graduate',
      batch: newTestimonialBatch || 'Class of 2026',
      review: newTestimonialReview,
      photo: newTestimonialPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: Number(newTestimonialRating) || 5
    };
    liveDb.updateState({
      testimonials: [added, ...(state.testimonials || [])]
    });
    setNewTestimonialName('');
    setNewTestimonialCourse('');
    setNewTestimonialBatch('');
    setNewTestimonialReview('');
    setNewTestimonialPhoto('');
    setNewTestimonialRating(5);
    triggerSaveSuccess();
  };

  const handleDeleteTestimonial = (id: string) => {
    liveDb.updateState({
      testimonials: (state.testimonials || []).filter(t => t.id !== id)
    });
    triggerSaveSuccess();
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl || !newGalleryTitle) return;
    const added: GalleryItem = {
      id: `gal-${Date.now()}`,
      url: newGalleryUrl,
      title: newGalleryTitle,
      type: 'image',
      category: newGalleryCategory
    };
    liveDb.updateState({
      gallery: [added, ...(state.gallery || [])]
    });
    setNewGalleryUrl('');
    setNewGalleryTitle('');
    triggerSaveSuccess();
  };

  const handleDeleteGalleryItem = (id: string) => {
    liveDb.updateState({
      gallery: (state.gallery || []).filter(g => g.id !== id)
    });
    triggerSaveSuccess();
  };

  const handleAddStat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatValue || !newStatLabel) return;
    const added: UniversityStat = {
      id: `stat-${Date.now()}`,
      value: newStatValue,
      label: newStatLabel,
      iconName: newStatIcon
    };
    liveDb.updateState({
      stats: [added, ...(state.stats || [])]
    });
    setNewStatValue('');
    setNewStatLabel('');
    triggerSaveSuccess();
  };

  const handleDeleteStat = (id: string) => {
    liveDb.updateState({
      stats: (state.stats || []).filter(s => s.id !== id)
    });
    triggerSaveSuccess();
  };

  const handleUpdateSupabaseCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    updateSupabaseConfig(supabaseUrl.trim(), supabaseAnonKey.trim());
    triggerSaveSuccess();
    alert('Credentials updated! Supabase connection sync has been re-initialized. Seeding will run if table is empty.');
  };

  // Action: Save general page content
  const handleSavePageSettings = (section: 'home' | 'about') => {
    if (section === 'home') {
      liveDb.updateState({
        homepage: {
          ...state.homepage,
          heroTitle,
          heroSubtitle,
          heroBgImage,
          introTitle,
          introDescription
        }
      });
    } else {
      liveDb.updateState({
        aboutPage: {
          ...state.aboutPage,
          overviewText: aboutOverview,
          vision: aboutVision,
          mission: aboutMission,
          chancellorName,
          chancellorMessage
        }
      });
    }
    triggerSaveSuccess();
  };

  const triggerSaveSuccess = () => {
    setSaveStatus('Changes synchronized dynamically to live Supabase structure!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Action: Add Course
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.fees) return;

    const added: Course = {
      id: `course-${Date.now()}`,
      category: newCourse.category as any,
      name: newCourse.name,
      description: newCourse.description || '',
      eligibility: newCourse.eligibility || 'Standard high school records',
      duration: newCourse.duration || '3 Years',
      fees: newCourse.fees,
      careerOpportunities: newCourse.careerOpportunities && newCourse.careerOpportunities.length > 0 
        ? newCourse.careerOpportunities 
        : ['Academic Research', 'Enterprise Architect']
    };

    liveDb.updateState({ courses: [added, ...state.courses] });
    setNewCourse({ name: '', category: 'Engineering', description: '', eligibility: '', duration: '4 Years', fees: '', careerOpportunities: [] });
    triggerSaveSuccess();
  };

  // Action: Delete Course
  const handleDeleteCourse = (id: string) => {
    liveDb.updateState({ courses: state.courses.filter(c => c.id !== id) });
    triggerSaveSuccess();
  };

  // Action: Add Faculty
  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.email) return;

    const added: FacultyMember = {
      id: `fac-${Date.now()}`,
      name: newFaculty.name,
      department: newFaculty.department || 'Engineering & Advanced AI',
      designation: newFaculty.designation || 'Lecturer',
      qualifications: newFaculty.qualifications || 'PhD Science',
      experience: newFaculty.experience || '3 Years',
      image: newFaculty.image || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      email: newFaculty.email
    };

    liveDb.updateState({ faculty: [added, ...state.faculty] });
    setNewFaculty({ name: '', department: 'Engineering & Advanced AI', designation: '', qualifications: '', experience: '', image: '', email: '' });
    triggerSaveSuccess();
  };

  // Action: Delete Faculty
  const handleDeleteFaculty = (id: string) => {
    liveDb.updateState({ faculty: state.faculty.filter(f => f.id !== id) });
    triggerSaveSuccess();
  };

  // Action: Issue Certificate
  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.certificateNumber || !newCert.studentName || !newCert.registrationNumber) return;

    const added: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: newCert.certificateNumber.toUpperCase(),
      registrationNumber: newCert.registrationNumber.toUpperCase(),
      studentName: newCert.studentName,
      courseName: newCert.courseName || 'B.Tech Computer Science & Engineering',
      issueDate: newCert.issueDate || 'June 11, 2026',
      grade: newCert.grade || 'A+',
      status: (newCert.status as any) || 'Verified',
      qrContent: `https://lsu.edu/verify?cert=${newCert.certificateNumber.toUpperCase()}`
    };

    liveDb.updateState({ certificates: [added, ...state.certificates] });
    setNewCert({ certificateNumber: '', registrationNumber: '', studentName: '', courseName: 'B.Tech Computer Science & Engineering', issueDate: 'June 11, 2026', grade: 'A+', status: 'Verified' });
    triggerSaveSuccess();
  };

  // Action: Delete Certificate
  const handleDeleteCert = (id: string) => {
    liveDb.updateState({ certificates: state.certificates.filter(c => c.id !== id) });
    triggerSaveSuccess();
  };

  // Action: Run Frontend Verification diagnostics
  const handleRunVerification = (cert: Certificate) => {
    setVerificationProgress('running');
    setVerificationLog([]);
    const logs = [
      'Establishing secure channel to LS University Academic Ledger...',
      `Querying dossier index for identifier: ${cert.certificateNumber}`,
      'Performing check for matching client registration index...',
      `Database index match status: ${cert.status === 'Verified' ? 'VALID' : cert.status.toUpperCase()}`,
      `Authenticating recipient profile descriptor: ${cert.studentName}`,
      'Verifying Board of Chancellors cryptographic stamps & academic seals...',
      'Finalizing registry validation logs...'
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < logs.length) {
        setVerificationLog(prev => [...prev, logs[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        if (cert.status === 'Verified') {
          setVerificationProgress('success');
        } else {
          setVerificationProgress('failed');
        }
      }
    }, 280);
  };

  // Action: Live Update Certificate Status inside the Details Panel
  const handleUpdateCertStatus = (certId: string, currentStatus: 'Verified' | 'Pending' | 'Revoked') => {
    const updated = state.certificates.map(c => c.id === certId ? { ...c, status: currentStatus } : c);
    liveDb.updateState({ certificates: updated });
    
    const updatedCert = updated.find(c => c.id === certId);
    if (updatedCert) {
      setSelectedCertificate(updatedCert);
      setVerificationProgress('idle');
      setVerificationLog([]);
    }
    triggerSaveSuccess();
  };

  // Action: Save News
  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title || !newNews.content) return;

    const added: NewsArticle = {
      id: `news-${Date.now()}`,
      title: newNews.title,
      content: newNews.content,
      date: newNews.date || 'June 11, 2026',
      image: newNews.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
      category: (newNews.category as any) || 'Academic',
      featured: newNews.featured || false
    };

    liveDb.updateState({ news: [added, ...state.news] });
    setNewNews({ title: '', content: '', date: 'June 11, 2026', image: '', category: 'Academic', featured: false });
    triggerSaveSuccess();
  };

  // Action: Delete News
  const handleDeleteNews = (id: string) => {
    liveDb.updateState({ news: state.news.filter(n => n.id !== id) });
    triggerSaveSuccess();
  };

  // Action: Save Event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description) return;

    const added: CampusEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title || '',
      description: newEvent.description || '',
      date: newEvent.date || 'June 11, 2026',
      time: newEvent.time || '10:00 AM - 04:00 PM EST',
      venue: newEvent.venue || "Chancellor's Grand Amphitheatre",
      image: newEvent.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
    };

    liveDb.updateState({ events: [added, ...state.events] });
    setNewEvent({ title: '', description: '', date: 'June 11, 2026', time: '10:00 AM - 04:00 PM EST', venue: "Chancellor's Grand Amphitheatre", image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800' });
    triggerSaveSuccess();
  };

  // Action: Delete Event
  const handleDeleteEvent = (id: string) => {
    liveDb.updateState({ events: state.events.filter(ev => ev.id !== id) });
    triggerSaveSuccess();
  };

  // Role upgrade modification permissions block
  const handleUpdateUserRole = (userId: string, targetRole: UserRole) => {
    if (currentUser.role !== 'Super Admin') {
      alert('Only the designated Super Admin possesses authority to alter student or editor credentials.');
      return;
    }
    const updatedUsers = state.users.map((u) => u.id === userId ? { ...u, role: targetRole } : u);
    liveDb.updateState({ users: updatedUsers });
    triggerSaveSuccess();
  };

  // Set individual password
  const handleUpdateUserPassword = (userId: string, targetPass: string) => {
    if (currentUser.role !== 'Super Admin') {
      alert('Only the designated Super Admin possesses authority to alter user passwords.');
      return;
    }
    const updatedUsers = state.users.map((u) => u.id === userId ? { ...u, password: targetPass } : u);
    liveDb.updateState({ users: updatedUsers });
    triggerSaveSuccess();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="admin-panel-main">
      {/* Sidebar Command Center */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-semibold tracking-wide uppercase font-serif">Credential Desk</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-white">{currentUser.fullName}</p>
                <p className="text-[10px] font-mono text-emerald-400 break-all leading-none">{currentUser.email}</p>
                <div>
                  <span className="inline-block px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-mono rounded font-bold uppercase tracking-widest">
                    {currentUser.role}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="w-full py-2 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 text-rose-450 hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-all duration-200"
              >
                Logout Session
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Live Real-time Synced</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            </div>
          </div>
        </div>

        {/* Dynamic Admin Sub-Tabs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto scrollbar-thin">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'certificates' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4 shrink-0" /> Student Verification
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'home' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" /> Home Page Content
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'about' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" /> About Page Content
          </button>

          <button
            onClick={() => {
              if (currentUser.role === 'Editor') {
                alert('Editor tier lacks credentials to alter university core program catalogs.');
                return;
              }
              setActiveTab('courses');
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'courses' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" /> Majors & Syllabus
          </button>

          <button
            onClick={() => {
              if (currentUser.role === 'Editor') {
                alert('Editor tier lacks credentials to alter core chancellery profiles.');
                return;
              }
              setActiveTab('faculty');
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'faculty' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" /> Faculty & Senate
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'news' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4 shrink-0" /> News & Releases
          </button>

          <button
            onClick={() => setActiveTab('admissions')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'admissions' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4 shrink-0" /> Admissions & Scholarships
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'gallery' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Image className="w-4 h-4 shrink-0" /> Campus Media Gallery
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'testimonials' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" /> Testimonials & Reviews
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'contact' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4 shrink-0" /> Contact Info & Maps
          </button>

          <button
            onClick={() => setActiveTab('footer')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'footer' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" /> Footer Details
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'seo' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4 shrink-0" /> SEO & Schema Markup
          </button>

          <button
            onClick={() => setActiveTab('univ_details')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'univ_details' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" /> Counters & Achievements
          </button>

          <button
            onClick={() => {
              if (currentUser.role !== 'Super Admin') {
                alert('Super Admin level is required to read profile configurations.');
                return;
              }
              setActiveTab('users');
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'users' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" /> Roles & System Users
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'settings' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4 shrink-0 text-[#da9445]" /> Supabase Configuration
          </button>
        </div>
      </div>

      {/* Main Form Dashboard Console */}
      <div className="lg:col-span-9 space-y-6">
        {saveStatus && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-semibold animate-bounce shadow">
            <CheckCircle className="w-4 h-4 shrink-0" />
            {saveStatus}
          </div>
        )}

        {/* Tab content 1: Certificates */}
        {activeTab === 'certificates' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Accredited Student Certificate Registry</h3>
              <p className="text-xs text-slate-500 font-light max-w-xl">Issue certificates instantly. Records saved here reflect immediately on the Certificate Verification search page.</p>
            </div>

            {/* Form Issue certificate */}
            <form onSubmit={handleIssueCertificate} className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Certificate unique ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. LSU-2026-9081"
                  value={newCert.certificateNumber}
                  onChange={(e) => setNewCert({ ...newCert, certificateNumber: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none uppercase font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Registration Index</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. REG-567812"
                  value={newCert.registrationNumber}
                  onChange={(e) => setNewCert({ ...newCert, registrationNumber: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none uppercase font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Student Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Julian Sterling"
                  value={newCert.studentName}
                  onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Academic Course</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. B.Tech Computer Science"
                  value={newCert.courseName}
                  onChange={(e) => setNewCert({ ...newCert, courseName: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Grade Performance</label>
                <input 
                  type="text" 
                  placeholder="e.g. A+ (Summa Cum Laude)"
                  value={newCert.grade}
                  onChange={(e) => setNewCert({ ...newCert, grade: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1 flex flex-col justify-end">
                <button
                  type="submit"
                  className="py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Issue Certificate
                </button>
              </div>
            </form>

            {/* List Certificates */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-450">Active Certificates Records</h4>
              <div className="border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                {state.certificates.map(c => (
                  <div key={c.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
                        {c.studentName}
                        <span className={`px-1.5 py-0.25 text-[8px] font-bold rounded uppercase tracking-wider font-mono ${
                          c.status === 'Verified' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                          c.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                          'bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-450'
                        }`}>
                          {c.status}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">No: {c.certificateNumber} • Course: {c.courseName}</p>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <button
                        onClick={() => {
                          setSelectedCertificate(c);
                          setVerificationProgress('idle');
                          setVerificationLog([]);
                        }}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-205 border border-slate-200 dark:border-slate-700 rounded-xl font-sans font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all"
                        title="View certificate details and run verification diagnostics"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Details & Verify
                      </button>
                      <button 
                        onClick={() => handleDeleteCert(c.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 dark:hover:bg-rose-500/15 rounded-xl cursor-pointer transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab content 2: Home visual parameters */}
        {activeTab === 'home' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-slate-955 dark:text-white">Edit Home Page Elements</h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Hero Primary Title</label>
                <input 
                  type="text" 
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Hero Subtitle Text</label>
                <textarea 
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Hero Background Image URL</label>
                  <input 
                    type="text" 
                    value={heroBgImage}
                    onChange={(e) => setHeroBgImage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Introduction Header</label>
                  <input 
                    type="text" 
                    value={introTitle}
                    onChange={(e) => setIntroTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Introduction Narrative Text</label>
                <textarea 
                  rows={4}
                  value={introDescription}
                  onChange={(e) => setIntroDescription(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={() => handleSavePageSettings('home')}
                className="w-full py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs uppercase tracking-wider font-bold hover:shadow flex items-center justify-center gap-1 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Sync Home page changes
              </button>
            </div>
          </div>
        )}

        {/* Tab content 3: About visual parameters */}
        {activeTab === 'about' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-slate-955 dark:text-white">Edit About Page Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Legacy Narrative Overview</label>
                <textarea 
                  rows={3}
                  value={aboutOverview}
                  onChange={(e) => setAboutOverview(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">University Supreme Vision</label>
                <textarea 
                  rows={3}
                  value={aboutVision}
                  onChange={(e) => setAboutVision(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">University Mission Guidelines</label>
                <textarea 
                  rows={3}
                  value={aboutMission}
                  onChange={(e) => setAboutMission(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Chancellor Credentials Name</label>
                <input 
                  type="text" 
                  value={chancellorName}
                  onChange={(e) => setChancellorName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Chancellor Strategic Message</label>
                <textarea 
                  rows={3}
                  value={chancellorMessage}
                  onChange={(e) => setChancellorMessage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={() => handleSavePageSettings('about')}
                className="w-full py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs uppercase tracking-wider font-bold hover:shadow flex items-center justify-center gap-1 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Sync About page changes
              </button>
            </div>
          </div>
        )}

        {/* Tab content 4: Syllabus & programs */}
        {activeTab === 'courses' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-955 dark:text-white">Edit Academic Programs Catalogue</h3>
              <p className="text-slate-450 dark:text-slate-400 text-xs font-light">Introduce B.Tech majors, Commerce programs, global science options or remove active courses.</p>
            </div>

            {/* Custom add program Form */}
            <form onSubmit={handleAddCourse} className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Course Major Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. B.Tech Computer Science"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Major Category Group</label>
                <select
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value as any })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-emerald-900 text-xs focus:outline-none"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Management">Management</option>
                  <option value="Computer Applications">Computer Applications</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Duration</label>
                <input 
                  type="text" 
                  placeholder="e.g. 4 Years"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Professional Cost (Fees)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. $45,000 / Semester"
                  value={newCourse.fees}
                  onChange={(e) => setNewCourse({ ...newCourse, fees: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="col-span-full space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Major Description</label>
                <RichTextEditor 
                  value={newCourse.description || ''}
                  onChange={(val) => setNewCourse({ ...newCourse, description: val })}
                  placeholder="Provide precise curriculums and structural guidelines..."
                />
              </div>

              <div className="col-span-full pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Introduce Academic Major
                </button>
              </div>
            </form>

            {/* List active Courses with quick deletions */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-450">Active Catalogues Listings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.courses.map(c => (
                  <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-150 text-xs truncate max-w-[150px]">{c.name}</p>
                      <p className="text-[9px] text-[#da9445] font-mono uppercase tracking-widest mt-1">{c.category}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteCourse(c.id)}
                      className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab content 5: Faculty members */}
        {activeTab === 'faculty' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-955 dark:text-white">Faculty & Academic Senate Office</h3>
              <p className="text-xs text-slate-500 font-light">Add or retire chancellery advisors, PhD laboratory directors and department leads.</p>
            </div>

            {/* Add Faculty Form */}
            <form onSubmit={handleAddFaculty} className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Faculty Member Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Dr. Arthur Spencer"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Target Department Area</label>
                <select
                  value={newFaculty.department}
                  onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                >
                  <option value="Engineering & Advanced AI">Engineering & Advanced AI</option>
                  <option value="Management & Venture Strategy">Management & Venture Strategy</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Official Designation</label>
                <input 
                  type="text" 
                  placeholder="e.g. Professor of Advanced Robotics"
                  value={newFaculty.designation}
                  onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">E-Mail Identity</label>
                <input 
                  type="email" 
                  required
                  placeholder="spencer@lsu.edu"
                  value={newFaculty.email}
                  onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="col-span-full space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Qualifications Portfolio</label>
                <input 
                  type="text" 
                  placeholder="e.g. PhD Computer Science (MIT)"
                  value={newFaculty.qualifications}
                  onChange={(e) => setNewFaculty({ ...newFaculty, qualifications: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="col-span-full pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Affiliate Faculty Member
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-450">Active Faculty Members</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.faculty.map(f => (
                  <div key={f.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={f.image} alt={f.name} className="w-10 h-10 rounded-full object-cover shadow-sm border" />
                      <div>
                        <p className="font-semibold text-slate-905 dark:text-white text-xs truncate max-w-[120px]">{f.name}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{f.designation}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteFaculty(f.id)}
                      className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab content 6: News desk releases */}
        {activeTab === 'news' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-955 dark:text-white">Edit Press Releases</h3>
              <p className="text-xs text-slate-500 font-light">Broadcast breaking academic newsletters, placement reports or nanotechnology announcements.</p>
            </div>

            {/* Add News Form */}
            <form onSubmit={handleAddNews} className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Press Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Brief headline..."
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Category</label>
                  <select
                    value={newNews.category}
                    onChange={(e) => setNewNews({ ...newNews, category: e.target.value as any })}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Placement">Placement</option>
                    <option value="Campus Life">Campus Life</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Narrative Content</label>
                <RichTextEditor 
                  value={newNews.content || ''}
                  onChange={(val) => setNewNews({ ...newNews, content: val })}
                  placeholder="Provide precise release text..."
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Release Press Article
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-450">Active Press Desk Articles</h4>
              <div className="space-y-3">
                {state.news.map(n => (
                  <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={n.image} alt={n.title} className="w-12 h-10 rounded-lg object-cover border" />
                      <div>
                        <p className="font-semibold text-slate-905 dark:text-white text-xs truncate max-w-[200px]">{n.title}</p>
                        <p className="text-[9px] text-[#da9445] font-mono uppercase mt-0.5">{n.category}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteNews(n.id)}
                      className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider between News and Events */}
            <div className="border-t border-slate-200 dark:border-slate-800 my-8 pt-8 space-y-1">
              <h3 className="text-xl font-semibold text-slate-955 dark:text-white">Edit Academic Events Calendar</h3>
              <p className="text-xs text-slate-500 font-light font-sans">Publish advanced scientific summits, institutional roundtables or student-led hackathons on the calendar.</p>
            </div>

            {/* Add Event Form */}
            <form onSubmit={handleAddEvent} className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Event Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Brief summit or calendar header..."
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Event Date</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. June 22, 2026"
                    value={newEvent.date || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Event Time</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 10:00 AM - 04:00 PM EST"
                    value={newEvent.time || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Event Venue</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Chancellor's Grand Amphitheatre..."
                    value={newEvent.venue || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Event Description</label>
                <RichTextEditor 
                  value={newEvent.description || ''}
                  onChange={(val) => setNewEvent({ ...newEvent, description: val })}
                  placeholder="Provide precise event schedule and summary with rich formatting..."
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Publish Calendar Event
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-450">Active Registrar Campus Events</h4>
              <div className="space-y-3">
                {state.events?.map(ev => (
                  <div key={ev.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={ev.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'} alt={ev.title} className="w-12 h-10 rounded-lg object-cover border" />
                      <div>
                        <p className="font-semibold text-slate-905 dark:text-white text-xs truncate max-w-[200px]">{ev.title}</p>
                        <p className="text-[9px] text-[#da9445] font-mono uppercase mt-0.5">{ev.date} • {ev.venue}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab content 7: Users & permissions */}
        {activeTab === 'users' && currentUser.role === 'Super Admin' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-955 dark:text-white">Academic Roles & Operations Control</h3>
              <p className="text-xs text-slate-500 font-light">Super Admin has strict permissions to modify, upgrade or restrict system operator authorizations and passwords.</p>
            </div>

            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              {state.users.map((u) => (
                <div key={u.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{u.fullName}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">{u.email}</p>
                    <span className="inline-block px-2 py-0.5 mt-2 bg-slate-100 dark:bg-slate-800 rounded text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                      {u.role}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold">System Role</label>
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateUserRole(u.id, e.target.value as UserRole)}
                        className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850 focus:outline-none text-[11px] font-mono font-bold cursor-pointer"
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold">Auth Password Status</label>
                      <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-850 rounded-xl text-[10px] font-mono font-bold">
                        Managed via Supabase Auth
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab content 8: Admissions */}
        {activeTab === 'admissions' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-8 animate-fade-in animate-once">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Admissions & Scholarships</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans">Manage admission instructions, eligibility matrices, and student financial aid schemes.</p>
            </div>

            {/* General Texts Form */}
            <form onSubmit={handleSaveAdmissions} className="bg-slate-50 dark:bg-slate-955 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#da9445] font-bold">General Admissions Information</h4>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Introduction Statement</label>
                <textarea 
                  rows={3}
                  value={admissionIntro}
                  onChange={(e) => setAdmissionIntro(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none resize-none"
                  placeholder="Welcome potential students to our online registration hub..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Eligibility Criteria Overview</label>
                <textarea 
                  rows={2}
                  value={eligibilityCriteria}
                  onChange={(e) => setEligibilityCriteria(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none resize-none"
                  placeholder="e.g. 10+2 high school graduation with 60% standard grade points minimum..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Admissions Text
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Process Steps */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#da9445] font-bold">Process Registration Steps</h4>
                  <p className="text-[11px] text-slate-400">List the sequential phases students complete during registration.</p>
                </div>

                <form onSubmit={handleAddAdmissionStep} className="bg-slate-50 dark:bg-slate-955 p-4 rounded-xl border border-slate-200 dark:border-slate-850 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Step Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Document Verification"
                      value={newStepTitle}
                      onChange={(e) => setNewStepTitle(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Short Description</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Upload records, academic certificates, transcripts"
                      value={newStepDesc}
                      onChange={(e) => setNewStepDesc(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-xl hover:opacity-90 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Append Step
                  </button>
                </form>

                <div className="space-y-2 max-h-[300px] overflow-y-auto font-mono">
                  {(state.admissions?.processSteps || []).map((step) => (
                    <div key={step.id} className="p-3 bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between gap-3 text-xs leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-[#da9445] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{step.title}</p>
                          <p className="text-[10px] text-slate-400 font-light mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleDeleteAdmissionStep(step.id)}
                        className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scholarships Info */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#da9445] font-bold">University Scholarships Catalog</h4>
                  <p className="text-[11px] text-[#da9445] dark:text-slate-400">Offer financial exemptions based on merit/exams.</p>
                </div>

                <form onSubmit={handleAddScholarship} className="bg-slate-50 dark:bg-slate-955 p-4 rounded-xl border border-slate-200 dark:border-slate-850 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Exemption Title / Program</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Merit Scholarship Elite"
                      value={newScholTitle}
                      onChange={(e) => setNewScholTitle(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Exemption Percentage</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 50% Tuition Waiver"
                        value={newScholPercent}
                        onChange={(e) => setNewScholPercent(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Eligibility Criteria Match</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Above 95% SAT/GPA"
                        value={newScholCriteria}
                        onChange={(e) => setNewScholCriteria(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-xl hover:opacity-90 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Append Scheme
                  </button>
                </form>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {(state.admissions?.scholarships || []).map((schol) => (
                    <div key={schol.id} className="p-3 bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between gap-3 text-xs leading-relaxed">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{schol.title}</p>
                        <p className="text-[10px] text-[#da9445] font-mono mt-0.5">{schol.percentage} • Criteria: {schol.criteria}</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleDeleteScholarship(schol.id)}
                        className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 9: Campus Media Gallery */}
        {activeTab === 'gallery' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-8 animate-fade-in animate-once">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Campus Media Gallery</h3>
              <p className="text-xs text-slate-500 font-light font-sans">Publish scenic campus images, infrastructure high points and athletic arena photos.</p>
            </div>

            {/* Custom Gallery Form */}
            <form onSubmit={handleAddGalleryItem} className="bg-slate-50 dark:bg-slate-955 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Resource Image URL</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Media Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Nanotechnology Cleanroom Laboratory"
                  value={newGalleryTitle}
                  onChange={(e) => setNewGalleryTitle(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Media Category Class</label>
                <select
                  value={newGalleryCategory}
                  onChange={(e) => setNewGalleryCategory(e.target.value as any)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                >
                  <option value="Campus">Campus & Landscapes</option>
                  <option value="Academics">Academics & Labs</option>
                  <option value="Sports">Sports Arenas</option>
                  <option value="Events">Press Events</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Publish Image Record
                </button>
              </div>
            </form>

            {/* List active Items */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#da9445] font-bold">Published Portfolio Items ({state.gallery?.length || 0})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(state.gallery || []).map((item) => (
                  <div key={item.id} className="relative group bg-slate-50 dark:bg-slate-955 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-850 shadow-sm flex flex-col justify-between">
                    <img src={item.url} alt={item.title} className="w-full h-36 object-cover object-center group-hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
                    <div className="p-3">
                      <p className="font-bold text-slate-900 dark:text-white text-xs truncate">{item.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[8px] font-mono uppercase bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 font-bold">
                          {item.category}
                        </span>
                        <button 
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="p-1 text-slate-405 hover:text-rose-500 rounded hover:bg-rose-500/5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab content 10: Testimonials & Reviews */}
        {activeTab === 'testimonials' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-8 animate-fade-in animate-once">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Alumni Reviews & Testimonials</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans">Feature accomplishments, career reviews, package successes and ratings.</p>
            </div>

            {/* Add Testimonial */}
            <form onSubmit={handleAddTestimonial} className="bg-slate-50 dark:bg-slate-955 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Student Recipient Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Clara Danvers"
                  value={newTestimonialName}
                  onChange={(e) => setNewTestimonialName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Program Majors Course</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. M.S. Artificial Intelligence"
                  value={newTestimonialCourse}
                  onChange={(e) => setNewTestimonialCourse(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Batch Year</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Class of 2025"
                  value={newTestimonialBatch}
                  onChange={(e) => setNewTestimonialBatch(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Profile Photo URL</label>
                <input 
                  type="url" 
                  placeholder="e.g. https://images.unsplash.com/..."
                  value={newTestimonialPhoto}
                  onChange={(e) => setNewTestimonialPhoto(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Stars Rating (1-5)</label>
                <input 
                  type="number" 
                  min={1} 
                  max={5} 
                  required
                  value={newTestimonialRating}
                  onChange={(e) => setNewTestimonialRating(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none font-mono"
                />
              </div>

              <div className="col-span-full space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Review / Core Testimony Narrative</label>
                <textarea 
                  rows={2}
                  required
                  placeholder="My educational process here paved my path to success..."
                  value={newTestimonialReview}
                  onChange={(e) => setNewTestimonialReview(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none resize-none font-sans"
                />
              </div>

              <div className="col-span-full pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Feature Testimonial
                </button>
              </div>
            </form>

            <div className="space-y-4 font-sans">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#da9445] font-bold">Featured Student Reviews ({state.testimonials?.length || 0})</h4>
              <div className="space-y-3">
                {(state.testimonials || []).map((t) => (
                  <div key={t.id} className="p-4 bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={t.photo} alt={t.studentName} className="w-10 h-10 rounded-full object-cover border" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-xs">{t.studentName} <span className="text-[10px] text-slate-400 font-light">({t.batch})</span></p>
                        <p className="text-[9px] text-[#da9445] font-mono uppercase">{t.course} • {Array(t.rating).fill('★').join('')}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-1 line-clamp-1">"{t.review}"</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/5 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab content 11: Contact Info */}
        {activeTab === 'contact' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-6 animate-fade-in animate-once font-sans">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Contact Info & Maps</h3>
              <p className="text-xs text-slate-505 dark:text-slate-400 font-light">Regulate physical addresses, registrar phone lines, email desks, and Google Map links.</p>
            </div>

            <form onSubmit={handleSaveContactDetails} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Chancellery Campus Address</label>
                  <input 
                    type="text" 
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Core Academic Phone Desk</label>
                  <input 
                    type="text" 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Registrar Helpdesk Email</label>
                  <input 
                    type="email" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Google Map Embed URL query</label>
                  <input 
                    type="text" 
                    value={googleMapEmbedUrl}
                    onChange={(e) => setGoogleMapEmbedUrl(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-slate-150 dark:border-slate-800 pt-4 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#da9445] font-bold">Social Media Profiles URL</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase block">Facebook Page</label>
                    <input 
                      type="url" 
                      value={fbUrl}
                      onChange={(e) => setFbUrl(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase block">Twitter / X handle</label>
                    <input 
                      type="url" 
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 text-slate-906 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase block">LinkedIn Official Group</label>
                    <input 
                      type="url" 
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase block">Instagram Desk</label>
                    <input 
                      type="url" 
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 text-slate-909 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-955 dark:bg-white text-white dark:text-slate-955 rounded-xl text-xs uppercase tracking-wider font-bold hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Contacts Configuration
              </button>
            </form>
          </div>
        )}

        {/* Tab content 12: Footer details */}
        {activeTab === 'footer' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-6 animate-fade-in animate-once font-sans">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Footer Layout Details</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Structure the copyright metadata and address coordinates globally rendered in bottom footer.</p>
            </div>

            <form onSubmit={handleSaveFooterSettings} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Footer About Narrative text</label>
                <textarea 
                  rows={2}
                  value={footerAboutText}
                  onChange={(e) => setFooterAboutText(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Registrar General Email Address</label>
                  <input 
                    type="email" 
                    value={footerContactEmail}
                    onChange={(e) => setFooterContactEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-955 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Support Hotline Telephone</label>
                  <input 
                    type="text" 
                    value={footerContactPhone}
                    onChange={(e) => setFooterContactPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-955 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Footer Office Address Block</label>
                <input 
                  type="text" 
                  value={footerContactAddress}
                  onChange={(e) => setFooterContactAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-955 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-955 dark:bg-white text-white dark:text-slate-955 rounded-xl text-xs uppercase tracking-wider font-bold hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Sync Worldwide Footer Changes
              </button>
            </form>
          </div>
        )}

        {/* Tab content 13: SEO & Schema markup */}
        {activeTab === 'seo' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-6 animate-fade-in animate-once font-sans">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">SEO & Schema Markup</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans font-sans">Regulate Google Search parameters, meta tags, and academic schema markups.</p>
            </div>

            <form onSubmit={handleSaveSeoSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Core Title Prefix (for tabs)</label>
                  <input 
                    type="text" 
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-955 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Meta Keywords list</label>
                  <input 
                    type="text" 
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-955 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Facebook/Twitter OpenGraph Image URL</label>
                <input 
                  type="url" 
                  value={seoOgImage}
                  onChange={(e) => setSeoOgImage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold font-sans">Search Meta Description</label>
                <textarea 
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-955 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Robots.txt file instructions</label>
                  <textarea 
                    rows={3}
                    value={seoRobotsTxt}
                    onChange={(e) => setSeoRobotsTxt(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-955 focus:outline-none resize-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">Structured JSON-LD Academic Schema</label>
                  <textarea 
                    rows={3}
                    value={seoSchemaMarkup}
                    onChange={(e) => setSeoSchemaMarkup(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-955 focus:outline-none resize-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-955 dark:bg-white text-white dark:text-slate-955 rounded-xl text-xs uppercase tracking-wider font-bold hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Synchronize SEO Assets
              </button>
            </form>
          </div>
        )}

        {/* Tab content 14: Counters & Achievements */}
        {activeTab === 'univ_details' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-8 animate-fade-in animate-once font-sans">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Counters & Achievements</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans">Manage homepage counters indicating placement highlights, elite faculty numbers and chancellery stats.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleAddStat} className="bg-slate-50 dark:bg-slate-955 p-6 rounded-2xl border border-slate-200 dark:border-slate-850 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Stat Value</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 500+ or 98%"
                  value={newStatValue}
                  onChange={(e) => setNewStatValue(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none font-mono font-bold"
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Metric Label</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Elite Placement recruitments or Global Patents"
                  value={newStatLabel}
                  onChange={(e) => setNewStatLabel(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1 flex flex-col justify-end">
                <button
                  type="submit"
                  className="py-2.5 bg-slate-955 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Append Stat
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#da9445] font-bold">Active Homepage Statistics ({state.stats?.length || 0})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(state.stats || []).map((stat) => (
                  <div key={stat.id} className="p-4 bg-slate-50 dark:bg-slate-955 border border-slate-150 dark:border-slate-850 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                    <div>
                      <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">{stat.value}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{stat.label}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteStat(stat.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/5 cursor-pointer shrink-0 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab content 15: Settings (Supabase configuration parameters) */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-8 space-y-6 animate-fade-in animate-once font-sans">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Supabase Connection Credentials</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Initialize direct real-time server synchronizations with custom database pools.</p>
            </div>

            <form onSubmit={handleUpdateSupabaseCredentials} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">VITE_SUPABASE_URL</label>
                <input 
                  type="text" 
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block font-bold">VITE_SUPABASE_ANON_KEY</label>
                <textarea 
                  rows={2}
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="your-anon-key-string"
                  className="w-full bg-slate-50 dark:bg-slate-955 text-slate-909 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-850 text-xs focus:ring-1 focus:ring-slate-950 font-mono resize-none overflow-x-auto leading-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-955 dark:bg-white text-white dark:text-slate-955 rounded-xl text-xs uppercase tracking-wider font-bold hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Database className="w-4 h-4" /> Save Connection parameters
              </button>
            </form>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-1 text-amber-700 dark:text-amber-400 text-xs leading-normal">
              <p className="font-bold">Active Configuration Info</p>
              <p className="text-[10px] font-light mt-1">If both parameters are supplied at build time or custom-entered in this editor, all operations instantly persist, synchronize, and query straight with your live Supabase database tables! Under zero config, fallback local state will persist local changes to sessionStorage.</p>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Certificate Detail Page & Frontend Verification Overlay */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 lg:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-5xl w-full p-6 md:p-8 space-y-6 relative shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-150 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-serif font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Official Credential Dossier
                  </h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400 font-mono">
                    ID: {selectedCertificate.certificateNumber} • REG: {selectedCertificate.registrationNumber}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-405 hover:text-slate-650 dark:hover:text-white rounded-xl cursor-pointer transition-colors"
                title="Close dossier modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid Layout: Left Section (Verify & Parameters) vs Right Section (Classical Diploma Preview) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Verify Control Room) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Live Controls & Details */}
                <div className="bg-slate-50 dark:bg-slate-955 px-5 py-4 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4">
                  <span className="text-[9px] font-mono tracking-widest text-[#da9445] font-bold uppercase block">
                    Identity Parameters
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-mono font-bold">Student Name</span>
                      <span className="font-bold text-slate-900 dark:text-white font-sans">{selectedCertificate.studentName}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-mono font-bold">Academic Program</span>
                      <span className="font-semibold text-slate-705 dark:text-slate-200">{selectedCertificate.courseName}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-mono font-bold">Graduation Grade</span>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{selectedCertificate.grade}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-mono font-bold">Issue Inception</span>
                        <span className="font-mono text-slate-500">{selectedCertificate.issueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Database Status Override Control */}
                  <div className="pt-3 border-t border-slate-150 dark:border-slate-800 space-y-2">
                    <label className="text-[9px] uppercase font-mono text-slate-400 font-bold block">
                      Administrative Status override
                    </label>
                    <div className="flex gap-1.5">
                      {(['Verified', 'Pending', 'Revoked'] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleUpdateCertStatus(selectedCertificate.id, s)}
                          className={`flex-1 py-1.5 text-[10px] font-mono rounded-lg border font-bold cursor-pointer transition-all ${
                            selectedCertificate.status === s
                              ? s === 'Verified'
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                                : s === 'Pending'
                                ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                                : 'bg-rose-500/10 border-rose-500 text-rose-550'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Frontend Integrity Testing Engine */}
                <div className="bg-slate-50 dark:bg-slate-955 p-5 rounded-3xl border border-slate-150 dark:border-slate-850 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-widest text-[#da9445] font-bold uppercase block">
                      Frontend Security Verifier
                    </span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                  </div>

                  <div className="space-y-4">
                    {/* Progress readouts */}
                    {verificationProgress === 'idle' && (
                      <div className="p-4 bg-slate-150 dark:bg-slate-955 rounded-2xl border border-slate-200 dark:border-slate-850 text-center space-y-3">
                        <p className="text-[11px] text-slate-500">
                          Credentials ledger diagnostic verification ready to proceed.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRunVerification(selectedCertificate)}
                          className="px-4 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-90 flex items-center gap-1.5 mx-auto transition-transform active:scale-95"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Validate Registry Now
                        </button>
                      </div>
                    )}

                    {verificationProgress === 'running' && (
                      <div className="p-4 bg-slate-105 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-4">
                        <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                          <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                          <span>Testing Cryptographic Path...</span>
                        </div>
                        {/* Stream simulation */}
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-[9px] font-mono text-slate-400 space-y-1 h-36 overflow-y-auto text-left">
                          {verificationLog.map((logStr, lIdx) => (
                            <p key={lIdx} className="text-emerald-400 flex items-center gap-1.5 leading-relaxed">
                              <span className="text-[#da9445] font-bold">&#8250;</span> {logStr}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {verificationProgress === 'success' && (
                      <div className="p-5 bg-emerald-500/10 border border-emerald-500/35 rounded-2xl text-center space-y-3 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                          <BadgeCheck className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                            Verification Success
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-normal">
                            All cryptographic nodes verified matching signature blocks! Dossier matches database state perfectly.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-2.5 rounded-xl text-left space-y-1 text-[9px] font-mono text-slate-400">
                          <p className="flex justify-between">
                            <span>Integrity Check:</span>
                            <span className="text-emerald-500 font-bold">&#10003; UNBROKEN</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Verify Target:</span>
                            <span className="text-slate-200">{selectedCertificate.certificateNumber}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setVerificationProgress('idle');
                            setVerificationLog([]);
                          }}
                          className="text-[10px] uppercase font-mono font-bold text-[#da9445] hover:underline cursor-pointer"
                        >
                          Clear Test Parameters
                        </button>
                      </div>
                    )}

                    {verificationProgress === 'failed' && (
                      <div className="p-5 bg-rose-500/10 border border-rose-500/35 rounded-2xl text-center space-y-3 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto shadow-sm">
                          <ShieldAlert className="w-6 h-6 animate-bounce" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                            Verification Blocked
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-normal">
                            Ledger verification resolved with status state mismatch or revoked registrar certificate keys.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-2.5 rounded-xl text-left space-y-1 text-[9px] font-mono text-slate-400">
                          <p className="flex justify-between">
                            <span>Diagnostic Code:</span>
                            <span className="text-rose-500 font-bold">STATE_METADATA_UNVERIFIED</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Current Status:</span>
                            <span className="text-rose-500 uppercase font-bold">{selectedCertificate.status}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setVerificationProgress('idle');
                            setVerificationLog([]);
                          }}
                          className="text-[10px] uppercase font-mono font-bold text-[#da9445] hover:underline cursor-pointer"
                        >
                          Clear Test Parameters
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-sans font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Printer className="w-4 h-4" /> Print Academic Diploma
                </button>

              </div>

              {/* Right Column (Classical Certificate Parchment Paper Visual Render) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div 
                  id="printable-diploma-grid"
                  className="bg-[#faf7f2] dark:bg-slate-950 text-slate-955 dark:text-slate-100 border-[8px] border-[#da9445]/20 p-6 md:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between aspect-[1.414/1] shadow-lg w-full scale-100"
                  style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.02) 100%)' }}
                >
                  {/* Corners */}
                  <div className="absolute top-3 left-3 border-t border-l border-[#da9445]/30 w-10 h-10" />
                  <div className="absolute top-3 right-3 border-t border-r border-[#da9445]/30 w-10 h-10" />
                  <div className="absolute bottom-3 left-3 border-b border-l border-[#da9445]/30 w-10 h-10" />
                  <div className="absolute bottom-3 right-3 border-b border-r border-[#da9445]/30 w-10 h-10" />

                  {/* Watermark Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] select-none pointer-events-none">
                    <Landmark className="w-[180px] h-[180px]" />
                  </div>

                  {/* Header */}
                  <div className="text-center space-y-1 relative z-10">
                    <div className="flex justify-center mb-1">
                      <Landmark className="w-7 h-7 text-[#da9445]" />
                    </div>
                    <h2 className="text-base md:text-lg font-serif text-[#a67132] tracking-widest font-bold uppercase text-center w-full">
                      LS University
                    </h2>
                    <p className="text-[7px] uppercase font-mono tracking-widest text-[#a67132]/80 text-center w-full">
                      Academic Credentials Seal
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="text-center relative z-10 py-3 space-y-2">
                    <p className="font-serif text-slate-500 italic text-[9px] md:text-[10px] text-center w-full">
                      This is to certify that the qualification of academic degree major has been proudly awarded to
                    </p>
                    <h3 className="text-lg md:text-2xl text-slate-905 dark:text-amber-500 font-serif tracking-normal border-b border-[#da9445]/15 pb-1 max-w-sm mx-auto font-bold text-center w-full">
                      {selectedCertificate.studentName}
                    </h3>
                    <p className="font-serif text-slate-500 italic text-[9px] md:text-[10px] text-center w-full">
                      who has diligently succeeded in completing the prescribed major curriculum of
                    </p>
                    <h4 className="text-xs md:text-sm text-slate-950 dark:text-white font-sans font-bold uppercase tracking-wider text-center w-full">
                      {selectedCertificate.courseName}
                    </h4>
                    <p className="text-[9px] font-semibold text-slate-700 dark:text-slate-300 font-sans text-center w-full">
                      characterized with distinction of <span className="text-[#a67132] font-semibold">{selectedCertificate.grade}</span>
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="relative z-10 flex items-end justify-between gap-2 pt-3 border-t border-[#da9445]/15">
                    <div className="space-y-0.5 text-left text-[8px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
                      <p>Date of Issue: {selectedCertificate.issueDate}</p>
                      <p>Certificate Code: {selectedCertificate.certificateNumber}</p>
                      <p>Register Index: {selectedCertificate.registrationNumber}</p>
                    </div>

                    {/* QR and Security Badge status */}
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-lg">
                      <svg viewBox="0 0 100 100" className="w-8 h-8 text-indigo-950 dark:text-white" fill="currentColor">
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
                      </svg>
                      <div className="text-left space-y-0.25">
                        <span className="text-[6px] font-mono tracking-wider text-[#a67132] block uppercase font-bold">Ledger Hash</span>
                        <span className={`text-[6px] font-mono font-bold block uppercase tracking-wide px-1.5 py-0.25 rounded-md ${
                          selectedCertificate.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' :
                          selectedCertificate.status === 'Pending' ? 'bg-amber-500/15 text-amber-500' :
                          'bg-rose-500/15 text-rose-550'
                        }`}>
                          {selectedCertificate.status} State
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
