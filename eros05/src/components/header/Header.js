import "./header.css"
import logo from "./image/Logo-background-transfer.png"
import React, {useEffect, useRef, useState} from "react";
import NavbarMobile from "../navbarMobile/NavbarMobile";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as SearchNameService from "../../service/searchName/searchNameService";
import * as securityService from "../../service/login/securityService";
import {LogoutConfirmModal} from "../searchNamePage/LogoutConfirmModal";

export default function Header() {
    const [isOpenNavbarMobile, setOpenNavbarMobile] = useState(false)
    const [isShowUserMenu, setIsShowUserMenu] = useState(false)
    const [isAuthentication, setIsAuthentication] = useState(false)
    const [name, setName] = useState("");
    const userMenuRef = useRef(null)
    const navigate = useNavigate()
    const [user, setUser] = useState();
    const accessToken = localStorage.getItem('accessToken')
    const [isShowModal, setShowModal] = useState(false);
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
    const handleChangeInput = (event) => {
        setName(event.target.value);
    };
    const handleSearch = React.useCallback(
        (event) => {
            event.preventDefault();
            var regex = /^[a-zA-Z0-9\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+$/;
            if (!name) {
                toast.error("Mời bạn nhập tên cần tìm!");
                return;
            } else if (!regex.test(name)) {
                toast.error("Tên không chứa ký tự đặc biệt!");
                return;
            } else if (name.length > 255){
                toast.error("Tên vượt quá độ dài cho phép!");
                return;
            }
            navigate(`public/search-name/${name}`);
        },
        [navigate, name]
    );
    const goLoginPage = () => {
        navigate(`login`)
    }

    useEffect(() => {
        const test = async () => {
            const resUsername = securityService.getUsernameByJwt();
            console.log('resUserName >>>>' + resUsername)
            // setUserName(resUsername)
            if (resUsername !== null) {
                const resUser = await SearchNameService.findByUserName(resUsername);
                console.log("resUser >>> " + resUser)
                if (resUser) {
                    setUser(resUser.data);
                }
            }
        }
        test();
    }, [accessToken]);

    useEffect(() => {
        if (user) {
            console.log(user)
            setIsAuthentication(true);
        }
    }, [user])
    const handleModal = async () => {
        setShowModal(true);
    }
    const closeModal = async () => {
        setShowModal(false);
    }
    useEffect(() => {
        if (!accessToken) {
            setIsAuthentication(false);
        }
    }, [accessToken])

    return (
        <header className="header">
            <NavbarMobile isOpenNavbarMobile={isOpenNavbarMobile}
                          setOpenNavbarMobile={setOpenNavbarMobile}
                          isAuthentication={isAuthentication}/>
            <LogoutConfirmModal show={isShowModal}
                                handleCloseFn={closeModal}/>
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
                            <Link to={'/newsfeed'}>
                                <img src={logo} alt=""
                                     style={{width: "120px", height: "150%"}}/>
                            </Link> :
                            <Link to={'/'}>
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
                                        <Link to="/newsfeed" className="nav-link icon" aria-current="page">
                                            <i className="fa-solid fa-house fs-4 text-white"></i>
                                            <span className="description-icon">Trang chủ</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link to="/invited_recommend_friend/RecommendList" className="nav-link icon"
                                              aria-current="page">
                                            <i className="fa-solid fa-user-plus fs-4 text-white"></i>
                                            <span className="description-icon">Gợi ý kết bạn</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/top_hundered" className="nav-link icon" aria-current="page">
                                            <i className="fa-solid fa-crown fs-4 text-white"></i>
                                            <span className="description-icon">Top 100</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/friend/list" className="nav-link icon" aria-current="page">
                                            <i className="fa-solid fa-people-group fs-4 text-white"></i>
                                            <span className="description-icon">Danh sách bạn bè</span>
                                        </Link>
                                    </li>
                                    {/*Qúy code ở đây*/}
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
                                <div onClick={handleSearch} className='search-btn'>
                                    <span className="input-group-text">
                                         <i className="fa-solid fa-magnifying-glass" style={{color: "#9D66C3"}}></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control"
                                       placeholder="Nhập tên bạn bè" aria-label="Username"
                                       aria-describedby="addon-wrapping"
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
                                    className="fa-solid fa-right-to-bracket" style={{color: "#9D66C3"}}
                                    onClick={goLoginPage}></i>
                                </button>
                            </div> :
                            <div className="float-lg-end lien-login-btn">
                                <button ref={userMenuRef} className="position-relative"
                                        onClick={handleButtonClick}>
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        style={{
                                            width: "36px",
                                            aspectRatio: '1/1',
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            objectPosition: "center"
                                        }}/>
                                    {
                                        isShowUserMenu && <div className={`user-menu`}>
                                            <ul className="position-relative">
                                                <li>
                                                    <Link to={`/personal-page/${user.id}`}>Trang cá nhân</Link>
                                                </li>
                                                <li>
                                                    <Link to="/change_password">Đổi mật khẩu</Link>
                                                </li>
                                                {user.role === 2 &&
                                                    <li>
                                                        <Link to="/accounts">Quản lý</Link>
                                                    </li>
                                                }
                                                <hr/>
                                                <li onClick={() => handleModal()}>
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