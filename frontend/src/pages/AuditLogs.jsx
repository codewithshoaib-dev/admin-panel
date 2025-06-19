import { useState } from "react";
import { format } from "date-fns";
  import { Trash2, LogIn, PencilLine, CirclePlus, AlertCircle, AlertTriangle} from "lucide-react";
import { Select } from "../components/ui/SortSelect";
import { useAuditLogs } from "../hooks/useAuditLogs";
import Loader from "../components/Loader"
import { NoData } from "../components/NoData";
import {ErrorMessage} from "../components/ErrorMessage"


export default function AuditLogs() {
  
  const [sortValue, setSortValue] = useState("-created_at");

  const { data, isError, isLoading } = useAuditLogs(sortValue);

 
  const sortOptions = [
    { value: "-created_at", label: "Newest First" },
    { value: "created_at", label: "Oldest First" },
    
  ];

const eventTypeIcons = {
  Created: <CirclePlus className="text-green-500 w-5 h-5" />,
  Updated: <PencilLine className="text-blue-500 w-5 h-5" />,
  Deleted: <Trash2 className="text-red-500 w-5 h-5" />,
  Error: <AlertCircle className="text-yellow-500 w-5 h-5" />,
  Login: <LogIn className="text-purple-500 w-5 h-5" />,
};



  if (isLoading) return < Loader/>;
  if (isError) return <ErrorMessage/>;
  if (!data?.length) return <NoData/>;


 return (
  <div className="max-w-4xl mx-auto p-6">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
      <Select
        value={sortValue}
        onValueChange={setSortValue}
        options={sortOptions}
        placeholder="Sort by"
      />
    </div>

    <div className="flex flex-col space-y-4">
      {data.map((log) => (
        <div
          key={log.id}
          className="flex items-start gap-4 p-5 rounded-2xl shadow-sm border bg-white hover:bg-gray-50 transition group"
        >
          <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition">
            {eventTypeIcons[log.action] || (
              <AlertTriangle className="text-gray-400 w-5 h-5" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold text-gray-800">
                {log.action}
              </h4>
              <span className="text-sm text-gray-500">
                {format(new Date(log.created_at), "PPPpp")}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              By <span className="font-medium">{log.user}</span>
            </p>

            {log.details && (
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {log.details}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
