import React, {useEffect, useState} from "react";
import * as accountTypesService from "../../service/update_account/accountTypeService"
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as securityService from "../../service/login/securityService";
import * as SearchNameService from "../../service/searchName/searchNameService";
import {getPrivacyPost} from "../../service/posts/PostService";
import moment from "moment/moment";
import "./css/upPost.css"
import * as Yup from "yup";

export function Test() {
    const [formData, setFormData] = useState("");
    const [contents, setContents] = useState("");
    const [image, setImage] = useState("");
    const [img, setImg] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");
    const accessToken = localStorage.getItem('accessToken')
    const [user, setUser] = useState();
    const [privacyPostList, setPrivacyPostList] = useState();
    const currentDate = moment().format('YYYY-MM-DD');

    const fetchDataPrivacyPost = async () => {
        const privacyPostList = await getPrivacyPost();
        setPrivacyPostList(privacyPostList);
    };
    useEffect(() => {
        fetchDataPrivacyPost();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imagePath = URL.createObjectURL(file);
        setImage(imagePath);
        console.log(image)
        const upload = document.getElementById('upload');
        const preview = document.getElementById('preview');
        upload.addEventListener('mouseout', function () {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    const clickHandle = () => {
        let data = formData;
        setContents(data);
        setImg(image)
    }

    function upPostSucces() {
        setImage(resetSuccess);
        setFormData(resetSuccess);
        console.log(image)
        console.log(formData)
    }


    const innitValue = {
        content: "",
        image: "",
        accountId: "",
        privacyPostId: 1
    }

    function CurrentTime() {
        const currentTime = moment();
        const currentYear = currentTime.format('YYYY');
        const currentMonth = currentTime.format('MM');
        const currentDay = currentTime.format('DD');
        const currentHour = currentTime.format('HH');
        const currentMinute = currentTime.format('mm');
        const currentSecond = currentTime.format('ss');
        return `${currentYear}-${currentMonth}-${currentDay} ${currentHour}:${currentMinute}:${currentSecond}`
    }

    const upPost = async (values) => {
        values.accountId = user.id;
        values.content = contents;
        values.image = img;
        values.privacyPostId = +values.privacyPostId;
        console.log("privacyPost " + typeof values.privacyPostId)
        console.log("account id " + typeof values.accountId)
        console.log("content " + typeof values.content);
        console.log("image " +typeof values.image);
        console.log(values)
        let status = await accountTypesService.upPost(values);
        console.log(status)
        if (status === 201) {
            toast.success("Thêm mới thành công");
            upPostSucces();
        } else {
            toast.error("Thêm mới thất bại");
        }
    }

    const validatePost = {
        content: Yup.string().max(
            6000,
            "Tình yêu có thể viết ngắn lại được không ?"
        ),
        privacyPostId: Yup.string().required(
            "Tình yêu xin hãy chọn quyền riêng tư"
        ),
    };




    useEffect(() => {
        const test = async () => {
            const resUsername = securityService.getUsernameByJwt();
            console.log('resUserName >>>>' + resUsername)
            // setUserName(resUsername)
            if (resUsername !== null) {
                const resUser = await SearchNameService.findByUserName(resUsername);
                console.log("resUser >>> " + resUser)
                if (resUser) {
                    setUser(resUser.data);
                    console.log("-------------------")
                    // console.log(user)
                    // console.log(user.id)
                }
            }
        }
        test();
    }, []);
    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user])

    if (!privacyPostList || !user) {
        return null;
    }


    return (
        <div>
            <div style={{display: "flex", margin: "-10% 0px 15px 21%", width:"55%"}}>
                <div
                    style={{
                        backgroundImage:
                            `url(${user.avatar})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        aspectRatio: "1/1",
                        width: 50,
                        borderRadius: "100%",
                        marginRight: 10
                    }}
                />
                <button
                    className="uppost-input"
                    name="text"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{width: "100%"}}
                >
                    Lisa ơi, bạn đang nghĩ gì ?
                </button>
            </div>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="uppost-modal-title fs-5" id="exampleModalLabel">
                                Tạo bài viết
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        <Formik
                            initialValues={innitValue}
                            onSubmit={(value) => upPost(value)}
                            >
                            <Form>
                                <div className="modal-body">
                                    <div className="row" style={{display: "flex"}}>
                                        <div
                                            style={{
                                                backgroundImage: `url(${user.avatar})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                aspectRatio: "1/1",
                                                width: "14%",
                                                borderRadius: "100%",
                                                marginLeft: "2%"
                                            }}
                                        />
                                        <div className="col-10">
                                            <h4>Lisa</h4>
                                            <Field
                                                component="select"
                                                name="privacyPostId"
                                                className="uppost-form-select">
                                                {privacyPostList.map((item) => (
                                                    <option name="privacyPost" key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </Field>

                                        </div>
                                    </div>
                                    <ReactQuill
                                        name="content"
                                        style={{margin: "5% 0", width: "106%",
                                            marginLeft: "-15px"}}
                                        theme="snow" value={formData}
                                        onChange={setFormData}/>

                                    <button className="button-uppost">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" className="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd" clip-rule="evenodd"><path d="m4 9c0-1.10457.89543-2 2-2h2l.44721-.89443c.33879-.67757 1.03131-1.10557 1.78889-1.10557h3.5278c.7576 0 1.4501.428 1.7889 1.10557l.4472.89443h2c1.1046 0 2 .89543 2 2v8c0 1.1046-.8954 2-2 2h-12c-1.10457 0-2-.8954-2-2z"></path><path d="m15 13c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z"></path></g></svg>
                                        <span className="lable-uppost">Tải ảnh lên</span>
                                        <input style={{opacity:"0", position:"absolute", cursor:"pointer"}} type="file" onChange={handleImageChange} id="upload" accept="image/*"/>
                                    </button>

                                    <img className="img-review" style={{width: "300px"}} id="preview" src={image}/>
                                    <br/>
                                    {formData !== "" || image !== "" ? (
                                        <button
                                                data-bs-dismiss="modal"
                                                  style={{margin: "3% 0 0 0"}} onClick={clickHandle} type="submit" className="btn-close uppost-pushable">
                                            <span className="shadow"/>
                                            <span className="uppost-edge"/>
                                            <span className="uppost-front">Đăng</span>
                                        </button>
                                    ) : (
                                        <button style={{margin: "3% 0 17px 0", cursor: "no-drop", outline: "none", pointerEvents: "none"}} disabled type="button"
                                                className="uppost-pushable">
                                            <span className="shadow"/>
                                            <span className="uppost-edge"/>
                                            <span style={{backgroundColor: "grey"}} className="uppost-front">Đăng</span>
                                        </button>
                                    )}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

    )
}