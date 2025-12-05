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
  educationalCategory: EducationalCetagory[];
}

export interface TutorApplication {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  phone: string;
  location: string;
  subjects: string;
  educationalCategory: EducationalCetagory[];
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

export type EducationalCetagory =
  | "KG"
  | "Grade 1-4"
  | "Grade 5-8"
  | "Grade 9-12"
  | "College";
