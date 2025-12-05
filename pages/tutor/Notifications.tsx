import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockService';
import { Notification } from '../../types';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

const TutorNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    mockService.getNotifications().then(setNotifications);
  }, []);

  const getIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle className="text-green-500" />;
      case 'warning': return <AlertCircle className="text-yellow-500" />;
      case 'error': return <AlertCircle className="text-red-500" />;
      default: return <Info className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
        <Bell className="mr-3" /> Notifications
      </h1>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.map(notif => (
            <div key={notif.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notif.type)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`text-sm font-medium ${!notif.read ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-900 dark:text-gray-200'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{notif.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorNotifications;