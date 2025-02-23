import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import io from 'socket.io-client';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to notification server');
    });

    newSocket.on('newFoodDonation', (data) => {
      console.log('Received new food donation:', data);
      if (data.foodDetails) {
        addNotification(data.foodDetails);
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Cleanup on component unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const addNotification = (foodDetails) => {
    const newNotification = {
      id: Date.now(),
      title: 'New Food Donation',
      message: `${foodDetails.noOfDishes} dishes of ${foodDetails.foodType} available in ${foodDetails.City}`,
      timestamp: new Date(),
      details: foodDetails
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Optional: Show browser notification
    if (Notification.permission === 'granted') {
      new Notification('New Food Donation', {
        body: newNotification.message
      });
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-emerald-600 hover:text-emerald-900 transition-colors"
      >
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 max-h-[32rem] overflow-y-auto bg-white rounded-lg shadow-xl border border-emerald-100 z-50">
          <div className="p-4 border-b border-emerald-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-emerald-900">Notifications</h3>
              <button
                onClick={() => setNotifications([])}
                className="text-sm text-emerald-600 hover:text-emerald-900"
              >
                Clear all
              </button>
            </div>
          </div>

          <div className="p-2">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No new notifications</p>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="mb-3 p-4 relative bg-emerald-50 rounded-lg border border-emerald-200 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-emerald-900 mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-emerald-700 text-sm">
                        {notification.message}
                      </p>
                      <div className="text-xs text-emerald-500 mt-2">
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-emerald-500 hover:text-emerald-700 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;