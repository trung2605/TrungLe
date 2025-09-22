// App Configuration
const config = {
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
    timeout: 10000,
  },
  app: {
    name: process.env.REACT_APP_APP_NAME || 'Lê Trí Trung Portfolio',
    version: process.env.REACT_APP_VERSION || '1.0.0',
  },
  thirdParty: {
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    emailJS: {
      serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
      templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      userId: process.env.REACT_APP_EMAILJS_USER_ID,
    },
  },
  navigation: {
    sections: [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'about', label: 'About', path: '/about' },
      { id: 'education', label: 'Education', path: '/education' },
      { id: 'skills', label: 'Skills', path: '/skills' },
      { id: 'projects', label: 'Projects', path: '/projects' },
      { id: 'certificates', label: 'Certificates', path: '/certificates' },
      { id: 'prizes', label: 'Prizes', path: '/prizes' },
      { id: 'activities', label: 'Activities', path: '/activities' },
      { id: 'contact', label: 'Contact', path: '/contact' },
    ],
  },
};

export default config;