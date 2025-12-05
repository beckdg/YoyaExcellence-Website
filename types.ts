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

export interface TutorStats {
  totalEarnings: number;
  activeStudents: number;
  hoursTaught: number;
  rating: number;
}
export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}
export interface Announcement {
  id: string;
  subject: string;
  message: string;
  targetAudience: "all" | "tutors" | "students";
  sentAt: string;
}
