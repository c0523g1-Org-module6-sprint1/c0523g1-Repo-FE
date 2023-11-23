import "./css/test2.css"
import React from "react";
import {useNavigate} from "react-router-dom";

export function Test2() {
    const navigate = useNavigate();

    function toUpdateAccount() {
        navigate("/updateAccount/eros+")
    }

    return (<div>
            <button type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" style={{margin: "23% 0"}}>Click
            </button>



            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">



                        <div className="update-plan">
                            <div className="inner">
    <span className="pricing">
         <span>
        <i className="fa-regular fa-gem fa-bounce"></i>
      </span>
        <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
        />
    </span>
                                <p className="title">Nâng cấp trải nghiệm Eros</p>
                                <p className="info">
                                    Vui lòng nâng cấp tài khoản để trải nghiệm những tính năng mới nhất của Eros, chúng tôi cung cấp cho bạn những thứ hạng sau đây
                                </p>
                                <ul className="features">
                                    <li>
        <span className="icon">
          <svg
              height={24}
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"/>
            <path
                fill="currentColor"
                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
            />
          </svg>
        </span>
                                        <span>
          Eros<strong>+</strong>
        </span>
                                    </li>
                                    <li>
        <span className="icon">
          <svg
              height={24}
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"/>
            <path
                fill="currentColor"
                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
            />
          </svg>
        </span>
                                        <span>
          Eros <strong>Gold</strong>
        </span>
                                    </li>
                                    <li>
        <span className="icon">
          <svg
              height={24}
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"/>
            <path
                fill="currentColor"
                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
            />
          </svg>
        </span>
                                        <span>Eros <strong>Platinum</strong></span>
                                    </li>
                                </ul>
                                <div className="action">
                                    <a onClick={toUpdateAccount} className="button">
                                        Đi tới
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div>)
}