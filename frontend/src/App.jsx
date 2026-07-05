import React from 'react'
import Navbar from './Components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import PhotoGallery from './Components/PhotoGallery'
import UploadPhotos from './Components/UploadPhoto' // Check kar lena agar file ka naam UploadPhotos hai toh piche 's' laga dena
import About from './Components/About'
import Contact from './Components/Contact'
import FAQ from './Components/FAQ'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /></>
    },
    {
      path: "/About",
      element: <><Navbar /><About /></>
    },
    {
      path: "/Gallery",
      element: <><Navbar /><PhotoGallery /></>
    },
    {
      path: "/Upload", // Yahan check kiya, sahi hai
      element: <><UploadPhotos /></>
    },
    {
      path: "/Contact", // Fixed: Added leading slash
      element: <><Navbar /><Contact /></>
    },
    {
      path: "/FAQ", // Fixed: Added leading slash
      element: <><Navbar /><FAQ /></>
    },
    {
      path: "*",
      element: <><Navbar /><h1 className='text-white text-3xl text-center mt-20'>404 Page Not Found</h1></>
    }
  ])

  return (
    // Fixed height layout to prevent screen clipping
    <div className='bg-black min-w-full min-h-screen bg-[url("/b.jpg")] bg-cover bg-center text-white overflow-x-hidden'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App