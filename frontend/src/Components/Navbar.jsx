import { Camera, Clock, Clock1, Clock2, Clock3, Clock4, ColumnsSettings, Handshake, Link, LucideCamera, PlusCircle, Settings, Settings2, Timer } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='px-[15px] flex gap-3 bg-[rgba(98,43,209,0.16)] p-[0.6vw] items-center justify-between'>
            <div className="flex items-center gap-3">
                <LucideCamera className='p-[8px] bg-gradient-to-r from-[rgb(97,43,209)] to-purple-400 rounded-xl' size="3.2vw" />
                <h1 className='font-bold text-[2.5vw]'>Event Snap </h1>
            </div>

            <div className="text-xl flex gap-8">
                <NavLink to="/" className={({ isActive }) => `px-[10px] ${isActive ? "border-b-2 border-b-purple-500" : ""} text-[1.7vw]`}>Home</NavLink>
                <NavLink to="/About" className={({ isActive }) => `px-[10px] ${isActive ? "border-b-2 border-b-purple-500" : ""} text-[1.7vw]`}>About</NavLink>
                <NavLink to="/Contact" className={({ isActive }) => `px-[10px] ${isActive ? "border-b-2 border-b-purple-500" : ""} text-[1.7vw]`}>Contact</NavLink>
                <NavLink to="/FAQ" className={({ isActive }) => `px-[10px] ${isActive ? "border-b-2 border-b-purple-500" : ""} text-[1.7vw]`}>FAQ</NavLink>

            </div>


           <NavLink to="/upload">  <div className="cursor-pointer text-xl flex  items-center gap-3 bg-gradient-to-r from-[rgb(97,43,209)] to-purple-400 p-[10px]  rounded-2xl">
               <PlusCircle className='cursor-pointer' size="1.5vw" />
                <button className='cursor-pointer text-[1vw]'>Host Event</button>
            </div>
            </NavLink>
        </div >
    )
}

export default Navbar
