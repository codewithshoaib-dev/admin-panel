import React from "react";
import { FaUsers, FaCreditCard, FaBell, FaClipboardList } from "react-icons/fa";
import { useUsers } from "../hooks/useUsers";
import { useSubscriptionPlans } from "../hooks/UseSubscriptionsPlans";
import { useNotifications } from "../hooks/useNotifications";
import { useAuditLogs } from "../hooks/useAuditLogs";

const Dashboard = () => {
  

  const { data = [] } = useUsers();
  const { plans = [] } = useSubscriptionPlans();
  const { notifications = [] } = useNotifications();
  const { logs = [] } = useAuditLogs();




  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          icon={<FaUsers className="text-blue-500" />}
          label="Users"
          value={data.length}
        />
        <SummaryCard
          icon={<FaCreditCard className="text-green-500" />}
          label="Plans"
          value={plans.length}
        />
        <SummaryCard
          icon={<FaBell className="text-yellow-500" />}
          label="Notifications"
          value={notifications.length}
        />
        <SummaryCard
          icon={<FaClipboardList className="text-purple-500" />}
          label="Audit Logs"
          value={logs.length}
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Table */}
        <div className="bg-white rounded-xl shadow p-4 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left font-medium">Name</th>
                  <th className="py-2 px-3 text-left font-medium">Email</th>
                  <th className="py-2 px-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0">
                    <td className="py-2 px-3">{user.name}</td>
                    <td className="py-2 px-3">{user.email}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold
                        ${
                          user.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
          <ul className="space-y-3">
            {notifications.slice(0, 5).map((n) => (
              <li key={n.id} className="flex items-start gap-2">
                <FaBell className="mt-1 text-yellow-400" />
                <div>
                  <div className="text-sm">{n.message}</div>
                  <div className="text-xs text-gray-400">
                    {n.created_at &&
                      new Date(n.created_at).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
            {notifications.length === 0 && (
              <li className="text-gray-400 text-sm">No notifications.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

function SummaryCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
      <div className="text-3xl bg-gray-100 rounded-full p-3">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export default Dashboard;
