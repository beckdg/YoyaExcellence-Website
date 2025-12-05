import React, { useState } from "react";
import { Upload, CheckCircle, Send } from "lucide-react";
import { mockService } from "@/services/mockService";
import { useNavigate } from "react-router-dom";

const TutorApplication: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phone: "",
    location: "",
    subjects: "",
    educationalCategory: [] as string[],
    experience: "",
    bio: "",
    monthlyRate: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => {
      const alreadySelected = prev.educationalCategory.includes(value);

      return {
        ...prev,
        educationalCategory: alreadySelected
          ? prev.educationalCategory.filter((item) => item !== value)
          : [...prev.educationalCategory, value],
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      userId: "current_user_id",
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      phone: "+251" + formData.phone,
      location: formData.location,
      subjects: formData.subjects,
      educationalCategory: formData.educationalCategory,
      experience: formData.experience,
      bio: formData.bio,
      monthlyRate: Number(formData.monthlyRate),
    };

    await mockService.submitApplication(payload);

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Application Received
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Thank you for applying! We’ll review your details and notify you.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full inline-flex justify-center px-4 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Apply to Teach
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Share your knowledge and earn money. Fill out the form below.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="As it appears on your Legal Doc."
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />
              </div>

              {/* Phone Number + Code */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>

                <div className="flex mt-1">
                  <span className="flex items-center gap-1 px-4 py-3 rounded-l-xl border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white">
                    +251
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="9XXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-r-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location (City)
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="City, State"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />
              </div>

              {/* Monthly Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Monthly Rate (ETB)
                </label>
                <input
                  type="number"
                  name="monthlyRate"
                  required
                  value={formData.monthlyRate}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />
              </div>
            </div>

            {/* Educational Category (Multi-select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Educational Category (Select one or more)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["KG", "Grade 1-4", "Grade 5-8", "Grade 9-12", "College"].map(
                  (level) => (
                    <label
                      key={level}
                      className="flex items-center space-x-3 p-2 border rounded-md cursor-pointer dark:border-gray-600"
                    >
                      <input
                        type="checkbox"
                        value={level}
                        checked={formData.educationalCategory.includes(level)}
                        onChange={handleMultiSelect}
                        className="h-4 w-4 rounded-full border-gray-400 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {level}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subjects Taught
              </label>
              <input
                type="text"
                name="subjects"
                required
                placeholder="e.g. Math, Physics..."
                value={formData.subjects}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Experience
              </label>
              <textarea
                name="experience"
                rows={2}
                required
                value={formData.experience}
                onChange={handleChange}
                className="block w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                required
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
              />
            </div>

            {/* File Upload */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Documents
              </h3>

              <div className="border-2 border-dashed p-6 rounded-lg text-center bg-gray-50 dark:bg-gray-700/50">
                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                <label className="cursor-pointer text-primary-600 font-medium">
                  <span>Upload Certificates / Resume</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, JPG up to 10MB
                </p>
              </div>

              {file && (
                <div className="flex items-center text-green-600 mt-2">
                  <CheckCircle size={16} className="mr-2" />
                  {file.name}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorApplication;
