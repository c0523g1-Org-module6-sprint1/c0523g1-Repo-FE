import React, {useEffect, useState} from 'react';
import './SearchPage.css'
import * as accountService from "../../service/searchName/apiConnection"
import {Link, useNavigate, useParams} from "react-router-dom";

const SearchPage = ({isShowSearchPage,isAuthentication}) => {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();
    const {name} = useParams();
    console.log(isAuthentication)
    useEffect(() => {
        searchByName()
    }, [name]);
    const searchByName = async () => {
        const res = await accountService.searchByName(name);
        setAccounts(res.data);
    };
    const goRegisterPage = () => {
        navigate(`register`);
    }
    const goSearchAdvanced = () => {
        navigate(`search_advanced`);
    }
    const goAddFriendPage = ()=>{
        navigate(`invited_recommend_friend/InvitedList`)
    }
    const goPersonalPage = (id)=>{
        navigate(`personal-page/${id}`)
    }

    return (
        <div className='search-page-container'>
            <h1>Kết quả tìm kiếm</h1>
            {!isAuthentication ?
                <div className='container'>
                    {accounts.length > 0 ? (
                        <div className="list-cards">
                            {
                                accounts.map((item, index) => {
                                    return (
                                        <div key={index} className="cards">
                                            <div className="icon">
                                                <img className="cus-avatar"
                                                     src={item.avatar}
                                                     alt=""/>
                                            </div>
                                            <p className="user-name">{item.name}</p>
                                            <p className="text">
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={goRegisterPage} style={{marginTop: "40px"}}>Kết bạn
                                                </button>
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={goRegisterPage} style={{marginTop: "10px"}}>Xem trang cá nhân
                                                </button>
                                            </p>
                                            <span>Sống tại: {item.location}<br></br>
                                                Nghề nghiệp: {item.job}</span>
                                        </div>
                                    )
                                })
                            }
                            <Link to="/register" className="nav-link viewmore" aria-current="page">
                                <span>...Xem thêm</span>
                            </Link>
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
                                        <div key={index} className="cards">
                                            <div className="icon">
                                                <img className="cus-avatar"
                                                     src={item.avatar}
                                                     alt=""/>
                                            </div>
                                            <p className="user-name">{item.name}</p>
                                            <p className="text">
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={goAddFriendPage} style={{marginTop: "40px"}}>Kết bạn
                                                </button>
                                                <button className="btn btn-secondary border-0 py-2"
                                                        type="submit" onClick={()=>goPersonalPage(item.id)} style={{marginTop: "10px"}}>Xem trang cá nhân
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