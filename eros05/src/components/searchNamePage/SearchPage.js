import React, {useEffect, useState} from 'react';
import './SearchPage.css'
import * as accountService from "../../service/searchName/apiConnection"
import {Link, useNavigate, useParams} from "react-router-dom";

const SearchPage = () => {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();
    const {name} = useParams();
    useEffect(() => {
        searchByName()
    }, [name]);
    const searchByName = async () => {
        const res = await accountService.searchByName(name);
        setAccounts(res.data);
    };
    const goRegisterPage = () => {
        navigate(`Sang`);
    }
    const goSearchAdvanced = () => {
        navigate(`Hanh`);
    }
    return (
        <div className='search-page-container'>
            <h1>Kết quả tìm kiếm</h1>
            <div className='container'>
                {accounts.length > 0 ? (
                    <div className="list-cards">
                        {
                            accounts.map((item, key) => {
                                return (
                                    <div key={key} className="cards">
                                        <div className="icon">
                                            <img className="cus-avatar"
                                                 src={item.avatar}
                                                 alt=""/>
                                        </div>
                                        <p className="user-name">{item.name}</p>
                                        <p className="text">
                                            <button className="btn btn-secondary border-0 py-2"
                                                    type="submit" onClick={goRegisterPage}>Xem trang cá nhân
                                            </button>
                                        </p>
                                        <span>Sống tại {item.location.name}</span>
                                    </div>
                                )
                            })
                        }
                        <Link to="/Sang" className="nav-link viewmore" aria-current="page">
                            <span>...Xem thêm</span>
                        </Link>
                    </div>
                ) : (<span style={{color: "#b2b2b2",textAlign: "center"}}>Không có kết quả</span>)}
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