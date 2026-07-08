import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CampaignsList } from "./pages/CampaignsList";
import { NewCampaignWizard } from "./pages/NewCampaignWizard";

const App: React.FC = () => {
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
