import './Login.css'
import * as securityService from '../../service/login/securityService';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import React, {useState} from "react";
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';


export default function Login() {

    const initLoginRequest = {
        username: null,
        password: null
    }

    const initFacebookLoginReq = {
        isLoggedIn: null,
        userID: null,
        name: null,
        email: null,
        picture: null
    }

    const [rememberChecked, setRememberChecked] = useState(false);
    const [rememberedUser, setRememberedUser] = useState({
        username: "",
        password: ""
    })
    const [loginRequest, setLoginRequest] = useState(initLoginRequest);
    const [facebookLoginReq, setFacebookLoginReq] = useState()
    const navigate = useNavigate();


    /*Handle: username, password, submit */
    const handleChangeUsername = (events) => {
        setLoginRequest({
            ...loginRequest,
            username: events.target.value
        })
    }

    const handleChangePassword = (events) => {
        setLoginRequest({
            ...loginRequest,
            password: events.target.value
        })
    }

    /*handle remember-account*/
    const handleRememberMe = () => {
        setRememberChecked(current => !current);
    }


    const handleSubmit = async () => {
        try {
            const res = await securityService.doLogin(loginRequest);
            const status = res.status;
            if (status === 200) {
                await securityService.addAccessToken(res.data.jwtToken);
                toast("Đăng nhập thành công!!");
                navigate("/newsfeed");
            } else {
                toast.error("Đăng nhập thất bại, sai tài khoản hoặc mật khẩu!");
            }
        } catch (e) {
            toast.error("Vui lòng thử lại!");
        }
    }

    const componentClicked = () => {

    };
    const responseFacebook = (response) => {
        console.log(response)
        setFacebookLoginReq({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.clientSecret,
            picture: response.picture.data.url
        })
    };



    return (
        <div id="wrapper">
            <div className="main-form">
                <div className="login-title">
                    <h1 className="thienbb-login-title">ĐĂNG NHẬP</h1>
                </div>
                <div className="login-form">
                    <Formik
                        initialValues={loginRequest}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="form-child-unit">
                                <Field onChange={(events) => handleChangeUsername(events)}
                                       name="username" type="text" placeholder="Tên tài khoản"
                                       className="input-tag"/>
                                <ErrorMessage name="username" component="div" className="thienbb-form-err-msg"/>
                            </div>
                            <div className="form-child-unit">
                                <Field onChange={(events) => handleChangePassword(events)}
                                       name="password" type="password" placeholder="Mật khẩu"
                                       className="input-tag"/>
                                <ErrorMessage name="password" component="div" className="thienbb-form-err-msg"/>
                            </div>
                            <div className="form-child-remember">
                                <label htmlFor="remember-me">
                                    <input type="checkbox" onChange={handleRememberMe} id="remember-me"/>
                                    <span className="remember-me-text"> Ghi nhớ tài khoản</span>
                                </label>
                            </div>
                            <div className="form-child-btn" id="login-btn-div">
                                <div className="login-btn">
                                    <button type="submit" className="thienbb-login-btn">
                                        Đăng nhập
                                    </button>
                                </div>
                                <div className="login-with-fb-btn">
                                    <FacebookLogin
                                        appId="1068795897729860"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        onClick={componentClicked}
                                        callback={responseFacebook}
                                        cssClass="fb-login-tag"
                                        icon=<i className="fa-brands fa-facebook" style={{color: "#ffffff"}}/>
                                        textButton=" Đăng nhập bằng Facebook"
                                    />
                                </div>

                            </div>
                            <div className="form-child-option">
                                <p className="thienbb-login-text"> Quay về
                                    <Link to="/" className="thienbb-a-link"> Trang chủ! </Link>
                                </p>
                                <p className="thienbb-login-text">Bạn chưa có tài khoản?
                                    <Link to="/register" className="thienbb-a-link"> Đăng ký</Link>
                                </p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}