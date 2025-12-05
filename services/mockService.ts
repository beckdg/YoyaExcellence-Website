import { MOCK_TUTORS, MOCK_APPLICATIONS } from "../constants";
import {
  Announcement,
  Review,
  Tutor,
  TutorApplication,
  TutorStats,
} from "../types";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockService = {
  getTutors: async (): Promise<Tutor[]> => {
    await delay(500);
    return [...MOCK_TUTORS];
  },

  getTutorById: async (id: string): Promise<Tutor | undefined> => {
    await delay(300);
    return MOCK_TUTORS.find((t) => t.id === id);
  },

  submitApplication: async (
    application: Omit<TutorApplication, "id" | "status" | "submittedAt">
  ): Promise<boolean> => {
    await delay(1000);
    console.log("Application submitted to Firebase:", application);
    return true;
  },

  getApplications: async (): Promise<TutorApplication[]> => {
    await delay(600);
    return [...MOCK_APPLICATIONS];
  },

  updateApplicationStatus: async (
    id: string,
    status: "approved" | "rejected"
  ): Promise<void> => {
    await delay(400);
    console.log(`Application ${id} status updated to ${status}`);
  },

  submitRating: async (
    tutorId: string,
    rating: number,
    comment: string
  ): Promise<void> => {
    await delay(800);
    console.log(`Rated tutor ${tutorId}: ${rating} stars. Comment: ${comment}`);
  },

  getTutorStats: async (): Promise<TutorStats> => {
    await delay(500);
    return {
      totalEarnings: 1250,
      activeStudents: 8,
      hoursTaught: 45,
      rating: 4.8,
    };
  },

  getNotifications: async (): Promise<Notification[]> => {
    await delay(400);
    return [
      {
        id: "1",
        title: "New Booking Request",
        message: "Sarah W. wants to book a session.",
        date: "2 hours ago",
        read: false,
        type: "info",
      },
      {
        id: "2",
        title: "Payment Received",
        message: "You received $50 for your session with Mike.",
        date: "1 day ago",
        read: true,
        type: "success",
      },
      {
        id: "3",
        title: "Profile Approved",
        message: "Your tutor profile has been verified.",
        date: "3 days ago",
        read: true,
        type: "success",
      },
    ] as unknown as Notification[];
  },

  getTutorReviews: async (): Promise<Review[]> => {
    await delay(500);
    return [
      {
        id: "1",
        studentName: "Alice Johnson",
        rating: 5,
        comment: "Great explanation of calculus concepts!",
        date: "2023-10-28",
      },
      {
        id: "2",
        studentName: "Bob Smith",
        rating: 4,
        comment: "Very patient, but we had some connection issues.",
        date: "2023-10-25",
      },
    ];
  },

  updateProfile: async (data: Partial<Tutor>): Promise<void> => {
    await delay(800);
    console.log("Profile updated:", data);
  },

  // New Admin Methods
  sendAnnouncement: async (
    announcement: Omit<Announcement, "id" | "sentAt">
  ): Promise<void> => {
    await delay(600);
    console.log("Announcement sent:", announcement);
  },
};
