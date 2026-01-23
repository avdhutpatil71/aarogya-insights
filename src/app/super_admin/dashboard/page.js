'use client'

import { useState } from 'react'
import { Activity, Eye, FileText, Users, BarChart3, TrendingUp, Heart, Clock, BookOpen, AlertCircle, ChevronRight, Zap } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function SuperAdminDashboard() {
  const [selectedBlog, setSelectedBlog] = useState(0)

  // Daily views data for line chart
  const dailyViewsData = [
    { day: 'Mon', views: 2400, engagement: 65 },
    { day: 'Tue', views: 3210, engagement: 72 },
    { day: 'Wed', views: 2290, engagement: 68 },
    { day: 'Thu', views: 2000, engagement: 70 },
    { day: 'Fri', views: 2181, engagement: 75 },
    { day: 'Sat', views: 2500, engagement: 82 },
    { day: 'Sun', views: 2100, engagement: 71 },
  ]

  // Category engagement data for bar chart
  const categoryEngagement = [
    { category: 'Cardiology', views: 4200, reads: 3890, category_id: '1' },
    { category: 'Diabetes', views: 3800, reads: 2908, category_id: '2' },
    { category: 'Mental Health', views: 2000, reads: 1800, category_id: '3' },
    { category: 'Nutrition', views: 2780, reads: 1908, category_id: '4' },
    { category: 'Fitness', views: 1890, reads: 1200, category_id: '5' },
  ]

  const stats = [
    {
      label: 'Total Views Today',
      value: '8,234',
      subLabel: '+12% from yesterday',
      icon: Eye,
      color: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Total Views This Month',
      value: '148,230',
      subLabel: 'Across all blogs',
      icon: TrendingUp,
      color: 'from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Total Blog Reads',
      value: '52,430',
      subLabel: 'Complete article reads',
      icon: BookOpen,
      color: 'from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Active Readers',
      value: '12,540',
      subLabel: 'Engaged users this week',
      icon: Users,
      color: 'from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900',
      iconColor: 'text-pink-600 dark:text-pink-400',
    },
  ]

  const topBlogs = [
    {
      id: 1,
      title: 'Managing Diabetes Effectively: New 2025 Guidelines',
      views: 8230,
      reads: 6545,
      engagement: '6.2%',
      category: 'Diabetes',
      growth: '+24%',
    },
    {
      id: 2,
      title: 'Heart Health: Early Warning Signs You Shouldn\'t Ignore',
      views: 6540,
      reads: 5124,
      engagement: '5.7%',
      category: 'Cardiology',
      growth: '+18%',
    },
    {
      id: 3,
      title: 'Mental Wellness in a Busy Life: Expert Tips',
      views: 5021,
      reads: 3815,
      engagement: '5.1%',
      category: 'Mental Health',
      growth: '+12%',
    },
  ]

  const trendingArticles = [
    { id: 1, title: 'Sleep Disorders and Solutions', views: 3421, trend: 'up', category: 'Wellness' },
    { id: 2, title: 'Nutrition Facts: Myths vs Reality', views: 2890, trend: 'up', category: 'Nutrition' },
    { id: 3, title: 'Exercise Recovery Methods', views: 2156, trend: 'stable', category: 'Fitness' },
    { id: 4, title: 'Stress Management Techniques', views: 1843, trend: 'up', category: 'Mental Health' },
    { id: 5, title: 'Blood Pressure Control Guide', views: 1654, trend: 'down', category: 'Cardiology' },
  ]

  const yearWiseEngagement = [
  { year: "2021", views: 54200, reads: 38900 },
  { year: "2022", views: 62850, reads: 42150 },
  { year: "2023", views: 70320, reads: 50210 },
  { year: "2024", views: 75540, reads: 53480 },
  { year: "2025", views: 81230, reads: 59010 },
]


  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Healthcare Content Performance</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Updated 5 mins ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.color} border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{stat.subLabel}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-white dark:bg-slate-800 ${stat.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* Main Charts Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Daily Views Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Daily Views & Engagement
                </h2>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Last 7 days</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyViewsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#0ea5e9" strokeWidth={2} name="Views" dot={{ fill: '#0ea5e9' }} />
                <Line type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={2} name="Engagement %" dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Best Performing Blog Highlight */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 dark:bg-blue-900 rounded-full -mr-10 -mt-10 opacity-20" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Top Performer</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 line-clamp-2">
                {topBlogs[selectedBlog].title}
              </h3>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Views</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{topBlogs[selectedBlog].views.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Reads</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{topBlogs[selectedBlog].reads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Engagement</p>
                    <p className="text-lg font-semibold text-emerald-600">{topBlogs[selectedBlog].engagement}</p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {topBlogs[selectedBlog].growth} this month
                </div>
              </div>
              <div className="flex gap-2">
                {topBlogs.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedBlog(idx)}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      idx === selectedBlog ? 'bg-blue-600' : 'bg-blue-300 dark:bg-blue-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Engagement + Trending Articles */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Engagement Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Category Engagement
              </h2>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">This month</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryEngagement} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Bar dataKey="views" fill="#0ea5e9" name="Views" radius={[8, 8, 0, 0]} />
                <Bar dataKey="reads" fill="#10b981" name="Complete Reads" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

                                    {/* Year-wise Engagement Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    Year-wise Engagement
                    </h2>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Last 5 Years</span>
                </div>

                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={yearWiseEngagement} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#e2e8f0" }}
                    />
                    <Legend />

                    <Bar dataKey="views" fill="#6366f1" name="Total Views" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="reads" fill="#10b981" name="Total Reads" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </div>
          </div>

          {/* Top Trending Articles */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-pink-600" />
              Trending Now
            </h2>
            <div className="space-y-4">
              {trendingArticles.map((article, idx) => (
                <div key={article.id} className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex-shrink-0 text-xs font-semibold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2 mb-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        {article.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-600" />}
                        {article.trend === 'down' && <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />}
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Top Blogs Table */}
        <section className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              All Top Performing Blogs
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">Blog Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 dark:text-slate-300">Views</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 dark:text-slate-300">Reads</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 dark:text-slate-300">Engagement</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 dark:text-slate-300">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {topBlogs.map((blog, idx) => (
                  <tr key={blog.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{blog.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{blog.category}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{blog.views.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{blog.reads.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-emerald-600">{blog.engagement}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-emerald-600 flex items-center justify-end gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {blog.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
