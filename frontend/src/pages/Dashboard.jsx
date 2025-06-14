import React, { useEffect, useState } from "react";
import { FaUsers, FaCreditCard, FaBell, FaClipboardList } from "react-icons/fa";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setUsers([
      { id: 1, name: "Ayaan Malik", joinedAt: "2025-06-06" },
      { id: 2, name: "Hira Qureshi", joinedAt: "2025-06-07" },
      { id: 3, name: "Zayan Shah", joinedAt: "2025-06-08" },
      { id: 4, name: "Sara Khan", joinedAt: "2025-06-09" }
    ]);

    setPlans([
      { id: 1, name: "Starter", subscribers: 120 },
      { id: 2, name: "Pro", subscribers: 60 },
      { id: 3, name: "Enterprise", subscribers: 20 }
    ]);

    setNotifications([
      { id: 1, message: "Payment failed: Zayan", type: "error" },
      { id: 2, message: "New signup: Hira", type: "success" },
      { id: 3, message: "Your subscription renews soon", type: "info" }
    ]);

    setLogs([
      { id: 1, action: "Login", by: "Ayaan", createdAt: "2025-06-12" },
      { id: 2, action: "Updated Plan", by: "Zayan", createdAt: "2025-06-11" },
      { id: 3, action: "Deleted User", by: "Ayaan", createdAt: "2025-06-10" }
    ]);
  }, []);

  const planColors = ["#4F46E5", "#10B981", "#F59E0B"];

  const subscribersPerPlan = plans.map((p, i) => ({
    name: p.name,
    value: p.subscribers,
    color: planColors[i]
  }));

  const auditActions = [
    { type: "Login", count: 30 },
    { type: "Update", count: 12 },
    { type: "Delete", count: 5 }
  ];

  const userGrowth = [
    { day: "Jun 6", count: 5 },
    { day: "Jun 7", count: 8 },
    { day: "Jun 8", count: 14 },
    { day: "Jun 9", count: 20 },
    { day: "Jun 10", count: 26 },
    { day: "Jun 11", count: 32 }
  ];

  const totalSubscribers = plans.reduce((acc, p) => acc + p.subscribers, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard label="Total Users" value={users.length} icon={<FaUsers />} color="blue" />
        <KpiCard label="Subscribers" value={totalSubscribers} icon={<FaCreditCard />} color="green" />
        <KpiCard label="Unread Errors" value={notifications.filter(n => n.type === "error").length} icon={<FaBell />} color="red" />
        <KpiCard label="Churn Rate" value="2.5%" icon={<FaClipboardList />} color="purple" />
        <KpiCard label="MRR" value="$3800" icon={<FaCreditCard />} color="yellow" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow h-64">
          <h3 className="text-sm font-semibold mb-2">User Growth</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={userGrowth}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow h-64">
          <h3 className="text-sm font-semibold mb-2">Subscribers per Plan</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={subscribersPerPlan}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {subscribersPerPlan.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow h-64">
          <h3 className="text-sm font-semibold mb-2">Audit Log Actions</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={auditActions}>
              <XAxis dataKey="type" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ label, value, icon, color }) => (
  <div className="bg-white flex items-center gap-4 p-4 rounded-xl shadow">
    <div className={`text-2xl p-3 rounded-full bg-${color}-100 text-${color}-600`}>{icon}</div>
    <div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  </div>
);

export default Dashboard;
