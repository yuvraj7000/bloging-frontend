import React, { useState } from 'react';
import mn from './img/mn.png';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-white text-xl font-bold">
                        <a href="#">Blog<span className='text-blue-500'>Waves</span></a>
                    </div>

                    {/* Hamburger Icon (Visible on Small Screens) */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <ul className="hidden md:flex space-x-7 text-white">
                        <NavItem href="#home" text="Home" />
                        <NavItemWithDropdown />
                        <NavItem href="#about" text="Latest Blogs" />
                        <NavItem href="#services" text="Search" />
                        <NavItem href="#contact" text="Login/Register" />
                    </ul>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                    <ul className="flex flex-col space-y-2 text-white">
                        <NavItem href="#home" text="Home" mobile />
                        <NavItemWithDropdown mobile />
                        <NavItem href="#about" text="Latest Blogs" mobile />
                        <NavItem href="#services" text="Search" mobile />
                        <NavItem href="#contact" text="Login/Register" mobile />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ href, text, mobile }) => (
    <li className={`flex items-center ${mobile ? 'w-full' : ''}`}>
        <a href={href} className={`block py-2 hover:text-yellow-500 ${mobile ? 'w-full' : ''}`}>
            {text}
        </a>
    </li>
);

const NavItemWithDropdown = ({ mobile }) => (
    <li className={`relative flex justify-center ${mobile ? 'w-full' : ''}`}>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white hover:text-yellow-500">
                        <span>Category</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className={`bg-gray-700 p-2 shadow-lg ${mobile ? 'w-48' : 'min-w-[200px]'} grid grid-cols-2 gap-[2px] justify-items-center items-center`}>
                            {[...Array(7)].map((_, index) => (
                                <li key={index} className="w-full">
                                    <NavigationMenuLink className="px-4 py-2 text-white hover:bg-gray-600 rounded flex items-center justify-center flex-col w-full">
                                        <img className='aspect-video h-10 w-auto' src={mn} alt="" />
                                        <span>Education</span>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </li>
);

export default Navbar;