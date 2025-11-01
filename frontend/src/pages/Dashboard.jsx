import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaBook, FaUsers, FaFileAlt, FaCheckCircle, FaClock, FaStar, FaChartLine, FaBell } from 'react-icons/fa';

const statCards = [
  { id: 1, icon: <FaBook />, title: 'Total Items', value: '1,247', bgColor: 'bg-blue-500', change: '+12%' },
  { id: 2, icon: <FaUsers />, title: 'Active Users', value: '3,891', bgColor: 'bg-green-500', change: '+8%' },
  { id: 3, icon: <FaFileAlt />, title: 'Documents', value: '856', bgColor: 'bg-purple-500', change: '+5%' },
  { id: 4, icon: <FaCheckCircle />, title: 'Completed', value: '92%', bgColor: 'bg-orange-500', change: '+3%' },
];

const recentActivity = [
  { id: 1, action: 'New item added', time: '2 hours ago', type: 'create' },
  { id: 2, action: 'Item updated', time: '5 hours ago', type: 'update' },
  { id: 3, action: 'User registered', time: '1 day ago', type: 'user' },
  { id: 4, action: 'Document processed', time: '2 days ago', type: 'process' },
  { id: 5, action: 'Task completed', time: '3 days ago', type: 'complete' },
];

const featuredItems = [
  { id: 1, title: 'Featured Item One', description: 'This is a description of the first featured item with important details.', category: 'Category A', status: 'Active' },
  { id: 2, title: 'Featured Item Two', description: 'This is a description of the second featured item with important details.', category: 'Category B', status: 'Active' },
  { id: 3, title: 'Featured Item Three', description: 'This is a description of the third featured item with important details.', category: 'Category C', status: 'Pending' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-4xl font-extrabold mb-2">
          Welcome back, {user?.username}! 👋
      </h1>
        <p className="text-lg opacity-90">
          You are logged in as <span className="font-semibold">{user?.role}</span>. Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${card.bgColor} text-white rounded-lg text-2xl`}>
                  {card.icon}
                </div>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                  {card.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FaClock className="text-blue-600 dark:text-blue-400" />
              Recent Activity
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FaBell className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Featured Items
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {featuredItems.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    item.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition text-left">
              <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Create New</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Add a new item</div>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition text-left">
              <div className="font-semibold text-green-700 dark:text-green-300 mb-1">Browse All</div>
              <div className="text-sm text-green-600 dark:text-green-400">View all items</div>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition text-left">
              <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Reports</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">View analytics</div>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition text-left">
              <div className="font-semibold text-orange-700 dark:text-orange-300 mb-1">Settings</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Configure options</div>
            </button>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FaChartLine className="text-green-500" />
            Performance Insights
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This Week</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">+15%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This Month</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">+28%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">68%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
