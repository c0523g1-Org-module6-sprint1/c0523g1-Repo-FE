import "./header.css"
import logo from "./image/Logo-background-transfer.png"
import React, {useEffect, useRef, useState} from "react";
import NavbarMobile from "../navbarMobile/NavbarMobile";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as SearchNameService from "../../service/searchName/searchNameService";
import * as securityService from "../../service/login/securityService";
import {LogoutConfirmModal} from "../searchNamePage/LogoutConfirmModal";
import {getRoleByJwt} from "../../service/login/securityService";
import * as giftService from "../../service/gift/giftService";
import {CheckAccountTypes} from "../update_account/CheckAccountTypes";
import * as packageTypesService from "../../service/update_account/packageTypesService";

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
    const [gift, setGift] = useState([]);
    const [giftQuantity, setGiftQuantity] = useState([]);
    const [gitStatus, setGitStatus] = useState(true);
    const [isHistoryClicked, setHistoryClicked] = useState(false);
    const [isRepositoryClicked, setRepositoryClicked] = useState(false);
    // const [accountType, setAccountType] = useState()

    const getGift = async () => {
        const resUsername = securityService.getUsernameByJwt();
        const res = await giftService.getAllList(resUsername);

        setGift(res);
    };
    const getGiftQuantity = async () => {
        const resUsername = securityService.getUsernameByJwt();
        const res = await giftService.getAllQuantity(resUsername);
        setGiftQuantity(res);
    };
    const getHistory = async () => {
        setGitStatus(true);
        setHistoryClicked(true);
        setRepositoryClicked(false);
    };
    const getRepository = async () => {
        setGitStatus(false);
        setHistoryClicked(false);
        setRepositoryClicked(true);
    };
    useEffect(() => {
        getHistory();
        getGift();
        getGiftQuantity()
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

    function formatDateTime(dateTime) {
        let formattedDate = new Date(dateTime);
        console.log(dateTime);
        let year = formattedDate.getFullYear();
        let month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
        let day = formattedDate.getDate().toString().padStart(2, "0");
        let hours = formattedDate.getHours().toString().padStart(2, "0");
        let minutes = formattedDate.getMinutes().toString().padStart(2, "0");
        let seconds = formattedDate.getSeconds().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    const handleButtonClick = () => {
        setIsShowUserMenu((prevState) => !prevState);
    };
    const handleChangeInput = (event) => {
        setName(event.target.value);
    };
    const handleSearch = React.useCallback(
        () => {
            var regex = /^[a-zA-Z0-9\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+$/;
            if (!name) {
                toast.error("Mời bạn nhập tên cần tìm!");
                return;
            } else if (!regex.test(name)) {
                toast.error("Tên không chứa ký tự đặc biệt!");
                return;
            } else if (name.length > 255) {
                toast.error("Tên vượt quá độ dài cho phép!");
                return;
            }
            try{
                navigate(`public/search-name/${name}`);
            }catch (e){
                console.log("Lỗi URL searchName")
            }

        },
        [navigate, name]
    );

    const goLoginPage = () => {
        navigate(`login`)
    }

    useEffect(() => {
        const test = async () => {
            const resUsername = securityService.getUsernameByJwt();
            if (resUsername !== null) {
                const resUser = await SearchNameService.findByUserName(resUsername);
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
    const currentRole = getRoleByJwt();
    const enterButton = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    useEffect(() => {
        const currentURL = window.location.href;
        const searchNameIndex = currentURL.indexOf('/search-name/');
        if (searchNameIndex === -1) {
            setName('');
        }
    }, [window.location.href]);


    // useEffect(() => {
    //     CheckAccountTypes()
    // }, [])

    // const CheckAccountTypes = async () => {
    //     const id = await securityService.getIdByJwt();
    //     console.log(id)
    //
    //     await packageTypesService.findPackageAccount(id).then(res => {
    //         if (res !== null) {
    //             console.log(res[0].name)
    //             setAccountType(res[0].name)
    //             console.log(accountType)
    //         }
    //     })
    // }
    // const updateOnclick = () => {
    //     toast.warning("Bạn cần nâng cấp lên Eros Gold để sử dụng dịch vụ này")
    // }


    return (
        <header className="lien-header">
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
                                        {/*{accountType === "Member" ?*/}
                                        {/*    (*/}
                                        {/*        <button onClick={() => updateOnclick()} className="nav-link icon"*/}
                                        {/*                aria-current="page">*/}
                                        {/*            <i className="fa-solid fa-user-plus fs-4 text-white"></i>*/}
                                        {/*            <span className="description-icon">Gợi ý kết bạn</span>*/}
                                        {/*        </button>*/}
                                        {/*    ) : (*/}
                                                <Link to="/invited_recommend_friend/RecommendList"
                                                      className="nav-link icon"
                                                      aria-current="page">
                                                    <i className="fa-solid fa-user-plus fs-4 text-white"></i>
                                                    <span className="description-icon">Gợi ý kết bạn</span>
                                                </Link>
                                            {/*)}*/}

                                        {/*<Link to="/invited_recommend_friend/RecommendList" className="nav-link icon"*/}
                                        {/*      aria-current="page">*/}
                                        {/*    <i className="fa-solid fa-user-plus fs-4 text-white"></i>*/}
                                        {/*    <span className="description-icon">Gợi ý kết bạn</span>*/}
                                        {/*</Link>*/}


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
                                    <li style={{marginTop: "0.5rem"}} className="nav-item">
                                        <div className="notification">
                                            <a href="#">
                                                <div className="notBtn" href="#">
                                                    <i className="fa-solid fa-gift fs-4 text-white"></i>

                                                    <div className="box">
                                                        <div className="display">
                                                            <div className="cont">
                                                                <div
                                                                    className="choiceGift"
                                                                    style={{
                                                                        display: "grid",
                                                                        gridTemplateColumns: "repeat(2,1fr)",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    <div
                                                                        className={`history ${
                                                                            isHistoryClicked ? "active" : ""
                                                                        }`}
                                                                        style={{
                                                                            border: "solid 1px #a36acb",
                                                                            padding: "0.5rem",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        onClick={getHistory}
                                                                    >
                                                                        <h1
                                                                            style={{
                                                                                fontSize: "1.2rem",
                                                                            }}
                                                                        >
                                                                            Lịch sử quà tặng
                                                                        </h1>
                                                                    </div>
                                                                    <div
                                                                        className={`kho ${
                                                                            isRepositoryClicked ? "active" : ""
                                                                        }`}
                                                                        onClick={getRepository}
                                                                        style={{
                                                                            border: "solid 1px #a36acb",
                                                                            padding: "0.5rem",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        <h1
                                                                            style={{
                                                                                fontSize: "1.2rem",
                                                                            }}
                                                                        >
                                                                            Kho quà tặng
                                                                        </h1>
                                                                    </div>
                                                                </div>

                                                                {gitStatus ? (
                                                                    <div>
                                                                        {gift.length === 0 ? (
                                                                            <h1
                                                                                style={{
                                                                                    fontSize: "1.2rem",
                                                                                    padding: "1rem",
                                                                                }}
                                                                            >
                                                                                Không có quà được tặng
                                                                            </h1>
                                                                        ) : (
                                                                            gift.map((item) => (
                                                                                <div className="sec new" key={item.id}>
                                                                                    <div>
                                                                                        <div className="profCont">
                                                                                            <img
                                                                                                className="profile"
                                                                                                src={item.accountSender.avatar}
                                                                                                alt={`Profile ${item.accountSender.id}`}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="txt">
                                                                                            {item.accountSender.name} đã
                                                                                            tặng
                                                                                            bạn: {item.quantity}{" "}
                                                                                            {item.gift.name}
                                                                                        </div>
                                                                                        <div className="txt sub">
                                                                                            {formatDateTime(item.time)}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        className="content-body"
                                                                        style={{
                                                                            display: "grid",
                                                                            gridTemplateColumns: "repeat(2, 1fr)",
                                                                            gap: "0.2rem",
                                                                            cursor: "pointer",
                                                                            padding: "1rem",
                                                                        }}
                                                                    >
                                                                        {giftQuantity.length === 0 ? (
                                                                            <h1 style={{fontSize: "1.2rem"}}>
                                                                                Kho trống
                                                                            </h1>
                                                                        ) : (
                                                                            giftQuantity.map((item) => (
                                                                                <div
                                                                                    key={item.giftId}
                                                                                    style={{
                                                                                        border: "#a36acb 1px solid",
                                                                                        borderRadius: "10px",
                                                                                        textAlign: "center",
                                                                                    }}
                                                                                >
                                                                                    <div style={{paddingTop: "0.2rem"}}>
                                                                                        <img
                                                                                            style={{width: "50%"}}
                                                                                            src={item.images}
                                                                                            alt=""
                                                                                        />
                                                                                    </div>
                                                                                    <div style={{fontSize: "20px"}}>
                                                                                        Số lượng: {item.totalQuantity}
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
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
                                <div onClick={handleSearch} className='search-btn'>
                                    <span className="input-group-text">
                                         <i className="fa-solid fa-magnifying-glass" style={{color: "#9D66C3"}}></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control"
                                       placeholder="Nhập tên người dùng" aria-label="Username"
                                       aria-describedby="addon-wrapping"
                                       onChange={handleChangeInput}
                                       value={name}
                                       onKeyDown={(e) => {
                                           enterButton(e)
                                       }}
                                />
                            </div>
                        </form>
                    </div>
                    {
                        !isAuthentication ?
                            <div className="float-lg-end lien-login-btn">
                                <button className="d-flex align-items-center icon">
                                    <i className="fa-solid fa-user" style={{color: "#9D66C3"}}
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
                                                {currentRole === "ADMIN" &&
                                                    <li>
                                                        <Link to="/accounts">Quản lý</Link>
                                                    </li>
                                                }
                                                <hr/>
                                                <li onClick={() => handleModal()}>
                                                    <p style={{fontFamily: "Nunito Sans, sans-serif"}}>Đăng xuất</p>
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