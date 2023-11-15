import './Login.css'
import {Field, Form} from "formik";
import {useState} from "react";
import * as loginService from '../../service/login/loginService';

export default function Login() {

    const initLoginRequest = {
        username: "",
        password: ""
    }

    const [loginRequest, setLoginRequest] = useState(initLoginRequest);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    return (
        <>
            <div className="form-parent">
                <div className="title">
                    <h1 className="title">ĐĂNG NHẬP</h1>
                </div>
                <Form className="form-child">
                    <div className="form-child-unit first">
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
                    <div className="form-child-unit" id="login-btn-div">
                        <div>
                            <button onClick={() => handleSubmit()}
                                    type="button" className="btn">Đăng nhập
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn" id="fb-login" onClick="loginWithFaceBook()">
                                <i className="fab fa-facebook"/> Đăng nhập với Facebook
                            </button>
                        </div>
                    </div>
                </Form>
                <div className="form-child last">
                    <p> Quay về <a href="" className="a-link"> Trang chủ! </a></p>
                    <p>Bạn chưa có tài khoản?{" "}<a href="#" className="a-link">Đăng ký</a></p>
                </div>
            </div>
        </>
    );
}