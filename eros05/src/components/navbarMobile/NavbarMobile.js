import React, {useEffect, useState} from 'react';
import './NavbarMobile.css'
import logo from "../header/image/Logo-background-transfer.png";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

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
    const [name, setName] = useState("");
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

    const handleSearch = React.useCallback(
        (event) => {
            event.preventDefault();
            var regex = /^[a-zA-Z0-9\s]+$/;
            if (!name) {
                toast.error("Mời bạn nhập tên cần tìm!");
                return;
            }else if(!regex.test(name)){
                toast.error("Tên không chứa ký tự đặc biệt!");
                return;
            }
            navigate(`public/search-name/${name}`);
        },
        [navigate, name]
    );
    const handleChangeInput = (event) => {
        setName(event.target.value);
    };
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
                                <Link to="/newsfeed">
                                    <img src={logo}
                                         alt=""
                                         style={{width: "130px", height: "150%"}}/>
                                </Link> :
                                <Link to="/">
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
                                    <Link to="/newsfeed" className="d-flex align-items-center"><i
                                        className="fa-solid fa-house text-white"></i>Trang chủ</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/invited_recommend_friend/RecommendList" className="d-flex align-items-center"><i
                                        className="fa-solid fa-user-plus text-white"></i>Gợi ý kết bạn</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/top_hundered" className="d-flex align-items-center"><i
                                        className="fa-solid fa-crown text-white"></i>Top 100</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/friend/list" className="d-flex align-items-center"><i
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
                            <div onClick={handleSearch} className='search-btn'>
                                    <span className="input-group-text">
                                         <i className="fa-solid fa-magnifying-glass" style={{color: "#9D66C3"}}></i>
                                    </span>
                            </div>
                            <input type="text" className="form-control"
                                   placeholder="Nhập tên bạn bè" aria-label="Username" aria-describedby="addon-wrapping"
                                   onChange={handleChangeInput}
                                // onKeyUp={handleInputKeyPress}
                                   value={name}
                            />
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