// import React, { useState, useEffect } from "react";
// import { Bell, X } from "lucide-react";
// import axios from "axios"; 

// export const NotificationItem = ({  message, timestamp }) => {

//   return (
//     <div className="border-b border-gray-200 p-3 hover:bg-gray-100 transition">
//     <p className="text-sm text-gray-800">{message}</p>
//     <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
//   </div>
//   );
// };

// export const NotificationContainer = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     async function fetchNotifications() {
//       try {
//         const res = await axios.get('http://localhost:3000/api/donors/getnotification');
//         setNotifications(res.data.notifications || []);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     }

//     fetchNotifications();
//   }, []);

//   return (
//     <div className="fixed top-4 right-6 z-50">
//       <div className="relative">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="relative bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
//         >
//           <Bell className="w-6 h-6 text-green-500" />
//           {notifications.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//               {notifications.length}
//             </span>
//           )}
//         </button>

//         {isOpen && (
//           <div className="mt-2 w-80 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
//             <div className="p-4 border-b font-semibold text-gray-800">Notifications</div>
//             {notifications.length === 0 ? (
//               <div className="p-4 text-gray-500 text-sm">No notifications</div>
//             ) : (
//               notifications.map((notification) => (
//                 <NotificationItem
//                   key={notification.id}
//                   message={notification.message}
//                   timestamp={new Date(notification.timestamp).toLocaleString()}
//                 />
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import axios from "axios";

export const NotificationItem = ({ message, timestamp }) => {
  return (
    <div className="border-b border-gray-200 p-3 hover:bg-gray-100 transition">
      <p className="text-sm text-gray-800">{message}</p>
      <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
    </div>
  );
};

export const NotificationContainer = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await axios.get('http://localhost:3000/api/donors/getnotification');
        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <div className="fixed top-4 right-6 z-50">
      <div className="relative">
        {/* Bell Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <Bell className="w-6 h-6 text-green-500" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
            <div className="p-4 border-b font-semibold text-gray-800">Notifications</div>
            {notifications.length === 0 ? (
              <div className="p-4 text-gray-500 text-sm">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  message={notification.message}
                  timestamp={new Date(notification.timestamp).toLocaleString()}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
