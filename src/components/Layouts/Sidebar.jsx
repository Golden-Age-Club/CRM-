import React, { useMemo, useState, createContext, useContext } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useTranslation } from 'react-i18next';
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
const Table = ({ className = "size-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);

const PieChart = ({ className = "size-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
  </svg>
);

const FourCircle = ({ className = "size-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

const Authentication = ({ className = "size-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

const UserGroup = ({ className = "size-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.525m0 0A5.971 5.971 0 0 0 6.058 18.72M18 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "size-7"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const ChevronUp = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
);

const Logo = ({ showText = true }) => (
  <div className="flex items-center gap-3 px-2">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <AnimatePresence>
      {showText && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          className="overflow-hidden whitespace-nowrap"
        >
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            CRM<span className="text-blue-600">.Pro</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
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
    key: "admin",
    items: [
      { title: "Dashboard", key: "dashboard", url: "/", icon: MdOutlineDashboard, items: [], permission: "dashboard" },
      { title: "User Management", key: "user_management", url: "/users", icon: FiUsers, items: [], permission: "users" },
      { title: "Wallet & Finance", key: "wallet_finance", url: "/finance", icon: BiWallet, items: [], permission: "finance" },
      { title: "Bets & Games", key: "bets_games", url: "/bets", icon: IoGameControllerOutline, items: [], permission: "bets" },
      { title: "VIP & Segmentation", key: "vip_segmentation", url: "/vip", icon: RiVipCrownLine, items: [], permission: "vip" },
    ],
  },
  {
    label: "OPERATIONS",
    key: "operations",
    items: [
      { title: "Risk Control", key: "risk_control", url: "/risk", icon: Authentication, items: [], permission: "risk" },
      { title: "Bonus & Promotions", key: "bonus_promotions", url: "/promotions", icon: UserGroup, items: [], permission: "promotions" },
      { title: "Reports", key: "reports", url: "/reports", icon: TbReport, items: [], permission: "reports" },
      { title: "System & Logs", key: "system_logs", url: "/system", icon: TbLogs, items: [], permission: "system" },
      { title: "Admin Management", key: "admin_management", url: "/admin-management", icon: RiAdminLine, items: [], permission: "system" },
    ],
  },
];

// Tooltip Component
const Tooltip = ({ text, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 20 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute left-full top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-gray-900"
      >
        {text}
        {/* Arrow */}
        <div className="absolute left-0 top-1/2 -ml-1 -mt-1 h-2 w-2 -rotate-45 bg-gray-900 dark:bg-white" />
      </motion.div>
    )}
  </AnimatePresence>
);

// MenuItem Component
const MenuItem = ({ children, isActive, onClick, as = 'button', href, className = '', onNavigate, title, isCompact }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = isCompact
    ? `relative mx-auto flex h-14 w-14 items-center justify-center rounded-xl p-3 transition-all duration-200 group outline-none focus:ring-2 focus:ring-blue-500/20`
    : `relative mx-1 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group outline-none focus:ring-2 focus:ring-blue-500/20`;
  
  const activeClasses = isActive 
    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white';

  const content = (
    <>
      {children}
      {isCompact && title && <Tooltip text={title} isVisible={isHovered} />}
    </>
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (as === 'link' && href) {
    return (
      <NavLink
        to={href}
        onClick={onNavigate}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={({ isActive: navActive }) => 
          `${baseClasses} ${navActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'} ${className}`
        }
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button 
      onClick={onClick} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${activeClasses} ${className}`}
      type="button"
    >
      {content}
    </button>
  );
};



const Sidebar = () => {
  const { isMobileOpen, setIsMobileOpen, isCollapsed, toggleCollapse, toggleMobile, isMobile } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState([]);
  const { permissions } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  // Force expanded mode on mobile - isCompact is only true on desktop when collapsed
  const isCompact = !isMobile && isCollapsed;
  const isOpen = isMobile ? isMobileOpen : true;

  const navSections = useMemo(() => {
    const hasPerm = (item) => !item.permission || permissions.includes(item.permission);

    return NAV_DATA
      .map((section) => ({
        ...section,
        label: t(`common.${section.key}`),
        items: section.items.filter(hasPerm).map(item => ({
           ...item,
           title: t(`common.${item.key}`)
        })),
      }))
      .filter((section) => section.items.length);
  }, [permissions, t]);

  const toggleExpanded = (title) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [title]
    );
  };

  // Desktop sidebar width animation
  const sidebarWidth = isCompact ? 115 : 320; // Slightly wider for better spacing

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`
          sidebar bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700
          ${isMobile
            ? "fixed inset-y-0 left-0 z-50 h-full shadow-2xl"
            : "sticky top-0 h-screen"
          }
        `}
        animate={{
          x: isMobile ? (isMobileOpen ? 0 : -320) : 0,
          width: isMobile ? 320 : (isCompact ? sidebarWidth : 280),
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        aria-label="Main navigation"
        inert={!isOpen ? "true" : undefined}
        aria-hidden={!isMobileOpen && !isMobile}
      >
        <div className="flex h-full flex-col py-6 px-4">
          {/* Header with logo and close button */}
          <div className={`flex items-center ${isMobile ? 'justify-between px-2' : 'justify-center'} mb-8`}>
            <a
              href="/"
              className="block"
              onClick={() => isMobile && toggleMobile()}
            >
              <Logo showText={!isCompact} />
            </a>

            {isMobile && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <RiCloseLine className="size-6 text-gray-500" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div
            className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden px-2 pr-4"
            style={{ scrollbarGutter: 'stable' }}
          >
            {navSections.map((section) => (
              <div key={section.label} className="mb-6">
                {/* Section headers - hide when compact (desktop collapsed) */}
                <AnimatePresence mode="wait">
                  {!isCompact && (
                    <motion.h2
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-3 px-4 text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500"
                    >
                      {section.label}
                    </motion.h2>
                  )}
                </AnimatePresence>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-1.5">
                    {section.items.map((item) => {
                      // If item has multiple sub-items, show as dropdown
                      if (item.items && item.items.length > 1) {
                        return (
                          <li key={item.key}>
                            <div>
                              <MenuItem
                                isActive={item.items.some(
                                  ({ url }) => location.pathname === url
                                )}
                                onClick={() => toggleExpanded(item.title)}
                                className={isCompact ? 'justify-center' : 'px-4'}
                                title={item.title}
                                isCompact={isCompact}
                              >
                                <item.icon
                                  className="size-7 shrink-0 transition-all"
                                  aria-hidden="true"
                                />

                                <AnimatePresence>
                                  {!isCompact && (
                                    <motion.span
                                      initial={{ opacity: 0, width: 0 }}
                                      animate={{ opacity: 1, width: 'auto' }}
                                      exit={{ opacity: 0, width: 0 }}
                                      className="whitespace-nowrap font-medium"
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
                                    className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3"
                                    role="menu"
                                  >
                                    {item.items.map((subItem) => (
                                      <li key={subItem.title} role="none">
                                        <MenuItem
                                          as="link"
                                          href={subItem.url}
                                          onNavigate={() => isMobile && toggleMobile()}
                                          isActive={location.pathname === subItem.url}
                                          className="py-2 text-sm"
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

                      // Direct link
                      return (
                        <li key={item.key}>
                          <MenuItem
                            className={isCompact ? 'justify-center' : 'px-4'}
                            as="link"
                            href={item.url}
                            onNavigate={() => isMobile && toggleMobile()}
                            isActive={location.pathname === item.url}
                            title={item.title}
                            isCompact={isCompact}
                          >
                            <item.icon
                              className="size-7 shrink-0 transition-all"
                              aria-hidden="true"
                            />

                            <AnimatePresence>
                              {!isCompact && (
                                <motion.span
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: 'auto' }}
                                  exit={{ opacity: 0, width: 0 }}
                                  className="whitespace-nowrap font-medium text-sm"
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

export {Sidebar};
