import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Linkedin,
  UploadCloud,
  Trash2,
  Search,
  FileText,
  User,
  Building,
  Briefcase,
  Type,
  Check,
  Download,
  Info,
  ListCheck,
  Settings,
  List,
  Calendar,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { useCampaigns } from "../pages/CampaignsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

import GradientButton from "@/components/ui/gradient-button";

export const NewCampaignWizard: React.FC = () => {
  const { campaigns, addCampaign } = useCampaigns();
  const navigate = useNavigate();

  // State values
  const [selectedMethod, setSelectedMethod] =
    useState<string>("linkedin_search");
  const [openPanels, setOpenPanels] = useState<string[]>([
    "import-method",
    "linkedin-url",
    "csv-upload",
  ]);

  // LinkedIn Search Flow States
  const [searchUrl, setSearchUrl] = useState<string>("");
  const [isValidatedUrl, setIsValidatedUrl] = useState<boolean>(false);

  // CSV Upload Flow States
  const [csvUploadState, setCsvUploadState] = useState<"idle" | "mapped">(
    "idle",
  );
  const [unmappedSearch, setUnmappedSearch] = useState<string>("");

  // Lookalike Audience Flow States
  const [isLookalikeModalOpen, setIsLookalikeModalOpen] =
    useState<boolean>(false);
  const [hasLeads, setHasLeads] = useState<boolean>(false);
  const [selectedLookalike, setSelectedLookalike] = useState<string>("founder");
  const [lookalikeLists, setLookalikeLists] = useState([
    { id: "founder", name: "Founder", description: "1000+ Users in the List" },
    {
      id: "tech_profiles",
      name: "Tech Profiles",
      description: "1000+ Users in the List",
    },
  ]);
  const [isLookalikeSelected, setIsLookalikeSelected] =
    useState<boolean>(false);

  const steps = [
    {
      label: "Define Target Audience",
      number: "01",
      icon: <ListCheck className="stroke-[.9] w-5 h-5" />,
      active: true,
    },
    {
      label: "Sender Profiles",
      number: "02",
      icon: <User className="stroke-[.9] w-5 h-5" />,
      active: false,
    },
    {
      label: "Settings",
      number: "03",
      icon: <Settings className="stroke-[.9] w-5 h-5" />,
      active: false,
    },
    {
      label: "Stats",
      number: "04",
      icon: <Calendar className="stroke-[.9] w-5 h-5" />,
      active: false,
    },
  ];

  const importMethods = [
    {
      id: "linkedin_search",
      title: "LinkedIn Search",
      description: "(Basic, Sales Nav, Post, Group or Event URL)",
      icon: Linkedin,
    },
    {
      id: "csv_upload",
      title: "Upload CSV File",
      description: "Upload linkedin profiles via CSV. Download Sample",
      icon: Calendar,
    },
    {
      id: "lookalike",
      title: "Lookalike Audience",
      description: "Use Lead Finder to find audience.",
      icon: User,
    },
    {
      id: "webhook",
      title: "Inbound Webhook",
      description: "Sync leads from zapier, n8n make in real time",
      icon: Linkedin,
    },
  ];

  const contactFields = [
    { label: "Full name", icon: User, value: "Full name", count: 35 },
    { label: "First name", icon: User, value: "First name", count: 3 },
    { label: "Last name", icon: User, value: "Last name", count: 12 },
    { label: "Company Name", icon: Building, value: "Company Name", count: 36 },
    { label: "Position", icon: Briefcase, value: "Position", count: 25 },
    { label: "Headline", icon: Type, value: "Headline", count: 25 },
  ];

  const initialUnmappedItems = [
    { name: "Location (9)", count: 3 },
    { name: "Industry (3)", count: 3 },
    { name: "Notes (9)", count: 9 },
  ];

  const [unmappedItems, setUnmappedItems] = useState(initialUnmappedItems);

  const handleNext = () => {
    const count = campaigns.length + 1;
    const defaultName = `Campaign #${count}`;
    const defaultChannels = ["LinkedIn", "Email"];
    addCampaign(defaultName, defaultChannels);
    navigate("/campaigns");
  };

  const handleValidateUrl = () => {
    if (searchUrl.trim()) {
      setIsValidatedUrl(true);
      // Close import method and url panels, showing completion
      setOpenPanels([]);
    }
  };

  const handleCsvUpload = () => {
    setCsvUploadState("mapped");
    setOpenPanels([]);
  };

  const handleResetCsv = () => {
    setCsvUploadState("idle");
    setOpenPanels(["import-method", "csv-upload"]);
  };

  const handleClearUnmapped = () => {
    setUnmappedItems([]);
  };

  const filteredUnmapped = unmappedItems.filter((item) =>
    item.name.toLowerCase().includes(unmappedSearch.toLowerCase()),
  );

  const isNextEnabled =
    (selectedMethod === "linkedin_search" && isValidatedUrl) ||
    (selectedMethod === "csv_upload" && csvUploadState === "mapped") ||
    (selectedMethod === "lookalike" && isLookalikeSelected) ||
    selectedMethod === "webhook";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 mx-auto"
    >
      {/* 4-Step Stepper Progress Bar */}
      <div className="flex flex-row items-center justify-between border border-slate-200 dark:border-zinc-800 dark:bg-zinc-900 rounded-md px-6 py-3 mb-6">
        <div className="flex flex-wrap items-center gap-6 w-full">
          {steps.map((step, idx) => {
            return (
              <div key={idx} className="flex items-center gap-3">
                {/* Step Circle/Box */}

                <div
                  className={`flex p-2 items-center justify-center rounded transition-all ${
                    step.active
                      ? "bg-primary/95 text-white shadow-sm shadow-[#3666EE]/20"
                      : "bg-[#E8e8e8] text-txprm dark:bg-zinc-800 dark:text-zinc-500 font-extralight"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Step Label */}
                <span
                  className={`text-sm font-medium font-montserrat ${
                    step.active
                      ? "text-txprm dark:text-white"
                      : "text-txprm/70 dark:text-zinc-400"
                  }`}
                >
                  {step.label}
                </span>
                {idx < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-txco2 dark:text-zinc-700 ml-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordion container & Left Timeline line */}
      <div className="relative pl-0 sm:pl-8 text-left">
        {/* Left vertical timeline line */}
        <div className="hidden sm:block absolute left-[10px] top-6 bottom-0 w-[1.5px] bg-[#E6E6F0] dark:bg-zinc-800"></div>

        <Accordion
          multiple
          value={openPanels}
          onValueChange={setOpenPanels}
          className="space-y-6 w-full border-0"
        >
          {/* SECTION 1: CHOOSE IMPORT METHOD */}
          <AccordionItem
            value="import-method"
            className="relative   dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden border-none"
          >
            {/* Left timeline dot */}
            <div className="hidden sm:block absolute -left-[31px] top-[18px] z-10">
              {(selectedMethod === "linkedin_search" && isValidatedUrl) ||
              (selectedMethod === "csv_upload" &&
                csvUploadState === "mapped") ||
              (selectedMethod === "lookalike" && isLookalikeSelected) ? (
                <div className="h-[18px] w-[18px] rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-sm">
                  <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                </div>
              ) : (
                <div className="h-[18px] w-[18px] rounded-full border-2 border-[#3666EE] bg-white flex items-center justify-center dark:bg-zinc-950">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#3666EE]" />
                </div>
              )}
            </div>

            {/* Accordion Header Trigger */}
            <AccordionTrigger className="hover:no-underline flex items-center justify-between  border border-slate-200 p-5 dark:border-zinc-800 text-md text-txprm dark:bg-zinc-900 dark:text-white font-montserrat tracking-tight cursor-pointer rounded-md bg-white">
              <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                <span>
                  {selectedMethod === "csv_upload" &&
                  csvUploadState === "mapped"
                    ? "Upload CSV file Selected"
                    : "Choose Import Method"}
                </span>
                {selectedMethod === "csv_upload" && (
                  <span className="text-[11px] text-txprm font-medium bg-[#f8f8f8] dark:bg-zinc-800 dark:text-zinc-500  px-3 py-0.5 rounded">
                    Step 1 of 2
                  </span>
                )}
              </div>
            </AccordionTrigger>

            {/* Accordion Content Grid */}
            <AccordionContent className="py-6 px-3 dark:border-zinc-800 dark:bg-zinc-900 rounded-2xl bg-white shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {importMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;

                  return (
                    <div
                      key={method.id}
                      onClick={() => {
                        setSelectedMethod(method.id);
                        setIsValidatedUrl(false);
                        if (
                          method.id === "csv_upload" &&
                          csvUploadState === "mapped"
                        ) {
                          setCsvUploadState("idle");
                        }
                        if (method.id === "lookalike") {
                          setIsLookalikeModalOpen(true);
                          setIsLookalikeSelected(false);
                        }
                      }}
                      className={`relative flex flex-col items-start gap-4 rounded-lg border p-5 text-left cursor-pointer transition-all duration-200 ${
                        isSelected &&
                        (method.id !== "lookalike" || isLookalikeSelected)
                          ? "border-[#3666EE] bg-[#3666EE]/5 shadow-sm dark:border-[#3666EE] dark:bg-[#3666EE]/5"
                          : "border-[#E6E6F0] hover:border-slate-300 hover:bg-slate-50/50 dark:border-zinc-800  dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/30 bg-white"
                      }`}
                    >
                      {/* Active Select Indicator Badge */}
                      {isSelected &&
                        (method.id !== "lookalike" || isLookalikeSelected) && (
                          <div className="absolute top-3 right-3 h-5 w-5 rounded bg-[#3666EE] text-white flex items-center justify-center shadow-sm">
                            <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                          </div>
                        )}

                      {/* Method Icon (Always Blue) */}
                      <div
                        className={` ${isSelected ? "text-[#3666EE]" : "text-txprm/70"}`}
                      >
                        <Icon className="h-5 w-5 stroke-[1.8]" />
                      </div>

                      {/* Text block */}
                      <div className="space-y-1">
                        <h4
                          className={`text-[17px] font-medium dark:text-white font-montserrat  ${isSelected ? "text-txprm" : "text-txprm/70"}`}
                        >
                          {method.title}
                        </h4>
                        <p
                          className={`text-xs leading-relaxed font-medium dark:text-zinc-500 font-montserrat   ${isSelected ? "text-txprm" : "text-txprm/70"}`}
                        >
                          {method.id === "csv_upload" ? (
                            <>
                              Upload linkedin profiles via CSV.{" "}
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="text-[#3666EE]/70 hover:underline font-medium cursor-pointer"
                              >
                                Download Sample
                              </span>
                            </>
                          ) : (
                            method.description
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION 2: SUB-STEPS (DYNAMIC) */}

          {/* FLOW A: LINKEDIN SEARCH FLOW */}
          {selectedMethod === "linkedin_search" && (
            <AccordionItem
              value="linkedin-url"
              className="relative  dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden border-none"
            >
              {/* Left timeline dot */}
              <div className="hidden sm:block absolute -left-[31px] top-[18px] z-10">
                {isValidatedUrl ? (
                  <div className="h-[18px] w-[18px] rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-sm">
                    <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                  </div>
                ) : (
                  <div className="h-[18px] w-[18px] rounded-full border-2 border-[#3666EE] bg-white flex items-center justify-center dark:bg-zinc-950">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#3666EE]" />
                  </div>
                )}
              </div>

              {/* Header */}
              <AccordionTrigger className="hover:no-underline flex items-center justify-between border border-slate-200 p-5  dark:bg-zinc-900 dark:border-zinc-800 text-md text-rxprm dark:text-white font-montserrat tracking-tight cursor-pointer rounded-md bg-white">
                <span>Paste LinkedIn Search URL</span>
              </AccordionTrigger>

              {/* Panel Content */}
              <AccordionContent className="p-6 mt-4 border  border-slate-200 dark:border-zinc-800 dark:bg-zinc-900 rounded-md bg-white space-y-4">
                {/* LinkedIn link helper block */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5  dark:bg-zinc-850 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-sm font-medium text-txprm dark:text-zinc-300 font-montserrat">
                    <div className="h-5 w-5 border border-[#3666EE] text-[#3666EE] rounded flex items-center justify-center text-[10px] font-bold font-sans">
                      in
                    </div>
                    <span>
                      Find your target audience with{" "}
                      <span className="text-[#3666EE] hover:underline cursor-pointer">
                        LinkedIn Search
                      </span>{" "}
                      or{" "}
                      <span className="text-[#3666EE] hover:underline cursor-pointer">
                        Sales Navigator
                      </span>{" "}
                      or{" "}
                      <span className="text-[#3666EE] hover:underline cursor-pointer">
                        Post URL
                      </span>{" "}
                      or{" "}
                      <span className="text-[#3666EE] hover:underline cursor-pointer">
                        Group URL
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#3666EE] hover:underline font-light underline font-montserrat cursor-pointer">
                    <Info className="h-4 w-4" />
                    <span>Search Guide</span>
                  </div>
                </div>

                {/* Input row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/search/results/people/?keywords="
                    className="w-full sm:flex-1 h-10 px-4 rounded-xl border border-[#E6E6F0] focus:outline-none focus:border-[#3666EE] bg-white text-xs font-medium text-slate-800 font-montserrat"
                  />
                  <Button
                    onClick={handleValidateUrl}
                    className="w-full sm:w-auto bg-[#3666EE] hover:bg-[#2557eb] text-white px-6 rounded-xl font-bold font-montserrat h-10 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Validate
                  </Button>
                </div>

                <div className="flex items-start gap-1.5 pl-2 text-[11px] text-txprm/70 font-normal font-montserrat mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Paste the search URL directly from LinkedIn</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* FLOW B: CSV UPLOAD FLOW */}
          {selectedMethod === "csv_upload" && (
            <>
              {/* Timeline segment: File Upload trigger / Mapping screen */}
              <AccordionItem
                value="csv-upload"
                className="relative  dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden border-none"
              >
                {/* Left timeline dot */}
                <div className="hidden sm:block absolute -left-[31px] top-[18px] z-10">
                  {csvUploadState === "mapped" ? (
                    <div className="h-[18px] w-[18px] rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-sm">
                      <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                    </div>
                  ) : (
                    <div className="h-[18px] w-[18px] rounded-full border-2 border-[#3666EE] bg-white flex items-center justify-center dark:bg-zinc-950">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#3666EE]" />
                    </div>
                  )}
                </div>

                {/* Header */}
                <AccordionTrigger className="hover:no-underline flex items-center justify-between border  dark:bg-zinc-900 border-slate-200 p-5 dark:border-zinc-800 text-md text-txprm dark:text-white font-montserrat tracking-tight cursor-pointer rounded-md bg-white">
                  <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <span>Upload CSV File</span>
                    <span className="text-[11px] text-txprm font-medium bg-[#f8f8f8] dark:bg-zinc-800 dark:text-zinc-500  px-3 py-0.5 rounded">
                      Step 1 of 2
                    </span>
                  </div>
                </AccordionTrigger>

                {/* Panel Content (Upload Zone) */}
                <AccordionContent className="p-6 mt-4 border  border-slate-200 dark:border-zinc-800 dark:bg-zinc-900 rounded-md bg-white space-y-4">
                  {csvUploadState === "idle" ? (
                    <>
                      {/* Drag and Drop Zone */}
                      <div
                        onClick={handleCsvUpload}
                        className="border-2 border-dashed border-[#3666EE]/30 bg-[#3666EE]/2 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-[#3666EE]/5 transition-all group"
                      >
                        <div className="h-10 w-10 bg-[#EBF0FF] rounded-md flex items-center justify-center text-[#3666EE] mb-3 group-hover:scale-105 transition-transform">
                          <Download className="h-6 w-6 stroke-[1.8]" />
                        </div>
                        <span className="text-lg font-normal text-primary font-montserrat dark:text-zinc-300">
                          Drag a File or click a browse
                        </span>
                        <span className="text-sm text-txprm font-normal mt-1 font-montserrat">
                          File with up to 100 rows works best
                        </span>
                      </div>

                      {/* Download sample link */}
                      <div className="flex items-center gap-1.5 text-sm text-txprm hover:underline cursor-pointer font-montserrat">
                        <UploadCloud className="h-5 w-5 text-[#3666EE]" />
                        <span>Download a sample file</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-slate-500 font-medium py-2">
                      CSV File loaded successfully. Properties mapped below.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Sub-step 2: Map Properties Dashboard */}
              {csvUploadState === "mapped" && (
                <div className="relative">
                  {/* Left timeline dot */}
                  <div className="hidden sm:block absolute -left-[31px] top-[18px] z-10">
                    <div className="h-[18px] w-[18px] rounded-full border-2 border-[#3666EE] bg-white flex items-center justify-center dark:bg-zinc-950">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#3666EE]" />
                    </div>
                  </div>

                  {/* Mapping Container Card */}
                  <Card className="border border-slate-100 dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden rounded bg-white p-4 sm:p-6 mt-4">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800 mb-2">
                      <div className="space-y-1">
                        <h3 className="text-xl font-medium text-txprm dark:text-white font-montserrat tracking-tight">
                          Map Properties
                        </h3>
                        <p className="text-[13px] text-txprm flex items-center gap-1.5 font-montserrat">
                          <span>✓</span> Make sure file includes contact name
                          and phone number
                        </p>
                      </div>
                      <button
                        onClick={handleResetCsv}
                        className="h-8 w-8 rounded-lg  text-red-500 flex items-center justify-center transition-all cursor-pointer"
                        title="Delete upload"
                      >
                        <Trash2 className="h-7 w-7 stroke-[.8]" />
                      </button>
                    </div>

                    {/* Dashboard Columns Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left: Mapping fields list (Span 2) */}
                      <div className="lg:col-span-2 space-y-4 border border-slate-200 rounded">
                        <div className="hidden sm:flex items-center text-xs font-bold py-4 border-b border-slate-200 tracking-wider text-txprm dark:text-zinc-500 font-montserrat px-1">
                          <span className="w-1/2 pl-3">Contact Field</span>
                          <span className="w-1/2 pl-3">CSV Column</span>
                        </div>

                        {/* List items mapping rows */}
                        <div className="space-y-3 sm:space-y-2.5 p-3 sm:p-0">
                          {contactFields.map((field, idx) => {
                            const Icon = field.icon;
                            return (
                              <div
                                key={idx}
                                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2"
                              >
                                {/* Left field pill */}
                                <div className="w-full sm:w-1/2 sm:ml-3 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800 rounded p-3 flex items-center gap-2.5 text-[13px] font-normal text-txprm dark:text-zinc-300 font-montserrat">
                                  <FileText className="h-5 w-5 text-[#10B981] stroke-[.8]" />
                                  <span>{field.label}</span>
                                </div>

                                {/* Right dropdown/select pill mockup */}
                                <div className="w-full sm:w-1/2 sm:mr-3 bg-[#f8f8f8] dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 rounded p-3 flex items-center justify-between text-[13px] font-normal text-txprm dark:text-zinc-300 cursor-pointer font-montserrat">
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4 text-[#8C8CA1]" />
                                    <span>{field.value}</span>
                                  </div>
                                  <span className="text-[13px] font-normal text-txprm">
                                    ({field.count})
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Unmapped list (Span 1) */}
                      <div className="dark:bg-zinc-800/20 border border-slate-100 dark:border-zinc-800 rounded space-y-4 flex flex-col">
                        <h4 className="flex items-center text-xs font-bold py-4 border-b border-slate-200  tracking-wider text-txprm dark:text-zinc-500 font-montserrat px-3">
                          Unmapped Works
                        </h4>

                        {/* Search field */}
                        <div className="relative px-3">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C8CA1]" />
                          <input
                            type="text"
                            value={unmappedSearch}
                            onChange={(e) => setUnmappedSearch(e.target.value)}
                            placeholder="Search"
                            className="w-full h-9 pl-9 pr-4 rounded border border-[#E6E6F0] focus:outline-none focus:border-[#3666EE] bg-white text-xs font-medium text-slate-800 font-montserrat"
                          />
                        </div>

                        {/* Items list */}
                        <div className="flex-1 space-y-2 overflow-y-auto px-2 sm:px-3">
                          {filteredUnmapped.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded p-2 sm:p-3 flex items-center justify-between text-xs sm:text-sm font-normal text-txprm dark:text-zinc-300 font-montserrat"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <List className="h-4 w-4 text-slate-400 dark:text-zinc-500 shrink-0 stroke-[1.2]" />
                                <span className="whitespace-nowrap truncate">{item.name}</span>
                              </div>
                              <span className="text-xs sm:text-sm font-normal text-txprm shrink-0">
                                ({item.count})
                              </span>
                            </div>
                          ))}
                          {unmappedItems.length > 0 && (
                            <span
                              onClick={handleClearUnmapped}
                              className="text-sm text-primary font-normal hover:underline cursor-pointer text-right block font-montserrat"
                            >
                              Clear All Matched
                            </span>
                          )}

                          {filteredUnmapped.length === 0 && (
                            <div className="text-[11px] text-slate-400 dark:text-zinc-600 text-center py-8 font-medium">
                              No unmapped fields found
                            </div>
                          )}
                        </div>

                        {/* Clear link */}
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </>
          )}
        </Accordion>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleNext}
          disabled={!isNextEnabled}
          className={`px-8 py-2 rounded-xl font-bold font-montserrat shadow-sm h-10 transition-all ${
            isNextEnabled
              ? "bg-[#3666EE] hover:bg-[#2557eb] text-white cursor-pointer active:scale-[0.98]"
              : "bg-[#D0DCFF] text-white cursor-not-allowed opacity-80"
          }`}
        >
          Next
        </Button>
      </div>

      {/* Lookalikes Dialog Modal */}
      <Dialog
        open={isLookalikeModalOpen}
        onOpenChange={setIsLookalikeModalOpen}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl bg-white border-none shadow-xl">
          {/* Header */}
          <DialogHeader className="bg-[#f7f7f7]  dark:bg-zinc-900 p-5 pb-4  border-b border-slate-100 flex flex-col gap-1">
            <DialogTitle className="text-txprm text-2xl font-normal font-montserrat">
              Lookalikes
            </DialogTitle>
            <DialogDescription className="text-txprm text-sm font-normal font-montserrat">
              Select a lookalike list for this campaign
            </DialogDescription>
          </DialogHeader>

          {/* Modal Body */}
          <div className="p-6">
            {!hasLeads ? (
              /* State A: Empty state */
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <h3 className="text-txprm dark:text-white text-2xl font-medium font-montserrat leading-tight">
                  You don't have any leads
                </h3>
                <p className="text-txprm text-xs font-medium mt-1 font-montserrat leading-normal">
                  Create a lead list to start running campaigns
                </p>
                <GradientButton
                  onClick={() => setHasLeads(true)}
                  className="text-white px-8 py-2.5 rounded-sm font-montserrat text-xs mt-6 shadow-sm transition-all active:scale-[0.98] cursor-pointer h-10 animate-fade-in"
                >
                  Create a List
                </GradientButton>
              </div>
            ) : (
              /* State B: List Selection */
              <div className="space-y-4">
                <div className="space-y-3">
                  {lookalikeLists.map((list) => {
                    const isChecked = selectedLookalike === list.id;
                    return (
                      <div
                        key={list.id}
                        onClick={() => setSelectedLookalike(list.id)}
                        className={`flex items-center justify-between rounded-sm border p-4 flex-row cursor-pointer transition-all duration-200 ${"border-[#3666EE]/60 bg-[#3666EE]/5 shadow-sm"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-[#F4F5F8] text-txco3 rounded-xl flex items-center justify-center">
                            <List className="h-5 w-5 stroke-[1.8]" />
                          </div>
                          <div className="flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span className="text-sm font-semibold text-txco3 font-montserrat">
                              {list.name}
                            </span>
                            <span className="text-[11px] font-medium text-[#8C8CA1] font-montserrat">
                              ({list.description})
                            </span>
                          </div>
                        </div>

                        {/* Checkbox */}
                        <div
                          className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${
                            isChecked
                              ? "border-[#3666EE] bg-[#3666EE] text-white shadow-sm"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          {isChecked && (
                            <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add New link */}
                <div className="flex justify-end pr-1">
                  <span
                    onClick={() => {
                      const count = lookalikeLists.length + 1;
                      const names = [
                        "Founder",
                        "Tech Profiles",
                        "Marketing Leaders",
                        "Sales Directors",
                      ];
                      const newName = names[count - 1] || `List #${count}`;
                      const newItem = {
                        id: "new_" + count,
                        name: newName,
                        description: "1000+ Users in the List",
                      };
                      setLookalikeLists([...lookalikeLists, newItem]);
                    }}
                    className="text-xs text-[#3666EE] font-normal hover:underline cursor-pointer font-montserrat"
                  >
                    Add New
                  </span>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-5 mt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    onClick={() => setIsLookalikeModalOpen(false)}
                    className="px-4.5 h-10 rounded-lg text-txco4 bg-[#E8E8E8] dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 font-light text-sm cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <GradientButton
                    onClick={() => {
                      setIsLookalikeSelected(true);
                      setIsLookalikeModalOpen(false);
                      setOpenPanels([]); // collapse all panels when selected
                    }}
                    className="px-6 h-10 font-light text-sm"
                  >
                    Select List
                  </GradientButton>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
