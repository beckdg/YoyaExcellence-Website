import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Filter, MapPin, Star, DollarSign } from "lucide-react";
import { Tutor } from "../types";
import { mockService } from "../services/mockService";
import { SUBJECTS_LIST } from "../constants";
import { Direction, Range } from "react-range";

const TutorList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false); // Mobile toggle

  // Filters state
  const [subjectFilter, setSubjectFilter] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    // Parse query params for initial search
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSubjectFilter(search);
    }

    const fetchTutors = async () => {
      setLoading(true);
      try {
        const data = await mockService.getTutors();
        setTutors(data);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, [location.search]);

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSubject =
      subjectFilter === "" ||
      tutor.subjects.some((s) =>
        s.toLowerCase().includes(subjectFilter.toLowerCase())
      ) ||
      tutor.name.toLowerCase().includes(subjectFilter.toLowerCase());

    const matchesPrice =
      tutor.monthlyRate >= priceRange[0] && tutor.monthlyRate <= priceRange[1];
    const matchesRating = tutor.rating >= ratingFilter;

    return matchesSubject && matchesPrice && matchesRating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div
          className={`md:w-64 flex-shrink-0 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              <Filter size={20} className="mr-2" /> Filters
            </h2>

            <div className="space-y-6">
              {/* Subject Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject or Name
                </label>
                <input
                  type="text"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  placeholder="Math, Science..."
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-primary-500 focus:border-primary-500 dark:text-white"
                />
              </div>

              {/* The filter Range */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {" "}
                  Price: Br {priceRange[0]} - Br {priceRange[1]}/month{" "}
                </label>
                <Range
                  step={50}
                  min={0}
                  max={5000}
                  values={priceRange}
                  onChange={(values) => setPriceRange(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-2 bg-gray-200 rounded-md dark:bg-gray-700"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      className="h-4 w-4 bg-primary-600 rounded-full cursor-pointer"
                    />
                  )}
                  label={""}
                  labelledBy={""}
                  direction={Direction.Right}
                  allowOverlap={false}
                  draggableTrack={false}
                  disabled={false}
                  rtl={false}
                />
              </div>
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Rating
                </label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-primary-500 focus:border-primary-500 dark:text-white"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
              {/* Popular Subjects Pills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Popular
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS_LIST.slice(0, 5).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSubjectFilter(sub)}
                      className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Available Tutors{" "}
              <span className="text-gray-500 text-lg font-normal">
                ({filteredTutors.length})
              </span>
            </h1>
            <button
              className="md:hidden px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : filteredTutors.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No tutors found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSubjectFilter("");
                  setRatingFilter(0);
                  setPriceRange([0, 5000]);
                }}
                className="mt-4 text-primary-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  onClick={() => navigate(`/tutors/${tutor.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <img
                          src={tutor.avatar}
                          alt={tutor.name}
                          className="h-14 w-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                            {tutor.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <MapPin size={14} className="mr-1" />{" "}
                            {tutor.location}
                          </p>
                        </div>
                      </div>
                      {/* monthly rate and star rating  */}
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-mid text-gray-900 dark:text-white flex items-center">
                          Br {tutor.monthlyRate}
                        </span>
                        <span className="text-xs font-normal text-gray-500 ml-1">
                          /month
                        </span>
                        <div className="flex items-center mt-1 text-yellow-500 text-sm font-medium">
                          <Star
                            size={14}
                            fill="currentColor"
                            className="mr-1"
                          />
                          {tutor.rating}{" "}
                          <span className="text-gray-400 ml-1 text-xs">
                            ({tutor.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio of the tutor */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {tutor.bio}
                      </p>
                    </div>

                    {/* List of Educational Level Catagories */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tutor.educationalCatagory.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                      {tutor.educationalCatagory.length > 3 && (
                        <span className="text-xs text-gray-500 self-center">
                          +{tutor.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                    {/* List of Subjects */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tutor.subjects.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-gray-900 dark:text-primary-200"
                        >
                          {sub}
                        </span>
                      ))}
                      {tutor.subjects.length > 3 && (
                        <span className="text-xs text-gray-500 self-center">
                          +{tutor.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {tutor.isVerified ? "Verified Tutor" : ""}
                    </span>
                    <span className="text-sm font-medium text-primary-600 group-hover:underline">
                      View Profile
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorList;
