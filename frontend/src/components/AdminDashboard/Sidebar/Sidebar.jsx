import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style.css';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    useEffect(() => {
        const navigationItems = [
            { name: 'admin-dashboard', path: '/admin/admin-dashboard' },
            { name: 'pending-vacations', path: '/admin/pending-vacations' },
            { name: 'all-vacations', path: '/admin/all/vacations' },
        ];

        const matchingItem = navigationItems.find(item => item.path === location.pathname);

        setActiveItem(matchingItem ? matchingItem.name : 'All Vacations');
    }, [location.pathname]);

    return (
        <>
            <div className={`sidebar-overlay ${showSidebar ? 'active' : ''}`} onClick={() => setShowSidebar(false)}></div>
            <div className={`sidebar_wrapper ${showSidebar ? 'active' : ''}`}>
                <div className="admin_sidebar_header">
                    <div className='title'>
                        <Link to="/">Admin Panel</Link>
                    </div>
                    <button type='button' className='close_sidebar' onClick={() => setShowSidebar(false)}>
                        <svg
                            x="0px"
                            y="0px"
                            width="17px"
                            height="16px"
                            viewBox="-0.26 -0.512 17 16"
                            enableBackground="new -0.26 -0.512 17 16"
                            xmlSpace="preserve"
                        >
                            <line
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                x2="0.583"
                                y2="14.593"
                                x1="15.895"
                                y1="0.353"
                            />
                            <line
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                x2="15.896"
                                y2="14.593"
                                x1="0.584"
                                y1="0.353"
                            />
                        </svg>
                    </button>
                </div>
                <div className='admin_sidebar_content'>
                    <div className="wrapper">
                        <ul>
                            <div className="sidelist-header-name">
                                <span>App</span>
                            </div>
                            <li>
                                <Link to="/admin/admin-dashboard" className={activeItem === 'admin-dashboard' ? 'active' : ''} onClick={() => handleItemClick('admin-dashboard')}>
                                    <i className="fa-solid fa-film"></i>
                                    <p>
                                        <span>Dashboard</span>
                                    </p>
                                </Link>
                            </li>
                            <div className="sidelist-header-name">
                                <span>Movie Interface</span>
                            </div>
                            <li>
                                <Link to="/admin/pending-vacations" className={activeItem === 'pending-vacations' ? 'active' : ''} onClick={() => handleItemClick('pending-vacations')}>
                                    <i className="fa-solid fa-film"></i>
                                    <p>
                                        <span>Pending Vacations</span>
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/all/vacations" className={activeItem === 'all-vacations' ? 'active' : ''} onClick={() => handleItemClick('all-vacations')}>
                                    <i className="fa-solid fa-plus"></i>
                                    <p>
                                        <span>All Vacations</span>
                                    </p>
                                </Link>
                            </li>
                            <div className="sidelist-header-name">
                                <span>User Interface</span>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
