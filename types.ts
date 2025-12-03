export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  avatar?: string;
}

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  monthlyRate: number;
  location: string;
  bio: string;
  experience: string;
  isVerified: boolean;
}

export interface TutorApplication {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  phone: string;
  location: string;
  subjects: string; // comma separated for form simplicity
  experience: string;
  bio: string;
  monthlyRate: number;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export interface FilterState {
  subject: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  location: string;
}
