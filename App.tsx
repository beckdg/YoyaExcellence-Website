import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TutorList from './pages/TutorList';
import TutorDetails from './pages/TutorDetails';
import TutorApplication from './pages/TutorApplication';
import AdminDashboard from './pages/AdminDashboard';

// Wrapper to conditionally render header/footer
const AppContent: React.FC = () => {
  const location = useLocation();
  const hideLayout = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tutors" element={<TutorList />} />
          <Route path="/tutors/:id" element={<TutorDetails />} />
          <Route path="/apply" element={<TutorApplication />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
