
import { Post, PostType, User, Event, Cohort } from './types';

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

// History / Cohorts
export const MOCK_COHORTS: Cohort[] = [
  {
    id: 'K1',
    years: '1986 - 1989',
    majorId: 'CHEM',
    heroImage: 'https://picsum.photos/id/20/1200/600?grayscale', // Black & White feel
    description: 'The pioneers of the Chemistry Department. K1 laid the foundation for the rigorous scientific traditions we hold dear today.',
    location: 'Old French Villa Campus',
    stats: { students: 120, classes: 4 },
    principal: {
        id: 'h1', name: 'Mr. Tran Van Hieu', role: 'Principal', image: 'https://picsum.photos/id/338/200/200?grayscale',
        isDeceased: true, lifeYears: '1940 - 2015', bio: 'The founding principal who fought for the school establishment.'
    },
    keyFigures: [
      {
        id: 'h2', name: 'Nguyen Thi Mai', role: 'Notable Alumnus', image: 'https://picsum.photos/id/331/200/200?grayscale',
        bio: 'The first student union president.'
      }
    ],
    classes: [],
    press: [
      { id: 'pr1', title: 'Chemistry Dept Establishment', source: 'City Daily', date: 'Sep 1986', image: 'https://picsum.photos/id/250/400/300?grayscale' }
    ]
  },
  {
    id: 'K12',
    years: '1997 - 2000',
    majorId: 'CHEM',
    heroImage: 'https://picsum.photos/id/180/1200/600',
    description: 'The generation of change. K12 witnessed the transition to the new curriculum and the expansion of the science wing.',
    location: 'Nguyen Hue Campus',
    stats: { students: 350, classes: 8 },
    principal: {
        id: 'h3', name: 'Mrs. Le Thu Ha', role: 'Principal', image: 'https://picsum.photos/id/203/200/200',
        bio: 'Beloved literature teacher known for her strict but inspiring methods.'
    },
    keyFigures: [],
    classes: [],
    press: [
       { id: 'pr2', title: 'Students win National Math Olympiad', source: 'Education Times', date: 'Mar 1999', image: 'https://picsum.photos/id/433/400/300' }
    ]
  },
  {
    id: 'K15',
    years: '2000 - 2003',
    majorId: 'CHEM',
    heroImage: 'https://picsum.photos/id/4/1200/600',
    description: 'The digital pioneers. K15 was the first cohort to have fully equipped computer labs and internet access, sparking the tech wave.',
    location: 'Modern Campus B',
    stats: { students: 400, classes: 10 },
    principal: {
        id: 'h4', name: 'Mr. Pham Quoc Hung', role: 'Principal', image: 'https://picsum.photos/id/1062/200/200',
        bio: 'Principal during the modernization era.'
    },
    keyFigures: [
      {
        id: 'h5', name: 'Dang Minh Tuan', role: 'Notable Alumnus', image: 'https://picsum.photos/id/1012/200/200',
        bio: 'Now CEO of a leading Tech startup.'
      }
    ],
    classes: [
        {
            id: '12A',
            name: '12A',
            fullName: '12A - Advanced Chemistry',
            major: 'Chemistry',
            studentCount: 42,
            image: 'https://picsum.photos/id/1015/600/400',
            achievements: ['Won School Football Cup 2002', '100% University Acceptance', 'Gold Medal City Science Fair'],
            formTeacher: {
                id: 'ft1', name: 'Mrs. Nguyen Thi Lan', role: 'Homeroom Teacher', image: 'https://picsum.photos/id/400/200/200',
                bio: 'Known for her "Iron Lady" discipline but soft heart.'
            },
            monitor: {
                id: 'm1', name: 'Tran Van Bao', role: 'Class Monitor', image: 'https://picsum.photos/id/401/200/200',
                bio: 'Currently Head of Research at VinMec.'
            }
        },
        {
            id: '12B',
            name: '12B',
            fullName: '12B - Applied Chemistry',
            major: 'Chemistry',
            studentCount: 38,
            image: 'https://picsum.photos/id/1025/600/400',
            achievements: ['Best Performance Arts 2003', 'Charity Fundraiser Record'],
            formTeacher: {
                id: 'ft2', name: 'Mr. Le Van Son', role: 'Homeroom Teacher', image: 'https://picsum.photos/id/402/200/200',
                bio: 'Always played guitar for the class during breaks.'
            },
            monitor: {
                id: 'm2', name: 'Pham Thi Huong', role: 'Class Monitor', image: 'https://picsum.photos/id/403/200/200',
                bio: 'Owner of a successful bakery chain.'
            }
        },
        {
            id: '12C',
            name: '12C',
            fullName: '12C - General Science',
            major: 'General',
            studentCount: 40,
            image: 'https://picsum.photos/id/1035/600/400',
            achievements: [],
            formTeacher: {
                id: 'ft3', name: 'Mrs. Hoang Anh', role: 'Homeroom Teacher', image: 'https://picsum.photos/id/404/200/200',
                bio: 'Mathematics teacher.'
            },
            monitor: {
                id: 'm3', name: 'Vu Tuan', role: 'Class Monitor', image: 'https://picsum.photos/id/405/200/200',
                bio: 'Architect.'
            }
        }
    ],
    press: [
       { id: 'pr3', title: 'First Computer Lab Inauguration', source: 'Tech Weekly', date: 'Nov 2001', image: 'https://picsum.photos/id/0/400/300' },
       { id: 'pr4', title: 'Robotics Team takes Gold', source: 'Youth Newspaper', date: 'May 2002', image: 'https://picsum.photos/id/3/400/300' }
    ]
  },
  {
    id: 'K20',
    years: '2005 - 2008',
    majorId: 'CHEM',
    heroImage: 'https://picsum.photos/id/10/1200/600',
    description: 'Expanding horizons. K20 focused on international integration and arts.',
    location: 'Modern Campus B',
    stats: { students: 450, classes: 12 },
    principal: {
        id: 'h6', name: 'Mr. Pham Quoc Hung', role: 'Principal', image: 'https://picsum.photos/id/1062/200/200',
        bio: 'Principal.'
    },
    keyFigures: [],
    classes: [],
    press: []
  }
];
