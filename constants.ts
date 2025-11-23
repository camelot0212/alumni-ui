import { Post, PostType, User, Event } from './types';

// Users
export const USERS: Record<string, User> = {
  u1: {
    id: 'u1',
    name: 'Dr. Nguyen Van A',
    avatar: 'https://picsum.photos/id/64/200/200',
    classYear: 'K12B',
    major: 'Hoá',
    company: 'Bach Mai Hospital',
    industry: 'Healthcare',
    bio: 'Specialist in internal medicine.'
  },
  u2: {
    id: 'u2',
    name: 'Le Thi B',
    avatar: 'https://picsum.photos/id/65/200/200',
    classYear: 'K14C',
    major: 'Lý',
    company: 'VinGroup',
    industry: 'Technology'
  },
  u3: {
    id: 'u3',
    name: 'Tran Van C',
    avatar: 'https://picsum.photos/id/91/200/200',
    classYear: 'K10A',
    major: 'Toán',
    company: 'Google',
    industry: 'Software'
  },
  me: {
    id: 'me',
    name: 'You (Demo)',
    avatar: 'https://picsum.photos/id/1005/200/200',
    classYear: 'K15',
    major: 'Tin',
    company: 'Freelance',
    industry: 'Design'
  }
};

// Posts
export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: USERS.u1,
    content: 'Can anyone recommend a good cardiologist for a consultation regarding a complex arrhythmia case? #SứcKhoẻ',
    images: [],
    type: PostType.MEDICAL,
    isUrgent: true,
    isResolved: false,
    timestamp: '2 hours ago',
    likes: 12,
    likedByMe: false,
    hashtag: '#SứcKhoẻ',
    comments: [
      { id: 'c1', userId: 'u2', user: USERS.u2, content: 'I recommend Dr. Hanh at Heart Institute.', timestamp: '1h' }
    ]
  },
  {
    id: 'p2',
    author: USERS.u2,
    content: 'Just finished our annual alumni meetup! It was great to see everyone from K14C. Here are some photos from the night.',
    images: ['https://picsum.photos/id/12/800/600', 'https://picsum.photos/id/15/800/600', 'https://picsum.photos/id/20/800/600'],
    type: PostType.GENERAL,
    timestamp: '5 hours ago',
    likes: 45,
    likedByMe: true,
    hashtag: '#AlumniNews',
    comments: []
  },
  {
    id: 'p3',
    author: USERS.u3,
    content: 'Does anyone have experience with the new import regulations for medical equipment? Need some advice for a project.',
    images: [],
    type: PostType.GENERAL,
    timestamp: '1 day ago',
    likes: 5,
    likedByMe: false,
    comments: []
  },
    {
    id: 'p4',
    author: USERS.u1,
    content: 'Case resolved. Thank you everyone for the quick support! This community is amazing.',
    images: [],
    type: PostType.MEDICAL,
    isUrgent: false,
    isResolved: true,
    timestamp: '2 days ago',
    likes: 89,
    likedByMe: true,
    hashtag: '#SứcKhoẻ',
    comments: []
  }
];

// Events
export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Year End Gala 2025',
    date: '2025-12-20T18:00:00',
    location: 'Melia Hanoi Hotel',
    description: 'The biggest event of the year. Black tie attire. Join us for networking, dinner, and performances.',
    image: 'https://picsum.photos/id/42/800/400',
    organizer: USERS.u2,
    attendees: [USERS.u1, USERS.u3, USERS.me],
    myRsvp: 'going'
  },
  {
    id: 'e2',
    title: 'Tech Talk: AI in Healthcare',
    date: '2025-11-28T14:00:00',
    location: 'Virtual (Zoom)',
    description: 'A deep dive into how generative AI is changing diagnosis workflows.',
    image: 'https://picsum.photos/id/60/800/400',
    organizer: USERS.u3,
    attendees: [USERS.u1, USERS.u2],
    myRsvp: null
  }
];
