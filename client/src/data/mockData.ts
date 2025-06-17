import { College, Confession, Comment } from '../types';
import { Heart, MoreHorizontal, Send, Book, Coffee, Music, Flame, Gamepad2 } from 'lucide-react';

// Mock data for colleges
export const colleges: College[] = [
  {
    id: 'ldce',
    name: 'LD College of Engineering',
    logo: 'https://miro.medium.com/v2/resize:fit:3200/1*lAAex5vgV0ptPfdJopy12A.jpeg',
    location: 'Ahmedabad, Gujarat',
    bannerImage: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    confessionCount: 142,
  },
  {
    id: 'sal',
    name: 'SAL Institute',
    logo: 'https://www.admissionwala.in/storage/productimages/seti_home-1.png',
    location: 'Ahmedabad, Gujarat',
    bannerImage: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    confessionCount: 87,
  },
  // {
  //   id: 'nirma',
  //   name: 'Nirma University',
  //   logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
  //   location: 'Ahmedabad, Gujarat',
  //   bannerImage: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg',
  //   confessionCount: 198,
  // },
  {
    id: 'gu',
    name: 'Gujarat University',
    logo: 'https://static.gujaratsamachar.com/content_image/content_image_1bb6eadc-d08a-4631-9fcb-3dab6716e149.jpeg',
    location: 'Ahmedabad, Gujarat',
    bannerImage: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg',
    confessionCount: 156,
  },
  // {
  //   id: 'daiict',
  //   name: 'Dhirubhai Ambani Institute of Information and Communication Technology',
  //   logo: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
  //   location: 'Gandhinagar (near Ahmedabad), Gujarat',
  //   bannerImage: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
  //   confessionCount: 103,
  // },
  // {
  //   id: 'indus',
  //   name: 'Indus University',
  //   logo: 'https://images.pexels.com/photos/459653/pexels-photo-459653.jpeg',
  //   location: 'Ahmedabad, Gujarat',
  //   bannerImage: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
  //   confessionCount: 74,
  // },
  // {
  //   id: 'silveroak',
  //   name: 'Silver Oak University',
  //   logo: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
  //   location: 'Ahmedabad, Gujarat',
  //   bannerImage: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
  //   confessionCount: 93,
  // },
  // {
  //   id: 'ganpat',
  //   name: 'Ganpat University',
  //   logo: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
  //   location: 'Mehsana (near Ahmedabad), Gujarat',
  //   bannerImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
  //   confessionCount: 61,
  // },
  // {
  //   id: 'au',
  //   name: 'Ahmedabad University',
  //   logo: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
  //   location: 'Ahmedabad, Gujarat',
  //   bannerImage: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
  //   confessionCount: 45,
  // },
  // {
  //   id: 'itm',
  //   name: 'ITM Vocational University',
  //   logo: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
  //   location: 'Ahmedabad, Gujarat',
  //   bannerImage: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg',
  //   confessionCount: 30,
  // },
];


// Mock data for confessions
export const confessions: Confession[] = [
  {
    id: '1',
    text: "I've had a crush on someone in my Algorithms class for the entire semester but I'm too shy to say anything. Every time they explain a concept, I fall a little more. 🙈",
    createdAt: '2023-05-15T10:30:00Z',
    author: {
      id: 'user1',
      isAnonymous: true,
    },
    likes: 48,
    comments: 12,
    tags: ['crush', 'cs'],
    collegeId: 'ldce',
  },
  {
    id: '2',
    text: "Failed my calculus midterm because I was up all night playing the new Zelda game. No regrets, but my GPA definitely has some. Worth it though! 🎮",
    createdAt: '2023-05-14T14:20:00Z',
    author: {
      id: 'user2',
      handle: 'gamer123',
      isAnonymous: false,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    likes: 102,
    comments: 24,
    tags: ['gaming', 'fail'],
    collegeId: 'ldce',
  },
  {
    id: '3',
    text: "Someone keeps stealing my food from the communal fridge in our hostel. If you're reading this, I've put ghost pepper sauce in my next meal. Good luck! 🔥",
    createdAt: '2023-05-13T09:15:00Z',
    author: {
      id: 'user3',
      isAnonymous: true,
    },
    likes: 75,
    comments: 18,
    tags: ['hostel', 'revenge'],
    collegeId: 'ldce',
  },
  {
    id: '4',
    text: "The campus coffee shop barista knows my order by heart and it's the highlight of my day. I think I'm in love with them? Or maybe just caffeine dependent? Both? ☕️",
    createdAt: '2023-05-12T16:45:00Z',
    author: {
      id: 'user4',
      isAnonymous: true,
    },
    likes: 63,
    comments: 15,
    tags: ['coffee', 'crush'],
    collegeId: 'ldce',
  },
  {
    id: '5',
    text: "Accidentally called my professor 'mom' during a zoom class today. I think I need to transfer universities and change my identity. 😭",
    createdAt: '2023-05-11T11:30:00Z',
    author: {
      id: 'user5',
      handle: 'embarassedforlife',
      isAnonymous: false,
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    likes: 214,
    comments: 42,
    tags: ['embarrassing', 'online'],
    collegeId: 'ldce',
  },
  {
    id: '6',
    text: "I pretend to be busy on my laptop in the library but I'm actually just watching cat videos. The secret to looking productive is typing aggressively between videos. 🐱",
    createdAt: '2023-05-10T13:20:00Z',
    author: {
      id: 'user6',
      isAnonymous: true,
    },
    likes: 89,
    comments: 21,
    tags: ['library', 'procrastination'],
    collegeId: 'iitb',
  },
  {
    id: '7',
    text: "I've been wearing the same college hoodie for 5 days straight. It's not even my hoodie - I found it in the laundry room last semester. If it's yours, I'm sorry, but it's mine now.",
    createdAt: '2023-05-09T15:40:00Z',
    author: {
      id: 'user7',
      isAnonymous: true,
    },
    likes: 67,
    comments: 14,
    tags: ['laundry', 'college'],
    collegeId: 'iitb',
  },
];

// Mock data for comments
export const comments: Comment[] = [
  {
    id: 'c1',
    text: "Just tell them! Life's too short for regrets.",
    createdAt: '2023-05-15T11:05:00Z',
    author: {
      id: 'commenter1',
      handle: 'love_guru',
      isAnonymous: false,
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    confessionId: '1',
  },
  {
    id: 'c2',
    text: "I'm in the same class and I think I know who this is about 👀",
    createdAt: '2023-05-15T11:30:00Z',
    author: {
      id: 'commenter2',
      isAnonymous: true,
    },
    confessionId: '1',
  },
  {
    id: 'c3',
    text: "Which Zelda? Tears of the Kingdom? Totally understand.",
    createdAt: '2023-05-14T14:45:00Z',
    author: {
      id: 'commenter3',
      handle: 'zelda_fan',
      isAnonymous: false,
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    confessionId: '2',
  },
];

// Helper function to get the icon component for a tag
export const getTagIcon = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'crush':
      return Heart;
    case 'coffee':
      return Coffee;
    case 'cs':
    case 'tech':
      return Book;
    case 'music':
      return Music;
    case 'gaming':
      return Gamepad2;
    case 'fail':
    case 'revenge':
      return Flame;
    default:
      return null;
  }
};