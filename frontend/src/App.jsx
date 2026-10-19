import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, NavLink } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import PhotoGallery from './Components/PhotoGallery';
import UploadPhotos from './Components/UploadPhoto';
import About from './Components/About';
import Contact from './Components/Contact';
import FAQ from './Components/FAQ';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col relative selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Apollo-style Clean Enterprise Footer */}
      <footer className="border-t border-white/[0.08] bg-[#07090e] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">EventSnap AI</span>
            <span>•</span>
            <span className="text-slate-500">Biometric Vector Graph Engine</span>
          </div>
          
          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <NavLink to="/" className="hover:text-amber-400 transition">Search</NavLink>
            <NavLink to="/Gallery" className="hover:text-amber-400 transition">Gallery</NavLink>
            <NavLink to="/Upload" className="hover:text-amber-400 transition">Host Event</NavLink>
            <NavLink to="/About" className="hover:text-amber-400 transition">Architecture</NavLink>
            <NavLink to="/Contact" className="hover:text-amber-400 transition">Contact</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'Gallery',
        element: <PhotoGallery />,
      },
      {
        path: 'Upload',
        element: <UploadPhotos />,
      },
      {
        path: 'About',
        element: <About />,
      },
      {
        path: 'Contact',
        element: <Contact />,
      },
      {
        path: 'FAQ',
        element: <FAQ />,
      },
      {
        path: '*',
        element: (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
            <h1 className="text-6xl font-black text-amber-400 font-mono">404</h1>
            <h2 className="text-xl font-bold text-white mt-2">Resource Not Found</h2>
            <p className="text-slate-400 text-xs mt-1">The requested URL was not found on this server.</p>
            <NavLink
              to="/"
              className="btn-apollo-primary mt-6 px-5 py-2 rounded-lg font-bold text-xs"
            >
              Return Home
            </NavLink>
          </div>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;