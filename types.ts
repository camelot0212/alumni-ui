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