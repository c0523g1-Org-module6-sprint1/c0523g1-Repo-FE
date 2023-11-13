import React, {useEffect, useState} from 'react';
import './NavbarMobile.css'
import logo from "../header/image/Logo-background-transfer.png";
import {Link, useNavigate} from "react-router-dom";

const getWindowDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

const NavbarMobile = ({isOpenNavbarMobile, setOpenNavbarMobile, isAuthentication}) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const navigate = useNavigate()
    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        if (+windowDimensions.width > 991) {
            setOpenNavbarMobile(false)
        }
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions, setOpenNavbarMobile]);

    const handleGoPage = () => {
        navigate('search-name')
        setOpenNavbarMobile(false)
    }
    return (
        <>
            <div className={`navbar-mobile ${isOpenNavbarMobile && 'active'}`}>
                <div className="navbar-mobile-content">
                    <div className="close-btn" onClick={() => setOpenNavbarMobile(false)}>
                        close
                        <i className="fa-regular fa-circle-xmark fa-flip"></i>
                    </div>
                    <h1 className="logo">
                        <div className={'pt-3'}>
                            {isAuthentication ?
                                <Link to="/dat">
                                    <img src={logo}
                                         alt=""
                                         style={{width: "130px", height: "150%"}}/>
                                </Link> :
                                <Link to="/main-page">
                                    <img src={logo}
                                         alt=""
                                         style={{width: "130px", height: "150%"}}/>
                                </Link>
                            }
                        </div>
                    </h1>
                    {
                        isAuthentication ? <ul className="list-navbar-items">
                                <li className="navbar-item">
                                    <Link to="/Dat" className="d-flex align-items-center"><i
                                        className="fa-solid fa-house text-white"></i>Trang chủ</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Hung" className="d-flex align-items-center"><i
                                        className="fa-solid fa-user-plus text-white"></i>Gợi ý kết bạn</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/d" className="d-flex align-items-center"><i
                                        className="fa-solid fa-crown text-white"></i>Top 100</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/d" className="d-flex align-items-center"><i
                                        className="fa-solid fa-people-group text-white"></i>Danh sách bạn bè</Link>
                                </li>
                            </ul> :
                            <ul className="list-navbar-items">
                                <li className="navbar-item">
                                    <Link to="/tim-hieu" className="d-flex align-items-center"><i
                                        className="fa-regular fa-eye text-white"></i>Tìm hiểu</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/an-toan" className="d-flex align-items-center"><i
                                        className="fa-solid fa-shield-halved text-white"></i>An toàn</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/ho-tro" className="d-flex align-items-center"><i
                                        className="fa-solid fa-headphones text-white" style={{color: "#f1f2f3"}}></i>Hỗ trợ</Link>
                                </li>
                            </ul>
                    }
                    <form>
                        <div className="input-group">
                            <div onClick={handleGoPage} className='search-btn'>
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                            </div>
                            <input type="text" className="form-control"
                                   placeholder="Nhập tên bạn bè" aria-label="Username" aria-describedby="addon-wrapping"/>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`overlay ${isOpenNavbarMobile && 'active'}`}
                 onClick={() => setOpenNavbarMobile(false)}></div>
        </>
    );
};

export default NavbarMobile;