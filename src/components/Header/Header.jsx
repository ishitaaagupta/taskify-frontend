import React, { useState } from 'react';
import { Container, Logo } from "../index";
import LogoutBtn from './LogoutBtn';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "Projects", slug: "/", active: authStatus },
        { name: "Task Board", slug: "/taskboard", active: authStatus },
        { name: "New Project", slug: "/newproject", active: authStatus },
    ];

    return (
        <header className='py-4 shadow bg-purple-600'>
            <Container>
                <nav className='flex items-center justify-between flex-wrap'>
                    <div className='flex items-center flex-shrink-0 mr-6'>
                        <Link to="/">
                            <Logo width='50px' />
                        </Link>
                    </div>
                    <div className='block md:hidden'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='flex items-center px-3 py-2 border rounded text-white border-white hover:text-purple-300 hover:border-purple-300'
                        >
                            <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Menu</title><path d='M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z' /></svg>
                        </button>
                    </div>
                    <div className={`w-full block flex-grow md:flex md:items-center md:w-auto ${isOpen ? '' : 'hidden'}`}>
                        <ul className='flex flex-col md:flex-row md:ml-auto'>
                            {navItems.map((item) => (
                                item.active ? (
                                    <li key={item.name} className='md:mx-2 my-1'>
                                        <NavLink to={item.slug} className={({ isActive }) =>
                                            `${isActive ? "font-bold text-purple-200" : "text-white"}`
                                        }>
                                            <button className={`inline-block px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded-full duration-200`} onClick={() => { navigate(item.slug) }}>{item.name}</button>
                                        </NavLink>
                                    </li>
                                ) : null
                            ))}
                            {authStatus && (
                                <li className='md:mx-2 my-1'>
                                    <LogoutBtn textColor="text-white" isOpen={isOpen} />
                                </li>
                             )}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
