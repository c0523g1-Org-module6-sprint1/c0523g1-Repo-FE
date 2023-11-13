import "./header.css"
import logo from "./image/Logo-background-transfer.png"
import React, {useEffect, useRef, useState} from "react";
import NavbarMobile from "../navbarMobile/NavbarMobile";
import {Link, useNavigate} from "react-router-dom";
// import * as Yup from "yup";

export default function Header() {
    const [isOpenNavbarMobile, setOpenNavbarMobile] = useState(false)
    const [isShowUserMenu, setIsShowUserMenu] = useState(false)
    const [isAuthentication, setIsAuthentication] = useState(false)
    const [name, setName] = useState("");
    const userMenuRef = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsShowUserMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleButtonClick = () => {
        setIsShowUserMenu((prevState) => !prevState);
    };
    const returnMainPage = ()=>{
        setIsAuthentication(false);
        navigate("/")
    }
    const handleChangeInput = (event) => {
        setName(event.target.value);
    };
    const handleGoPage = () => {
        navigate(`search-name/${name}`)
    }
    const goLoginPage = ()=>{
        navigate(`ThienBB`)
    }
    // const validateObject = {
    //     name: Yup.string()
    //         .required("Bạn chưa nhập tên!")
    //         .matches(/^$/)
    // }

    return (
        <header className="header">
            <NavbarMobile isOpenNavbarMobile={isOpenNavbarMobile}
                          setOpenNavbarMobile={setOpenNavbarMobile}
                          isAuthentication={isAuthentication}/>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <button
                        onClick={() => setOpenNavbarMobile(true)}
                        className="navbar-toggler sidebar-toggle bg-white me-2"
                        type="button"
                    ><span className="navbar-toggler-icon"/>
                    </button>
                    <div className="d-flex align-items-center">
                        {isAuthentication ?
                            <Link to={'/dat'}>
                                <img src={logo} alt=""
                                     style={{width: "120px", height: "150%"}}/>
                            </Link> :
                            <Link to={''}>
                                <img src={logo} alt=""
                                     style={{width: "120px", height: "150%"}}/>
                            </Link>
                        }
                    </div>
                    <div className="ms-2 collapse navbar-collapse navbar-middle" id="navbarSupportedContent">
                        {
                            isAuthentication ?
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0  navbar-login-items">
                                    <li className="nav-item">
                                        <Link to="/dat" className="nav-link icon" aria-current="page">
                                            <i className="fa-solid fa-house fs-4 text-white"></i>
                                            <span className="description-icon">Trang chủ</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/hung" className="nav-link icon" aria-current="page">
                                            <i className="fa-solid fa-user-plus fs-4 text-white"></i>
                                            <span className="description-icon">Gợi ý kết bạn</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/hanh" className="nav-link icon" aria-current="page">
                                            <i className="fa-solid fa-crown fs-4 text-white"></i>
                                            <span className="description-icon">Top 100</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/thien" className="nav-link icon" aria-current="page" >
                                            <i className="fa-solid fa-people-group fs-4 text-white"></i>
                                            <span className="description-icon">Danh sách bạn bè</span>
                                        </Link>
                                    </li>
                                </ul> :
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/tim-hieu" className="nav-link" aria-current="page">
                                            Tìm hiểu
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/an-toan" className="nav-link" aria-current="page">
                                            An toàn
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/ho-tro" className="nav-link" aria-current="page">
                                            Hỗ trợ
                                        </Link>
                                    </li>
                                </ul>
                        }
                        <form>
                            <div className="input-group">
                                <div onClick={handleGoPage} className='search-btn'>
                                    <span className="input-group-text">
                                         <i className="fa-solid fa-magnifying-glass" style={{color: "#9D66C3"}}></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control"
                                       placeholder="Nhập tên bạn bè" aria-label="Username" aria-describedby="addon-wrapping"
                                       onChange={handleChangeInput}
                                       value={name}
                                />
                            </div>
                        </form>
                    </div>
                    {
                        !isAuthentication ?
                            <div className="float-lg-end lien-login-btn">
                                <button className="d-flex align-items-center icon"><i
                                    className="fa-solid fa-right-to-bracket" style={{color: "#9D66C3"}} onClick={goLoginPage}></i>
                                </button>
                            </div> :
                            <div className="float-lg-end lien-login-btn">
                                <button ref={userMenuRef} className="position-relative"
                                        onClick={handleButtonClick}>
                                    <img src={"https://images.pexels.com/photos/2048716/pexels-photo-2048716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                         alt="avatar"
                                         style={{width: "36px", aspectRatio: '1/1', borderRadius: "50%", objectFit: "cover", objectPosition: "center"}}/>
                                    {
                                        isShowUserMenu && <div className={`user-menu`}>
                                            <ul className="position-relative">
                                                <li>
                                                    <Link to="/Long">Trang cá nhân</Link>
                                                </li>
                                                <li><Link to="/Quy">Đổi mật khẩu</Link>
                                                </li>
                                                <li>
                                                    <Link to="/Tri">Quản lý</Link>
                                                </li>
                                                <hr/>
                                                <li onClick={returnMainPage}>
                                                    <p>Đăng xuất</p>
                                                </li>
                                                <span></span>
                                            </ul>
                                        </div>
                                    }
                                </button>
                            </div>
                    }
                </nav>
            </div>
        </header>
    )
}