import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as topHundered from "../../service/top_hundered/topHunderedService"
import "../top_hundered/topHunderred.css"
import *as Yup from "yup"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import crown from "./image/crown.png"

function TopHundered() {
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();


    const displayTop = async () => {
        let res = await topHundered.display();
        setAccount(res)
    }

    const goPersonalPage = (id) => {
        navigate(`/personal-page/${id}`)
    }

    useEffect(() => {
        displayTop()
    }, [])

    return (account &&
        <div>
            <h2 style={{marginTop: "90px", textAlign: "center", fontFamily: "Agbalumo", marginLeft: "40px",fontSize:"300%"}}>
                Bảng xếp hạng top 100</h2>
            <div className="container" style={{marginTop: "50px", marginBottom: "50px"}}>
                <div className="top-container" >
                    <div className="top-container-second">
                        <div className="top-container-img" style={{backgroundImage: `url(${account[2].avatar})`}}/>
                    </div>
                    <div className="top-container-first">
                        <div className="top-container-img" style={{backgroundImage: `url(${account[1].avatar})`}}/>
                    </div>
                    <div className="top-container-third">
                        <div className="top-container-img" style={{backgroundImage: `url(${account[3].avatar})`}}/>
                    </div>
                    <div className="top-container-none2">
                        <p className="top-title-name" onClick={() => goPersonalPage(account[2].id)}>{account[2].name}</p>
                        <p className="top-title-point">( {account[2].point} điểm quà tặng)</p>
                        <p className="top-title" style={{fontWeight: "bold"}} >Hạng 2</p>
                    </div>
                    <div className="top-container-none1">
                        <p className="top-title-name" onClick={() => goPersonalPage(account[1].id)}>{account[1].name}</p>
                        <p className="top-title-point">( {account[1].point} điểm quà tặng)</p>
                        <p className="top-title" style={{fontWeight: "bold"}} >Hạng 1</p>
                    </div>
                    <div className="top-container-none3">
                        <p className="top-title-name" onClick={() => goPersonalPage(account[3].id)}>{account[3].name}</p>
                        <p className="top-title-point">( {account[3].point} điểm quà tặng)</p>
                        <p className="top-title" style={{fontWeight: "bold"}} >Hạng 3</p>
                    </div>
                </div>
                <table className="table table-bordered table-hover"
                       style={{marginTop: "70px", verticalAlign: "middle"}}>
                    <thead>
                    <tr style={{backgroundColor: "#9E66C3", color: "white"}}>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Hạng</th>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Thành viên</th>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Loại khách hàng</th>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Điểm quà tặng</th>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Lượt yêu thích</th>
                    </tr>
                    </thead>
                    <tbody>
                    {account.slice(4).map((account, index) => (
                        <tr key={index}>
                            <td>{index + 4}</td>
                            <td onClick={() => goPersonalPage(account.id)} style={{cursor:"pointer"}}>{account.name}</td>
                            <td>{account.accountTypes}</td>
                            <td>{account.point}</td>
                            <td>{account.countLike}</td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TopHundered;