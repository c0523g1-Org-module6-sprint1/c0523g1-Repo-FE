import '../update_account/css/updateAccount.css'
import '../update_account/css/buttonPay.css'
import '../update_account/css/radioSelect.css'
import '../update_account/HeaderUpdateAccount'
import {HeaderUpdateAccount} from "./HeaderUpdateAccount";
import React, {useEffect, useState} from "react";
import * as packageTypesService from "../../service/update_account/packageTypesService";
import {PayPalButton} from "react-paypal-button-v2";
import {toast} from "react-toastify";
import {formatPrice, vndToUsd} from "./FormatPrice";
import {load, paySucces, resetRadioButtons, setMoneyToPaySuccess, vnPayOnclick} from "./Pay";
import {useParams} from "react-router-dom";
import * as securityService from "../../service/login/securityService";
import * as SearchNameService from "../../service/searchName/searchNameService";
import * as payService from "../../service/update_account/payService";
import * as accountTypesService from "../../service/update_account/accountTypeService";
import moment from "moment/moment";
import Swal from "sweetalert2";
import {registrationDate} from "../../service/update_account/packageDetailService";
import * as AlertModal from "./AlertModal";
import {calculateDate} from "./CaculateDate";

export function UpdateAccountGold() {
    const [pricePay, setPricePay] = useState(0);
    const [payEros, setPayEros] = useState("");
    const [packageTypes, setPackageTypes] = useState([]);
    const {succesVnPay} = useParams();
    const accessToken = localStorage.getItem('accessToken')
    const [user, setUser] = useState();
    const [nameAccount, setNameAccount] = useState("")
    const [packageAccount, setPackageAccount] = useState([{name: "", money: "", expire: "", regisDate: ""}]);
    const currentDate = moment();
    const currentDate2 = moment().format('YYYY-MM-DD');
    const [datePackage, setDatePackage] = useState(0)
    const [newFutureDate, setNewFutureDate] = useState("");
    const [comfirmChange, setComfirmChange] = useState(false);

    const packageClick = (days) => {
        setDatePackage(days);
        let futureDate = currentDate.add(datePackage, 'days');
        setNewFutureDate(futureDate.format('YYYY-MM-DD'));
    }

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
    }


    useEffect(() => {
        const test = async () => {
            const resUsername = securityService.getUsernameByJwt();
            // setUserName(resUsername)
            if (resUsername !== null) {
                const resUser = await SearchNameService.findByUserName(resUsername);
                if (resUser) {
                    setUser(resUser.data);
                }
            }
        }
        test();
    }, []);
    const findPackageAccount = () => {
           try {
               packageTypesService.findPackageAccount(user.id).then(res => {
                   console.log(res)
                   setPackageAccount(res);
               });

           } catch (e){
               console.log("lỗi findPackageAccount")
           }
    }
    useEffect(() => {
        if (user) {
            console.log(user)
            findPackageAccount()
        }
    }, [user])
    const vnPayOnclick = async (pricePay) => {
        const link = await payService.checkVnPay(pricePay);
        console.log(link)
        window.location.href = link;
        callAsyncFunctions()
    }

    async function callAsyncFunctions() {
        try {
            await paySucces(user.id, 1); // Hàm bất đồng bộ 1
            console.log(comfirmChange)
            if (comfirmChange === true){
                console.log("dk 1")
                await setMoneyToPaySuccess(user.id, pricePay + packageAccount[0].money + (calculateDate(packageAccount[0].regisDate) * 1000)); // Hàm bất đồng bộ 2
            } else {
                console.log("dk 2")
                await setMoneyToPaySuccess(user.id, (pricePay + packageAccount[0].money)); // Hàm bất đồng bộ 2
            }
            await resetRadioButtons(); // Hàm bất đồng bộ 3

            if (packageAccount[0].name === nameAccount) {
                const endDate  = moment(packageAccount[0].regisDate)
                let startDate = moment(currentDate2);
                const partFutureDate = endDate.diff(startDate , 'days');
                const dateNow = datePackage;
                const totalDate = partFutureDate + dateNow;
                const newDate = currentDate.add(totalDate, 'days').format('YYYY-MM-DD');

                await registrationDate(currentDate2, newDate, user.id);
            } else {
                await registrationDate(currentDate2, newFutureDate, user.id);
            }

            // await load();
        } catch (error) {
            console.log("có lỗi xảy ra khi gọi cả 4 hàm")
        }
    }

    const handlePackage = async (namePackageAccount, nameAccount) => {
        if (namePackageAccount !== nameAccount && namePackageAccount !== "Member"){
            Swal.fire({
                title: "Thông báo thay đổi thứ hạng",
                text: `Hiện tại thứ hạng của bạn đang là ${namePackageAccount}, nếu bạn mua gói ${nameAccount} thì thứ hạng sẽ bị thay đổi. Thay vào đó nếu bạn thanh toán gói này chúng tôi sẽ hoàn lại kim cương dựa vào số ngày còn lại của gói cũ`,
                icon: "warning",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                // confirmButtonText: "Tôi đã hiểu"
                confirmButtonText: 'OK',
            })
            setComfirmChange(true)
        }
    }

    return (
        <div className="updateaccout-row updateaccount-body" style={{display: "flex"}}>
            <HeaderUpdateAccount/>

            <div className="col-xs-12 col-6 col-md-12 col-lg-6 col-sm-12">
                <div className="updateaccount-card-center">
                    <div style={{display: "flex", margin: "-25px 0 0 -15px"}}>
                        <p className="title ">Eros</p>
                        <p className="title gold">Gold</p>
                    </div>
                </div>

                <div className="updateaccount-card-center-content">
                    <p className="title ">Nâng cấp tương tác</p>
                    <ul>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Cho phép bạn bình luận vào bài viết
                            <p>
                                <i style={{color: "transparent"}} className="fa-solid fa-check"></i>
                                Bạn có thể bình luận vào bài viết người mình thích
                            </p>
                        </li>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Thêm kim cương tặng quà cho người bạn thích
                        </li>
                    </ul>
                </div>

                <div className="updateaccount-card-center-content" style={{minHeight: "115px"}}>
                    <p className="title ">Nâng cấp trải nghiệm của bạn</p>
                    <ul>
                        <li>
                            <i className="fa-solid fa-lock"></i>
                            Mở khóa chức năng gợi ý kết bạn
                        </li>
                    </ul>
                </div>


            </div>

            <div className="col-xs-12 col-3 col-md-12 col-lg-3 borderRadius haubao">
                <div className="updateaccount-radio-input " id="myForm">
                    <div className="updateaccount-card-right">
                        <p className="title ">Đăng ký Eros Gold</p>
                        <p style={{fontSize: "13px"}}>Bình luận vào bài viết & và nhiều quyền lợi khác</p>
                    </div>
                    {packageTypes.map(packageType => (
                        <div
                            onClick={() => packageClick(packageType.days)}>
                            <input
                                key={packageType.id}
                                onChange={(values) => setPricePay(packageType.price)}
                                type="radio" id={packageType.name}
                                name="value-radio"/>
                            <label style={{minWidth: "100%"}} htmlFor={packageType.name}>
                                {packageType.name}<br/>
                                {formatPrice(packageType.price)} {packageType.name === "1 tháng" ? (`/tháng`):(`/${packageType.name}`)}
                            </label>
                        </div>
                    ))}

                    <div className="updateaccount-radio-input-pay"
                         onClick={(event) => handlePackage(packageAccount[0].name, nameAccount)}>
                        <input onChange={(values) => setPayEros(values.target.value)} value="vnpay"
                               name="value-radio-pay"
                               id="value-4" type="radio"/>
                        <label htmlFor="value-4">Thanh toán VNPay</label>
                        <input onChange={(values) => setPayEros(values.target.value)} value="paypal"
                               name="value-radio-pay"
                               id="value-5" type="radio"/>
                        <label htmlFor="value-5">Thanh toán Paypal</label>
                    </div>

                    {payEros === '' && pricePay === 0 ? (
                        <div className="updateaccount-card-right">
                            <p className="title" style={{fontSize: "13px"}}>Vui lòng chọn gói và chọn phương thức thanh
                                toán</p>
                        </div>
                    ) : null}


                    {payEros === 'vnpay' && pricePay !== 0 ? (
                        <button className="updateaccount-pushable" onClick={() => vnPayOnclick(pricePay)}>
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
                                          AlertModal.alert(pricePay, nameAccount)
                                          onchange(callAsyncFunctions());
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
                </div>
            </div>
        </div>
    )
}