import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StartupProvider } from './context/StartupContext';
import { VerificationProvider } from './context/VerificationContext';
import { InvestorProvider } from './context/InvestorContext';

// Public pages
import HomePage from './pages/Home';
import LoginPage from './pages/Auth/User/LoginPage';
import RegisterPage from './pages/Auth/User/RegisterPage';
import ForgotPasswordPage from './pages/Auth/User/ForgotPasswordPage';
import ResetPasswordPage from './pages/Auth/User/ResetPasswordPage';
import VerifyEmailPage from './pages/Auth/User/VerifyEmailPage';
import VerificationSentPage from './pages/Auth/User/VerificationSentPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected pages
import DashboardPage from './pages/Dashboard/Startup/DashboardPage';
import Sidebar from './pages/Dashboard/Startup/Sidebar';
import StartupForm from './components/startup/StartupForm';
// import ProfilePage from './pages/ProfilePage';
// import SettingsPage from './pages/SettingsPage';

// // Admin pages
// import AdminDashboardPage from './pages/admin/DashboardPage';
// import AdminUsersPage from './pages/admin/UsersPage';

// Protected route component
import ProtectedRoute from './components/ProtectedRoute';
import MyStartups from './pages/Startup/MyStartups';
import UnauthorizedPage from './pages/UnauthorizedPage';
import StartupDirectory from './pages/Startup/StartupDirectory';
import AddStartupWrapper from './pages/Startup/AddStartupWrapper';

import RequestVerificationPage from './pages/Auth/Verification/RequestVerificationPage';

import FAQPage from './components/company/FAQPage';
import AboutPage from './components/company/AboutPage';
import CareersPage from './components/company/CareerPage';
import ContactUsPage from './components/company/ContactPage';
import PrivacyPage from './components/company/PrivacyPage';
import TermsPage from './components/company/TermsPage';
import StartupProfile from './pages/Startup/StartupProfile';
import WaitlistPage from './pages/WaitlistPage';
import ComingSoonPage from './pages/ComingSoonPage';
import ResendVerificationPage from './pages/Auth/User/ResendVerificationPage';
import InvestorHomePage from './components/investor/InvestorHomePage';
import InvestorDashboardPage from './pages/Dashboard/Investor/InvestorDashboardPage';
import InvestorSidebar from './pages/Dashboard/Investor/InvestorSidebar';
import InvestorDirectory from './components/investor/InvestorDirectory';
import InvestorProfilePage from './components/investor/InvestorProfilePage';
import DealsPage from './pages/Investor/DealsPage';
import FoundersPage from './pages/Investor/FoundersPage';
import MarketplacePage from './pages/Investor/MarketplacePage';
//import InvestorPortfolio from './pages/Investor/Investorportfolio';
import InvestorForm from './components/investor/InvestorForm';
import PitchDeckBuilder from './pages/pitch-deck/PitchDeckBuilder';
import TemplatesPage from './pages/pitch-deck/TemplatesPage';
import ExamplesPage from './pages/pitch-deck/ExamplesPage';
import { PitchDeckProvider } from './context/PitchDeckContext';
import ProfileSettingPage from './pages/Startup/ProfileSettingPage';
import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider } from './context/ThemeContext';
// import VerifyResultPage from './pages/Auth/VerifyResultPage';


const App: React.FC = () => {
  return (
    <ThemeProvider>
    <AuthProvider>
      <StartupProvider>
        <VerificationProvider>
          <InvestorProvider>
            <PitchDeckProvider>
              <ProfileProvider>
        <Router>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
            <Route path="/verify/:token" element={<VerifyEmailPage />} />
            <Route path="/verification-sent" element={<VerificationSentPage />} />
            <Route path="/resend-verification" element={<ResendVerificationPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path='/waitlist' element={<WaitlistPage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />

            

            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            {/* <Route path="/settings" element={<SettingsPage />} /> */}

            {/* 404 Page */}

            {/* <Route path="/verify-result" element={<VerifyResultPage />} /> */}

            {/* 404 Page */}

            {/* Investors Page */}
            <Route path="/investor" element={<InvestorHomePage />} />
            <Route path='/marketplace' element={<InvestorDirectory/>} />
            <Route path="/investor-profile" element={<InvestorProfilePage/>} />
            {/* <Route path="/deals" element={<DealsPage/>} />
            <Route path="founders" element={<FoundersPage/>} /> */}

            {/* Public Route */}
            <Route path="/startups" element={<StartupDirectory />} />
            <Route path="/startup-profile/:id" element={<StartupProfile />} />

            <Route path="investors" element={<InvestorDirectory/>} />


            {/* CompanyPage Route */}
            <Route path="/faqs" element={<FAQPage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactUsPage/>}/>

            

            {/* Protected routes for all authenticated users */}
            <Route element={<ProtectedRoute allowedRoles={['founder']} />}>
            <Route path="/request-verification" element={<RequestVerificationPage />} />

              {/* Updated route handling for pitch deck builder */}
            <Route path="/builder" element={<Navigate to="/builder/new" replace />} />
            <Route path="/builder/new" element={<PitchDeckBuilder />} />
            <Route path="/builder/:id" element={<PitchDeckBuilder />} />
      
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/examples" element={<ExamplesPage />} />

            <Route path="/dashboard" element={<Sidebar />}>
                <Route index element={<DashboardPage />} />
                <Route path="add-startup" element={<AddStartupWrapper />} />
                <Route path="edit-startup/:id" element={<StartupForm />} />
                <Route path="my-startups" element={<MyStartups />} />
                <Route path='settings' element={<ProfileSettingPage/>} />
              </Route>
            </Route>


               {/* Protected routes for all authenticated users */}
               <Route element={<ProtectedRoute allowedRoles={['investor']} />}>
              <Route path="/investor/dashboard" element={<InvestorSidebar />}>
                <Route index element={<InvestorDashboardPage />} />
                <Route path="founder" element={<FoundersPage />} />
                <Route path="deals-room" element={<DealsPage />} />
                <Route path="marketplace" element={<MarketplacePage/>} />
                {/* <Route path="portfolio" element={<InvestorPortfolio/>} /> */}
                <Route path="profile" element={<InvestorForm/>} />
              </Route>
            </Route>

            

            {/* Protected routes for admin users */}
            {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
            </Route> */}

            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
              </Router>
              </ProfileProvider>
            </PitchDeckProvider>
          </InvestorProvider>
        </VerificationProvider>
      </StartupProvider>
    </AuthProvider>
    </ThemeProvider>
  );
};

export default App;