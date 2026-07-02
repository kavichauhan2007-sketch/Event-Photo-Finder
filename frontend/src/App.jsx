import React from 'react'
import Navbar from './Components/Navbar'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import PhotoGallery from './Components/PhotoGallery'
import UploadPhotos from './Components/UploadPhoto'
import About from './Components/About'
import Contact from './Components/Contact'
import FAQ from './Components/FAQ'

const App = () => {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/About",
      element:<><Navbar/><About/></>
    },
    {
      path:"/Gallery",
      element:<><Navbar/><PhotoGallery/></>
    },
    {
      path:"/Upload",
      element:<><UploadPhotos/></>
    },
    {
      path:"Contact",
      element:<><Navbar/><Contact/></>
    },
    {
      path:"FAQ",
      element:<><Navbar/><FAQ/></>
    },
    {
      path:"*",
      element:<><Navbar/><h1 className='text-white text-3xl text-center mt-20'>404 Page Not Found</h1></>
    }
  ])

  return (
    <div className='bg-black w-[100vw] h-[100vh] bg-[url("/b.jpg")] bg-cover text-white '>

      <RouterProvider router={router}/>
      
    </div>
  )
}

export default App
