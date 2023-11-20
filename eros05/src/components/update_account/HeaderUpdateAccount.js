import {Link} from "react-router-dom";

import "../update_account/css/infopackage.css"
import {useEffect, useState} from "react";
import * as securityService from "../../service/login/securityService";
import * as SearchNameService from "../../service/searchName/searchNameService";
import * as packageTypesService from "../../service/update_account/packageTypesService";
import moment from "moment/moment";
import {UpdateAccountEros} from "./UpdateAccountEros";
import {UpdateAccountGold} from "./UpdateAccountGold";

export function HeaderUpdateAccount() {
    const accessToken = localStorage.getItem('accessToken')
    const [user, setUser] = useState();
    const currentDate = moment().format('YYYY-MM-DD');
    const [packageTypes, setPackageTypes] = useState([]);

    const [packageAccount, setPackageAccount] = useState([{name:"",money:"",expire:"",regisDate:""}]);

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
                    console.log("-------------------")

                }
            }
        }
        test();
    }, []);
    useEffect(() => {
        if (user) {
            console.log(user)
            findPackageAccount()
        }
    }, [user])


    const findPackageAccount = () => {
        if (user){
            packageTypesService.findPackageAccount(user.id).then(res => {
                console.log(res)
                setPackageAccount(res);
                console.log("++++++++++++++++++++++")
                console.log(packageAccount[0])
            });
        }
    }


    const calculateDate = (date,expirationDate) => {
        const newDate1 = expirationDate.split("-");
        const result1 = newDate1.join("");
        const number1 = Number(result1);

        let newDate2 = date.split("-");
        let result2 = newDate2.join("");
        let number2 = Number(result2);

        return number1-number2;
    }




    return (
        <div className="col-xs-12 col-3 col-md-12 col-lg-3 total-updateaccount-card updateaccount-body">
            {packageAccount[0].name === "Member" ? (
                <div className="updateaccount-card-info">
                    <div className="updateaccount-img">
                        <img style={{ maxWidth: "100%",
                            maxHeight: "100%"}} src="" alt=""/>
                    </div>
                    <div className="updateaccount-textBox">
                        <div className="updateaccount-textContent">
                            <p className="updateaccount-h1">Bạn chưa đăng ký gói nào</p>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            ):(
                <div className="updateaccount-card-info">
                    <div className="updateaccount-img">
                        <img style={{ maxWidth: "100%",
                            maxHeight: "100%"}} src="" alt=""/>
                    </div>
                    <div className="updateaccount-textBox">
                        <div className="updateaccount-textContent">
                            <p className="updateaccount-h1">Hạng hiện tại: {packageAccount[0].name}</p>
                        </div>
                        <p className="updateaccount-p">{packageAccount[0].money} <i style={{color:"snow"}} className="fa-regular fa-gem"></i></p>
                        <p style={{margin: "-13px 0px 11px 0"}} className="updateaccount-p">Thời hạn gói còn: {calculateDate(packageAccount[0].expire, packageAccount[0].regisDate)} ngày</p>
                        <div>
                        </div>
                    </div>
                </div>
            )}



            <Link to="/updateAccount/eros+" className="updateaccount-card">
                <div className="icon-update-account">
                    <svg xmlns="http://www.w3.org/2000/svg" height="38px"
                         width="38px" version="1.1" id="heart" viewBox="0 0 471.701 471.701">
                        <linearGradient id="gradientColor">
                            <stop offset="5%" stopColor="#7eaaff"></stop>
                            <stop offset="95%" stopColor="#ff48fb"></stop>
                        </linearGradient>
                        <g>
                            <path
                                d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z"></path>
                        </g>
                    </svg>
                </div>
                <div style={{display: "flex"}}>
                    <p className="title">Eros</p>
                    <p className="title label" style={{color: "#da65fc"}}>+</p>
                </div>
                <p className="text">Tặng quà nhiều hơn & hơn thế nữa!</p>
            </Link>

            <Link to="/updateAccount/gold" className="updateaccount-card">
                <div className="icon-update-account">
                    <svg xmlns="http://www.w3.org/2000/svg" height="38px"
                         width="38px" version="1.1" id="heart" viewBox="0 0 471.701 471.701">
                        <linearGradient id="gradientColor">
                            <stop offset="5%" stopColor="#7eaaff"></stop>
                            <stop offset="95%" stopColor="#ff48fb"></stop>
                        </linearGradient>
                        <g>
                            <path
                                d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z"></path>
                        </g>
                    </svg>
                </div>
                <div style={{display: "flex"}}>
                    <p className="title">Eros</p>
                    <p className="title gold">Gold</p>
                </div>
                <p className="text">Nhiều người biết đến bạn hơn & hơn thế nữa!</p>
            </Link>

            <Link className="updateaccount-card" to="/updateAccount/platinum">
                <div className="icon-update-account">
                    <svg xmlns="http://www.w3.org/2000/svg" height="38px"
                         width="38px" version="1.1" id="heart" viewBox="0 0 471.701 471.701">
                        <linearGradient id="gradientColor">
                            <stop offset="5%" stopColor="#7eaaff"></stop>
                            <stop offset="95%" stopColor="#ff48fb"></stop>
                        </linearGradient>
                        <g>
                            <path
                                d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z"></path>
                        </g>
                    </svg>
                </div>
                <div style={{display: "flex"}}>
                    <p className="title">Eros</p>
                    <p className="title platinum">Platinum</p>
                </div>
                <p className="text">lên cấp mọi hành động bạn thực hiện trên Eros</p>
            </Link>

            <UpdateAccountEros calculateDate={calculateDate(packageAccount[0].expire, packageAccount[0].regisDate)} />;
            <UpdateAccountGold calculateDate={calculateDate(packageAccount[0].expire, packageAccount[0].regisDate)} />;
        </div>
    )


}