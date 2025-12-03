import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  DollarSign,
  Award,
  Clock,
  CheckCircle,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Tutor } from "../types";
import { mockService } from "../services/mockService";
import RatingModal from "../components/RatingModal";

const TutorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await mockService.getTutorById(id);
      if (data) setTutor(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleContactRequest = () => {
    // Mock functionality
    alert(`Request sent to ${tutor?.name}! They will contact you shortly.`);
  };

  const handleRateSubmit = async (rating: number, comment: string) => {
    if (tutor) {
      await mockService.submitRating(tutor.id, rating, comment);
      alert("Review submitted successfully!");
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading profile...</div>;
  if (!tutor) return <div className="p-10 text-center">Tutor not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Search
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-primary-500 to-blue-600"></div>

          <div className="px-8 pb-8">
            <div className="relative flex flex-col sm:flex-row items-start sm:items-end -mt-12 mb-6">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-md object-cover"
              />
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                      {tutor.name}
                      {tutor.isVerified && (
                        <CheckCircle
                          size={24}
                          className="ml-2 text-blue-500"
                          title="Verified"
                        />
                      )}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <MapPin size={16} className="mr-1" /> {tutor.location}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                    <div className="flex items-center text-yellow-500 font-bold text-xl">
                      <Star fill="currentColor" size={24} className="mr-1" />
                      {tutor.rating}
                    </div>
                    <span className="text-sm text-gray-400">
                      {tutor.reviewCount} Reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    About Me
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {tutor.bio}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Experience
                  </h2>
                  <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <Award className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {tutor.experience}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Subjects
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Reviews Preview (Static Mock) */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Recent Reviews
                  </h2>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                      <div className="flex items-center mb-1">
                        <div className="flex text-yellow-400">
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        "Excellent tutor! Really helped my son understand
                        Calculus concepts."
                      </p>
                      <p className="text-xs text-gray-500 mt-1">- Parent</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsRatingModalOpen(true)}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Write a Review
                  </button>
                </section>
              </div>

              {/* Sidebar Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 sticky top-24">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-gray-500 dark:text-gray-400">
                      Monthly Rate
                    </span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                      <DollarSign className="w-6 h-6" />
                      {tutor.monthlyRate}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="w-5 h-5 mr-3 text-gray-400" />
                      <span>Response time: &lt; 2 hrs</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                      <span>Background Check Cleared</span>
                    </div>
                  </div>

                  <button
                    onClick={handleContactRequest}
                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-md transition-all duration-200"
                  >
                    <Mail className="mr-2 h-5 w-5" /> Request Contact
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    No charge until you book your first lesson.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onSubmit={handleRateSubmit}
        tutorName={tutor.name}
      />
    </div>
  );
};

export default TutorDetails;
