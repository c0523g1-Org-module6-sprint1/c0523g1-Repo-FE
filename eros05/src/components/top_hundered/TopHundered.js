import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as topHundered from "../../service/top_hundered/topHunderedService"
import "../top_hundered/topHunderred.css"
import *as Yup from "yup"
import axios from "axios";

function TopHundered() {
    const [account, setAccount] = useState(null);

    const displayTop = async () => {
        let res = await topHundered.display();
        setAccount(res)
    }

    console.log(account)

    useEffect(() => {
        displayTop()
    }, [])

    return (account &&
        <div>
            <h2 style={{marginTop: "90px", textAlign: "center", fontFamily: "Agbalumo", marginLeft: "40px",fontSize:"300%"}}>
                Bảng xếp hạng top 100</h2>
            <div className="container" style={{marginTop: "50px"}}>
                <div className="top-container" >
                    <div className="top-avatar-container">
                        <h2 className="top-title" style={{fontWeight: "bold"}} >Hạng 2</h2>
                        <img className="avatar-img" src={account[1].avatar}/>
                        {account[1].name}
                    </div>
                    <div className="top-avatar-container">
                        <h2 className="top-title" style={{fontWeight: "bold"}}>Hạng 1</h2>
                        <img className="avatar-img" src={account[0].avatar}/>
                        {account[0].name}
                    </div>
                    <div className="top-avatar-container">
                        <h2 className="top-title" style={{fontWeight: "bold"}}>Hạng 3</h2>
                        <img className="avatar-img" src={account[2].avatar}/>
                        {account[2].name}
                    </div>
                </div>
                <table className="table table-bordered table-hover"
                       style={{marginTop: "70px", verticalAlign: "middle"}}>
                    <thead>
                    <tr style={{backgroundColor: "#9E66C3", color: "white"}}>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Hạng</th>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Thành viên</th>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Loại khách hàng</th>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Tài sản</th>
                        <th style={{backgroundColor: "#9E66C3", color: "white"}}>Lượt yêu thích</th>
                    </tr>
                    </thead>
                    <tbody>
                    {account.slice(3).map((account, index) => (
                        <tr key={index}>
                            <td>{index + 4}</td>
                            <td>{account.name}</td>
                            <td>{account.accountTypes}</td>
                            <td>{account.money}</td>
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