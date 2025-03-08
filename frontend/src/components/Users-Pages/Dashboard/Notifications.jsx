import React, { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";


export const NotificationItem = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsVisible(false);
        setTimeout(() => onClose(), 300);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        bg-white rounded-lg shadow-lg p-4 mb-2 relative overflow-hidden
        transform transition-all duration-300 ease-in-out
        ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Bell className="w-5 h-5 text-blue-500 mt-1" />
          <div>
            <p className="text-gray-800 font-medium">New Notification</p>
            <p className="text-gray-600 text-sm mt-1">{message}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(), 300);
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const NotificationContainer = ({
  notifications,
  onNotificationClose,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-96 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          message={notification}
          onClose={() => onNotificationClose(notification.id)}
        />
      ))}
    </div>
  );
};
