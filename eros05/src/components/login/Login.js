import './Login.css'
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as securityService from '../../service/login/loginService';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const initLoginRequest = {
        username: null,
        password: null
    }
    const [loginRequest, setLoginRequest] = useState({initLoginRequest});

    /*Handle: username, password, submit */
    const handleChangeUsername = (events) => {
        setUsername(events.target.value);
    }

    const handleChangePassword = (events) => {
        setPassword(events.target.value);
    }

    const handleSubmit = async () => {
        try {
            const res = await securityService.doLogin(loginRequest);
            if (res.status === 200) {
                await securityService.addAccessToken(res.data.jwtToken);
                navigate("/newsfeed")
            } else {
                toast.error("Đăng nhập thất bại, sai tài khoản hoặc mật khẩu!")
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div id="wrapper">
            <div className="main-form">
                <div className="login-title">
                    <h1 className="title">ĐĂNG NHẬP</h1>
                </div>
                <div className="login-form">
                    <Formik
                        initialValues={initLoginRequest}
                        onSubmit={handleSubmit}>
                        <Form>
                            <div className="form-child-unit">
                                <Field onChange={(events) => handleChangeUsername(events)}
                                    type="text" placeholder="Tên tài khoản" className="input-tag"/>
                            </div>
                            <div className="form-child-unit">
                                <Field onChange={(events) => handleChangePassword(events)}
                                    type="password" placeholder="Mật khẩu" className="input-tag"/>
                            </div>
                            <div className="form-child-remember">
                                <label htmlFor="remember-me">
                                    <Field type="checkbox" id="remember-me"/> Ghi nhớ tài khoản
                                </label>
                            </div>
                            <div className="form-child-btn" id="login-btn-div">
                                <div className="login-btn">
                                    <button type="submit" className="btn">Đăng nhập</button>
                                </div>
                                <div className="login-with-fb-btn">
                                    <button type="button" className="btn" id="fb-login">
                                        <i className="fab fa-facebook"/> Đăng nhập với Facebook
                                    </button>
                                </div>
                            </div>
                            <div className="form-child-option">
                                <p> Quay về <Link to="/" className="a-link"> Trang chủ! </Link></p>
                                <p>Bạn chưa có tài khoản? <a href="#" className="a-link">Đăng ký</a></p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}