import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import * as accountRegisterService from "../../service/account_register/AccountRegisterService";
import {toast} from "react-toastify";
import "../account_register/AccountRegister.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";

export function Register() {
    const navigate = useNavigate();
    const [job, setJob] = useState([]);
    const [location, setLocation] = useState([]);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };


    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    useEffect(() => {
        getJob()
        getLocation()
    }, [])

    const getJob = async () => {
        try {
            const data = await accountRegisterService.getJob();
            setJob(data);
        } catch (e) {
            toast.warn("Lỗi");
        }
    }

    const getLocation = async () => {
        try {
            const data = await accountRegisterService.getLocation();
            setLocation(data);
        } catch (e) {
            toast.warn("Lỗi");
        }
    }

    const initValuesRegister = {
        userName: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        gender: 2,
        // job: 1,
        // location: 1,
        email: "",
        confirmEmail: ""
    }


    const validationSchema = {
        userName: Yup.string()
            .required("Không được để trống tên đăng nhập !")
            // .test('check-userName', 'Không để trống tên tài khoản !', (value) => value.trim().length !== 0)
            .min(6, "Tên đăng nhập phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100, "Tên đăng nhập phải ít hơn hoặc bằng 100 kí tự"),
        password: Yup.string()
            .required("Không được để trống mật khẩu !")
            // .test('check-password', "Không được để trống mật khẩu", (value) => value.trim().length !== 0)
            .min(6, "Mật khẩu phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100, "Mật khẩu phải ít hơn hoặc bằng 100 kí tự"),
        confirmPassword: Yup.string()
            .required("Không được để trống xác nhận mật khẩu !")
            // .test("check-confirmPassword", "Không được để trống xác nhận mật khẩu !", (value) => value.trim().length !== 0)
            .min(6, "Xác nhận mật khẩu phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100, "Xác nhận mật khẩu phải ít hơn hoặc bằng 100 kí tự !")
            .oneOf([Yup.ref('password'), null], "Mật khẩu không trùng khớp !"),
        birthday: Yup.date()
            // .test(new Date(birthday) <= new Date().setFullYear(new Date().getFullYear() - 18),"Vui lòng phải đủ 18 tuổi !")
            .test(
                "birthday",
                "Vui lòng phải đủ 18 tuổi!",
                function (value) {
                    const cutoffDate = new Date();
                    cutoffDate.setFullYear(cutoffDate.getFullYear() - 18);
                    return new Date(value) <= cutoffDate;
                }
            )
            .required("Không được để trống ngày sinh !")
            .max(new Date(), "Vui lòng nhập trước ngày hiện tại"),
        // .min(new Date(birthday) <= new Date().setFullYear(new Date().getFullYear() - 18), "Vui lòng phải đủ 18 tuổi !"),
        email: Yup.string()
            .required("Không được để trống email !")
            // .test("check-email", "Không được bỏ trống email !", (value) => value.trim().length !== 0)
            .min(6, "Email phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100, "Email phải ít hơn hoặc bằng 100 kí tự !"),
        confirmEmail: Yup.string()
            .required("Không được để trống xác nhận email !")
            // .test("check-confirmEmail", "Không được bỏ trống xác nhận email !", (value) => value.trim().length !== 0)
            .min(6, "Xác nhận email phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100, "Xác nhận email phải ít hơn hoặc bằng 100 kí tự !")
            .oneOf([Yup.ref('email'), null], "Email không trùng khớp !")
    }

    const handleRegister = async (data) => {
        try {
            const response = await accountRegisterService.register(data);
            if (response.status === 202) {
                toast.success("Bạn đã tạo mới tài khoản thành công !")
                navigate("/login")
            } else if (response.status === 200) {
                toast.error(response.data)
            }
        } catch (e) {
            toast.error("Tạo tài khoản thất bại !");
        }
    }

    return (
        <>
            {/*job && location &&*/}
            <div className="sang_wrapper">
                <h1 className="mt-3 sang_title">Đăng ký</h1>
                <div>
                    <Formik initialValues={initValuesRegister}
                            onSubmit={(values => handleRegister(values))}
                            validationSchema={Yup.object(validationSchema)}
                    >
                        <Form className="sang_form">
                            <div className='mb-3'>
                                <label htmlFor="userName" className='form-label'>Tên đăng nhập :</label>
                                <Field type='text' name="userName" className='form-control' id='userName'/>
                                <ErrorMessage name="userName" component="span" style={{color: "red"}}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='form-label'>Mật khẩu :</label>
                                <div className='input-group'>
                                    <Field type={showPassword1 ? 'text' : 'password'} name="password"
                                           className='form-control' id='password'/>
                                    <div className='input-group-append'>
                                        <span className='input-group-text' onClick={togglePasswordVisibility1}>
                                            <i className={`fa-solid ${showPassword1 ? 'fa-eye-slash' : 'fa-eye'}`}/>
                                        </span>
                                    </div>
                                </div>
                                <ErrorMessage name="password" component="span" style={{color: "red"}}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="confirmPassword" className='form-label'>Nhập lại mật khẩu :</label>
                                {/*<Field type='password' name="confirmPassword" className='form-control'*/}
                                {/*       id='confirmPassword'/>*/}
                                <div className='input-group'>
                                    <Field type={showPassword2 ? 'text' : 'password'} name="confirmPassword"
                                           className='form-control' id='confirmPassword'/>
                                    <div className='input-group-append'>
                                        <span className='input-group-text' onClick={togglePasswordVisibility2}>
                                            <i className={`fa-solid ${showPassword2 ? 'fa-eye-slash' : 'fa-eye'}`}/>
                                        </span>
                                    </div>
                                </div>
                                <ErrorMessage name="confirmPassword" component="span" style={{color: "red"}}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="birthday" className='form-label'>Ngày sinh :</label>
                                <Field type='date' name="birthday" className='form-control' id='birthday'/>
                                <ErrorMessage name="birthday" component="span" style={{color: "red"}}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label gender" htmlFor="gioiTinh">
                                    Giới tính :
                                </label>
                                <div className="form-check form-check-inline">
                                    <Field
                                        className="form-check-input"
                                        id="optionA"
                                        type="radio"
                                        name="gender"
                                        value="1"
                                    />
                                    <label className="form-check-label" htmlFor="optionA">
                                        Nam
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field
                                        className="form-check-input"
                                        id="optionB"
                                        type="radio"
                                        name="gender"
                                        value="2"
                                    />
                                    <label className="form-check-label" htmlFor="optionB">
                                        Nữ
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field
                                        className="form-check-input"
                                        id="optionC"
                                        type="radio"
                                        name="gender"
                                        value="3"
                                    />
                                    <label className="form-check-label" htmlFor="optionC">
                                        LGBT
                                    </label>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label>Nghề nghiệp :</label>
                                <Field as="select" className='form-control' name="job" style={{
                                    textAlign: 'center'
                                }}>
                                    <option className="option" value="">--Select--</option>
                                    {
                                        job.map(type => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))
                                    }
                                </Field>
                            </div>
                            <div className='mb-3'>
                                <label>Địa chỉ :</label>
                                <Field as="select" className='form-control' name="location" style={{
                                    textAlign: 'center'
                                }}>
                                    <option className="option" value="">--Select--</option>
                                    {
                                        location.map(type => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))
                                    }
                                </Field>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='form-label'>Email :</label>
                                <Field type='text' name="email" className='form-control' id='email'/>
                                <ErrorMessage name="email" component="span" style={{color: "red"}}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="confirmEmail" className='form-label'>Xác nhận email :</label>
                                <Field type='text' name="confirmEmail" className='form-control' id='confirmEmail'/>
                                <ErrorMessage name="confirmEmail" component="span" style={{color: "red"}}/>
                            </div>


                            <div className="mb-3 form-rules">
                                <label className="form-label" htmlFor="rule">
                                    {" "}
                                    <span className="forum-rules">Nội quy diễn đàn : </span>
                                    Bạn cần đọc và chấp nhận đồng ý theo điều khoản khi đăng kí
                                </label>
                            </div>
                            <div className="mb-3 form-unit">
        <textarea
            className="form-control"
            id="rule"
            defaultValue={
                "Eros05 cung cấp dịch vụ theo điều khoản dịch vụ này. truy cập hoặc đăng ký tài khoản trong hệ thống của chúng tôi bằng bất kỳ cách nào có nghĩa là bạn đồng ý và cam kết tuân thủ nghiêm ngặt điều khoản dịch vụ này. chúng tôi có quyền sửa đổi nội dung của điều khoản dịch vụ theo quyết định riêng của mình mà không cần thông báo trước cho người dùng.\n                "
            }
        />
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <label className="form-check-label agree-label" htmlFor="agree">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="optionA"
                                            id="agree"
                                        />
                                        Tôi đã đọc và đồng ý tuân theo điều khoản đăng ký của diễn đàn
                                    </label>
                                </div>
                            </div>
                            <div className=" btn-div">
                                <div className="btn-div-child">
                                    <Link to="/">
                                        <button className="sang_btn_cancel">Hủy bỏ</button>
                                    </Link>
                                </div>
                                <div className="btn-div-child">
                                    <button className="sang_btn_submit" type="submit">
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>

        </>
    )


}