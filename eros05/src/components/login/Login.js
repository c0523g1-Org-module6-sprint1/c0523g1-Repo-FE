import './Login.css'
import * as securityService from '../../service/login/securityService';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";
import {useState} from "react";
import * as yup from "yup";
import {getAccessToken, getIdByJwt, getUsernameByJwt} from "../../service/login/securityService";

export default function Login() {

    const initLoginRequest = {
        username: null,
        password: null
    }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginRequest, setLoginRequest] = useState(initLoginRequest);
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
                                    <input type="checkbox" id="remember-me"/>
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
                                    <button type="button" className="thienbb-login-btn" id="fb-login">
                                        <i className="fab fa-facebook thienbb-fb-icon"/> Đăng nhập với Facebook
                                    </button>
                                </div>
                            </div>
                            <div className="form-child-option">
                                <p className="thienbb-login-text"> Quay về
                                    <Link to="/" className="thienbb-a-link"> Trang chủ! </Link>
                                </p>
                                <p className="thienbb-login-text">Bạn chưa có tài khoản?
                                    <Link to="/register" className="thienbb-a-link">Đăng ký</Link>
                                </p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}