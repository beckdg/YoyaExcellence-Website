import { MOCK_TUTORS, MOCK_APPLICATIONS } from '../constants';
import { Tutor, TutorApplication } from '../types';

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

  submitApplication: async (application: Omit<TutorApplication, 'id' | 'status' | 'submittedAt'>): Promise<boolean> => {
    await delay(1000);
    console.log('Application submitted to Firebase:', application);
    return true;
  },

  getApplications: async (): Promise<TutorApplication[]> => {
    await delay(600);
    return [...MOCK_APPLICATIONS];
  },

  updateApplicationStatus: async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
    await delay(400);
    console.log(`Application ${id} status updated to ${status}`);
  },

  submitRating: async (tutorId: string, rating: number, comment: string): Promise<void> => {
    await delay(800);
    console.log(`Rated tutor ${tutorId}: ${rating} stars. Comment: ${comment}`);
  }
};
