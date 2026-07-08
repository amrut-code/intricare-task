import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  MoreVertical,
  Trash2,
  Copy,
  ChevronDown,
  RefreshCw,
  BarChart3,
  Workflow,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { GradientButton } from "../components/ui/gradient-button";
import { Checkbox } from "../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

import { useCampaignStore } from "../store/useCampaignStore";
import type { Campaign } from "../store/useCampaignStore";

export { type Campaign };

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export const useCampaigns = () => {
  return useCampaignStore();
};

export const CampaignsList: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns, duplicateCampaign, deleteCampaign } = useCampaigns();

  // State for search and filter options
  const [channelFilter, setChannelFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<
    "advanced" | "standard"
  >("advanced");

  // Filtering campaigns
  const filteredCampaigns = campaigns.filter((c) => {
    const channelMatch =
      channelFilter === "All" || c.channels.includes(channelFilter);
    const statusMatch = statusFilter === "All" || c.status === statusFilter;
    return channelMatch && statusMatch;
  });

  const clearAllFilters = () => {
    setChannelFilter("All");
    setStatusFilter("All");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {filteredCampaigns.length === 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Channel Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-light text-txprm hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer">
                <span>
                  Channel{channelFilter !== "All" ? `: ${channelFilter}` : ""}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem onClick={() => setChannelFilter("All")}>
                  All Channels
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setChannelFilter('LinkedIn')}>LinkedIn</DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => setChannelFilter("Email")}>
                  Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-light text-txprm hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer">
                <span>
                  Status{statusFilter !== "All" ? `: ${statusFilter}` : ""}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Running")}>
                  Running
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Paused")}>
                  Paused
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear All button */}
            {(channelFilter !== "All" || statusFilter !== "All") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-light text-txprm hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}
      {filteredCampaigns.length !== 0 ? (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-lg text-txtco3 dark:text-white tracking-tight">
                All Campaigns List
              </h1>
              <p className="text-sm text-txco4 dark:text-zinc-400 mt-0.5">
                A quick look at all of your outreach initiatives.
              </p>
            </div>
            <GradientButton onClick={() => setIsModalOpen(true)}>
              New Campaign
            </GradientButton>
          </div>

          {/* Filter and Actions Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Channel Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-light text-txprm hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer">
                  <span>
                    Channel{channelFilter !== "All" ? `: ${channelFilter}` : ""}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  <DropdownMenuItem onClick={() => setChannelFilter("All")}>
                    All Channels
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => setChannelFilter('LinkedIn')}>LinkedIn</DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => setChannelFilter("Email")}>
                    Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Status Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-light text-txprm hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer">
                  <span>
                    Status{statusFilter !== "All" ? `: ${statusFilter}` : ""}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Running")}>
                    Running
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Paused")}>
                    Paused
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear All button */}
              {(channelFilter !== "All" || statusFilter !== "All") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-light text-txprm hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Export Action */}
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center justify-center gap-1.5 h-9 border-0 bg-white px-3 text-sm text-[#64748B] hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
            >
              <Download className="h-4 w-4 text-slate-400" />
              <span>Export List</span>
            </Button>
          </div>

          {/* Campaigns Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-zinc-400">
                <thead className="bg-[#F3F2F7] text-xs font-medium uppercase tracking-wider text-txprm border-b border-slate-200 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-2.5 w-12">
                      <Checkbox className="rounded" />
                    </th>
                    <th className="pr-3 py-2.5 font-bold">ALL CAMPAIGNS</th>
                    <th className="px-3 py-2.5 font-bold">CRM</th>
                    <th className="px-3 py-2.5 font-bold">INVITES SENT</th>
                    <th className="px-3 py-2.5 font-bold">REPLY RATE</th>
                    <th className="px-3 py-2.5 font-bold">EMAIL SENT</th>
                    <th className="px-3 py-2.5 font-bold">SENDER</th>
                    <th className="px-3 py-2.5 font-bold">STATUS</th>
                    <th className="px-3 py-2.5 font-bold">DAILY LIMIT</th>
                    <th className="px-3 py-2.5 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                  <AnimatePresence mode="popLayout">
                    {filteredCampaigns.map((campaign) => (
                      <motion.tr
                        key={campaign.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 group transition-colors"
                      >
                        <td className="px-4 py-5">
                          <Checkbox className="rounded" />
                        </td>
                        {/* Campaign Details */}
                        <td className="pr-3 py-5">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/campaigns/${campaign.id}`)
                                }
                                className="font-montserrat font-semibold text-md text-txprm hover:text-primary dark:text-white dark:hover:text-primary/80 transition-colors text-left"
                              >
                                {campaign.name}
                              </button>
                              <div className="flex gap-1">
                                {campaign.channels.map((channel) => (
                                  <span
                                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-light bg-[#EDF2FC] text-primary border-primary/10 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50 `}
                                  >
                                    {channel}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className="text-[11px] font-light text-txco5 dark:text-zinc-500 mt-1">
                              Created On: {campaign.createdOn}
                            </span>
                          </div>
                        </td>
                        {/* CRM Sync */}
                        <td className="px-3 py-5">
                          {campaign.crmSynced && campaign.hour !== "" ? (
                            <div className="flex flex-col">
                              <span className="flex items-center text-sm font-semibold text-txprm dark:text-zinc-300">
                                <span className="relative flex h-4">
                                  <img src="/public/images/image-1.png" />
                                </span>
                                {campaign.crmSynced}
                              </span>
                              <div className="text-xs font-normal text-txco5 dark:text-zinc-300">
                                {campaign.hour}
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="xs"
                              className="h-7 px-2.5 font-normal text-xs border-slate-200 text-txprm rounded-md hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            >
                              <RefreshCw className="h-3 w-3 text-slate-400 mr-1" />
                              <span>Sync to CRM</span>
                            </Button>
                          )}
                        </td>
                        {/* Invites Sent */}
                        <td className="px-3 py-5">
                          <div className="flex flex-col">
                            <span className="font-montserrat font-semibold text-md text-txprm dark:text-white text-[15px]">
                              {campaign.invitesSent}
                            </span>
                            <span className="text-xs font-light text-txco5 dark:text-zinc-500 mt-0.5">
                              {campaign.invitesAcceptedRate}% Accepted
                            </span>
                          </div>
                        </td>
                        {/* Reply Rate */}
                        <td className="px-3 py-5">
                          <div className="flex flex-col">
                            <span className="font-montserrat font-semibold text-md text-txprm dark:text-white text-[15px]">
                              {campaign.replyRate}
                            </span>
                            <span className="text-xs font-light text-txco5 dark:text-zinc-500 mt-0.5">
                              {campaign.replyReceivedRate}% Received
                            </span>
                          </div>
                        </td>
                        {/* Email Sent */}
                        <td className="px-3 py-5">
                          <div className="flex flex-col">
                            <span className="font-montserrat font-semibold text-md text-txprm dark:text-white text-[15px]">
                              {campaign.emailSent}
                            </span>
                            <span className="text-xs font-light text-txco5 dark:text-zinc-500 mt-0.5">
                              {campaign.emailOpenedRate}% Mail Opened
                            </span>
                          </div>
                        </td>
                        {/* Senders */}
                        <td className="px-3 py-5">
                          <div className="flex -space-x-1.5">
                            {campaign.senders.map((sender, idx) => (
                              <Avatar
                                key={idx}
                                className="h-7 w-7 border-2 border-white dark:border-zinc-900"
                              >
                                <AvatarImage src={sender.avatarUrl} />
                                <AvatarFallback className="text-[10px] bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                                  {sender.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </td>
                        {/* Status */}
                        <td className="px-3 py-5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
                              campaign.status === "Running"
                                ? "bg-green-50 text-[#549A75] dark:bg-#E5F8EE dark:text-green-400"
                                : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                            }`}
                          >
                            <img src="/public/images/pause.png" />

                            {campaign.status}
                          </span>
                        </td>
                        {/* Daily Limit */}
                        <td className="px-3 py-5">
                          <span className="text-xs font-normal text-txprm dark:text-zinc-300 rounded-md border border-slate-200 px-2 py-1">
                            {campaign.dailyLimit} Invites/day
                          </span>
                        </td>
                        {/* Actions Menu */}
                        <td className="px-3 py-5 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer">
                              <MoreVertical className="h-4.5 w-4.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuItem
                              // onClick={() =>
                              //   navigate(`/campaigns/${campaign.id}`)
                              // }
                              >
                                <BarChart3 className="h-4 w-4 mr-2 text-txprm" />
                                <span>View Analytics</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                              // onClick={() =>
                              //   navigate(`/campaigns/${campaign.id}`)
                              // }
                              >
                                <Workflow className="h-4 w-4 mr-2 text-txprm" />
                                <span>Edit Sequence</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => duplicateCampaign(campaign.id)}
                              >
                                <Copy className="h-4 w-4 mr-2 text-txprm" />
                                <span>Duplicate</span>
                              </DropdownMenuItem>

                              {/* <DropdownMenuItem
                            onClick={() => toggleCampaignStatus(campaign.id)}
                          >
                            {campaign.status === "Running" ? (
                              <>
                                <Pause className="h-4 w-4 mr-2 text-txprm" />
                                <span>Pause Sequence</span>
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2 text-txprm" />
                                <span>Run Sequence</span>
                              </>
                            )}
                          </DropdownMenuItem> */}

                              <DropdownMenuItem
                                onClick={() => deleteCampaign(campaign.id)}
                                className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="py-20 w-full flex flex-col justify-center items-center">
          <img src="/public/images/OBJECT.png" />
          <GradientButton className="mt-6" onClick={() => setIsModalOpen(true)}>
            New Campaign
          </GradientButton>
        </div>
      )}

      {/* Select Workflow Mode Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[620px] p-6">
          <DialogHeader className="border-b border-slate-100 pb-4 dark:border-zinc-800 flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-medium text-txprm dark:text-white font-montserrat">
                Select Workflow Mode
              </DialogTitle>
              <DialogDescription className="text-sm text-txco5 dark:text-zinc-500 mt-1">
                Choose how you want your campaign to behave
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-5 space-y-4">
            {/* Advanced Workflow Option */}
            <div
              onClick={() => setSelectedWorkflow("advanced")}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left",
                selectedWorkflow === "advanced"
                  ? "border-primary/50 bg-primary/5 dark:border-primary dark:bg-primary/5"
                  : "border-slate-200 hover:border-slate-300 dark:border-zinc-800 dark:hover:border-zinc-700",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-slate-300 dark:border-zinc-700">
                  {selectedWorkflow === "advanced" && (
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-txprm dark:text-white font-montserrat">
                      Advanced Workflow
                    </span>
                    <span className="bg-[#E5F8EE] text-[#549A75] dark:bg-green-950/20 dark:text-green-400 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-txco5 dark:text-zinc-500 leading-normal">
                    Best for high-volume outreach
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1.5 text-xs font-light text-txco5">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      Conditional logic
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      Multiple paths
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      More control
                    </span>
                  </div>
                </div>
              </div>

              {/* Advanced UI Illustration */}
              <div className="hidden sm:block">
                <img
                  src="/public/images/image-2.png"
                  className="h-14 w-auto object-contain"
                  alt="Advanced Workflow"
                />
              </div>
            </div>

            {/* Standard Workflow Option */}
            <div
              onClick={() => setSelectedWorkflow("standard")}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left",
                selectedWorkflow === "standard"
                  ? "border-primary bg-primary/5 dark:border-primary dark:bg-primary/5"
                  : "border-slate-200 hover:border-slate-300 dark:border-zinc-800 dark:hover:border-zinc-700",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-slate-300 dark:border-zinc-700">
                  {selectedWorkflow === "standard" && (
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-txprm dark:text-white font-montserrat">
                    Standard Workflow
                  </span>
                  <p className="text-xs text-txco5 dark:text-zinc-500 leading-normal">
                    Best for beginners
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1.5 text-xs font-light text-txco5">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      Linear steps
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      No conditions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      Easy Setup
                    </span>
                  </div>
                </div>
              </div>

              {/* Standard UI Illustration */}
              <div className="hidden sm:block">
                <img
                  src="/public/images/image-3.png"
                  className="h-14 w-auto object-contain"
                  alt="Standard Workflow"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="px-4.5 h-10 rounded-lg text-txco4 bg-[#E8E8E8] dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 font-light text-sm cursor-pointer"
            >
              Close
            </Button>
            <GradientButton
              onClick={() => {
                setIsModalOpen(false);
                navigate("/campaigns/new");
              }}
              className="px-6 h-10 font-light text-sm"
            >
              Next
            </GradientButton>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
