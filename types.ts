
export enum PostType {
  GENERAL = 'GENERAL',
  MEDICAL = 'MEDICAL', // Specific logic: Green border, urgent badge
  EVENT = 'EVENT',
  NEWS = 'NEWS',
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  classYear: string; // e.g., "K12B"
  major: string; // e.g., "Hoá" (Chemistry)
  company?: string;
  industry?: string;
  bio?: string;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images: string[];
  type: PostType;
  isUrgent?: boolean; // Only for MEDICAL
  isResolved?: boolean; // Only for MEDICAL
  timestamp: string;
  likes: number;
  likedByMe: boolean;
  comments: Comment[];
  hashtag?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string
  location: string;
  description: string;
  image: string;
  attendees: User[];
  myRsvp: 'going' | 'maybe' | 'not_going' | null;
  organizer: User;
}

// --- History Feature Types ---

export interface HistoricalPerson {
  id: string;
  name: string;
  role: 'Head Teacher' | 'Class Leader' | 'Notable Alumnus' | 'Homeroom Teacher' | 'Class Monitor' | 'Principal';
  image: string;
  isDeceased?: boolean;
  lifeYears?: string; // e.g. "1950 - 2020"
  bio: string;
  contact?: string; // Email or Phone if alive
}

export interface PressArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  image: string;
  url?: string;
}

export interface ClassGroup {
  id: string;
  name: string; // "12A"
  fullName: string; // "12A - Advanced Chemistry"
  major: string; // "Chemistry"
  image: string; // Class photo
  formTeacher: HistoricalPerson; // GVCN
  monitor: HistoricalPerson; // Lop Truong
  achievements: string[];
  studentCount: number;
}

export interface Cohort {
  id: string; // e.g. "K15"
  years: string; // e.g. "2000 - 2003"
  majorId: string; // e.g. "CHEM"
  heroImage: string;
  description: string;
  stats: {
    students: number;
    classes: number;
  };
  location: string; // e.g. "Old Campus A"
  principal: HistoricalPerson; // Hieu Truong (Shared)
  classes: ClassGroup[]; // The list of classes
  keyFigures: HistoricalPerson[]; // Other key figures
  press: PressArticle[];
}
