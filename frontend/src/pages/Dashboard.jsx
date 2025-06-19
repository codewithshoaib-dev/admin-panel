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
  const [stats2, setStats2] = useState()
 
  const websocket_stats = useDashboardStatsSocket("ws://localhost:8000/ws/dashboard_stats/")

  
useEffect(() => {
  if (websocket_stats) {
    setStats2(websocket_stats)
    console.log("Updated stats2:", websocket_stats)
  }
}, [websocket_stats])

  useEffect(() => {
  if (!stats2) return;

  setStats({
    totalUsers: stats2.users.total_users,
    activeSubscribers: stats2.subscriptions.total_subscribers,
    mrr: stats2.mrr.current_mrr,
    newSignupsLast7Days: stats2.users.users_this_week_count,
    churnRate: 3.2,
    unreadErrors: 5
  });

  const userGrowthData = stats2.users.user_count_each_weekday.map(item => ({
    day: item.weekday,
    count: item.user_count
  }));
  setUserGrowth(userGrowthData);

  const MRRdata = stats2.mrr.mrr_by_month.map(item => ({
    month: item.month,
    mrr: item.mrr
  }));
  setMrrData(MRRdata);

  setPlans(
    stats2.subscriptions.top_subscriptions.map(plan => ({
      name: plan.name,
      value: plan.subscribers,
      growth: Math.floor(Math.random() * 30),
      color: "#4F46E5"
    }))
  );

  setLogs(
    stats2.audit_logs.map(log => ({
      id: log.id,
      action: log.action,
      by: log.user__username,
      date: log.created_at.split("T")[0]
    }))
  );

  setNotifications(
    stats2.notifications.map(note => ({
      id: note.id,
      message: note.message,
      type: note.type,
      date: note.send_at ? note.send_at.split("T")[0] : "N/A"
    }))
  );

}, [stats2]);


  const trendingPlans = plans?.sort((a, b) => b.growth - a.growth)
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
              <XAxis dataKey="day"/>
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Subscribers by Plan">
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={plans} dataKey="value" nameKey="name" outerRadius={80} label>
                {plans?.map((entry, index) => (
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
        <div className="space-y-3">
          {trendingPlans?.map((plan, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{plan.name}</span>
                <span className="text-sm font-semibold text-green-600">+{plan.growth}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className="h-2 rounded"
                  style={{ width: `${plan.growth}%`, backgroundColor: plan.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
     
      <Card title="Recent Notifications">
        <ul className="text-sm space-y-2 text-gray-700">
          {notifications?.map((n) => (
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
          <Link to="notifications" className="text-sm text-blue-600 hover:underline">See All Notifications →</Link>
        </div>
      </Card>

      
      <Card title="Recent Audit Logs">
        <ul className="text-sm space-y-2 text-gray-700">
          {logs?.map((log) => (
            <li key={log.id}>
              <span className="font-medium">{log.by}</span> performed <span className="font-medium">{log.action}</span> on {log.date}
            </li>
          ))}
        </ul>
        <div className="mt-3 text-right">
          <Link to="auditlogs" className="text-sm text-blue-600 hover:underline">See All Logs →</Link>
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
