/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';
import { CMSDatabaseState, HomePageData, AboutPageData, Course, FacultyMember, NewsArticle, CampusEvent, GalleryItem, PlacementHighlight, Recruiter, Certificate, ContactDetails, FooterSettings, SEOSettings, UserProfile, UniversityStat, Testimonial, TimelineMilestone, AdmissionsPageData } from '../types';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase Loaded URL (Database):', supabaseUrl);
console.log('Supabase Loaded Anon Key Status (Database):', supabaseAnonKey ? 'Available' : 'Missing');

// Supabase configuration
export function getSupabaseCredentials() {
  const envUrl = supabaseUrl || '';
  const envKey = supabaseAnonKey || '';
  
  return {
    url: envUrl,
    anonKey: envKey
  };
}

let { url: activeUrl, anonKey: activeKey } = getSupabaseCredentials();

export const isSupabaseConfigured = activeUrl !== '' && activeKey !== '';

export let supabase = isSupabaseConfigured
  ? createClient(activeUrl, activeKey)
  : null;

// Premium initial seed data for LS University
const DEFAULT_HOMEPAGE_DATA: HomePageData = {
  heroTitle: 'Forging the Directors of Tomorrow',
  heroSubtitle: 'LS University holds the absolute peak of academic prestige. Experience an elite curriculum, bespoke research laboratories, and an elite global network of alumni representing humanity\'s highest intellectual heights.',
  heroBgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920',
  heroCtaText: 'Step Into Prestige',
  introTitle: 'Where Legacy Meets Next-Gen Innovation',
  introDescription: 'Founded with the singular purpose of cultivating pioneers, LS University delivers an education without peer. Our faculty comprises preeminent researchers, Nobel Laureates, and industry leaders who guide students toward unparalleled achievements in scientific discovery and business administration.',
  introImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
  whyChooseTitle: 'The LS University Pinnacle of Excellence',
  whyChoosePoints: [
    { title: 'Peerless Global Prestige', desc: 'Consistently ranked above Ivy League institutions for technology transfer, research citations, and graduate placement indices.', icon: 'Award' },
    { title: 'World-Class Faculty', desc: 'Study directly under leading global minds, industry CEOs, and renowned researchers who hold major international patents.', icon: 'Users' },
    { title: 'Bespoke AI Laboratories', desc: 'Access highly advanced computing infrastructure and high-density GPU supercomputers dedicated to neural networks and nanotechnology.', icon: 'Cpu' },
    { title: 'Unparalleled Career Access', desc: 'Secure executive and technical placements instantly through our personal, direct partnerships with the world\'s largest elite tech companies.', icon: 'TrendingUp' }
  ],
  placementRate: '100%',
  highestPackage: '$540,000 / Year',
  averagePackage: '$185,000 / Year',
  admissionOpen: true,
  admissionBannerTitle: 'Applications Are Now Open for the Centennial Cohort',
  admissionBannerDesc: 'Enroll in human history\'s most rigorous development pipeline. Exceptional scholarships covering 100% tuition are awarded to select elite scholars.'
};

const DEFAULT_STATS: UniversityStat[] = [
  { id: 'stat-1', value: 'Rank #1', label: 'Global Tech Breakthroughs', iconName: 'TrendingUp' },
  { id: 'stat-2', value: '180+', label: 'Registered Patents', iconName: 'Cpu' },
  { id: 'stat-3', value: '100%', label: 'Executive Placement Rate', iconName: 'Award' },
  { id: 'stat-4', value: '$840M', label: 'Active Advanced Research Fund', iconName: 'DollarSign' }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    studentName: 'Aria Sterling',
    course: 'B.Tech CSE (AI & Machine Learning Focus)',
    batch: 'Class of 2025',
    review: 'LS University is in a different league altogether. During my sophomore year, I co-authored a neural network paper with a Nobel-laureate faculty member and secured a full-time ML Architect offer at Apple, California.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 'test-2',
    studentName: 'Marcus Vance',
    course: 'Global MBA & Executive Strategy',
    batch: 'Class of 2024',
    review: 'The network here is unparalleled. My venture-capital capstone project was presented to top-tier partners, leading directly to a $2.5M seed funding round before my graduation.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5
  }
];

const DEFAULT_ABOUT_DATA: AboutPageData = {
  overviewText: 'LS University stands at the apex of global higher education. Formed as an independent elite private institute, the university has continuously set international benchmarks for engineering, digital sciences, finance, and elite leadership development.',
  vision: 'To serve as the premier cradle of human genius, driving state-of-the-art technological innovation and supreme ethical leadership to secure a brilliant future for global society.',
  mission: 'To provide a hyper-rigorous, deeply analytical, and highly collaborative intellectual environment. Through custom mentorship, next-gen laboratories, and elite partnerships, we empower selected pupils to rewrite boundaries.',
  chancellorName: 'Dr. Evelyn Sterling, PhD (Oxford)',
  chancellorMessage: 'As Chancellor, it is my privilege to welcome you to a community that has spent decades defining the limits of human possibility. We do not merely prepare you for a profession; we elevate your entire operational wavelength to lead the global epoch.',
  chancellorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  vcName: 'Professor Arthur Pendelton, FRS (MIT)',
  vcMessage: 'Academic rigor at LS University is intentionally demanding, highly creative, and profoundly rewarding. Our graduates emerge with a portfolio of peerless competencies ready to address modern challenges with confidence.',
  vcPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  accreditations: [
    'ABET Accredited Engineering Programs',
    'AACSB Accredited business degrees representing the masterclass tier',
    'Ranked Tier-1 Outstanding Category by World University Commission',
    'Strategic Partner of Advanced Scientific Research Consortium'
  ]
};

const DEFAULT_TIMELINE: TimelineMilestone[] = [
  { id: 'time-1', year: '1976', event: 'Inception of LS Scientific Research Guild, establishing advanced research principles.' },
  { id: 'time-2', year: '1995', event: 'Fully chartered as LS University with bespoke campuses in Engineering, Computer Science, and Global Business.' },
  { id: 'time-3', year: '2012', event: 'Launch of the $500M Quantum Supercomputing Grid and advanced Nanotechnology Labs.' },
  { id: 'time-4', year: '2026', event: 'Recognized as the world\'s leading private dynamic digital CMS model campus with 100% modern digital infrastructure.' }
];

const DEFAULT_COURSES: Course[] = [
  {
    id: 'course-1',
    category: 'Engineering',
    name: 'B.Tech Computer Science & Engineering',
    description: 'The masterclass curriculum covering core computers, distributed computing structures, compiler engineering, and ultimate full-stack systems.',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics. Minimum 95% threshold score in LS-SAT or equivalent national entrance.',
    duration: '4 Years (8 Semesters)',
    fees: '$45,000 / Semester',
    careerOpportunities: ['Lead Software Architect', 'Distributed Systems Specialist', 'Principal Cloud Engineer', 'Venture CTO']
  },
  {
    id: 'course-2',
    category: 'Engineering',
    name: 'B.Tech Artificial Intelligence & Deep Learning',
    description: 'A focused, next-gen major specializing in neural network architectures, generative models, transformer systems, and high-performance computing.',
    eligibility: '10+2 with Advanced Math background. Compulsory portfolio review.',
    duration: '4 Years (8 Semesters)',
    fees: '$48,000 / Semester',
    careerOpportunities: ['AI Research Scientist', 'ML Engineering Lead', 'Natural Language Expert', 'Robotics Intelligence Lead']
  },
  {
    id: 'course-3',
    category: 'Engineering',
    name: 'B.Tech Mechanical & Mechatronics',
    description: 'Integrating classical structural physics, modern robotics, aerospace designs, and high-performance automated factories.',
    eligibility: '10+2 in Science stream with high grade point average in Physics.',
    duration: '4 Years',
    fees: '$42,000 / Semester',
    careerOpportunities: ['Robotics Design Engineer', 'Mechatronics Systems Director', 'Aerospace Specialist']
  },
  {
    id: 'course-4',
    category: 'Management',
    name: 'BBA in International Finance & Strategy',
    description: 'Focuses on global venture markets, institutional investments, advanced analytics, and strategic venture creation.',
    eligibility: '10+2 with high logical reasoning score.',
    duration: '3 Years (6 Semesters)',
    fees: '$38,000 / Semester',
    careerOpportunities: ['Investment Banking Analyst', 'Management Consultant', 'Corporate Strategy Officer']
  },
  {
    id: 'course-5',
    category: 'Management',
    name: 'MBA (Executive Strategy & Leadership)',
    description: 'The premier global executive program providing direct access to premium venture funds, corporate boardrooms, and leadership strategy.',
    eligibility: 'Bachelor\'s Degree with high academic honors, plus minimum 2 years of corporate work experience.',
    duration: '2 Years (4 Semesters)',
    fees: '$60,000 / Semester',
    careerOpportunities: ['Chief Executive Officer', 'Private Equity VP', 'Senior Strategy Partner']
  }
];

const DEFAULT_FACULTY: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Liam Sterling',
    department: 'Engineering & Advanced AI',
    designation: 'Department Chair & Professor of Neural Networks',
    qualifications: 'PhD Computer Science (Stanford University)',
    experience: '18 Years (Former Principal AI Scientist at Google DeepMind)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    email: 'l.sterling@lsu.edu'
  },
  {
    id: 'fac-2',
    name: 'Prof. Chloe Westwood',
    department: 'Management & Venture Strategy',
    designation: 'Professor of Quantitative Finance',
    qualifications: 'MBA (Harvard Business School), PhD Finance (Wharton)',
    experience: '15 Years (Former Director of Portfolio Management, Goldman Sachs)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    email: 'c.westwood@lsu.edu'
  }
];

const DEFAULT_ADMISSIONS: AdmissionsPageData = {
  introduction: 'The LS University admissions process is designed to filter for extreme levels of academic talent, creative thinking, and future leadership capability. We evaluate cohort applications Holistically.',
  processSteps: [
    { id: 'step-1', stepNumber: 1, title: 'Submit Digital Profile', desc: 'Securely upload your academic transcripts, creative portfolios, and written essays via our premium admissions gateway.' },
    { id: 'step-2', stepNumber: 2, title: 'Analytical Evaluation Test', desc: 'Succeed in our proprietary LS-SAT evaluation measuring core cognitive capacity, advanced logic, and systematic thinking.' },
    { id: 'step-3', stepNumber: 3, title: 'Bespoke Executive Interview', desc: 'Engage in a live, highly challenging panel interview with admissions officers, academic chairs, and corporate advisors.' }
  ],
  eligibilityCriteria: 'Admission requires outstanding grade point averages (top 5% of class) and a demonstrated commitment to social breakthrough, technical building, or entrepreneurial creation.',
  feeStructureUrl: '#',
  scholarships: [
    { id: 'schol-1', title: 'Centennial Chancellor Fellowship', criteria: 'A perfect 100% tuition and living fellowship granted to top 10 incoming engineering students.', percentage: '100% Tuition & Accommodation' },
    { id: 'schol-2', title: 'Vanguard Female Innovators Grant', criteria: 'A special endowment fund celebrating outstanding female leaders in computer science and quantitative finance.', percentage: '75% Tuition Scholarship' }
  ]
};

const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'LS University Unveils 1000-Qubit Quantum Computing Supergrid',
    content: 'In collaboration with major technology networks, LS University has successfully booted its highly proprietary 1000-qubit cryogenic quantum model, enabling instantly scalable simulations for materials science, molecular genetics, and machine intelligence models.',
    date: 'June 08, 2026',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    category: 'Academic',
    featured: true
  },
  {
    id: 'news-2',
    title: 'LS University MBA Grads Break Premium Placement Income Record',
    content: 'The class of 2025 has registered unprecedented professional landmarks. Over 45% of graduating seniors accepted starting compensation packages exceeding $250,000 annually at major global strategic firms, sovereign wealth funds, and next-generation tech giants.',
    date: 'May 28, 2026',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    category: 'Placement',
    featured: false
  }
];

const DEFAULT_EVENTS: CampusEvent[] = [
  {
    id: 'event-1',
    title: 'Global Artificial Intelligence Summit & Venture Showcase',
    description: 'An elite roundtable featuring silicon-valley venture partners, national laboratory leads, and advanced student startups discussing next-generation neural architectures.',
    date: 'June 22, 2026',
    time: '10:00 AM - 04:00 PM EST',
    venue: 'Chancellor\'s Grand Amphitheatre',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
  }
];

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: 'gal-1', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600', type: 'image', title: 'The Iconic Quadrangle', category: 'Campus' },
  { id: 'gal-2', url: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=600', type: 'image', title: 'Advanced Nanotech Lab', category: 'Academics' },
  { id: 'gal-3', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600', type: 'image', title: 'eSports & Student Lounge', category: 'Campus' }
];

const DEFAULT_PLACEMENTS: PlacementHighlight[] = [
  { id: 'pla-1', studentName: 'Alexander Price', company: 'Google DeepMind', salaryPackage: '$480,000 / Yr', designation: 'Generalist AI Architect', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
  { id: 'pla-2', studentName: 'Miranda Fox', company: 'Goldman Sachs VIP', salaryPackage: '$320,000 / Yr', designation: 'Quantitative Fund Strategist', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' }
];

const DEFAULT_RECRUITERS: Recruiter[] = [
  { id: 'rec-1', name: 'Google DeepMind', logo: 'Google' },
  { id: 'rec-2', name: 'Goldman Sachs', logo: 'Goldman' },
  { id: 'rec-3', name: 'Tesla Motors', logo: 'Tesla' },
  { id: 'rec-4', name: 'Morgan Stanley', logo: 'Morgan' },
  { id: 'rec-5', name: 'NVIDIA AI', logo: 'Nvidia' }
];

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'LSU-2026-9081',
    registrationNumber: 'REG-567812',
    studentName: 'Julian Sterling',
    courseName: 'B.Tech Artificial Intelligence',
    issueDate: 'May 12, 2026',
    grade: 'A+ (Summa Cum Laude)',
    status: 'Verified',
    qrContent: 'https://lsu.edu/verify?cert=LSU-2026-9081'
  },
  {
    id: 'cert-2',
    certificateNumber: 'LSU-2026-4402',
    registrationNumber: 'REG-901123',
    studentName: 'Natasha Romanov',
    courseName: 'Global MBA & Digital Strategy',
    issueDate: 'May 15, 2026',
    grade: 'A',
    status: 'Verified',
    qrContent: 'https://lsu.edu/verify?cert=LSU-2026-4402'
  }
];

const DEFAULT_CONTACT_DETAILS: ContactDetails = {
  address: 'Century Elite Avenue, Campus Heights, Suite 101, LS Capital',
  phone: '+1 (800) LSU-GENIUS',
  email: 'admissions@lsu.edu',
  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617540751!2d-73.985428!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus',
  facebook: 'https://facebook.com/lsuuniversity',
  twitter: 'https://twitter.com/lsuuniversity',
  linkedin: 'https://linkedin.com/school/lsuuniversity',
  instagram: 'https://instagram.com/lsuuniversity'
};

const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  aboutText: 'LS University (LSU) represents the absolute gold standard in luxury higher academic instruction, pioneering next-generation micro-molecular technologies, AI, and elite corporate strategies.',
  quickLinks: [
    { label: 'Admissions Gateway', href: 'admissions' },
    { label: 'Academics & Majors', href: 'courses' },
    { label: 'Chancellor\'s Overview', href: 'about' },
    { label: 'Certificate Verification', href: 'verification' }
  ],
  contactEmail: 'admissions@lsu.edu',
  contactPhone: '+1 (800) LSU-GENIUS',
  contactAddress: 'Century Elite Avenue, LSU Capital Grid'
};

const DEFAULT_SEO_SETTINGS: SEOSettings = {
  title: 'LS University | The Apex Global Academic Institution',
  description: 'Welcome to LS University, human history\'s premier academic community for machine learning, quantum engineering, global strategizing, and advanced corporate innovation.',
  keywords: 'elite university, premium education, deep learning, Ivy League peak, B.Tech CSE, luxury campus, certificate verification',
  ogImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
  robotsTxt: 'User-agent: *\nAllow: /',
  schemaMarkup: '{\n  "@context": "https://schema.org",\n  "@type": "CollegeOrUniversity",\n  "name": "LS University",\n  "url": "https://lsu.edu"\n}'
};

// Initial state creator
const getInitialCMSState = (): CMSDatabaseState => {
  // Seed default data (excluding hardcoded passwords)
  const seedState: CMSDatabaseState = {
    users: [],
    homepage: DEFAULT_HOMEPAGE_DATA,
    stats: DEFAULT_STATS,
    testimonials: DEFAULT_TESTIMONIALS,
    aboutPage: DEFAULT_ABOUT_DATA,
    timeline: DEFAULT_TIMELINE,
    courses: DEFAULT_COURSES,
    faculty: DEFAULT_FACULTY,
    admissions: DEFAULT_ADMISSIONS,
    news: DEFAULT_NEWS,
    events: DEFAULT_EVENTS,
    gallery: DEFAULT_GALLERY,
    placements: DEFAULT_PLACEMENTS,
    recruiters: DEFAULT_RECRUITERS,
    certificates: DEFAULT_CERTIFICATES,
    contactDetails: DEFAULT_CONTACT_DETAILS,
    footerSettings: DEFAULT_FOOTER_SETTINGS,
    seoSettings: DEFAULT_SEO_SETTINGS
  };

  return seedState;
};

// Set up Broadcast Channel for real-time live synchronization across browser windows/tabs!
// This satisfies the real-time CMS requirement instantly inside the sandbox environment.
const REALTIME_CHANNEL_NAME = 'LS_UNIVERSITY_CMS_REALTIME';
const realtimeChannel = typeof window !== 'undefined' ? new BroadcastChannel(REALTIME_CHANNEL_NAME) : null;

// Simulated store with listeners
class LiveCMSDatabase {
  private state: CMSDatabaseState;
  private listeners: Set<(state: CMSDatabaseState) => void> = new Set();
  private realtimeChannelInstance: any = null;

  constructor() {
    this.state = getInitialCMSState();

    if (realtimeChannel) {
      realtimeChannel.onmessage = (event) => {
        if (event.data && event.data.type === 'UPDATE_CMS_STATE') {
          this.state = event.data.state;
          this.notifyListeners();
        }
      };
    }

    // Attempt background Supabase retrieval on startup
    this.reinitializeSupabase();
  }

  public getState(): CMSDatabaseState {
    return this.state;
  }

  public async reinitializeSupabase() {
    if (this.realtimeChannelInstance) {
      try {
        this.realtimeChannelInstance.unsubscribe();
      } catch (e) {}
      this.realtimeChannelInstance = null;
    }

    if (!supabase) {
      console.log('Supabase client is not yet configured or is inactive.');
      return;
    }

    try {
      console.log('Synchronizing with active Supabase server endpoint...');
      await this.fetchFromSupabase();
      this.setupRealtimeSubscription();
    } catch (e) {
      console.error('Failed to sync with Supabase services:', e);
    }
  }

  public async fetchFromSupabase() {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('university_cms_content')
        .select('*');

      if (error) {
        console.warn('Could not retrieve payload from university_cms_content table. Ensure database schema is created.', error);
        return;
      }

      if (data && data.length > 0) {
        const loadedState: Partial<CMSDatabaseState> = {};
        data.forEach((row: any) => {
          const key = row.id as keyof CMSDatabaseState;
          loadedState[key] = row.content;
        });

        this.state = {
          ...this.state,
          ...loadedState
        };

        this.notifyListeners();
        console.log('Successfully loaded all website content in real-time from Supabase database!');
      } else {
        console.log('Supabase tables are pristine. Triggering auto-seeding protocols...');
        await this.seedAllToSupabase();
      }
    } catch(err) {
      console.error('Error fetching university content from Supabase:', err);
    }
  }

  public async seedAllToSupabase() {
    if (!supabase) return;
    try {
      const keys = Object.keys(this.state) as Array<keyof CMSDatabaseState>;
      for (const key of keys) {
        const value = this.state[key];
        await supabase
          .from('university_cms_content')
          .upsert({ id: key, content: value });
      }
      console.log('Dynamic auto-seeding completed. Initial demo content pushed to Supabase!');
    } catch (e) {
      console.warn('Dynamic seeding failed to resolve:', e);
    }
  }

  private setupRealtimeSubscription() {
    if (!supabase) return;

    this.realtimeChannelInstance = supabase
      .channel('public:university_cms_content')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'university_cms_content' },
        (payload: any) => {
          console.log('Supabase Realtime Broadcast caught change:', payload);
          if (payload.new && payload.new.id) {
            const key = payload.new.id as keyof CMSDatabaseState;
            const content = payload.new.content;
            
            this.state = {
              ...this.state,
              [key]: content
            };

            this.notifyListeners();
          }
        }
      )
      .subscribe((status) => {
        console.log('Supabase Realtime Subscription handle:', status);
      });
  }

  public updateState(newState: Partial<CMSDatabaseState>): void {
    this.state = { ...this.state, ...newState };

    if (realtimeChannel) {
      realtimeChannel.postMessage({
        type: 'UPDATE_CMS_STATE',
        state: this.state
      });
    }

    this.notifyListeners();

    if (supabase) {
      Object.entries(newState).forEach(async ([key, val]) => {
        try {
          await supabase!
            .from('university_cms_content')
            .upsert({ id: key, content: val });
        } catch (e) {
          console.warn(`Failed to push key ${key} to Supabase:`, e);
        }
      });
    }
  }

  public subscribe(callback: (state: CMSDatabaseState) => void): () => void {
    this.listeners.add(callback);
    callback(this.state);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(cb => cb(this.state));
  }
}

export const liveDb = new LiveCMSDatabase();

export function updateSupabaseConfig(url: string, anonKey: string) {
  activeUrl = url;
  activeKey = anonKey;
  
  if (url && anonKey) {
    supabase = createClient(url, anonKey);
    liveDb.reinitializeSupabase();
  } else {
    supabase = null;
  }
}
