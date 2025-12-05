import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockService';
import { TutorApplication } from '../../types';
import { Check, X, Eye, Users } from 'lucide-react';

const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      const data = await mockService.getApplications();
      setApplications(data);
      setLoading(false);
    };
    fetchApps();
  }, []);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    await mockService.updateApplicationStatus(id, status);
    setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, status } : app
    ));
  };

  if (loading) return <div className="p-8 text-center dark:text-white">Loading...</div>;

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Users className="mr-3" /> Tutor Applications
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Mobile View */}
            <div className="md:hidden">
                 {applications.map(app => (
                     <div key={app.id} className="p-4 border-b border-gray-200 dark:border-gray-700">
                         <div className="flex justify-between mb-2">
                             <span className="font-bold text-gray-900 dark:text-white">{app.fullName}</span>
                             <span className={`px-2 py-1 text-xs rounded-full ${
                                  app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                  app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                 {app.status.toUpperCase()}
                             </span>
                         </div>
                         <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{app.subjects}</p>
                         {app.status === 'pending' && (
                             <div className="flex space-x-2 mt-3">
                                 <button 
                                     onClick={() => handleStatusChange(app.id, 'approved')}
                                     className="flex-1 bg-green-600 text-white py-2 rounded text-sm"
                                 >Approve</button>
                                 <button 
                                    onClick={() => handleStatusChange(app.id, 'rejected')}
                                    className="flex-1 bg-red-600 text-white py-2 rounded text-sm"
                                 >Reject</button>
                             </div>
                         )}
                     </div>
                 ))}
            </div>

            {/* Desktop View */}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 hidden md:table">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subjects</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{app.fullName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{app.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">{app.subjects}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">{app.location}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        app.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" title="View Details">
                            <Eye size={18} />
                        </button>
                        {app.status === 'pending' && (
                            <>
                                <button 
                                    onClick={() => handleStatusChange(app.id, 'approved')}
                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" 
                                    title="Approve"
                                >
                                    <Check size={18} />
                                </button>
                                <button 
                                    onClick={() => handleStatusChange(app.id, 'rejected')}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" 
                                    title="Reject"
                                >
                                    <X size={18} />
                                </button>
                            </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    </div>
  );
};

export default AdminApplications;