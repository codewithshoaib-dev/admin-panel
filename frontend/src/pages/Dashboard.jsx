import React, { useEffect, useState } from "react";
import { FaUsers, FaDollarSign, FaBell, FaChartLine } from "react-icons/fa";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import useDashboardStatsSocket from "../hooks/useDashboardStatsSocket";

const colors = {
  blue: "#3B82F6",
  green: "#10B981",
  yellow: "#F59E0B",
  purple: "#8B5CF6",
  red: "#EF4444"
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    userGrowth: [],
    mrrData: [],
    plans: []
  });

  const websocketStats = useDashboardStatsSocket("ws://localhost:8000/ws/dashboard_stats/");

  useEffect(() => {
    if (!websocketStats) return;

    const {
      users,
      subscriptions,
      mrr
    } = websocketStats;

    const stats = {
      totalUsers: users.total_users,
      activeSubscribers: subscriptions.total_subscribers,
      mrr: mrr.current_mrr,
      newSignupsLast7Days: users.users_this_week_count,
      unreadErrors: 5
    };

    const userGrowth = users.user_count_each_weekday.map(item => ({
      day: item.weekday,
      count: item.user_count
    }));

    const mrrData = mrr.mrr_by_month.map(item => ({
      month: item.month,
      mrr: item.mrr
    }));

    const plans = subscriptions.top_subscriptions.map(plan => ({
      name: plan.name,
      value: plan.subscribers,
      growth: Math.floor(Math.random() * 30),
      color: colors.blue
    }));

    setDashboardData({ stats, userGrowth, mrrData, plans });
  }, [websocketStats]);

  const { stats, userGrowth, mrrData, plans } = dashboardData;

  const kpis = [
    { label: "Total Users", value: stats.totalUsers, icon: <FaUsers />, color: colors.blue },
    { label: "Subscribers", value: stats.activeSubscribers, icon: <FaChartLine />, color: colors.green },
    { label: "MRR", value: `$${stats.mrr}`, icon: <FaDollarSign />, color: colors.yellow },
    { label: "New Signups", value: stats.newSignupsLast7Days, icon: <FaUsers />, color: colors.purple },
    { label: "Unread Errors", value: stats.unreadErrors, icon: <FaBell />, color: colors.red }
  ];

  const trendingPlans = plans.sort((a, b) => b.growth - a.growth).slice(0, 2);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <KpiCard key={i} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="User Growth">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={userGrowth}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke={colors.blue} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Subscribers by Plan">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={plans} dataKey="value" nameKey="name" outerRadius={80} label>
                {plans.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="MRR Trend (6m)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mrrData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="mrr" fill={colors.green} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Trending Plans (Growth%)">
        <div className="space-y-4">
          {trendingPlans.map((plan, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{plan.name}</span>
                <span className="text-sm font-semibold text-green-600">+{plan.growth}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                <div
                  className="h-3"
                  style={{ width: `${plan.growth}%`, backgroundColor: plan.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

const KpiCard = ({ label, value, icon, color }) => (
  <div className="bg-white flex items-center gap-4 p-6 rounded-2xl shadow hover:shadow-lg transition">
    <div className="text-3xl p-3 rounded-full bg-opacity-10" style={{ backgroundColor: color, color }}>
      {icon}
    </div>
    <div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-sm font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default Dashboard;
