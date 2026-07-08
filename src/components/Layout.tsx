import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex flex-col w-full gap-3 overflow-hidden">
        {/* Header Component */}
        <Header />

        {/* Content Body */}
        <main className="overflow-y-auto mx-5 mt-5 mb-2 scrollbar-hidden  p-5 bg-white shadow rounded dark:bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
};
export default Layout;
