
import React, { useState, useEffect } from 'react';
import mn from './img/mn.png';
import axios from 'axios';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, NavLink } from 'react-router-dom';


const categories = [
    { category: 'mn', image: mn },
    { category: 'education', image: mn },
    { category: 'Health', image: mn },
    { category: 'Science', image: mn },
    { category: 'Sports', image: mn },
    { category: 'Entertainment', image: mn },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(`/api/v1/user/myProfile`, { withCredentials: true });
                if (response.status === 200) {
                    console.log(response.data);
                    setIsLoggedIn(true);
                    console.log('User is logged in');
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkLoginStatus();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className='flex justify-center bg-gray-800'>
            <nav className="bg-gray-800 p-4 max-w-screen-lg w-full">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="text-white text-xl font-bold">
                            <NavLink to='/'>Blog<span className='text-blue-500'>Waves</span></NavLink>
                        </div>

                        {/* Hamburger Icon (Visible on Small Screens) */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-white focus:outline-none">
                                {isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Navigation Links (Desktop) */}
                        <ul className="hidden md:flex space-x-7 text-white">
                            <NavLink to='/' className={({ isActive }) => `${isActive ? 'text-yellow-500' : ''}`}><NavItem text="Home" /></NavLink>
                            <NavItemWithDropdown />
                            <NavLink to='/search' className={({ isActive }) => `${isActive ? 'text-yellow-500' : ''}`}><NavItem text="Search" /></NavLink>
                            {isLoggedIn ? (
                                <NavLink to='/myProfile' className={({ isActive }) => `${isActive ? 'text-yellow-500' : ''}`}><NavItem text="My Profile" /></NavLink>
                            ) : (
                                <NavLink to='/login' className={({ isActive }) => `${isActive ? 'text-yellow-500' : ''}`}><NavItem text="Login/Register" /></NavLink>
                            )}
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                        <ul className="flex flex-col items-center space-y-2 text-white">
                            <Link to="/" onClick={closeMenu}><NavItem text="Home" mobile /></Link>
                            <NavItemWithDropdown mobile closeMenu={closeMenu} />
                            <Link to="/search" onClick={closeMenu}><NavItem text="Search" mobile /></Link>
                            {isLoggedIn ? (
                                <Link to="/myProfile" onClick={closeMenu}><NavItem text="My Profile" mobile /></Link>
                            ) : (
                                <Link to="/login" onClick={closeMenu}><NavItem text="Login/Register" mobile /></Link>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

const NavItem = ({ href, text, mobile }) => (
    <li className={`flex items-center ${mobile ? 'w-full justify-center' : ''}`}>
        <a href={href} className={`block py-2 hover:text-yellow-500 ${mobile ? 'w-full text-center' : ''}`}>
            {text}
        </a>
    </li>
);

const NavItemWithDropdown = ({ mobile, closeMenu }) => (
    <li className={`relative flex justify-center ${mobile ? 'w-full' : ''}`}>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white hover:text-yellow-500">
                        <span>Category</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className={`bg-gray-700 p-2 shadow-lg ${mobile ? 'w-48' : 'min-w-[200px]'} grid grid-cols-2 gap-[2px] justify-items-center items-center`}>
                            {categories.map((item, index) => (
                                <li key={index} className="w-full">
                                    <Link to={`/category/${item.category}`} onClick={closeMenu}>
                                        <NavigationMenuLink className="px-4 py-2 text-white hover:bg-gray-600 rounded flex items-center justify-center flex-col w-full">
                                            <img className="aspect-video h-10 w-auto" src={item.image} alt={item.category} />
                                            <span>{item.category}</span>
                                        </NavigationMenuLink>
                                    </Link>
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