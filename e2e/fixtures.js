const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/education', name: 'education' },
  { path: '/projects', name: 'projects' },
  { path: '/certificates', name: 'certificates' },
  { path: '/activities', name: 'activities' },
  { path: '/contact', name: 'contact' },
];

const setLang = async (page, lang) => {
  await page.addInitScript((l) => window.localStorage.setItem('lang', l), lang);
};

const mockEmailJsSuccess = async (page) => {
  await page.route('**/api.emailjs.com/**', (route) =>
    route.fulfill({ status: 200, body: 'OK' })
  );
};

const mockEmailJsFailure = async (page) => {
  await page.route('**/api.emailjs.com/**', (route) =>
    route.fulfill({ status: 500, body: 'Server error' })
  );
};

module.exports = { ROUTES, setLang, mockEmailJsSuccess, mockEmailJsFailure };
