import React, {useEffect, useState} from 'react';
import './SearchPage.css'
import * as accountService from "../../service/searchName/searchNameService"
import {Link, useNavigate, useParams} from "react-router-dom";
import * as SearchNameService from "../../service/searchName/searchNameService";
import * as securityService from "../../service/login/securityService";

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

        navigate(`/register`);
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
    return (
        <div className='search-page-container'>
            <h1 style={{color: "black"}}>Kết quả tìm kiếm</h1>
            {!isAuthentication ?
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
                                            <p className="text">
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={goRegisterPage}
                                                        style={{marginTop: "40px"}}>Kết bạn
                                                </button>
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={goRegisterPage}
                                                        style={{marginTop: "10px"}}>Xem trang cá nhân
                                                </button>
                                            </p>
                                            <span>Sống tại: {item.location}<br></br>
                                                Nghề nghiệp: {item.job}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (<span style={{color: "#b2b2b2", textAlign: "center"}}>Không có kết quả</span>)}
                </div>
                :
                <div className='container'>
                    {accounts.length > 0 ? (
                        <div className="list-cards-login">
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
                                            <p className="text">
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={goAddFriendPage}
                                                        style={{marginTop: "40px"}}>Kết bạn
                                                </button>
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={() => goPersonalPage(item.id)}
                                                        style={{marginTop: "10px"}}>Xem trang cá nhân
                                                </button>
                                            </p>
                                            <span>Sống tại: {item.location}<br></br>
                                                Nghề nghiệp: {item.job}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (<span style={{color: "#b2b2b2", textAlign: "center"}}>Không có kết quả</span>)}
                </div>
            }
            <div className="search-advance">
                <button className="btn btn-secondary border-0 py-2"
                        type="submit" onClick={goSearchAdvanced}>Tìm kiếm nâng cao
                </button>
            </div>
        </div>
    );
};


export default SearchPage;