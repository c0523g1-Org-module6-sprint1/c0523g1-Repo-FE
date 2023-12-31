import React, {useEffect, useState} from 'react';
import './SearchPage.css'
import * as accountService from "../../service/searchName/searchNameService"
import {Link, useNavigate, useParams} from "react-router-dom";
import * as SearchNameService from "../../service/searchName/searchNameService";
import * as securityService from "../../service/login/securityService";
import {toast} from "react-toastify";

const SearchPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [isAuthentication, setIsAuthentication] = useState(false)
    const navigate = useNavigate();
    const {name} = useParams();
    const [user, setUser] = useState();
    const accessToken = localStorage.getItem('accessToken')
    useEffect(() => {
        searchByName()
    }, [name]);
    const searchByName = async () => {
        const res = await accountService.searchByName(name);
        setAccounts(res.data);
    };
    const goRegisterPage = () => {
        navigate(`/login`);
        toast.info("Vui lòng đăng nhập/đăng ký để sử dụng tính năng này!")
    }
    const goSearchAdvanced = () => {
        navigate(`/search_advanced`);
    }
    const goAddFriendPage = () => {
        navigate(`/invited_recommend_friend/InvitedList`)
    }
    const goPersonalPage = (id) => {
        navigate(`/personal-page/${id}`)
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
            setIsAuthentication(true);
        }
    }, [user]);

    return (
        <div className='search-page-container'>
            <h1 style={{color: "black"}}>Kết quả tìm kiếm</h1>

            <div className='container'>
                {accounts.length > 0 ? (
                    <div className="list-cards">
                        {
                            accounts.map((item, index) => {
                                return (
                                    <div key={index} className="lien-cards">
                                        <div className="icon">
                                            <img className="cus-avatar"
                                                 src={item.avatar}
                                                 alt=""/>
                                        </div>
                                        <p className="user-name">{item.name}</p>
                                        {!isAuthentication ?
                                            <p className="text">
                                                {/*<button className="btn btn-secondary border-0 py-2"*/}
                                                {/*        type="submit" onClick={goRegisterPage}*/}
                                                {/*        style={{marginTop: "40px"}}>Kết bạn*/}
                                                {/*</button>*/}
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={goRegisterPage}>Xem trang cá nhân
                                                </button>
                                            </p>
                                            :
                                            <p className="text">
                                                <button className="btn btn-secondary border-0 py-2 "
                                                        type="submit" onClick={() => goPersonalPage(item.id)}
                                                >Xem trang cá nhân
                                                </button>
                                            </p>
                                        }
                                        {index < 5 && <p style={{color:"#a36acb",textAlign: "center",marginTop: "-20%"}}>Có điểm quà tặng cao</p>}
                                        <span>
                                            <i className="fa fa-home"/> {item.location}<br></br>
                                            <i className="fa fa-male"
                                               aria-hidden="true"/> {item.gender}<br></br>
                                            <i className="fa fa-briefcase"
                                               aria-hidden="true"/> {item.job}
                                        </span>

                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (<h5 style={{
                    textAlign: "center",
                    fontStyle: "italic"
                }}>Không có kết quả!!!</h5>)}
            </div>
            <div className="search-advance">
                <button className="btn btn-secondary border-0 py-2"
                        type="submit" onClick={goSearchAdvanced}>Tìm kiếm nâng cao
                </button>
            </div>
        </div>
    );
};


export default SearchPage;