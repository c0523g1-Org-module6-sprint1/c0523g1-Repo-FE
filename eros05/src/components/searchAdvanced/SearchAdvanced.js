import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as accountService from "../../service/search_advanced/accountService"
import *as Yup from "yup"
import "../searchAdvanced/searchAdvanced.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

function SearchAdvanced() {

    const [account, setAccount] = useState([]);
    const [genderType, setGenderType] = useState([]);
    const [jobType, setJobType] = useState([]);
    const [locationType, setLocationType] = useState([]);
    const [hobbyType, setHobbyType] = useState([]);

    console.log(locationType)
    const navigate = useNavigate();

    const {name} = useParams();

    const goRegisterPage = () => {
        navigate(`register`);
    }
    const goSearchAdvanced = () => {
        navigate(`search_advanced`);
    }
    const goAddFriendPage = () => {
        navigate(`invited_recommend_friend/InvitedList`)
    }
    const goPersonalPage = (id) => {
        navigate(`personal-page/${id}`)
    }


    const searchByAdvanced = async (value) => {
        console.log(value)
        const res = await accountService.searchAdvanced(value);
        console.log(res)
        setAccount(res.data)
        console.log(account)
    };

    const displayGender = async () => {
        setGenderType(await accountService.displayGender())
    }

    const displayJob = async () => {
        setJobType(await accountService.displayJob())
    }
    const displayHobby = async () => {
        setHobbyType(await accountService.displayHobby())
    }

    const displayLocation = async () => {
        setLocationType(await accountService.location())
        console.log(locationType)
    }

    useEffect(() => {
        displayGender()
        displayLocation()
        displayHobby()
        displayJob()
    }, [])

    const initValue = {
        name: "",
        birthdayFrom: "",
        birthdayEnd: "",
        gender: "",
        job: "",
        location: "",
        hobby: "",
    }

    const validateObject = {
        name: Yup.string()
            .required("Không được để trống")
            .max(30, "Vui lòng không nhập quá 30 kí tự"),
        birthdayFrom: Yup.string()
            .required("Không được để trống"),
        birthdayEnd: Yup.string()
            .required("Không được để trống"),
        // .max(new Date(), "Vui lòng nhập trước ngày hiện tại")
        // .min(new Date(birthday) <= new Date().setFullYear(new Date().getFullYear() - 18), "Vui lòng phải đủ 18 tuổi !"),
        gender: Yup.string()
            .required("Không được để trống"),
        job: Yup.string()
            .required("Không được để trống"),
        location: Yup.string()
            .required("Không được để trống"),
        hobby: Yup.string()
            .required("Không được để trống"),
    }

    return (
        <>
            {account.length == 0 ?
                <div>
                    <Formik initialValues={initValue}
                            onSubmit={(values) => {
                                searchByAdvanced(values)
                            }}
                            validationSchema={Yup.object(validateObject)}
                    >
                        <div align="center"
                             style={{
                                 border: "1px solid #d8afe7",
                                 maxWidth: "40%",
                                 margin: "0 auto",
                                 backgroundImage: "linear-gradient(to right, #d8afe7, #ca86ef)",
                                 marginTop: "140px",
                                 borderRadius: "20px"
                             }}>
                            <div style={{margin: "7%"}}>
                                <h2 className="mb-4"
                                    style={{textAlign: "center", fontFamily: "Agbalumo", fontSize: "45px"}}>Tìm
                                    kiếm nâng cao</h2>
                                <Form>
                                    <div className="input-group mb-3">
                                 <span className="input-group-text"
                                       style={{
                                           width: "30%",
                                           borderBottomLeftRadius: "20px",
                                           borderTopLeftRadius: "20px",
                                           display: "block"
                                       }}>Tên</span>
                                        <Field id="name" name="name" type="text" className="form-control"
                                               style={{
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px",
                                               }}/><br/>

                                    </div>
                                    <ErrorMessage name="name" component="span"
                                                  style={{color: "red", marginRight:"62px"}}></ErrorMessage>
                                    <div className="input-group mb-3">
                                <span className="input-group-text"
                                      style={{
                                          width: "30%",
                                          borderBottomLeftRadius: "20px",
                                          borderTopLeftRadius: "20px"
                                      }}>Giới Tính</span>
                                        <Field as="select" id="gender" name="gender" className="form-select"
                                               style={{
                                                   height: "40px",
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px"
                                               }}>
                                            <option value="">Chọn giới tính</option>
                                            {genderType.map((gender, index) => (
                                                <option key={index} value={gender.id}> {gender.name}</option>

                                            ))}
                                        </Field>

                                    </div>
                                    <ErrorMessage name="gender" component="span"
                                                  style={{color: "red", marginRight:"62px"}}></ErrorMessage>
                                    <div className="input-group mb-3">
                                <span className="input-group-text"
                                      style={{
                                          width: "30%",
                                          borderBottomLeftRadius: "20px",
                                          borderTopLeftRadius: "20px"
                                      }}>Độ tuổi từ</span>
                                        <Field id="birthdayFrom" name="birthdayFrom" type="number"
                                               className="form-control"
                                               style={{
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px"
                                               }}/><br/>

                                    </div>
                                    <ErrorMessage name="birthdayFrom" component="span"
                                                  style={{color: "red", marginRight:"62px"}}></ErrorMessage>
                                    <div className="input-group mb-3">
                                <span className="input-group-text"
                                      style={{
                                          width: "30%",
                                          borderBottomLeftRadius: "20px",
                                          borderTopLeftRadius: "20px"
                                      }}>Đến</span>
                                        <Field id="birthdayEnd" name="birthdayEnd" type="number"
                                               className="form-control"
                                               style={{
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px"
                                               }}/><br/>

                                    </div>
                                    <ErrorMessage name="birthdayEnd" component="span"
                                                  style={{color: "red", marginRight:"62px"}}></ErrorMessage>
                                    <div className="input-group mb-3">
                                <span className="input-group-text"
                                      style={{
                                          width: "30%",
                                          borderBottomLeftRadius: "20px",
                                          borderTopLeftRadius: "20px"
                                      }}>Nơi sống</span>
                                        <Field as="select" id="location" name="location" className="form-select"
                                               style={{
                                                   height: "40px",
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px"
                                               }}>
                                            <option value="">Chọn thành phố</option>
                                            {locationType.map((location, index) => (
                                                <option key={index} value={location.code}> {location.name}</option>
                                            ))}
                                        </Field>

                                    </div>
                                    <ErrorMessage name="location" component="span"
                                                  style={{color: "red", marginRight:"62px"}}></ErrorMessage>
                                    <div className="input-group mb-3">
                                <span className="input-group-text"
                                      style={{
                                          width: "30%",
                                          borderBottomLeftRadius: "20px",
                                          borderTopLeftRadius: "20px"
                                      }}>Nghề Nghiệp</span>
                                        <Field as="select" id="job" name="job" className="form-select"
                                               style={{
                                                   height: "40px",
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px"
                                               }}>
                                            <option value="">Chọn nghề nghiệp</option>
                                            {jobType.map((job, index) => (
                                                <option key={index} value={job.id}> {job.name}</option>
                                            ))}

                                        </Field>
                                    </div>
                                    <ErrorMessage name="job" component="span" style={{color: "red", marginRight:"62px"}}></ErrorMessage>
                                    <div className="input-group mb-3">
                                <span className="input-group-text" style={{
                                    width: "30%",
                                    borderBottomLeftRadius: "20px",
                                    borderTopLeftRadius: "20px"
                                }}
                                >
                                    Sở thích
                                </span>
                                        <Field as="select" id="hobby" name="hobby" className="form-select"
                                               style={{
                                                   height: "40px",
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px"
                                               }}>
                                            <option value="">Chọn Sở thích</option>
                                            {hobbyType.map((hobby, index) => (
                                                <option key={index} value={hobby.id}> {hobby.name}</option>

                                            ))}

                                        </Field>
                                    </div>
                                    <ErrorMessage name="hobby" component="span"
                                                  style={{color: "red", marginRight:"62px"}}></ErrorMessage>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-secondary border-0 py-2"
                                                style={{
                                                    backgroundColor: "#ccd2d3",
                                                    borderRadius: "20px",
                                                    width: "200px",
                                                    marginLeft:"10px"
                                                }} type="submit">Huỷ
                                        </button>
                                        <button className="btn btn-secondary border-0 py-2"
                                                style={{
                                                    backgroundColor: "#a36acb",
                                                    borderRadius: "20px",
                                                    width:"200px"
                                                }}
                                                type="submit">Xác Nhận
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Formik>
                </div>
                :

                <div className='search-page-container'>
                    <h1>Kết quả tìm kiếm</h1>
                    {!account ?
                        <div className='container'>
                            {account.length > 0 ? (
                                <div className="list-cards">
                                    {
                                        account.map((item, index) => {
                                            return (
                                                <div key={index} className="cards">
                                                    <div className="icon">
                                                        <img className="cus-avatar"
                                                             src={item.avatar}
                                                             alt=""/>
                                                    </div>
                                                    <p className="user-name">{item.name}</p>
                                                    <p className="text">
                                                        <button className="btn btn-secondary border-0 py-2"
                                                                type="submit" onClick={goRegisterPage}
                                                                style={{marginTop: "40px"}}>Kết bạn
                                                        </button>
                                                        <button className="btn btn-secondary border-0 py-2"
                                                                type="submit" onClick={goRegisterPage}
                                                                style={{marginTop: "10px"}}>Xem trang cá nhân
                                                        </button>
                                                    </p>
                                                    <span>Sống tại: {item.location}<br></br>
                    Nghề nghiệp: {item.job}</span>
                                                </div>
                                            )
                                        })
                                    }
                                    <Link to="/register" className="nav-link viewmore" aria-current="page">
                                        <span>...Xem thêm</span>
                                    </Link>
                                </div>
                            ) : (<span style={{color: "#b2b2b2", textAlign: "center"}}>Không có kết quả</span>)}
                        </div>
                        :
                        <div className='container'>
                            {account.length > 0 ? (
                                <div className="list-cards-login">
                                    {
                                        account.map((item, index) => {
                                            return (
                                                <div key={index} className="cards">
                                                    <div className="icon">
                                                        <img className="cus-avatar"
                                                             src={item.avatar}
                                                             alt=""/>
                                                    </div>
                                                    <p className="user-name">{item.name}</p>
                                                    <p className="text">
                                                        <button className="btn btn-secondary border-0 py-2"
                                                                type="submit" onClick={goAddFriendPage}
                                                                style={{marginTop: "40px"}}>Kết bạn
                                                        </button>
                                                        <button className="btn btn-secondary border-0 py-2"
                                                                type="submit" onClick={() => goPersonalPage(item.id)}
                                                                style={{marginTop: "10px"}}>Xem trang cá nhân
                                                        </button>
                                                    </p>
                                                    <span>Sống tại: {item.location}<br></br>
                    Nghề nghiệp: {item.job}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (<span style={{color: "#b2b2b2", textAlign: "center"}}>Không có kết quả</span>)}
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default SearchAdvanced