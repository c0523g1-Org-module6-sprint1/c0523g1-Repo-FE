import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import * as accountRegisterService from "../../service/account_register/AccountRegisterService";
import {toast} from "react-toastify";
import "../account_register/AccountRegister.css";

export function Register() {
    const navigate = useNavigate();

    const initValuesRegister = {
        userName : "",
        password : "",
        confirmPassword: "",
        birthday : "",
        gender : JSON.stringify({
            id : 1,
            name : "Nam"
        }),
        job : JSON.stringify({
            id : 1,
            name : "IT"
        }),
        location : JSON.stringify({
            id : 1,
            name : "ĐN"
        }),
        email : "",
        confirmEmail : ""
    }

    const validationSchema = {
        userName: Yup.string()
            .required("Không được để trống tên tài khoản !")
            .test('check-userName','Không để trống tên tài khoản !',(value) => value.trim().length !== 0)
            .min(6,"Tên đăng nhập phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100,"Tên đăng nhập phải ít hơn hoặc bằng 100 kí tự"),
        password: Yup.string()
            .required("Không được để trống mật khẩu !")
            .test('check-password',"Không được để trống mật khẩu",(value) => value.trim().length !==0)
            .min(6,"Mật khẩu phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100,"Mật khẩu phải ít hơn hoặc bằng 100 kí tự"),
        confirmPassword: Yup.string()
            .required("Không được để trống xác nhận mật khẩu !")
            .test("check-confirmPassword","Không được để trống xác nhận mật khẩu !",(value) => value.trim().length !== 0)
            .min(6,"Xác nhận mật khẩu phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100,"Xác nhận mật khẩu phải ít hơn hoặc bằng 100 kí tự !")
            .oneOf([Yup.ref('password'),null],"Mật khẩu không trùng khớp 1"),
        birthday: Yup.date()
            .required("Không được để trống ngày sinh !")
            .max(new Date(),"Vui lòng nhập trước ngày hiện tại")
            .min(new Date(birthday) <= new Date().setFullYear(new Date().getFullYear() - 18),"Vui lòng phải đủ 18 tuổi !"),
        email: Yup.string()
            .required("Không được để trống email !")
            .test("check-email","Không được bỏ trống email !", (value) => value.trim().length !== 0)
            .min(6,"Email phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100,"Email phải ít hơn hoặc bằng 100 kí tự !"),
        confirmEmail: Yup.string()
            .required("Không được để trống xác nhận email !")
            .test("check-confirmEmail","Không được bỏ trống xác nhận email !", (value) => value.trim().length !== 0)
            .min(6,"Xác nhận email phải lớn hơn hoặc bằng 6 kí tự !")
            .max(100,"Xác nhận email phải ít hơn hoặc bằng 100 kí tự !")
            .oneOf([Yup.ref('password'),null],"Email không trùng khớp !")
    }

    const handleRegister = async (values) => {
        try {
            console.log(values);
            const response = await accountRegisterService.register(values);
            console.log(values);
            if (response.status === 202){
                toast.success("Bạn đã tạo mới tài khoản thành công !")
                console.log(response.data.userName)
            }else if (response.status === 200){
                toast.error(response.data);
            }
        }catch (e) {
            toast.error("Tạo tài khoản thất bại !");
        }
    }

    return(
        <>
            <div className="sang_wrapper">
                <h1 className="mt-3 sang_title">Đăng ký</h1>
                <div>
                    <form className="sang_form">
                        <div className="mb-3 form-unit">
                            <label className="form-label" htmlFor="tenDangNhap">
                                Tên đăng nhập :
                            </label>
                            <input className="form-control" id="tenDangNhap" type="text" />
                        </div>
                        <div className="mb-3 form-unit">
                            <label className="form-label" htmlFor="matKhau">
                                Mật khẩu :
                            </label>
                            <input className="form-control" id="matKhau" type="text" />
                        </div>
                        <div className="mb-3 form-unit">
                            <label className="form-label" htmlFor="nhapLaiMatKhau">
                                Nhập lại mật khẩu :
                            </label>
                            <input className="form-control" id="nhapLaiMatKhau" type="text" />
                        </div>
                        <div className="mb-3 form-unit">
                            <label className="form-label gender" htmlFor="gioiTinh">
                                Giới tính :
                            </label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    id="optionA"
                                    type="radio"
                                    name="newField1"
                                />
                                <label className="form-check-label" htmlFor="optionA">
                                    Nam
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    id="optionB"
                                    type="radio"
                                    name="newField1"
                                />
                                <label className="form-check-label" htmlFor="optionB">
                                    Nữ
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    id="optionC"
                                    type="radio"
                                    name="newField1"
                                />
                                <label className="form-check-label" htmlFor="optionC">
                                    LGBT
                                </label>
                            </div>
                        </div>
                        <div className="mb-3 form-unit">
                            <label className="form-label" htmlFor="ngheNghiep">
                                Nghề nghiệp :{" "}
                            </label>
                            <input className="form-control" id="ngheNghiep" type="text" />
                        </div>
                        <div className="mb-3 form-unit">
                            <label className="form-label" htmlFor="email">
                                Email{" "}
                            </label>
                            <input className="form-control" id="email" type="text" />
                        </div>
                        <div className="mb-3 form-unit">
                            <label className="form-label" htmlFor="diaChi">
                                Địa chỉ :
                            </label>
                            <input className="form-control" id="diaChi" type="text" />
                        </div>
                        <div className="mb-3 form-rules">
                            <label className="form-label" htmlFor="rule">
                                {" "}
                                <span className="forum-rules">Nội quy diễn đàn:</span>
                                Bạn cần đọc và chấp nhận đồng ý theo{" "}
                                <a className="privacy-link" href="#">
                                    Điều khoản
                                </a>{" "}
                                khi đăng kí
                            </label>
                        </div>
                        <div className="mb-3 form-unit">
        <textarea
            className="form-control"
            id="rule"
            type="text"
            defaultValue={
                "C05Cupid cung cấp dịch vụ theo điều khoản dịch vụ này. truy cập hoặc đăng ký tài khoản trong hệ thống của chúng tôi bằng bất kỳ cách nào có nghĩa là bạn đồng ý và cam kết tuân thủ nghiêm ngặt điều khoản dịch vụ này. chúng tôi có quyền sửa đổi nội dung của điều khoản dịch vụ theo quyết định riêng của mình mà không cần thông báo trước cho người dùng.\n                "
            }
        />
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-check-inline">
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
                                <button className="sang_btn_cancel">Hủy bỏ</button>
                            </div>
                            <div className="btn-div-child">
                                <button className="sang_btn_submit">Xác nhận</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )



}