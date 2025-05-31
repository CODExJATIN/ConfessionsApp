export interface College {
  id: string;
  name: string;
  logo: string;
  location: string;
  bannerImage?: string;
  confessionCount?: number;
}

export interface User {
  id: string;
  handle?: string;
  isAnonymous: boolean;
  avatar?: string;
}

export interface Confession {
  id: string;
  text: string;
  createdAt: string;
  author: User;
  likes: number;
  comments: number;
  tags: string[];
  collegeId: string;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  author: User;
  confessionId: string;
}