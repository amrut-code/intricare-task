import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { useSidebarStore } from "../store/useSidebarStore";
import { LogOut, Sun, Moon, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-slate-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900 font-tt-fors transition-all duration-300 shrink-0",
        isCollapsed
          ? "w-20 p-2 items-center"
          : "w-20 p-2 items-center lg:w-64 lg:p-4 lg:items-stretch",
      )}
    >
      {/* Logo / Header */}
      <div
        className={cn(
          "mb-8 flex w-full mt-4",
          isCollapsed
            ? "flex-col items-center gap-3"
            : "flex-col items-center gap-3 lg:flex-row lg:items-center lg:justify-between",
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-cente dark:bg-prirmary shrink-0">
            <img
              src="/public/images/logo.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
          </div>
          <span
            className={cn(
              "font-semibold text-base tracking-normal text-slate-900 dark:text-white font-montserrat",
              isCollapsed ? "hidden" : "hidden lg:block",
            )}
          >
            Frontend Task
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className={cn(
            "hidden lg:flex h-7 w-7 items-center justify-center bg-white text-slate-400 hover:text-slate-600 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-500 hover:bg-slate-50 cursor-pointer",
            isCollapsed ? "mt-1" : "ml-auto",
          )}
        >
          {isCollapsed ? (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="m13 9 3 3-3 3" />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="m16 15-3-3 3-3" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Nav */}
      <nav className="flex-1 space-y-1 w-full">
        <Link
          to="/campaigns"
          className={cn(
            "flex items-center gap-3 rounded-lg py-2.5 text-sm font-light tracking-wider transition-all bg-gradient-to-r from-[#3762EE] to-[#8BA6FF] text-white shadow-md shadow-[#3762EE]/15",
            isCollapsed
              ? "justify-center px-0 w-full"
              : "justify-center px-0 lg:justify-start lg:px-3 w-full",
          )}
        >
          <img
            src="/public/images/icon-1.png"
            alt="Campaign Icon"
            className="h-4.5 w-4.5 shrink-0"
          />
          <span
            className={cn(
              "font-montserrat",
              isCollapsed ? "hidden" : "hidden lg:block",
            )}
          >
            Campaign
          </span>
        </Link>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto space-y-4 pt-4 border-slate-100 dark:border-zinc-800 w-full">
        {/* User Profile Card */}
        <div
          className={cn(
            "rounded-xl bg-[#F4F5F8] dark:bg-zinc-800/50 transition-all",
            isCollapsed
              ? "w-12 h-12 p-0 flex items-center justify-center mx-auto"
              : "w-full p-2 flex justify-center lg:p-3 lg:block",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center",
              isCollapsed ? "" : "w-full lg:justify-start lg:gap-3",
            )}
          >
            <Avatar className="h-10 w-10 border border-slate-200 dark:border-zinc-700 shrink-0">
              <AvatarImage src="/public/images/avtar.png" />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "flex-1 min-w-0 text-left",
                isCollapsed ? "hidden" : "hidden lg:block",
              )}
            >
              <h4 className="text-sm font-light text-txco1 truncate dark:text-white">
                John Doe
              </h4>
              <p className="text-xs text-txco2 truncate dark:text-zinc-400">
                Admin
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon-xs"
              className={cn(
                "text-slate-400 hover:text-red-500 hover:bg-transparent dark:text-zinc-500 dark:hover:text-red-400 cursor-pointer shrink-0",
                isCollapsed ? "hidden" : "hidden lg:flex",
              )}
              onClick={() => navigate("/campaigns")}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <div
            className={cn(
              "flex-1 mt-2 min-w-0 text-left border-t border-slate-200/40 dark:border-zinc-800/40 pt-2",
              isCollapsed ? "hidden" : "hidden lg:block",
            )}
          >
            <h4 className="text-sm font-light text-txco1 truncate dark:text-white">
              Email
            </h4>
            <p className="text-xs text-txco2 truncate dark:text-zinc-400">
              johndoe@gmail.com
            </p>
          </div>
        </div>

        {/* Theme Switcher Toggle */}
        <div
          className={cn(
            "grid gap-1 rounded-full bg-slate-100 p-1 dark:bg-zinc-800",
            isCollapsed
              ? "grid-cols-1 w-10 h-20 mx-auto"
              : "grid-cols-1 lg:grid-cols-2 w-full",
          )}
        >
          <button
            onClick={() => {
              if (theme !== "light") toggleTheme();
            }}
            className={cn(
              "flex items-center justify-center rounded-full transition-all cursor-pointer",
              theme === "light"
                ? "bg-white text-txco3 shadow-sm dark:bg-zinc-900 dark:text-primary"
                : "text-txco3 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200",
              isCollapsed
                ? "w-8 h-8"
                : "py-1 text-sm font-light px-0 lg:px-2 lg:gap-2",
            )}
            title="Light Theme"
          >
            <Sun className="h-3.5 w-3.5 shrink-0" />
            <span className={cn(isCollapsed ? "hidden" : "hidden lg:inline")}>
              Light
            </span>
          </button>
          <button
            onClick={() => {
              if (theme !== "dark") toggleTheme();
            }}
            className={cn(
              "flex items-center justify-center rounded-full transition-all cursor-pointer",
              theme === "dark"
                ? "bg-zinc-700 text-txco3 shadow-sm dark:bg-zinc-900 dark:text-primary"
                : "text-txco3 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200",
              isCollapsed
                ? "w-8 h-8"
                : "py-1 text-sm font-light px-0 lg:px-2 lg:gap-2",
            )}
            title="Dark Theme"
          >
            <Moon className="h-3.5 w-3.5 shrink-0" />
            <span className={cn(isCollapsed ? "hidden" : "hidden lg:inline")}>
              Dark
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
