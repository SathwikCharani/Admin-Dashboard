import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { Loader2 } from 'lucide-react';

// Lazy-loaded pages for performance
const Login        = lazy(() => import('@/pages/public/Login'));
const Statistics   = lazy(() => import('@/pages/public/Statistics'));
const Profile      = lazy(() => import('@/pages/public/Profile'));
const Settings     = lazy(() => import('@/pages/public/Settings'));
const HelpCenter   = lazy(() => import('@/pages/public/HelpCenter'));
const Logout       = lazy(() => import('@/pages/public/Logout'));
const SuperAdminDashboard = lazy(() => import('@/pages/public/SuperAdminDashboard'));
const CreateAdmin  = lazy(() => import('@/pages/public/CreateAdmin'));
const CreateSuperAdmin = lazy(() => import('@/pages/public/CreateSuperAdmin'));
const CreateHub    = lazy(() => import('@/pages/public/CreateHub'));
const CreateStore  = lazy(() => import('@/pages/public/CreateStore'));

// Loading spinner fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <Loader2 size={36} className="animate-spin text-blue-500" />
      <p className="text-sm font-semibold text-slate-400">Loading page...</p>
    </div>
  </div>
);

const wrap = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes without Sidebar */}
      <Route path="/login" element={wrap(Login)} />

      {/* All routes nested inside Layout – renders Sidebar + Navbar for every page */}
      <Route element={<Layout />}>
        {/* Default redirect to Login */}
        <Route index element={<Navigate to="/login" replace />} />

        {/* Main pages */}
        <Route path="/super-admin-dashboard" element={wrap(SuperAdminDashboard)} />
        <Route path="/statistics"   element={wrap(Statistics)} />
        <Route path="/create-admin" element={wrap(CreateAdmin)} />
        <Route path="/create-super-admin" element={wrap(CreateSuperAdmin)} />
        <Route path="/create-hub" element={wrap(CreateHub)} />
        <Route path="/create-store" element={wrap(CreateStore)} />

        {/* Account pages */}
        <Route path="/profile"  element={wrap(Profile)} />
        <Route path="/settings" element={wrap(Settings)} />
        <Route path="/help"     element={wrap(HelpCenter)} />
        <Route path="/logout"   element={wrap(Logout)} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
