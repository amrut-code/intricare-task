import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CampaignsList } from "./pages/CampaignsList";
import { NewCampaignWizard } from "./pages/NewCampaignWizard";
import { useThemeStore } from "./store/useThemeStore";

const App: React.FC = () => {
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/campaigns" replace />} />
        <Route path="/campaigns" element={<CampaignsList />} />
        <Route path="/campaigns/new" element={<NewCampaignWizard />} />

        <Route path="*" element={<Navigate to="/campaigns" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
