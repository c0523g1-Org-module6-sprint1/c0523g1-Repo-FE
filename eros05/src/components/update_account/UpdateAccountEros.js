import '../update_account/css/updateAccount.css'
import '../update_account/css/buttonPay.css'
import '../update_account/css/radioSelect.css'
import '../update_account/css/radioPay.css'
import '../update_account/HeaderUpdateAccount'
import {HeaderUpdateAccount} from "./HeaderUpdateAccount";
import {PayPalButton} from "react-paypal-button-v2";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import * as packageTypesService from "../../service/update_account/packageTypesService";
import React from 'react';
import {formatPrice, vndToUsd} from "./FormatPrice";
import {paySucces, resetRadioButtons, setMoneyToPaySuccess} from "./Pay";
import {useParams} from "react-router-dom";
import * as payService from "../../service/update_account/payService";
import * as securityService from "../../service/login/securityService";
import * as SearchNameService from "../../service/searchName/searchNameService";
import * as accountTypesService from "../../service/update_account/accountTypeService";


export function UpdateAccountEros() {
    const [pricePay, setPricePay] = useState(0);
    const [payEros, setPayEros] = useState("");
    const [packageTypes, setPackageTypes] = useState([]);
    const {succesVnPay} = useParams();
    const accessToken = localStorage.getItem('accessToken')
    const [user, setUser] = useState();
    const [nameAccount, setNameAccount] = useState("")

    useEffect(() => {
        getAllAccountTypes()
    }, []);
    const getAllAccountTypes = async () => {
        let data = await accountTypesService.getAll();
        let dataAccountType = data.filter(data => data.id === 1);
        console.log(dataAccountType)
        setNameAccount(dataAccountType[0].name);
        console.log(nameAccount)
    }

    useEffect(() => {
        getAllPackageTypes()
    }, []);
    const getAllPackageTypes = async () => {
        let data = await packageTypesService.getAll();
        let dataEros = data.filter(data => data.accountTypes.id === 1);
        console.log(dataEros)
        setPackageTypes(dataEros);
        // setNameAccountType(packageTypes.accountTypes.name);
        // console.log(dataEros.accountTypes.name)
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
                    console.log("-------------------")
                    // console.log(user)
                    // console.log(user.id)
                }
            }
        }
        test();
    }, []);
    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user])


    const vnPayOnclick = async () => {
        const link = await payService.checkVnPay(pricePay);
        console.log(link)
        window.location.href = link;
    }

  


    async function callAsyncFunctions() {
        try {
                await paySucces(user.id,1); // Hàm bất đồng bộ 1
                await setMoneyToPaySuccess(user.id, pricePay); // Hàm bất đồng bộ 2
                await resetRadioButtons(); // Hàm bất đồng bộ 3

        } catch (error) {
            console.log("có lỗi xảy ra khi gọi cả 3 hàm")
        }
    }


    return (
        <div className="updateaccout-row" style={{display: "flex"}}>
            <HeaderUpdateAccount/>

            <div className="col-xs-12 col-6 col-md-12 col-lg-6 col-sm-12">
                <div className="updateaccount-card-center">
                    <div style={{display: "flex", margin: "-25px 0 0 -15px"}}>
                        <p className="title ">Eros</p>
                        <p className="title label" style={{color: "#da65fc"}}>+</p>
                    </div>
                </div>

                <div className="updateaccount-card-center-content">
                    <p className="title ">Nâng cấp lượt thích</p>
                    <ul>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Bạn được phép thích tối đa 10 người mỗi ngày
                        </li>
                        <li>
                            <i className="fa-solid fa-lock"></i>
                            Xem ai thích bạn
                        </li>
                        <li>
                            <i className="fa-solid fa-lock"></i>
                            Lượt thích ưu tiên
                        </li>
                    </ul>
                </div>

                <div className="updateaccount-card-center-content">
                    <p className="title ">Nâng cấp trải nghiệm của bạn</p>
                    <ul>
                        <li>
                            <i className="fa-solid fa-lock"></i>
                            Tài khoản của bạn được đề xuất đến nhiều người
                        </li>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            5 lượt tặng quà mỗi ngày
                        </li>
                        <li>
                            <i className="fa-solid fa-lock"></i>
                            Mở khóa tìm kiếm nâng cao
                            <p>
                                <i style={{color: "transparent"}} className="fa-solid fa-check"></i>
                                Cho phép bạn tìm kiếm theo ý thích
                            </p>
                        </li>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Cho phép bạn bình luận vào bài viết
                            <p>
                                <i style={{color: "transparent"}} className="fa-solid fa-check"></i>
                                Bạn có thể bình luận vào bài viết người mình thích
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="updateaccount-card-center-content">
                    <p className="title ">Nắm quyền kiểm soát</p>
                    <ul>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Kiểm soát hồ sơ của bạn
                            <p>
                                <i style={{color: "transparent"}} className="fa-solid fa-check"></i>
                                Chỉ hiện những gì bạn muốn họ biết
                            </p>
                        </li>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Kiểm soát việc bạn nhìn thấy ai
                        </li>
                    </ul>
                </div>
            </div>

            <div className="col-xs-12 col-3 col-md-12 col-lg-3">
                <div className="updateaccount-card-right">
                    <p className="title ">Đăng ký Eros+</p>
                    <p style={{fontSize: "13px"}}>Cho phép bạn thích bài viết & nhiều quyền lợi khác</p>
                </div>

                <div className="updateaccount-radio-input" id="myForm">
                    {packageTypes.map(packageType => (
                        <>
                            <input
                                onChange={() => setPricePay(packageType.price)}
                                type="radio" id={packageType.name}
                                name="value-radio"/>
                            <label style={{minWidth: "100%"}} htmlFor={packageType.name}>
                                {packageType.name}<br/>
                                {formatPrice(packageType.price)} đ/tháng
                            </label>
                        </>
                    ))}

                    <div className="updateaccount-radio-input-pay">
                        <input onChange={(values) => setPayEros(values.target.value)} value="vnpay"
                               name="value-radio-pay"
                               id="value-4" type="radio"/>
                        <label htmlFor="value-4">Thanh toán VNPay</label>
                        <input onChange={(values) => setPayEros(values.target.value)} value="paypal"
                               name="value-radio-pay"
                               id="value-5" type="radio"/>
                        <label htmlFor="value-5">Thanh toán Paypal</label>
                        <input onChange={(values) => setPayEros(values.target.value)} value="momo"
                               name="value-radio-pay"
                               id="value-6" type="radio"/>
                        <label htmlFor="value-6">Thanh toán Momo</label>
                    </div>
                    {payEros === '' && pricePay === 0 ? (
                        <div className="updateaccount-card-right">
                            <p className="title" style={{fontSize: "13px"}}>Vui lòng chọn gói và chọn phương thức thanh
                                toán</p>
                        </div>
                    ) : null}


                    {payEros === 'vnpay' && pricePay !== 0 ? (
                        <button className="updateaccount-pushable" onClick={vnPayOnclick}>
                            <span className="updateaccount-shadow"></span>
                            <span className="updateaccount-edge"></span>
                            <span className="updateaccount-front">
                                    Thanh toán VNPay
                                    </span>
                        </button>
                    ) : null}

                    {payEros === 'paypal' && pricePay !== 0 ? (
                        <PayPalButton classname="paypal-button-label-container"
                                      amount={vndToUsd(pricePay)}
                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                      onSuccess={(details, data) => {
                                          toast.success(`Thanh toán thành công ${pricePay} vnđ bởi `
                                              + details.payer.name.given_name
                                              + ` bạn đã được thăng lên hạng ${nameAccount}`);
                                          onchange(callAsyncFunctions());
                                          // load()
                                          // OPTIONAL: Call your server to save the transaction
                                          return fetch("/paypal-transaction-complete", {
                                              method: "post",
                                              body: JSON.stringify({
                                                  orderID: data.orderID
                                              })
                                          });
                                      }}
                                      onError={() => {
                                          toast.error("Giao dịch thất bại, vui lòng thử lại");
                                      }}
                        />


                    ) : null}

                    {payEros === 'momo' && pricePay !== 0 ? (
                        <div>
                            <img src="../../components/update_account/img/momoQR.jpg" alt=""/>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}