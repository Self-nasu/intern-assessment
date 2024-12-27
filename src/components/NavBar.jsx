import React from 'react'
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light shadow-sm cust-border border-top-0  ">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <a className="navbar-brand justify-content-center align-items-center d-flex gap-2">
                        <img src="./Logo.svg" style={{ height: 40 }} className="d-inline-block align-text-top">
                        </img> <span className='h5'> L&B (CURD) WebApp</span>
                    </a>
                    <p className='btn btn-secondary m-0 px-3' onClick={handleLogout}>Logout</p>
                </div>
            </nav>
        </>
    )
}

export default NavBar