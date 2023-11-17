import '../update_account/css/updateAccount.css'
import '../update_account/css/buttonPay.css'
import '../update_account/css/radioSelect.css'
import '../update_account/css/radioPay.css'
import '../update_account/HeaderUpdateAccount'
import {HeaderUpdateAccount} from "./HeaderUpdateAccount";
import {PayPalButton} from "react-paypal-button-v2";
import {toast} from "react-toastify";
import {useEffect, useRef, useState} from "react";
import * as packageTypesService from "../../service/update_account/packageTypesService";
import React from 'react';
import {formatPrice, usdToVnd, vndToUsd} from "./FormatPrice";
import * as accountType from "../../service/update_account/accountTypeService";
import {load, paySucces} from "./Pay";
import {useParams} from "react-router-dom";
import * as packageDetail from "../../service/update_account/packageDetailService";
import * as accountTypesService from "../../service/update_account/accountTypeService";

export function UpdateAccountEros() {
    const [pricePay, setPricePay] = useState(0);
    const [payEros, setPayEros] = useState("");
    const [packageTypes, setPackageTypes] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]);
    const [account, setAccount] = useState("");
    const {id} = useParams();
    const inputRef = useRef(1);
    const {succesVnPay} = useParams();


    useEffect(() => {
        getAllAccountType()
    }, []);
    useEffect(() => {
        getAllPackageTypes()
    }, []);
    useEffect(() => {
        if (id) findById(id);
    }, [id]);
    const getAllAccountType = async () => {
        if (succesVnPay){
            console.log("Thanh toán vnPay thành công")
        }
        let data = await accountType.getAll();
        setAccountTypes(data);
    }
    const getAllPackageTypes = async () => {
        let data = await packageTypesService.getAll();
        let dataEros = data.filter(data => data.accountTypes.id === 1);
        console.log(dataEros)
        setPackageTypes(dataEros);
    }
    const findById = async (id) => {
        let data = await packageDetail.findById(id);
        setAccount(data);
    }
    const setMoneyAccount = async (values) => {
        values.money = pricePay;
        console.log(values.money);
        let status = await packageDetail.setMoneyAccount(values);
        console.log(status);
        if (status === 200) {
            toast.success("Sửa thành công");
        } else {
            toast.error("Sửa thất bại");
        }
    }
    const VnPayOnclick = async () => {
        const link = await accountTypesService.checkVnPay(pricePay);
        console.log("+++++++++")
        console.log(link)
        window.location.href = link;
    }


    return (
        <div className="row" style={{display: "flex"}}>
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

                <div className="updateaccount-radio-input">
                    {packageTypes.map(packageType => (
                        <>
                            <input
                                key={packageType.id}
                                onChange={() => setPricePay(packageType.price)}
                                type="radio" id={packageType.name}
                                name="value-radio"/>
                            <label htmlFor={packageType.name}>
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
                        <button className="updateaccount-pushable" onClick={VnPayOnclick}>
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
                                          toast.success(`Thanh toán thành công ${pricePay} vnđ bởi ` + details.payer.name.given_name);
                                          onchange(paySucces(1))
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
                            <img src="../../public/pay-momo.jpg" alt=""/>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}