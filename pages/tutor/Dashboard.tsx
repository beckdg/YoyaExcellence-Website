import React, { useEffect, useState } from "react";
import { DollarSign, Users, Clock, Star } from "lucide-react";
import { TutorStats } from "../../types";
import { mockService } from "../../services/mockService";

const TutorDashboard: React.FC = () => {
  const [stats, setStats] = useState<TutorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await mockService.getTutorStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading)
    return <div className="p-4 dark:text-white">Loading stats...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Earnings
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                Br. {stats?.totalEarnings}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Students
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats?.activeStudents}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Hours Taught
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats?.hoursTaught}h
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
              <Clock size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Rating
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats?.rating}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400">
              <Star size={24} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for Recent Activity Chart or List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">
          Activity Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
