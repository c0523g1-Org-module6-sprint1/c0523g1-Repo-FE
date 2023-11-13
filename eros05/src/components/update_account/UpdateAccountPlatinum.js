import '../update_account/css/updateAccount.css'
import '../update_account/css/buttonPay.css'
import '../update_account/css/radioSelect.css'
import '../update_account/HeaderUpdateAccount'
import {HeaderUpdateAccount} from "./HeaderUpdateAccount";
import {PayPalButton} from "react-paypal-button-v2";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import * as packageTypesService from "../../service/update_account/packageTypesService";
import {formatPrice} from "./FormatPrice";

export function UpdateAccountPlatinum() {
    const [pricePay, setPricePay] = useState(0);
    const [payEros, setPayEros] = useState("");
    const [packageTypes, setPackageTypes] = useState([]);

    useEffect(() => {
        getAll()
    }, []);

    const getAll = async () => {
        let data = await packageTypesService.getAll();
        let dataEros = data.filter(data => data.accountType.id === 3)
        console.log(dataEros)
        setPackageTypes(dataEros);
    }

    return (
        <div className="row" style={{display: "flex"}}>
            <HeaderUpdateAccount/>

            <div className="col-xs-12 col-6 col-md-12 col-lg-6 col-sm-12">
                <div className="card-center">
                    <div style={{display: "flex", margin: "-25px 0 0 -15px"}}>
                        <p className="title ">Eros</p>
                        <p className="title platinum">Platinum</p>
                    </div>
                </div>

                <div className="card-center-content">
                    <p className="title ">Nâng cấp lượt thích</p>
                    <ul>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Thích không giới hạn
                        </li>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Xem ai thích bạn
                        </li>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Lượt thích ưu tiên
                        </li>
                    </ul>
                </div>

                <div className="card-center-content">
                    <p className="title ">Nâng cấp trải nghiệm của bạn</p>
                    <ul>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            Tài khoản của bạn được đề xuất đến nhiều người
                        </li>
                        <li>
                            <i className="fa-solid fa-check"></i>
                            20 lượt tặng quà mỗi ngày
                        </li>
                        <li>
                            <i className="fa-solid fa-check"></i>
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

                <div className="card-center-content">
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
                <div className="card-right">
                    <p className="title ">Đăng ký Eros Platinum</p>
                    <p style={{fontSize: "14px"}}>Trải nghiệm hẹn hò thú vị bậc nhất</p>
                </div>

                <div className="radio-input">
                    {packageTypes.map(packageType => (
                        <>
                            <input onChange={(values) => setPricePay(values.target.value)}
                                   type="radio" id={packageType.name}
                                   name="value-radio"
                                   value={packageType.price}/>
                            <label htmlFor={packageType.name}>
                                {packageType.name}<br/>
                                {formatPrice(packageType.price)} đ/tháng
                            </label>
                        </>
                    ))}

                    {/*<input type="radio" id="value-1" name="value-radio" value="value-1" checked/>*/}
                    {/*<label htmlFor="value-1">*/}
                    {/*    1 tháng<br/>*/}
                    {/*    256.041 đ/tháng*/}
                    {/*</label>*/}

                    {/*<input type="radio" id="value-2" name="value-radio" value="value-2"/>*/}
                    {/*<label htmlFor="value-2">*/}
                    {/*    6 tháng <br/>*/}
                    {/*    130.135 đ/tháng <br/>*/}
                    {/*    Tiết kiệm 50%*/}
                    {/*</label>*/}

                    {/*<input type="radio" id="value-3" name="value-radio" value="value-3"/>*/}
                    {/*<label htmlFor="value-3">*/}
                    {/*    12 tháng <br/>*/}
                    {/*    91.500 đ/tháng <br/>*/}
                    {/*    Tiết kiêm 65%*/}
                    {/*</label>*/}

                    <div className="radio-input-pay">
                        <input onChange={(values) => setPayEros(values.target.value)} value="vnpay" name="value-radio-pay"
                               id="value-4" type="radio"/>
                        <label htmlFor="value-4">Thanh toán VNPay</label>
                        <input onChange={(values) => setPayEros(values.target.value)} value="paypal" name="value-radio-pay"
                               id="value-5" type="radio"/>
                        <label htmlFor="value-5">Thanh toán Paypal</label>
                        <input onChange={(values) => setPayEros(values.target.value)} value="momo" name="value-radio-pay"
                               id="value-6" type="radio"/>
                        <label htmlFor="value-6">Thanh toán Momo</label>
                    </div>


                    {payEros === 'vnpay' && pricePay !== 0 ? (
                        <button className="pushable">
                            <span className="shadow"></span>
                            <span className="edge"></span>
                            <span className="front">
                                    Thanh toán VNPay
                                    </span>
                        </button>
                    ) : null}

                    {payEros === 'paypal' && pricePay !== 0 ? (
                        <PayPalButton classname="paypal-button-label-container"
                                      amount="0.01"
                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                      onSuccess={(details, data) => {
                                          toast.success(`Thanh toán thành công ${pricePay} vnđ bởi ` + details.payer.name.given_name);
                                          getAll()
                                          console.log("OK")
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

                    {payEros === 'momo' && pricePay !== 0 ?(
                        <div>
                            <img src="../../public/pay-momo.jpg" alt=""/>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}