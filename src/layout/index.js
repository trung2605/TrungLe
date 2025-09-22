// Layout components exports
// Provides a single entry point for all layout components

import Header from './Header';
import Footer from './Footer';
import MainLayout from './MainLayout';

export { Header, Footer, MainLayout };

// Layout component collection
export const Layout = {
  Header,
  Footer,
  Main: MainLayout,
};