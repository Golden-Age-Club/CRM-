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
import { RiAdminLine } from "react-icons/ri";

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

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
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
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile, toggleSidebar }}>
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
  const menuItemClasses = `flex items-center gap-2 py-3 px-3 rounded-lg transition-colors ${
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
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
    <span className="text-xl font-bold text-gray-800 dark:text-white">Golden Cash Casino</span>
  </div>
);

const Sidebar = () => {
  const { isOpen, setIsOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState([]);
  const { permissions } = useAuth();
  const location = useLocation();

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

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar overflow-hidden border-r border-gray-200 bg-white transition-[width,transform] duration-200 ease-linear dark:border-gray-700 dark:bg-slate-900 ${
          isMobile
            ? "fixed bottom-0 top-0 left-0 z-50 w-72 -translate-x-full"
            : "sticky top-0 h-screen"
        } ${isOpen && isMobile ? "translate-x-0" : ""} ${isMobile ? "" : (isOpen ? "w-64 xl:w-72" : "w-0 lg:w-20")}`}
        aria-label="Main navigation"
        aria-hidden={!isOpen && !isMobile}
        inert={!isOpen && !isMobile}
      >
        <div className="flex h-full flex-col py-6 pl-6 pr-4">
          <div className="relative pr-4.5">
            <a
              href="/"
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </a>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {navSections.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {section.label}
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => {
                      // If item has multiple sub-items, show as dropdown
                      // Otherwise, show as direct link
                      if (item.items && item.items.length > 1) {
                        return (
                          <li key={item.title}>
                            <div>
                              <MenuItem
                                isActive={item.items.some(
                                  ({ url }) => location.pathname === url
                                )}
                                onClick={() => toggleExpanded(item.title)}
                              >
                                <item.icon
                                  className="size-6 shrink-0"
                                  aria-hidden="true"
                                />

                                <span className="whitespace-nowrap">{item.title}</span>

                                <ChevronUp
                                  className={`ml-auto rotate-180 transition-transform duration-200 ${
                                    expandedItems.includes(item.title) ? "rotate-0" : ""
                                  }`}
                                  aria-hidden="true"
                                />
                              </MenuItem>

                              {expandedItems.includes(item.title) && (
                                <ul
                                  className="ml-9 mr-0 space-y-1.5 pb-[15px] pr-0 pt-2"
                                  role="menu"
                                >
                                  {item.items.map((subItem) => (
                                    <li key={subItem.title} role="none">
                                      <MenuItem
                                        as="link"
                                        href={subItem.url}
                                        onNavigate={() => isMobile && toggleSidebar()}
                                        isActive={location.pathname === subItem.url}
                                      >
                                        <span className="whitespace-nowrap">{subItem.title}</span>
                                      </MenuItem>
                                    </li>
                                  ))}
                                </ul>
                              )}
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
                            className="flex items-center gap-3 py-3 px-4"
                            as="link"
                            href={href}
                            onNavigate={() => isMobile && toggleSidebar()}
                            isActive={location.pathname === href}
                          >
                            <item.icon
                              className="size-6 shrink-0"
                              aria-hidden="true"
                            />

                            <span className="whitespace-nowrap">{item.title}</span>
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
      </aside>
    </>
  );
};

export { Sidebar };