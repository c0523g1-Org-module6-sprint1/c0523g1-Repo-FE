import * as securityService from '../../service/login/securityService';
import * as yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import React, {useEffect, useState} from "react";
import FacebookLogin from 'react-facebook-login';
import './Login.css'


export default function Login() {

    /**/
    const initLoginReq = {
        username: "",
        password: ""
    }

    const [loginRequest, setLoginRequest] = useState({initLoginReq});
    const [facebookLoginReq, setFacebookLoginReq] = useState()
    const navigate = useNavigate();

    const wrongFormatMsg = "Trường này không được chứa ký tự đặc biệt";
    const wrongLengthFormatMsg = "Trường này phải có ít nhất 4 ký tự";
    const loginValidator = {
        username: yup.string().min(4, wrongLengthFormatMsg)
            .matches(/^[a-zA-Z0-9]+$/, wrongFormatMsg),
        password: yup.string().min(4, wrongLengthFormatMsg)
    }

    /**/
    const flag = localStorage.getItem("rememberChecked") !== null;
    const [rememberChecked, setRememberChecked] = useState(flag);

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
        if (!rememberChecked) {
            localStorage.setItem("rememberChecked", "checked");
        } else {
            localStorage.removeItem("rememberChecked");
            localStorage.removeItem("rememberedUsername");
            localStorage.removeItem("rememberedPassword");
        }
    }

    useEffect(() => {
        if (rememberChecked) {
            const storedUsername = localStorage.getItem("rememberedUsername");
            const storedPassword = localStorage.getItem("rememberedPassword");
            if (storedUsername) {
                setLoginRequest({
                    ...loginRequest,
                    username: storedUsername,
                    password: storedPassword
                });
            }
        }
    }, [rememberChecked]);

    /**/
    const initFacebookLoginReq = {
        isLoggedIn: null,
        userID: null,
        name: null,
        email: null,
        picture: null
    }


    /*handle facebook login*/
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

    const onFailure = (err) => {
        console.log(err);
    }
    const handleSubmit = async () => {
        if (loginRequest.username === undefined && loginRequest.password === undefined) {
            toast("Vui lòng điền tài khoản và mật khẩu!");
        } else if (loginRequest.password === undefined) {
            toast("Vui lòng điền mật khẩu!");
        } else if (loginRequest.username === undefined) {
            toast("Vui lòng điền tài khoản!");
        } else if (loginRequest.username.length === 0 && loginRequest.password.length === 0) {
            toast("Vui lòng điền tài khoản và mật khẩu!");
        } else if (loginRequest.password.length === 0) {
            toast("Vui lòng điền mật khẩu!");
        } else if (loginRequest.username.length === 0) {
            toast("Vui lòng điền tài khoản!");
        } else {
            try {
                const res = await securityService.doLogin(loginRequest);
                const status = res.status;
                if (status === 200) {
                    if (rememberChecked) {
                        localStorage.setItem("rememberedUsername", loginRequest.username);
                        localStorage.setItem("rememberedPassword", loginRequest.password);
                    }
                    await securityService.addAccessToken(res.data.jwtToken);
                    toast("Đăng nhập thành công!!");
                    navigate("/newsfeed");
                }
            } catch (e) {
                toast.error("Đăng nhập thất bại, sai tài khoản hoặc mật khẩu!");
            }
        }
    }

    return (
        <div id="thienbb-wrapper">
            <Link to="/401">Test 401</Link>
            <div className="thienbb-main-form">
                <div className="thienbb-login-title">
                    <span className="thienbb-login-title">ĐĂNG NHẬP</span>
                </div>
                <div className="login-form">
                    <Formik
                        initialValues={loginRequest}
                        validationSchema={yup.object(loginValidator)}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="form-child-unit">
                                <Field onChange={(events) => handleChangeUsername(events)}
                                       value={loginRequest.username}
                                       name="username" type="text" placeholder="Tên tài khoản"
                                       className="input-tag"/>
                                <ErrorMessage name="username" component="div" className="thienbb-form-err-msg"/>
                            </div>
                            <div className="form-child-unit">
                                <Field onChange={(events) => handleChangePassword(events)}
                                       value={loginRequest.password}
                                       name="password" type="password" placeholder="Mật khẩu"
                                       className="input-tag"/>
                                <ErrorMessage name="password" component="div" className="thienbb-form-err-msg"/>
                            </div>
                            <div className="thienbb-form-child-remember">
                                <label htmlFor="remember-me">
                                    <input type="checkbox"
                                           id="remember-me"
                                           onChange={(events) => handleRememberMe(events)}
                                           checked={rememberChecked}/>
                                    <span className="thienbb-remember-me-text"> Ghi nhớ tài khoản</span>
                                </label>
                            </div>
                            <div className="form-child-btn" id="login-btn-div">
                                <div className="login-btn">
                                    <button type="submit" className="thienbb-login-btn">
                                        Đăng nhập
                                    </button>
                                </div>
                                <div className="thienbb-login-with-fb-btn">
                                    <FacebookLogin
                                        appId="277886178584824"
                                        fields="name,email,picture"
                                        callback={responseFacebook}
                                        onFailure={(err) => onFailure(err)}
                                        cssClass="thienbb-fb-login-tag"
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