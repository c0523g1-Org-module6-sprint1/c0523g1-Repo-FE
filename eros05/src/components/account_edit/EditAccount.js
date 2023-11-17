import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import './editAccount.css'
import {
    editAccountService,
    getAccountByIdService,
    locationService
} from "../../service/account_Edit/editAccountService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {jwtDecode} from "jwt-decode";

function EditAccount() {
    const [jobList, setJobList] = useState([])
    const [genderList, setGenderList] = useState([])
    const [hobbies, setHobbies] = useState([])
    const [location, setLocation] = useState([])
    const [id, setId] = useState()
    const navigate = useNavigate();
    const [account, setAccount] = useState(
        {
            name: "",
            birthday: "",
            gender: "",
            job: "",
            location: "",
            hobbies: ""
        }
    )
    const [uploadAvatar, setUploadAvatar] = useState("");
    console.log(id)

    const getJobList = async () => {
        const result = null;
        setJobList(result);
    }
    const getLocationList = async () => {
        setLocation(await locationService());
    }
    const getHobbiesList = async () => {
        const result = null;
        setHobbies(result);
    }
    const getGenderList = async () => {
        const result = null;
        setGenderList(result);
    }

    useEffect(() => {
        // getLocationList();
        // getHobbiesList();
        // getJobList();
        // getGenderList();
    }, []);

    useEffect(() => {
        getAccount(id)
    }, [id]);


    const getIdJwt = () => {
        const jwt = LocalStorage.getItem("accessToken");
        if (jwt) {
            return jwtDecode(jwt).id;
        }
        return null;
    }
    const getAccount = async (id) => {
        try {
            const res = await getAccountByIdService(id);
            if (res == null) {
                navigate("/api/personal-page");
                toast("Not found account");
            }
            setAccount(res);
            // setUploadAvatar(account.avatar)
        } catch (e) {
            // navigate("/personal-page")
            toast("Error")
        }
    }

    const handleSubmit = async (id, account) => {
        try {
            await editAccountService(id, account)
            navigate("/api/personal-page");
            toast("Edit Successfully !!")
        } catch (e) {
            // navigate("/personal-page")
            toast("Error")
        }
    }

    const initialValue = {
        name: account?.name,
        birthday: account?.birthday,
        gender: account?.gender,
        job: account?.job,
        location: account?.location,
        hobbies: account?.hobbies
    }

    const validateAccount = {
        name: Yup.string()
            .required("Không được để trống")
            .max(100, "Vui lòng không nhập quá 100 kí tự"),
        birthday: Yup.string().required("Không được để trống"),
        gender: Yup.string().required("Không được để trống"),
        job: Yup.string().required("Không được để trống"),
        location: Yup.string().required("Không được để trống"),
        hobbies: Yup.string().required("Không được để trống"),
    }
    if (!account) {
        return null;
    }
    return (
        <>
            <Header/>
            <Formik initialValues={initialValue}
                    onSubmit={(values => handleSubmit(id, values))}
                    validationSchema={Yup.object(validateAccount)}>
                <Form>
                    <div className="edit-account"
                         style={{
                             background:
                                 "linear-gradient(90deg, rgba(208,162,247,1) 0%, rgba(169,114,206,1) 0%, rgba(208,162,247,1) 26%, rgba(163,106,203,1) 100%, rgba(216,175,231,1) 100%, rgba(229,212,255,1) 100%, rgba(225,203,255,1) 100%)",
                             minHeight: "687.78px", position: "relative", top: 65
                         }}>
                        <div className="contents" style={{display: "flex"}}>
                            <div
                                className="col-6 d-flex"
                                style={{
                                    margin: "10px auto", borderRadius: 20, background:
                                        "radial-gradient(circle, rgba(208,162,247,1) 0%, rgba(216,175,231,1) 0%, rgba(241,234,255,1) 0%, rgba(227,206,251,1) 91%, rgba(229,212,255,1) 100%, rgba(183,132,213,1) 100%, rgba(163,106,203,1) 100%"
                                }}>
                                <div className="col-4">
                                    <div className="avatar" style={{position: "relative", top: 50}}>
                                        <img src={account.avatar} alt=""
                                             style={{
                                                 width: 200, height: 400, borderRadius: "50%",
                                                 objectFit: "cover", marginBottom: 10, border: "3px solid #9d66c3"
                                             }}/>
                                        <Field as="file" name="avatar" id="avatar-upload"
                                               accept="image/*" onChange="loadAvatar(event)"/>
                                        <button className="cssbuttons-io-button">
                                            <svg viewBox="0 0 640 512" fill="white" height="1em"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
                                            </svg>
                                            <span>Upload</span>
                                        </button>
                                        <br/>
                                        <h6>{account.name}</h6>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div
                                        align="center"
                                        style={{border: "0px solid #d8afe7", margin: "0 auto"}}>
                                        <div style={{margin: "7%"}}>
                                            <h2
                                                className="mb-4"
                                                style={{textAlign: "center", fontFamily: "Agbalumo"}}>
                                                Chỉnh Sửa thông tin
                                            </h2>
                                            <div className="input-group mb-3">
                                                  <span
                                                      className="input-group-text"
                                                      style={{
                                                          width: "30%",
                                                          borderBottomLeftRadius: 20,
                                                          borderTopLeftRadius: 20
                                                      }}>
                                                    Tên
                                                    <span style={{color: "red"}}>*</span>
                                                  </span>
                                                <Field type="text"
                                                       className="form-control" name="name"
                                                       style={{
                                                           borderTopRightRadius: 20,
                                                           borderBottomRightRadius: 20
                                                       }}/>
                                                <br/>

                                                <small style={{color: "red", fontSize: 10}}/>
                                            </div>
                                            <ErrorMessage name="name" component="div" style={{color: "red"}}/>
                                            <div className="input-group mb-3">
                                                      <span className="input-group-text" style={{
                                                          width: "30%",
                                                          borderBottomLeftRadius: 20,
                                                          borderTopLeftRadius: 20
                                                      }}>
                                                        Giới Tính
                                                      </span>
                                                <Field as="select" name="gender" className="form-select"
                                                       style={{
                                                           height: "40px", borderTopRightRadius: "20px",
                                                           borderBottomRightRadius: "20px"
                                                       }}>
                                                    <option value=""> ---Select---</option>
                                                    {genderList.map((gender, index) => (
                                                        <option key={index}
                                                                value={JSON.stringify(gender)}> {gender.name}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <ErrorMessage name="gender" component="div" style={{color: "red"}}/>
                                            <div className="input-group mb-3">
                                                      <span
                                                          className="input-group-text"
                                                          style={{
                                                              width: "30%",
                                                              borderBottomLeftRadius: 20,
                                                              borderTopLeftRadius: 20
                                                          }}>
                                                        Ngày Sinh
                                                      </span>
                                                <Field type="date" className="form-control" name="birthday"
                                                       style={{
                                                           borderTopRightRadius: 20,
                                                           borderBottomRightRadius: 20
                                                       }}/>
                                                <br/>
                                                <small style={{color: "red", fontSize: 10}}/>
                                            </div>
                                            <ErrorMessage name="date" component="div" style={{color: "red"}}/>
                                            <div className="input-group mb-3">
                                                      <span className="input-group-text"
                                                            style={{
                                                                width: "30%",
                                                                borderBottomLeftRadius: 20, borderTopLeftRadius: 20
                                                            }}>
                                                        Địa chỉ
                                                      </span>
                                                <Field as="select" name="location" className="form-select"
                                                       style={{
                                                           height: "40px",
                                                           borderTopRightRadius: "20px",
                                                           borderBottomRightRadius: "20px"
                                                       }}>
                                                    <option value=""> ---Select---</option>
                                                    {location.map((address, index) => (
                                                        <option key={index}
                                                                value={address.code}> {address.name}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <ErrorMessage name="location" component="div" style={{color: "red"}}/>

                                            <div className="input-group mb-3">
                                              <span className="input-group-text"
                                                    style={{
                                                        width: "30%",
                                                        borderBottomLeftRadius: 20,
                                                        borderTopLeftRadius: 20
                                                    }}>
                                                Nghề nghiệp
                                              </span>
                                                <Field as="select" name="location" className="form-select"
                                                       style={{
                                                           borderTopRightRadius: "20px",
                                                           borderBottomRightRadius: "20px"
                                                       }}>
                                                    <option value=""> ---Select---</option>
                                                    {jobList.map((job, index) => (
                                                        <option key={index}
                                                                value={JSON.stringify(job)}> {job.name}</option>
                                                    ))}
                                                </Field>
                                                <br/>
                                                <small style={{color: "red", fontSize: 10}}/>
                                            </div>
                                            <ErrorMessage name="job" component="div" style={{color: "red"}}/>

                                            <div className="input-group mb-3">
                                                  <span className="input-group-text"
                                                        style={{
                                                            width: "30%",
                                                            borderBottomLeftRadius: 20,
                                                            borderTopLeftRadius: 20
                                                        }}>
                                                    Sở thích
                                                  </span>
                                                <Field as="select" name="hobbies" className="form-select"
                                                       style={{
                                                           borderTopRightRadius: "20px",
                                                           borderBottomRightRadius: "20px"
                                                       }}>
                                                    <option value=""> ---Select---</option>
                                                    {hobbies.map((list, index) => (
                                                        <option key={index}
                                                                value={JSON.stringify(list)}> {list.name}</option>))}
                                                </Field>
                                                <br/>
                                                <small style={{color: "red", fontSize: 10}}/>
                                            </div>
                                            <ErrorMessage name="hobbies" component="div" style={{color: "red"}}/>

                                            <div className="d-flex justify-content-center">
                                                <Link to="/personal-page" className="btn sm-3">
                                                    <button className="btn btn-secondary border-0 py-2"
                                                            style={{
                                                                backgroundColor: "#ccd2d3", color: "#5e6773",
                                                                borderRadius: 20, width: 90
                                                            }}
                                                            type="submit">
                                                        <b>Hủy</b>
                                                    </button>
                                                </Link>
                                                <a href="" className="btn">
                                                    <Button
                                                        className="btn btn-secondary border-0 py-2"
                                                        style={{
                                                            backgroundColor: "#a36acb",
                                                            borderRadius: 20,
                                                            marginLeft: 5
                                                        }}
                                                        type="submit">
                                                        <b>Xác Nhận</b>
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default EditAccount;