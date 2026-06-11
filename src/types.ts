/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// User & Auth Roles
export type UserRole = 'Super Admin' | 'Admin' | 'Editor';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  password?: string;
}

// Home Page Elements
export interface UniversityStat {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  course: string;
  batch: string;
  review: string;
  photo: string;
  rating: number;
}

export interface HomePageData {
  heroTitle: string;
  heroSubtitle: string;
  heroBgImage: string;
  heroCtaText: string;
  introTitle: string;
  introDescription: string;
  introImage: string;
  whyChooseTitle: string;
  whyChoosePoints: { title: string; desc: string; icon: string }[];
  placementRate: string;
  highestPackage: string;
  averagePackage: string;
  admissionOpen: boolean;
  admissionBannerTitle: string;
  admissionBannerDesc: string;
}

// About Page Elements
export interface TimelineMilestone {
  id: string;
  year: string;
  event: string;
}

export interface AboutPageData {
  overviewText: string;
  vision: string;
  mission: string;
  chancellorName: string;
  chancellorMessage: string;
  chancellorPhoto: string;
  vcName: string;
  vcMessage: string;
  vcPhoto: string;
  accreditations: string[];
}

// Course Structure
export interface Course {
  id: string;
  category: 'Engineering' | 'Management' | 'Computer Applications' | 'Commerce' | 'Science' | 'Arts';
  name: string;
  description: string;
  eligibility: string;
  duration: string;
  fees: string;
  careerOpportunities: string[];
}

// Faculty Structure
export interface FacultyMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  qualifications: string;
  experience: string;
  image: string;
  email: string;
}

// Admissions Configuration
export interface AdmissionStep {
  id: string;
  stepNumber: number;
  title: string;
  desc: string;
}

export interface ScholarshipInfo {
  id: string;
  title: string;
  criteria: string;
  percentage: string;
}

export interface AdmissionsPageData {
  introduction: string;
  processSteps: AdmissionStep[];
  eligibilityCriteria: string;
  feeStructureUrl: string;
  scholarships: ScholarshipInfo[];
}

// News & Events
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  category: 'Announcement' | 'Academic' | 'Placement' | 'Sports' | 'Campus Life';
  featured: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
}

// Gallery Model
export interface GalleryItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  category: 'Campus' | 'Sports' | 'Academics' | 'Events';
}

// Placements & Recruiters
export interface PlacementHighlight {
  id: string;
  studentName: string;
  company: string;
  salaryPackage: string;
  designation: string;
  photo: string;
}

export interface Recruiter {
  id: string;
  name: string;
  logo: string;
}

// Certificate Verification
export interface Certificate {
  id: string;
  certificateNumber: string;
  registrationNumber: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  grade: string;
  status: 'Verified' | 'Pending' | 'Revoked';
  pdfUrl?: string;
  qrContent: string;
}

// Contact Page Details
export interface ContactDetails {
  address: string;
  phone: string;
  email: string;
  googleMapEmbedUrl: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

// Dynamic Footer Layout
export interface FooterSettings {
  aboutText: string;
  quickLinks: { label: string; href: string }[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

// Dynamic SEO tags
export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  robotsTxt: string;
  schemaMarkup: string;
}

// Entire Database State representing all our CMS models
export interface CMSDatabaseState {
  users: UserProfile[];
  homepage: HomePageData;
  stats: UniversityStat[];
  testimonials: Testimonial[];
  aboutPage: AboutPageData;
  timeline: TimelineMilestone[];
  courses: Course[];
  faculty: FacultyMember[];
  admissions: AdmissionsPageData;
  news: NewsArticle[];
  events: CampusEvent[];
  gallery: GalleryItem[];
  placements: PlacementHighlight[];
  recruiters: Recruiter[];
  certificates: Certificate[];
  contactDetails: ContactDetails;
  footerSettings: FooterSettings;
  seoSettings: SEOSettings;
}
