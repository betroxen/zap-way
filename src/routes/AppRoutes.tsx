import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { DashboardPage } from '../pages/DashboardPage';
import { CasinoDirectoryPage } from '../pages/CasinoDirectoryPage';
import { CasinoDetailPage } from '../pages/CasinoDetailPage';
import { BonusOffersPage } from '../pages/BonusOffersPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { SupportPage } from '../pages/SupportPage';
import { FAQPage } from '../pages/FAQPage';
import { TermsOfServicePage } from '../pages/TermsOfServicePage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { AboutUsPage } from '../pages/AboutUsPage';
import { AffiliatePage } from '../pages/AffiliatePage';
import { BonusCalculatorPage } from '../pages/BonusCalculatorPage';
import { LiveRTPTrackerPage } from '../pages/LiveRTPTrackerPage';
import { MissionsPage } from '../pages/MissionsPage';
import { LeaderboardPage } from '../pages/LeaderboardPage';
import { CommunityHubPage } from '../pages/CommunityHubPage';
import { MessagesPage } from '../pages/MessagesPage';
import { TournamentsPage } from '../pages/TournamentsPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { ReportsPage } from '../pages/ReportsPage';
import { RewardsPage } from '../pages/RewardsPage';
import { LiveSupportPage } from '../pages/LiveSupportPage';
import { ResponsibleGamingPage } from '../pages/ResponsibleGamingPage';
import { CommercialDisclosurePage } from '../pages/CommercialDisclosurePage';
import { PartnerVettingPage } from '../pages/PartnerVettingPage';
import { ReviewMethodologyPage } from '../pages/ReviewMethodologyPage';
import { KnowledgeBasePage } from '../pages/KnowledgeBasePage';
import { StrategySandboxPage } from '../pages/StrategySandboxPage';
import { MinesGamePage } from '../pages/MinesGamePage';
import { PlinkoGamePage } from '../pages/PlinkoGamePage';
import { ProvablyFairPage } from '../pages/ProvablyFairPage';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null; // Or a loading spinner
    return user ? <>{children}</> : <Navigate to="/" replace />;
};

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Static/Info pages available to logged-in users */}
        <Route path="/about-us" element={<ProtectedRoute><AboutUsPage /></ProtectedRoute>} />
        <Route path="/affiliate" element={<ProtectedRoute><AffiliatePage /></ProtectedRoute>} />
        <Route path="/terms-of-service" element={<ProtectedRoute><TermsOfServicePage /></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicyPage /></ProtectedRoute>} />
        <Route path="/commercial-disclosure" element={<ProtectedRoute><CommercialDisclosurePage /></ProtectedRoute>} />
        <Route path="/partner-vetting" element={<ProtectedRoute><PartnerVettingPage /></ProtectedRoute>} />
        <Route path="/review-methodology" element={<ProtectedRoute><ReviewMethodologyPage /></ProtectedRoute>} />
        <Route path="/provably-fair" element={<ProtectedRoute><ProvablyFairPage /></ProtectedRoute>} />
        <Route path="/responsible-gaming" element={<ProtectedRoute><ResponsibleGamingPage /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute><FAQPage /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
        <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBasePage /></ProtectedRoute>} />

        {/* Protected App Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/casinos" element={<ProtectedRoute><CasinoDirectoryPage /></ProtectedRoute>} />
        <Route path="/casinos/:id" element={<ProtectedRoute><CasinoDetailPage /></ProtectedRoute>} />
        <Route path="/bonus-offers" element={<ProtectedRoute><BonusOffersPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/bonus-calculator" element={<ProtectedRoute><BonusCalculatorPage /></ProtectedRoute>} />
        <Route path="/rtp-tracker" element={<ProtectedRoute><LiveRTPTrackerPage /></ProtectedRoute>} />
        <Route path="/missions" element={<ProtectedRoute><MissionsPage /></ProtectedRoute>} />
        <Route path="/leaderboards" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityHubPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/tournaments" element={<ProtectedRoute><TournamentsPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
        <Route path="/live-support" element={<ProtectedRoute><LiveSupportPage /></ProtectedRoute>} />
        <Route path="/strategy-sandbox" element={<ProtectedRoute><StrategySandboxPage /></ProtectedRoute>} />
        <Route path="/strategy-sandbox/mines" element={<ProtectedRoute><MinesGamePage /></ProtectedRoute>} />
        <Route path="/strategy-sandbox/plinko" element={<ProtectedRoute><PlinkoGamePage /></ProtectedRoute>} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
