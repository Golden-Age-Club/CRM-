import React from 'react';
import { Header } from './Header';
import { Sidebar, SidebarProvider, useSidebarContext } from './Sidebar';
import { motion } from 'framer-motion';

// Inner component to access sidebar context
const MainLayoutContent = ({ children }) => {
  const { isMobile, isOpen } = useSidebarContext();

  // Rely on flex layout — Sidebar provides its own width classes.
  return (
    <>
      <Sidebar />

      <motion.div className="flex-1 bg-gray-100 dark:bg-black min-w-0">
        <Header />

        <main className="isolate w-full max-w-none overflow-hidden p-4 sm:p-5 md:p-6 lg:p-8 2xl:p-10">
          {children}
        </main>
      </motion.div>
    </>
  );
};

const MainLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar />
          
          <div className="flex-1 bg-gray-100 dark:bg-black">
            <Header />
            
            <main className="w-full max-w-none overflow-hidden p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          </div>
        </div>

        <footer className="bg-gray-100 dark:bg-gray-800 py-3 px-4 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <span className="hidden sm:inline">Golden Cash Casino Admin Dashboard © 2025</span>
          <span className="sm:hidden">© 2025 Golden Cash</span>
        </footer>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
