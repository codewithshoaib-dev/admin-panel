import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaDollarSign, FaBell, FaChartLine } from "react-icons/fa";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

import useDashboardStatsSocket from "../hooks/useDashboardStatsSocket";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [userGrowth, setUserGrowth] = useState([]);
  const [mrrData, setMrrData] = useState([]);
  const [plans, setPlans] = useState([]);
  const [logs, setLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
 
  const stats2 = useDashboardStatsSocket("ws://localhost:8000/ws/dashboard_stats/")

  
useEffect(() => {
  if (stats2) {
    console.log("Updated stats2:", stats2)
  }
}, [stats2])

  useEffect(() => {
    setStats({
      totalUsers: 250,
      activeSubscribers: 180,
      mrr: 4800,
      newSignupsLast7Days: 22,
      churnRate: 3.2,
      unreadErrors: 5
    });

    setUserGrowth([
      { date: "Jun 6", count: 5 },
      { date: "Jun 7", count: 8 },
      { date: "Jun 8", count: 12 },
      { date: "Jun 9", count: 18 },
      { date: "Jun 10", count: 20 },
      { date: "Jun 11", count: 24 },
      { date: "Jun 12", count: 30 }
    ]);

    setMrrData([
      { month: "Jan", mrr: 3500 },
      { month: "Feb", mrr: 3700 },
      { month: "Mar", mrr: 4000 },
      { month: "Apr", mrr: 4300 },
      { month: "May", mrr: 4600 },
      { month: "Jun", mrr: 4800 }
    ]);

    setPlans([
      { name: "Starter", value: 100, growth: 10, color: "#4F46E5" },
      { name: "Pro", value: 60, growth: 25, color: "#10B981" },
      { name: "Enterprise", value: 20, growth: 5, color: "#F59E0B" }
    ]);

    setLogs([
      { id: 1, action: "Login", by: "Sara", date: "2025-06-12" },
      { id: 2, action: "Upgrade Plan", by: "Ayaan", date: "2025-06-11" },
      { id: 3, action: "Delete Account", by: "Hira", date: "2025-06-10" }
    ]);

    setNotifications([
      { id: 1, message: "Payment failed for Zayan", type: "error", date: "2025-06-12" },
      { id: 2, message: "New signup: Hira", type: "success", date: "2025-06-11" },
      { id: 3, message: "Subscription renewal due soon", type: "info", date: "2025-06-11" }
    ]);
  }, []);

  const trendingPlans = plans
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 2);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
     
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard label="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="blue" />
        <KpiCard label="Subscribers" value={stats.activeSubscribers} icon={<FaChartLine />} color="green" />
        <KpiCard label="MRR" value={`$${stats.mrr}`} icon={<FaDollarSign />} color="yellow" />
        <KpiCard label="New Signups" value={stats.newSignupsLast7Days} icon={<FaUsers />} color="purple" />
        <KpiCard label="Unread Errors" value={stats.unreadErrors} icon={<FaBell />} color="red" />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="User Growth">
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={userGrowth}>
              <XAxis dataKey="date" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Subscribers by Plan">
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={plans} dataKey="value" nameKey="name" outerRadius={80} label>
                {plans.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="MRR Trend (6m)">
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={mrrData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="mrr" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Trending Plans (Growth%)">
        <ul className="text-sm space-y-2 text-gray-700">
          {trendingPlans.map((plan, i) => (
            <li key={i} className="flex justify-between">
              <span>{plan.name}</span>
              <span className="font-semibold text-green-600">+{plan.growth}%</span>
            </li>
          ))}
        </ul>
      </Card>

     
      <Card title="Recent Notifications">
        <ul className="text-sm space-y-2 text-gray-700">
          {notifications.map((n) => (
            <li key={n.id} className={`flex justify-between items-center`}>
              <span>
                <span className={`font-medium text-${n.type === "error" ? "red" : n.type === "success" ? "green" : "blue"}-600`}>
                  {n.type.toUpperCase()}
                </span>: {n.message}
              </span>
              <span className="text-xs text-gray-500">{n.date}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 text-right">
          <Link to="/notifications" className="text-sm text-blue-600 hover:underline">See All Notifications →</Link>
        </div>
      </Card>

      
      <Card title="Recent Audit Logs">
        <ul className="text-sm space-y-2 text-gray-700">
          {logs.map((log) => (
            <li key={log.id}>
              <span className="font-medium">{log.by}</span> performed <span className="font-medium">{log.action}</span> on {log.date}
            </li>
          ))}
        </ul>
        <div className="mt-3 text-right">
          <Link to="/audit-logs" className="text-sm text-blue-600 hover:underline">See All Logs →</Link>
        </div>
      </Card>
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

const Card = ({ title, children }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h3 className="text-sm font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default Dashboard;
