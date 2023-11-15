import './Login.css'
import {Field, Form} from "formik";
import {useEffect, useState} from "react";
import * as loginService from '../../service/login/loginService';
import axios from "axios";

export default function Login() {

    const initLoginRequest = {
        username: "",
        password: ""
    }

    const [loginRequest, setLoginRequest] = useState(initLoginRequest);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem(token));

    /*set the default authorization header in axios */
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    /*Handle: username, password, submit */
    const handleChangeUsername = (events) => {
        setUsername(events);
    }

    const handleChangePassword = (events) => {
        setPassword(events);
    }

    const handleSubmit = async () => {
        setLoginRequest({
            username: username,
            password: password
        })
        await loginService.doLogin(loginRequest);
    }

    /*Handle: setToken into localStorage*/
    const handleSetToken = (events) => {
        setToken(events);
    }


    return (
        <div id="wrapper">
            <div className="main-form">
                <div className="login-title">
                    <h1 className="title">ĐĂNG NHẬP</h1>
                </div>
                <div className="login-form">
                    <Formik
                        initialValues={null}
                        onSubmit={null}>
                        <Form>
                            <div className="form-child-unit">
                                <Field type="text" placeholder="Tên tài khoản" className="input-tag"/>
                            </div>
                            <div className="form-child-unit">
                                <Field type="password" placeholder="Mật khẩu" className="input-tag"/>
                            </div>
                            <div className="form-child-remember">
                                <label htmlFor="remember-me">
                                    <Field type="checkbox" id="remember-me"/> Ghi nhớ tài
                                    khoản
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
                                <p> Quay về <a href="#" className="a-link"> Trang chủ! </a></p>
                                <p>Bạn chưa có tài khoản? <a href="#" className="a-link">Đăng ký</a></p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}