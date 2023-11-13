import './Login.css'
import {Field, Form} from "formik";

export default function Login() {

    return (
        <>
            <div className="form-parent">
                <div className="title">
                    <h1 className="title">ĐĂNG NHẬP</h1>
                </div>
                <Form className="form-child">
                    <div className="form-child-unit first">
                        <Field type="text" placeholder="Tên tài khoản" className="input-tag"/>
                    </div>
                    <div className="form-child-unit">
                        <Field type="password" placeholder="Mật khẩu" className="input-tag"/>
                    </div>
                    <div className="form-child-remember">
                        <label htmlFor="remember-me">
                            <Field type="checkbox" id="remember-me"/> Ghi nhớ tài khoản
                        </label>
                    </div>
                    <div className="form-child-unit" id="login-btn-div">
                        <div>
                            <button type="submit" className="btn">Đăng nhập</button>
                        </div>
                        <div>
                            <button type="button" className="btn" id="fb-login" onClick="loginWithFaceBook()">
                                <i className="fab fa-facebook"/> Đăng nhập với Facebook
                            </button>
                        </div>
                    </div>
                </Form>
                <div className="form-child last">
                    <p> Quay về{" "} <a href="" className="a-link"> Trang chủ! </a></p>
                    <p>Bạn chưa có tài khoản?{" "}<a href="#" className="a-link">Đăng ký</a></p>
                </div>
            </div>
        </>
    );
}