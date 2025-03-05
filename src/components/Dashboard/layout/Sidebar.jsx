import React, { useState } from 'react'
import { FaBoxesStacked, FaUsers } from 'react-icons/fa6'
import { HiNewspaper, HiViewGrid } from 'react-icons/hi'
import { IoIosArrowForward } from 'react-icons/io'
import { MdCampaign } from 'react-icons/md'
import { RiAdminFill, RiDashboard2Fill } from 'react-icons/ri'
import { TiThList } from 'react-icons/ti'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [isGrid, setIsGrid] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleGrid = () => {
        setIsGrid(!isGrid);
    };
    const handleVisibility = () => {
        setIsVisible(!isVisible);
        setIsGrid(!isGrid);
    };
    const handleTab = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div className={`admin-sidebar ${isGrid ? "list" : "grid"} ${isVisible ? "visible" : ""}`}>
            <button className='mobile-arrow' onClick={handleVisibility}><ion-icon name={isVisible ? "close-outline" : "menu-outline"}></ion-icon></button>
            <Link className='admin-logo' to="/administrative/dashboard">
                <img src='https://img.b-e.az/media/logo/baku-electronics-logo.svg' />
                <h5>Baku Electronics</h5>
            </Link>
            <div className='sidebar-list'>
                <button onClick={handleGrid}>{isGrid ? <HiViewGrid /> : <TiThList />}</button>
                <Link onClick={handleTab} to="/administrative/dashboard"><div className='icon'><RiDashboard2Fill /></div><span>İdarə paneli</span><div className='arrow'><IoIosArrowForward /></div></Link>
                <Link onClick={handleTab} to="/administrative/products"><div className='icon'><FaBoxesStacked /></div><span>Məhsullar</span><div className='arrow'><IoIosArrowForward /></div></Link>
                <Link onClick={handleTab} to="/administrative/news"><div className='icon'><HiNewspaper /></div><span>Xəbərlər</span><div className='arrow'><IoIosArrowForward /></div></Link>
                <Link onClick={handleTab} to="/administrative/campaigns"><div className='icon'><MdCampaign /></div><span>Kampaniyalar</span><div className='arrow'><IoIosArrowForward /></div></Link>
                <Link onClick={handleTab} to="/administrative/users"><div className='icon'><FaUsers /></div><span>İstifadəçilər</span><div className='arrow'><IoIosArrowForward /></div></Link>
                <Link onClick={handleTab} to="/administrative/administrators"><div className='icon'><RiAdminFill /></div><span>Administrasiya</span><div className='arrow'><IoIosArrowForward /></div></Link>
            </div>
        </div>
    )
}

export default Sidebar