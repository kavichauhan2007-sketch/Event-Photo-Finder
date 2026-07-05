import { LucideCamera, PlusCircle } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='px-[3.75px] flex gap-3 bg-[rgba(98,43,209,0.16)] p-[0.6vw] items-center justify-between text-white'>
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <div className='p-[2] bg-linear-to-r from-[rgb(97,43,209)] to-purple-400 rounded-xl flex items-center justify-center'>
                    <LucideCamera className='text-white' size={24} />
                </div>
                <h1 className='font-bold text-[2.5vw]'>Event Snap</h1>
            </div>

            {/* Navigation Links */}
            <div className="text-xl flex gap-8">
                <NavLink to="/" className={({ isActive }) => `px-[10px] ${isActive ? "border-b-2 border-b-purple-500 text-purple-400" : "text-gray-300"} text-[1.7vw] transition-all`}>Home</NavLink>
                <NavLink to="/About" className={({ isActive }) => `px-[2.5px] ${isActive ? "border-b-2 border-b-purple-500 text-purple-400" : "text-gray-300"} text-[1.7vw] transition-all`}>About</NavLink>
                <NavLink to="/Contact" className={({ isActive }) => `px-[2.5px] ${isActive ? "border-b-2 border-b-purple-500 text-purple-400" : "text-gray-300"} text-[1.7vw] transition-all`}>Contact</NavLink>
                <NavLink to="/FAQ" className={({ isActive }) => `px-[2.5px] ${isActive ? "border-b-2 border-b-purple-500 text-purple-400" : "text-gray-300"} text-[1.7vw] transition-all`}>FAQ</NavLink>
            </div>

            {/* Action Button */}
            <NavLink to="/Upload" className="no-underline"> 
                <div className="cursor-pointer text-xl flex items-center gap-3 bg-linear-to-r from-[rgb(97,43,209)] to-purple-400 p-[2.5px] rounded-2xl text-white hover:opacity-90 transition">
                    <PlusCircle className='cursor-pointer' size={18} />
                    <button className='cursor-pointer text-[1vw] font-medium bg-transparent border-none outline-none text-white'>Host Event</button>
                </div>
            </NavLink>
        </div >
    )
}

export default Navbar