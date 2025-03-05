import React, { useContext, useEffect } from 'react'
import { FiSun } from 'react-icons/fi'
import { HiOutlineMoon } from 'react-icons/hi'
import { ThemeContext } from '../../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { IoLogOutOutline } from 'react-icons/io5';

const Navbar = () => {
    const [theme, setTheme] = useContext(ThemeContext);

    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const mainBody = document.querySelector("body");
        if (theme === "dark") {
            mainBody.classList.add("dark");
            mainBody.classList.remove("light");
        } else {
            mainBody.classList.add("light");
            mainBody.classList.remove("dark");
        }
    }, [theme]);
    return (
        <div className='admin-navbar'>
            <div className='left'>
            <h5>Filankes Filankesov</h5>
            <span className='role moderator'>Moderator</span>
            <span className='role admin'>Admin</span>
            <span className='role superadmin'>Superadmin</span>
            </div>
            <div className='right'>
            <div className="mode-toggle" onClick={changeTheme}>
                <div className={`toggle-round ${theme === "dark" ? "right" : "left"}`}></div>
                <span role="button"><HiOutlineMoon /><FiSun /></span>
            </div>
            
            <Link className='user-icon'>
                <FaUser />
            </Link>
            <button className='logout'><IoLogOutOutline /></button>
            </div>
            
        </div>
    )
}

export default Navbar