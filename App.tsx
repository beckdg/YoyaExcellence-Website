import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import TutorLayout from "./layouts/TutorLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TutorList from "./pages/TutorList";
import TutorDetails from "./pages/TutorDetails";
import TutorApplication from "./pages/TutorApplication";

// Tutor Pages
import TutorDashboard from "./pages/tutor/Dashboard";
import TutorNotifications from "./pages/tutor/Notifications";
import TutorReviews from "./pages/tutor/Reviews";
import EditProfile from "./pages/tutor/EditProfile";

// Admin Pages
import AdminApplications from "./pages/admin/Applications";
import AdminAnnouncements from "./pages/admin/Announcements";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth Routes (No Layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Public / Student Routes (Main Layout) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tutors" element={<TutorList />} />
            <Route path="/tutors/:id" element={<TutorDetails />} />
            <Route path="/apply" element={<TutorApplication />} />
          </Route>

          {/* Tutor Routes (Tutor Layout) */}
          <Route path="/tutor" element={<TutorLayout />}>
            <Route index element={<Navigate to="/tutor/dashboard" replace />} />
            <Route path="dashboard" element={<TutorDashboard />} />
            <Route path="notifications" element={<TutorNotifications />} />
            <Route path="reviews" element={<TutorReviews />} />
            <Route path="profile" element={<EditProfile />} />
          </Route>

          {/* Admin Routes (Admin Layout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={<Navigate to="/admin/applications" replace />}
            />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
