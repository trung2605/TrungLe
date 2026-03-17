import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import MainLayout from './layout/MainLayout/MainLayout';

// Import page components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="education" element={<EducationPage />} />

                <Route path="projects" element={<ProjectsPage />} />
                <Route path="certificates" element={<CertificatesPage />} />
                <Route path="activities" element={<ActivitiesPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AppContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
