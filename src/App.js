import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import MainLayout from './layout/MainLayout/MainLayout';

// Import page components
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import EducationPage from './pages/EducationPage/EducationPage';
import SkillsPage from './pages/SkillsPage/SkillsPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage/CertificatesPage';
import PrizesPage from './pages/PrizesPage/PrizesPage';
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage';
import ContactPage from './pages/ContactPage/ContactPage';

function App() {
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="education" element={<EducationPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="certificates" element={<CertificatesPage />} />
                <Route path="prizes" element={<PrizesPage />} />
                <Route path="activities" element={<ActivitiesPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AppContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
