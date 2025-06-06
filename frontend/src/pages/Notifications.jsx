import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { BadgeCheck, Circle, Trash2 } from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";

import { Select } from "../components/ui/SortSelect";

export default function Notifications() {
    console.log("Notifications mounted")

  const [activeSection, setActiveSection] = useState("unread");

  const {data, isError, isLoading} = useNotifications()

  const [sortValue, setSortValue] = useState("name_asc");

  
  const sortOptions = [
    { value: "name_asc", label: "Name (A-Z)" },
    { value: "name_desc", label: "Name (Z-A)" },
    { value: "date_created", label: "Date Created" },
  ];


  const handleDelete = (id) => {
    console.log("Delete notification with ID:", id);
    
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!data) return <div>No data available</div>;
    
  const filteredNotifications = data.filter((n) =>
    activeSection === "unread" ? !n.read : n.read
  );

  return (
    <div className="max-w-7xl mx-auto p-6">

         <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              <Select
                value={sortValue}
                onValueChange={setSortValue}
                options={sortOptions}
                placeholder="Sort by..."
              />
            </div>
      
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveSection("unread")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${
            activeSection === "unread"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Unread ({data.filter((n) => !n.read).length})
        </button>
        <button
          onClick={() => setActiveSection("read")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${
            activeSection === "read"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Read ({data.filter((n) => n.read).length})
        </button>
      </div>

      
      {filteredNotifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No notifications.</p>
      ) : (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex flex-col sm:flex-row items-start p-4 rounded-2xl shadow-md border w-full sm:w-[48%] lg:w-[32%] ${
                notification.read
                  ? "bg-white"
                  : "bg-gradient-to-r from-blue-50 to-blue-100"
              }`}
            >
              <div className="mr-3">
                {notification.read ? (
                  <BadgeCheck className="text-green-500 w-5 h-5 mt-1" />
                ) : (
                  <Circle className="text-blue-500 w-5 h-5 mt-1" />
                )}
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  {notification.title}
                </h4>
                <p className="text-gray-600 text-sm">{notification.message}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {formatDistanceToNow(new Date(notification.send_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>

              <button
                onClick={() => handleDelete(notification.id)}
                className="ml-auto text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
