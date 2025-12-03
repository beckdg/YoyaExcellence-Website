import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, CheckCircle, Star } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/tutors?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-50 dark:bg-gray-900 py-20 lg:py-32 overflow-hidden transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Hire Any Tutor from the{" "}
              <span className="text-primary-600">Comfort of Home</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Connect with top-rated tutors for personalized 1-on-1 learning.
              Boost your grades, learn a new language, or master a skill.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mb-10"
            >
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-4 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="What do you want to learn? (e.g. Math, Computer)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Find Tutors
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />{" "}
                Verified Tutors
              </span>
              <span className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" /> Secure
                Payments
              </span>
              <span className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />{" "}
                Satisfaction Guaranteed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                10k+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Active Students
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                500+
              </div>
              <div className="text-gray-600 dark:text-gray-300">Subjects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                4.8/5
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Average Rating
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-16 text-center md:text-left md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white mb-4">
                  Are you an expert in your field?
                </h2>
                <p className="text-primary-100 text-lg max-w-xl">
                  Join our community of tutors, set your own schedule, and earn
                  money by sharing your knowledge.
                </p>
              </div>
              <div className="mt-8 md:mt-0 md:ml-8">
                <button
                  onClick={() => navigate("/apply")}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:text-lg transition-colors"
                >
                  Apply to Teach <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
