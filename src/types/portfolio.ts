export type TechCategory = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS';

export interface CompetencyItem {
  title: string;
  description?: string;
}

export interface Profile {
  id: number;
  fullName: string;
  brandMark: string;
  headline: string;
  heroRoles: string[];
  shortBio: string;
  aboutSummary: string;
  aboutStory: string;
  coreCompetencies: CompetencyItem[];
  degreeLabel: string | null;
  availabilityText: string;
  isAvailable: boolean;
  profileImageUrl: string;
  resumeUrl: string | null;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  major: string;
  startYear: number | null;
  endYear: number | null;
  isCurrent: boolean;
  description: string | null;
  displayOrder: number;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  employmentType: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  techTags: string[];
  displayOrder: number;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface TechStack {
  id: number;
  name: string;
  category: TechCategory;
  iconUrl: string | null;
  iconName: string | null;
  shortDescription: string | null;
  displayOrder: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  categoryId: number;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  problemSolved: string | null;
  keyFeatures: ProjectFeature[];
  role: string | null;
  techTags: string[];
  thumbnailUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  year: number | null;
  isPublished: boolean;
  isFeatured: boolean;
  displayOrder: number;
  techStacks: TechStack[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  credentialNumber: string | null;
  issuedAt: string | null;
  expiresAt: string | null;
  credentialUrl: string | null;
  description: string | null;
  category: string;
  displayOrder: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiencyLabel: string | null;
  displayOrder: number;
}

export interface ContactInfo {
  email: string;
  whatsapp: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  location: string;
  additionalInfo: string | null;
}

export interface WebsiteSetting {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string[];
  footerText: string;
  heroCtaPrimaryLabel: string;
  heroCtaSecondaryLabel: string;
  contactSectionTitle: string;
  contactSectionSubtitle: string;
}

export interface PortfolioData {
  profile: Profile;
  educations: Education[];
  experiences: Experience[];
  categories: ProjectCategory[];
  projects: Project[];
  certificates: Certificate[];
  skills: Skill[];
  techStacks: TechStack[];
  contact: ContactInfo;
  settings: WebsiteSetting;
}
