import { useState } from "react";
import { format } from "date-fns";
import { Trash2, User, Edit3, PlusCircle, AlertTriangle } from "lucide-react";
import { Select } from "../components/ui/SortSelect";
import { useAuditLogs } from "../hooks/useAuditLogs";
import Loader from "../components/Loader"
import { NoData } from "../components/NoData";
import {ErrorMessage} from "../components/ErrorMessage"


export default function AuditLogs() {
  const { data, isError, isLoading } = useAuditLogs();
  const [sortValue, setSortValue] = useState("newest");

 
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "user_asc", label: "User (A-Z)" },
  ];

  const eventTypeIcons = {
    created: <PlusCircle className="text-green-500 w-5 h-5" />,
    updated: <Edit3 className="text-blue-500 w-5 h-5" />,
    deleted: <Trash2 className="text-red-500 w-5 h-5" />,
    error: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
    login: <User className="text-purple-500 w-5 h-5" />,
  };


  if (isLoading) return < Loader/>;
  if (isError) return <ErrorMessage/>;
  if (!data?.length) return <NoData/>;


  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Audit Logs</h2>
        <Select value={sortValue} onValueChange={setSortValue} options={sortOptions} placeholder="Sort by" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-3 p-4 rounded-2xl border shadow-sm bg-white hover:shadow-md transition"
          >
            <div>{eventTypeIcons[log.event_type] || <AlertTriangle className="text-gray-400 w-5 h-5" />}</div>

            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{log.action}</h4>
              <p className="text-sm text-gray-600">
                By <span className="font-medium">{log.user}</span> on{" "}
                <span className="text-gray-500">{  format(new Date(log.created_at), "PPPpp")}</span>
              </p>
              {log.details && <p className="text-xs text-gray-500 mt-1">{log.details}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
