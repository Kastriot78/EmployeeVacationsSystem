import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../redux/userRedux';

const TopBar = ({ setShowSidebar }) => {
    const [show, setShow] = useState(false);
    const wrapperProfileMenuRef = useRef(null); //close search results when click anywhere
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const outsideClickAlert = (e) => {
        if (wrapperProfileMenuRef.current && show && !wrapperProfileMenuRef.current.contains(e.target)) {
            setShow(false)
        }
    };

    document.addEventListener('mousedown', outsideClickAlert);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className={`admin_dashboard_top_bar ${user && !user.isAdmin && 'justify-content-end'}`}>
            {user && user?.isAdmin && <button type='button' className="menu__toggler topbar_menu_btn" onClick={() => setShowSidebar(true)}>
                <svg
                    className="eltdf-anim-burger"
                    x="0px"
                    y="0px"
                    width="25.333px"
                    height="13.417px"
                    viewBox="0 0 25.333 13.417"
                    enableBackground="new 0 0 25.333 13.417"
                    xmlSpace="preserve"
                >
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.167"
                        y1="0.688"
                        x2="25.167"
                        y2="0.688"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.168"
                        y1="6.694"
                        x2="25.165"
                        y2="6.694"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.168"
                        y1="12.75"
                        x2="25.165"
                        y2="12.75"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.167"
                        y1="0.688"
                        x2="25.167"
                        y2="0.688"
                        className="eltdf-burger-filler"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.168"
                        y1="6.694"
                        x2="25.165"
                        y2="6.694"
                        className="eltdf-burger-filler"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.168"
                        y1="12.75"
                        x2="25.165"
                        y2="12.75"
                        className="eltdf-burger-filler"
                    />
                </svg>
            </button>}
            <div className="pl-10">
                <div className="profile" ref={wrapperProfileMenuRef}>
                    <div className='position-relative'>
                        <img
                            onClick={() => setShow(!show)}
                            src="/images/avatarUser.png"
                            className='top_header_img'
                            alt=""
                        />
                        <div className={`profile_menu ${show ? 'show' : ''}`}>
                            <div className="header_heading">
                                <h6 className='title'>{user?.name} {user?.lastName}</h6>
                                <p className='notification_text'>{user?.isAdmin ? 'Admin' : ''}</p>
                            </div>
                            {user && user?.isAdmin && <Link to="/admin/admin-dashboard" className='border-top menu-item' onClick={() => setShow(false)}>
                                <i className="fa-solid fa-gear"></i>
                                Admin Panel
                            </Link>}
                            <Link to="/full-calendar" className='border-top menu-item' onClick={() => setShow(false)}>
                                <i className="fa-solid fa-calendar-days"></i>
                                Full Calendar
                            </Link>
                            <Link to="/home" className='border-top menu-item' onClick={() => setShow(false)}>
                                <i className="fa-solid fa-plus"></i>
                                Request Vacation
                            </Link>
                            <Link to="/my-vacations" className='border-top menu-item' onClick={() => setShow(false)}>
                                <i className="fa-solid fa-reply-all"></i>
                                Vacations History
                            </Link>
                            <button className='border-top menu-item' onClick={handleLogout}>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar;
