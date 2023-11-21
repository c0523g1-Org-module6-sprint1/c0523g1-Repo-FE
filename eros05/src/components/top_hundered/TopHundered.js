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
        // console.log(res)
        setAccount(res)
    }

    console.log(account)

    useEffect(() => {
        displayTop()
    }, [])

    return (account &&
        <div>
            <h1 style={{marginTop: "90px", textAlign: "center", fontFamily: "Agbalumo", marginLeft: "40px"}}>
                Bảng xếp hạng top 100</h1>
            <div className="container" style={{marginTop:"50px"}}>
                {/*<div>*/}
                {/*    <img style={{marginLeft: "44%", width: "165px", borderRadius:"50%"}} src="../img/crown.png"/>*/}
                {/*</div>*/}
                <div className="img_top" style={{marginTop: "-65px"}}>
                    <img style={{border: " 5px solid gold", marginLeft: "40px",borderRadius:"50%"}} src={account[1].avatar}/>
                        <img style={{width: "250px", border: "5px solid darkred", marginLeft: "40px"}} src={account[0].avatar}/>
                            <img style={{border: "5px solid darkgreen", marginLeft: "50px"}} src={account[2].avatar}/>
                </div>
                <div style={{display: "flex"}} className="top">
                    <h1 className="top-left" style={{marginLeft: "40px"}}>Hạng 2</h1>
                    <h1 className="" style={{marginLeft: "11%", marginRight: "13%"}}>Hạng 1</h1>
                    <h1 className="top-right">Hạng 3</h1>
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
                    {account.map((account, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
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