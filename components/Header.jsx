import React, { useEffect, useState } from 'react';

export default function Header() {
  // Check localStorage for the initial state of dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false; // Default to false if not set
  });

  // Apply the dark mode class to the body on component mount
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle the state
    document.body.classList.toggle('dark'); // Toggle the class on the body
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode)); // Store the new state in localStorage
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <h2 className="title">
          <a href="/">Let's connect</a>
        </h2>
        <p className="header-dark" onClick={toggleDarkMode}>
          <i className={isDarkMode ? 'fa-solid fa-sun' : 'fa-regular fa-moon'}></i>
          &nbsp;&nbsp;{isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </p>
      </div>
    </header>
  );
}
