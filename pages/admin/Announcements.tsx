import React, { useState } from "react";
import { Megaphone, Send } from "lucide-react";
import { mockService } from "../../services/mockService";

const AdminAnnouncements: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    targetAudience: "all" as "all" | "tutors" | "students",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mockService.sendAnnouncement(formData);
    setFormData({ subject: "", message: "", targetAudience: "all" });
    alert("Announcement sent successfully!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
        <Megaphone className="mr-3" /> Send Announcements
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Audience
            </label>
            <select
              value={formData.targetAudience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetAudience: e.target.value as any,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm p-2 border"
            >
              <option value="all">All Users</option>
              <option value="tutors">Tutors Only</option>
              <option value="students">Students Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm p-2 border"
              placeholder="Important update..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm p-2 border"
              placeholder="Type your announcement here..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <Send size={16} className="mr-2" />
              Send Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
