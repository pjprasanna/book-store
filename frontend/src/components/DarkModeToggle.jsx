import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('dark-mode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem('dark-mode', !isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="absolute top-1 left-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      {isDarkMode ? '🌞' : '🌙'} {/* Optional: Use emojis for visual indication */}
    </button>
  );
};

export default DarkModeToggle;
