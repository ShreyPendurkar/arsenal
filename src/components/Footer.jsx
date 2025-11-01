import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm text-gray-600 dark:text-gray-400 mt-12">
      &copy; {new Date().getFullYear()} Generic Topic Website. Professional quality UI.
    </footer>
  );
}
