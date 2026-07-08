import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCampaigns } from "../pages/CampaignsList";
import { ChevronRight, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Header: React.FC = () => {
  const { campaigns } = useCampaigns();
  const location = useLocation();

  // Generate breadcrumbs based on pathname
  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ label: "Campaign", path: "/campaigns" }];

    if (paths[1] === "new") {
      breadcrumbs.push({ label: "Advance Campaign", path: "/campaigns/new" });
    } else if (paths[1]) {
      const campaign = campaigns.find((c) => c.id === paths[1]);
      breadcrumbs.push({
        label: campaign ? campaign.name : "Detail",
        path: `/campaigns/${paths[1]}`,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex flex-col-reverse md:flex-row h-auto md:h-20 mt-3 mx-5 p-4 md:px-6 items-start md:items-center justify-between bg-white shadow-md rounded-md gap-3 dark:bg-zinc-900">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center space-x-1.5 text-sm font-semibold text-slate-500 dark:text-zinc-400">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.path}>
            {idx > 0 && (
              <ChevronRight className="h-4 w-4 text-slate-300 dark:text-zinc-600" />
            )}
            <Link
              to={crumb.path}
              className={`hover:text-primary text-lg font-light dark:hover:text-primary/80 ${
                idx === breadcrumbs.length - 1
                  ? "text-primary dark:text-primary/80"
                  : "text-slate-500 dark:text-zinc-400"
              }`}
            >
              {crumb.label}
            </Link>
          </React.Fragment>
        ))}
      </nav>

      {/* Right Header Controls */}
      <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-light text-txco1 truncate dark:text-white">
              John Doe
            </h4>
            <p className="text-xs text-txco2 truncate dark:text-zinc-400">
              Admin
            </p>
          </div>
          <Avatar className="h-8 w-8 border border-slate-200 dark:border-zinc-700">
            <AvatarImage src="/images/avtar.png" />{" "}
            <AvatarFallback>
              <User className="h-4.5 w-4.5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
