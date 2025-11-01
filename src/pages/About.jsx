import React from 'react';
import { FaRocket, FaShieldAlt, FaUsers, FaCog, FaHeart, FaCheckCircle } from 'react-icons/fa';

const features = [
  {
    icon: <FaRocket />,
    title: 'Fast & Efficient',
    description: 'Built with modern technologies to deliver lightning-fast performance and smooth user experience.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Secure & Reliable',
    description: 'Your data is protected with robust authentication and security measures to ensure privacy and safety.',
  },
  {
    icon: <FaUsers />,
    title: 'User-Friendly',
    description: 'Intuitive interface designed with the user in mind, making navigation and interactions effortless.',
  },
  {
    icon: <FaCog />,
    title: 'Highly Customizable',
    description: 'Flexible architecture allows you to adapt and customize the platform to suit your specific needs.',
  },
];

const stats = [
  { label: 'Active Users', value: '10K+' },
  { label: 'Items Processed', value: '50K+' },
  { label: 'Satisfaction Rate', value: '98%' },
  { label: 'Uptime', value: '99.9%' },
];

const values = [
  'Commitment to excellence in every feature',
  'Continuous improvement and innovation',
  'User-centric design and development',
  'Transparency and open communication',
];

export default function About() {
  return (
    <section className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-xl shadow-lg p-12 text-white text-center">
        <h1 className="text-5xl font-extrabold mb-4">About Our Platform</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          A versatile, modern platform designed to adapt to any project domain. Built with cutting-edge technology and a focus on user experience.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Our Mission</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          We strive to provide a robust, flexible foundation that can be adapted to any project domain—whether it's a bookstore, grocery platform, tech dashboard, or any other application you can imagine.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Our platform is engineered with React and styled with Tailwind CSS to ensure smooth, responsive, and modern user experiences. Authentication and roles are handled via Context API & JWT simulation, ensuring security without backend complexity.
        </p>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 text-2xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">By The Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <FaHeart className="text-red-500" />
          Our Values
        </h2>
        <ul className="space-y-3">
          {values.map((value, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-600 dark:text-gray-400 py-6">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} Generic Topic Website — Crafted with precision & care.
        </p>
        <p className="text-sm mt-2">
          This platform is designed to be adaptable to any domain or topic you need.
        </p>
      </div>
    </section>
  );
}
