import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSidebarContext } from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

// Icon Components
const SearchIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const NotificationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

const UserAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-gray-700 font-medium">
    U
  </div>
);

// Notification Component
const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const notifications = [
    {
      id: 1,
      type: "withdrawal",
      title: "Withdrawal Approved",
      message: "Player withdrawal request #WD1234 has been approved",
      time: "5 minutes ago",
      icon: "✅",
      color: "bg-green-100 text-green-600",
      unread: true
    },
    {
      id: 2,
      type: "risk",
      title: "High Risk Alert",
      message: "Player 'player002' flagged for suspicious betting patterns",
      time: "30 minutes ago",
      icon: "⚠️",
      color: "bg-red-100 text-red-600",
      unread: true
    },
    {
      id: 3,
      type: "deposit",
      title: "Large Deposit",
      message: "Player 'vip_player' deposited $5,000 - VIP status updated",
      time: "2 hours ago",
      icon: "💰",
      color: "bg-yellow-100 text-yellow-600",
      unread: false
    },
    {
      id: 4,
      type: "jackpot",
      title: "Jackpot Hit",
      message: "Mega Fortune jackpot won: $25,000 by 'lucky_player'",
      time: "5 hours ago",
      icon: "🎰",
      color: "bg-purple-100 text-purple-600",
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
      >
        <NotificationIcon />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${notification.color} flex items-center justify-center text-lg flex-shrink-0`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={() => setShowNotifications(false)}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { actualTheme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      title={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {actualTheme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

// User Info Component
const UserInfo = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
      >
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
          AS
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">admin@example.com</p>
          </div>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setShowDropdown(false)}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Your Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setShowDropdown(false)}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              setShowDropdown(false);
              // TODO: Handle sign out
              alert('Sign out clicked');
            }}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export const Header = () => {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-slate-800 sm:px-5 md:py-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg border p-1.5 dark:border-gray-700 dark:bg-gray-700 hover:dark:bg-gray-600 lg:hidden"
        >
          <MenuIcon />
          <span className="sr-only">Toggle Sidebar</span>
        </button>

        {isMobile && (
          <a href="/">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-md"></div>
          </a>
        )}

        <div className="hidden lg:block">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="hidden xl:block text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
            Slot Machine Admin Console for players, bets, games, and risk.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3 min-w-0">
        <div className="hidden sm:block w-full max-w-[200px] md:max-w-[280px] lg:max-w-[320px]">
          <div className="flex items-center rounded-full border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm focus-within:border-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus-within:border-orange-500">
            <SearchIcon className="mr-2 text-gray-400" />
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="sm:hidden">
            <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <SearchIcon className="size-5" />
            </button>
          </div>
          <ThemeToggle />
          <Notification />
          <div className="hidden sm:block shrink-0">
            <UserInfo />
          </div>
        </div>
      </div>
    </header>
  );
};