/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ── Auth & route guards ───────────────────────────────────────────────────────
import {
  AuthProvider,
  ProtectedRoute,
  AdminRoute,
  StudentRoute,
  TeacherRoute,
  ParentRoute,
} from './context/AuthContext';

// ── Context providers ─────────────────────────────────────────────────────────
import { ThemeProvider }   from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// ── Public pages ──────────────────────────────────────────────────────────────
import EslLandingPage from './pages/EslLandingPage';
import AuthPage       from './pages/auth/AuthPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword  from './pages/ResetPassword';
import Unauthorized   from './pages/Unauthorized';

// ── Student pages ─────────────────────────────────────────────────────────────
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses   from './pages/student/StudentCourses';
import StudentSchedule  from './pages/student/StudentSchedule';
import StudentProgress  from './pages/student/StudentProgress';
import StudentProfile   from './pages/student/StudentProfile';

// ── Teacher pages ─────────────────────────────────────────────────────────────
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherClasses   from './pages/teacher/TeacherClasses';
import TeacherStudents  from './pages/teacher/TeacherStudents';
import TeacherSchedule  from './pages/teacher/TeacherSchedule';
import TeacherProfile   from './pages/teacher/TeacherProfile';

// ── Parent pages ──────────────────────────────────────────────────────────────
import ParentPortal    from './pages/parent/ParentPortal';
import ParentChildren  from './pages/parent/ParentChildren';
import ParentProgress  from './pages/parent/ParentProgress';
import ParentInvoices  from './pages/parent/ParentInvoices';

// ── Admin pages ───────────────────────────────────────────────────────────────
import AdminDashboard  from './pages/admin/AdminDashboard';
import AdminUsers      from './pages/admin/AdminUsers';
import AdminCourses    from './pages/admin/AdminCourses';
import AdminSchedule   from './pages/admin/AdminSchedule';
import AdminReports    from './pages/admin/AdminReports';
import AdminSettings   from './pages/admin/AdminSettings';

// ── Layouts ───────────────────────────────────────────────────────────────────
import StudentLayout from './components/layout/StudentLayout';
import TeacherLayout from './components/layout/TeacherLayout';
import ParentLayout  from './components/layout/ParentLayout';
import AdminLayout   from './components/layout/AdminLayout';

import './i18n';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <ScrollToTop />
              <Routes>

                {/* ── Public ───────────────────────────────────────────── */}
                <Route path="/"                           element={<EslLandingPage />} />
                <Route path="/login"                      element={<AuthPage defaultTab="login" />} />
                <Route path="/register"                   element={<AuthPage defaultTab="register" />} />
                <Route path="/forgot-password"            element={<ForgotPassword />} />
                <Route path="/password-reset/:resetToken" element={<ResetPassword />} />
                <Route path="/unauthorized"               element={<Unauthorized />} />

                {/* ── Student ──────────────────────────────────────────── */}
                <Route element={<StudentRoute />}>
                  <Route path="/student" element={<StudentLayout />}>
                    <Route index              element={<Navigate to="/student/dashboard" replace />} />
                    <Route path="dashboard"   element={<StudentDashboard />} />
                    <Route path="courses"     element={<StudentCourses />} />
                    <Route path="schedule"    element={<StudentSchedule />} />
                    <Route path="progress"    element={<StudentProgress />} />
                    <Route path="profile"     element={<StudentProfile />} />
                  </Route>
                </Route>

                {/* ── Teacher ──────────────────────────────────────────── */}
                <Route element={<TeacherRoute />}>
                  <Route path="/teacher" element={<TeacherLayout />}>
                    <Route index              element={<Navigate to="/teacher/dashboard" replace />} />
                    <Route path="dashboard"   element={<TeacherDashboard />} />
                    <Route path="classes"     element={<TeacherClasses />} />
                    <Route path="students"    element={<TeacherStudents />} />
                    <Route path="schedule"    element={<TeacherSchedule />} />
                    <Route path="profile"     element={<TeacherProfile />} />
                  </Route>
                </Route>

                {/* ── Parent ───────────────────────────────────────────── */}
                <Route element={<ParentRoute />}>
                  <Route path="/parent" element={<ParentLayout />}>
                    <Route index              element={<Navigate to="/parent/portal" replace />} />
                    <Route path="portal"      element={<ParentPortal />} />
                    <Route path="children"    element={<ParentChildren />} />
                    <Route path="progress"    element={<ParentProgress />} />
                    <Route path="invoices"    element={<ParentInvoices />} />
                  </Route>
                </Route>

                {/* ── Admin ────────────────────────────────────────────── */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index              element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard"   element={<AdminDashboard />} />
                    <Route path="users"       element={<AdminUsers />} />
                    <Route path="courses"     element={<AdminCourses />} />
                    <Route path="schedule"    element={<AdminSchedule />} />
                    <Route path="reports"     element={<AdminReports />} />
                    <Route path="settings"    element={<AdminSettings />} />
                  </Route>
                </Route>

                {/* ── Fallback ─────────────────────────────────────────── */}
                <Route path="*" element={<Navigate to="/" replace />} />

              </Routes>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}