/* eslint-disable react-refresh/only-export-components */
import React, { useMemo, useState, createContext, useContext } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BiWallet } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import { RiVipCrownLine } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { TbLogs } from "react-icons/tb";
import { RiAdminLine, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

// Icon Components

const Table = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);

const PieChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
  </svg>
);

const FourCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

const Authentication = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

const UserGroup = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.525m0 0A5.971 5.971 0 0 0 6.058 18.72M18 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const ChevronUp = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
);

// Define the context for sidebar state
const SidebarContext = createContext();

// Custom hook to use the sidebar context
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

// Provider component
export const SidebarProvider = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Desktop never closes - only collapses
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext.Provider value={{
      isMobileOpen,
      setIsMobileOpen,
      isCollapsed,
      toggleCollapse,
      toggleMobile,
      isMobile
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Navigation Data
const NAV_DATA = [
  {
    label: "ADMIN",
    items: [
      { title: "Dashboard", url: "/", icon: MdOutlineDashboard, items: [], permission: "dashboard" },
      { title: "User Management", url: "/users", icon: FiUsers, items: [], permission: "users" },
      { title: "Wallet & Finance", url: "/finance", icon: BiWallet, items: [], permission: "finance" },
      { title: "Bets & Games", url: "/bets", icon: IoGameControllerOutline, items: [], permission: "bets" },
      { title: "VIP & Segmentation", url: "/vip", icon: RiVipCrownLine, items: [], permission: "vip" },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { title: "Risk Control", url: "/risk", icon: Authentication, items: [], permission: "risk" },
      { title: "Bonus & Promotions", url: "/promotions", icon: UserGroup, items: [], permission: "promotions" },
      { title: "Reports", url: "/reports", icon: TbReport, items: [], permission: "reports" },
      { title: "System & Logs", url: "/system", icon: TbLogs, items: [], permission: "system" },
      { title: "Admin Management", url: "/admin-management", icon: RiAdminLine, items: [], permission: "system" },
    ],
  },
];

// MenuItem Component
const MenuItem = ({ children, isActive, onClick, as = 'button', href, className = '', onNavigate }) => {
  const menuItemClasses = `flex items-center gap-2 py-3 rounded-lg transition-colors ${
    isActive 
      ? 'bg-blue-500 text-white' 
      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
  }`;

  if (as === 'link' && href) {
    return (
      <NavLink
        to={href}
        onClick={onNavigate}
        className={({ isActive: navActive }) => `${menuItemClasses} ${navActive ? 'bg-blue-500 text-white' : ''} ${className}`}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={`${menuItemClasses} ${className}`}
      type="button"
    >
      {children}
    </button>
  );
};

// Logo Component
const Logo = ({ showText = true }) => (
  <div className={`flex items-center ${showText ? 'gap-2' : 'justify-center'}`}>
    <div className="w-8 h-8 bg-blue-500 rounded-md shrink-0"></div>
    {showText && (
      <span className="text-lg font-bold text-gray-800 dark:text-white whitespace-nowrap">Golden Cash Casino</span>
    )}
  </div>
);

const Sidebar = () => {
  const { isMobileOpen, setIsMobileOpen, isCollapsed, toggleCollapse, toggleMobile, isMobile } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState([]);
  const { permissions } = useAuth();
  const location = useLocation();

  // Force expanded mode on mobile - isCompact is only true on desktop when collapsed
  const isCompact = !isMobile && isCollapsed;

  const navSections = useMemo(() => {
    const hasPerm = (item) => !item.permission || permissions.includes(item.permission);

    return NAV_DATA
      .map((section) => ({
        ...section,
        items: section.items.filter(hasPerm),
      }))
      .filter((section) => section.items.length);
  }, [permissions]);

  const toggleExpanded = (title) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [title]
    );
  };

  // Desktop sidebar width animation
  const sidebarWidth = isCompact ? 80 : 256;
  const sidebarWidthXl = isCompact ? 80 : 288;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`
          sidebar bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700
          ${isMobile
            ? "fixed inset-y-0 left-0 z-50 w-72"
            : ""
          }
        `}
        animate={{
          x: isMobile ? (isMobileOpen ? 0 : -288) : 0,
          width: isMobile ? undefined : (isCompact ? sidebarWidth : undefined),
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        aria-label="Main navigation"
        aria-hidden={!isMobileOpen && !isMobile}
      >
        <div className="flex h-full flex-col py-6 px-4">
          {/* Header with logo and close button */}
          <div className={`flex items-center ${isMobile ? 'justify-between px-2' : 'justify-center'}`}>
            <a
              href="/"
              onClick={() => isMobile && toggleMobile()}
              className="py-2"
            >
              <Logo showText={!isCompact} />
            </a>

            {isMobile && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RiCloseLine className="size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.label} className="mb-6">
                {/* Section headers - hide when compact (desktop collapsed) */}
                <AnimatePresence mode="wait">
                  {!isCompact && (
                    <motion.h2
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-400 px-2"
                    >
                      {section.label}
                    </motion.h2>
                  )}
                </AnimatePresence>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      // If item has multiple sub-items, show as dropdown
                      if (item.items && item.items.length > 1) {
                        return (
                          <li key={item.title}>
                            <div>
                              <MenuItem
                                isActive={item.items.some(
                                  ({ url }) => location.pathname === url
                                )}
                                onClick={() => toggleExpanded(item.title)}
                                className={isCompact ? 'justify-center px-2' : 'px-4'}
                              >
                                <item.icon
                                  className="size-6 shrink-0"
                                  aria-hidden="true"
                                />

                                <AnimatePresence>
                                  {!isCompact && (
                                    <motion.span
                                      initial={{ opacity: 0, width: 0 }}
                                      animate={{ opacity: 1, width: 'auto' }}
                                      exit={{ opacity: 0, width: 0 }}
                                      className="whitespace-nowrap"
                                    >
                                      {item.title}
                                    </motion.span>
                                  )}
                                </AnimatePresence>

                                {!isCompact && (
                                  <ChevronUp
                                    className={`ml-auto rotate-180 transition-transform duration-200 ${
                                      expandedItems.includes(item.title) ? 'rotate-0' : ''
                                    }`}
                                    aria-hidden="true"
                                  />
                                )}
                              </MenuItem>

                              <AnimatePresence>
                                {!isCompact && expandedItems.includes(item.title) && (
                                  <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="ml-9 mr-2 space-y-1 pb-[15px] pt-2"
                                    role="menu"
                                  >
                                    {item.items.map((subItem) => (
                                      <li key={subItem.title} role="none">
                                        <MenuItem
                                          as="link"
                                          href={subItem.url}
                                          onNavigate={() => isMobile && toggleMobile()}
                                          isActive={location.pathname === subItem.url}
                                          className="py-2"
                                        >
                                          <span className="whitespace-nowrap">{subItem.title}</span>
                                        </MenuItem>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
                          </li>
                        );
                      }

                      // Direct link (no dropdown or single item)
                      const href =
                        "url" in item && item.url
                          ? item.url
                          : "/" + item.title.toLowerCase().split(" ").join("-");

                      return (
                        <li key={item.title}>
                          <MenuItem
                            className={isCompact ? 'justify-center px-2' : 'px-4 gap-3'}
                            as="link"
                            href={href}
                            onNavigate={() => isMobile && toggleMobile()}
                            isActive={location.pathname === href}
                          >
                            <item.icon
                              className="size-6 shrink-0"
                              aria-hidden="true"
                            />

                            <AnimatePresence>
                              {!isCompact && (
                                <motion.span
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: 'auto' }}
                                  exit={{ opacity: 0, width: 0 }}
                                  className="whitespace-nowrap"
                                >
                                  {item.title}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </MenuItem>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export { Sidebar };
