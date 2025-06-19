import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {  Trash2, CheckCircle2 , CircleDot} from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";

import { Select } from "../components/ui/SortSelect";

import Loader from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { NoData } from "../components/NoData";

import toast from "react-hot-toast";

import apiClient from "../configs/axios";

export default function Notifications() {
    console.log("Notifications mounted")

  const [activeSection, setActiveSection] = useState("unread");

  const [sortValue, setSortValue] = useState("-send_at");

   const {data, isError, isLoading, refetch} = useNotifications(sortValue);

  
  const sortOptions = [
    { value: "-send_at", label: "Newest" },
    { value: "send_at", label: "Oldest" },
   
  ];


  const handleDelete = async (id) => {
     
    try {

      const res = await apiClient.delete(`/notifications/${id}/`);
      toast.success("Noification deleted", { duration: 2000 });
      refetch();
    }
    catch(err){
      console.error(err)
      toast.error("Something went wrong! Please try again",  { duration: 2000 })
    }
      
      }    
  

  if (isLoading) return <Loader/>
  if (isError) return <ErrorMessage message="Error loading Notifications"/>
  if (!data) return <NoData message="No Notifications to show"/>
    
  const filteredNotifications = data.filter((n) =>
    activeSection === "unread" ? !n.read : n.read
  );

  return (
  <div className="max-w-4xl mx-auto p-6">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
      <Select
        value={sortValue}
        onValueChange={setSortValue}
        options={sortOptions}
        placeholder="Sort by..."
      />
    </div>

    <div className="flex gap-3 mb-8">
      <button
        onClick={() => setActiveSection("unread")}
        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
          activeSection === "unread"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
        }`}
      >
        Unread ({data.filter((n) => !n.read).length})
      </button>
      <button
        onClick={() => setActiveSection("read")}
        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
          activeSection === "read"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
        }`}
      >
        Read ({data.filter((n) => n.read).length})
      </button>
    </div>

    {filteredNotifications.length === 0 ? (
      <NoData message="No notifications to show" />
    ) : (
      <div className="flex flex-col space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 p-5 rounded-2xl shadow-sm border transition group ${
              notification.read
                ? "bg-white border-gray-200 hover:bg-gray-50"
                : "bg-blue-50 border-blue-100 hover:bg-blue-100"
            }`}
          >
            <div className="p-3 rounded-full bg-white border border-gray-200 group-hover:bg-gray-100 transition">
              {notification.read ? (
                <CheckCircle2 className="text-green-500 w-5 h-5" />
              ) : (
                <CircleDot className="text-blue-500 w-5 h-5" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {notification.title}
                </h4>
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(notification.send_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {notification.message}
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