import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as accountService from "../../service/search_advanced/accountService"
import {getRoleByJwt} from "../../service/login/securityService";
import *as Yup from "yup"
import "../searchAdvanced/searchAdvanced.css"
import "../searchNamePage/SearchPage.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import button from "bootstrap/js/src/button";

function SearchAdvanced() {

    const [account, setAccount] = useState([]);
    const [genderType, setGenderType] = useState([]);
    const [jobType, setJobType] = useState([]);
    const [locationType, setLocationType] = useState([]);
    const [hobbyType, setHobbyType] = useState([]);
    const [found, setFound] = useState(false);



    console.log(locationType)
    const navigate = useNavigate();

    const {name} = useParams();

    const goLoginPage = () => {
        toast.info("Vui lòng đăng nhập hoặc đăng kí để sử dụng dịch vụ này.")
        navigate(`/login`);
    }

    const goAddFriendPage = () => {
        navigate(`invited_recommend_friend/InvitedList`)
    }
    const goPersonalPage = (id) => {
        navigate(`/personal-page/${id}`)
    }

    const currentRole = getRoleByJwt();

    const searchByAdvanced = async (value) => {
        console.log(value)
        const res = await accountService.searchAdvanced(value);
        if (res.status === 200){
            setAccount(res.data)
        }else {
            setFound(true)
        }
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
        birthdayFrom: 20,
        birthdayEnd: 100,
        gender: 4,
        job: 11,
        location: "",
        hobby: 11,
    }

    const validateObject = {
        // name: Yup.string()
        //     // .required("Không được để trống!")
        //     .max(30, "Vui lòng không nhập quá 30 kí tự")
        //     .matches(/^[^\d]*$/, 'Không được nhập số!'),

        // birthdayFrom: Yup.string()
        //     .required("Không được để trống!"),
        // birthdayEnd: Yup.string()
        //     .required("Không được để trống!"),
        // .max(new Date(), "Vui lòng nhập trước ngày hiện tại")
        // .min(new Date(birthday) <= new Date().setFullYear(new Date().getFullYear() - 18), "Vui lòng phải đủ 18 tuổi !"),
        // gender: Yup.string()
        //     .required("Không được để trống!"),
        // job: Yup.string()
        //     .required("Không được để trống!"),
        location: Yup.string()
            .required("Không được để trống!"),
        // hobby: Yup.string()
        //     .required("Không được để trống!"),
    }

    return (
        <>
            {found === false ?
                <div>
                    <Formik initialValues={initValue}
                            onSubmit={(values) => {
                                setFound(true)
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
                                       }}>Tên</span>
                                        <Field id="name" name="name" type="text" className="form-control"
                                               style={{
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px",
                                               }}/><br/>

                                    </div>
                                    <ErrorMessage name="name" component="span"
                                                  style={{color: "red", marginRight: "62px"}}></ErrorMessage>
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
                                                  style={{color: "red", marginRight: "62px"}}></ErrorMessage>
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
                                                  style={{color: "red", marginRight: "62px"}}></ErrorMessage>
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
                                                  style={{color: "red", marginRight: "62px"}}></ErrorMessage>
                                    <div className="input-group mb-3">
                                <span className="input-group-text"
                                      style={{
                                          width: "30%",
                                          borderBottomLeftRadius: "20px",
                                          borderTopLeftRadius: "20px"
                                      }}>Nơi sống<span
                                    style={{color: "red"}}>*</span></span>
                                        <Field as="select" id="location" name="location" className="form-select"
                                               style={{
                                                   height: "40px",
                                                   borderTopRightRadius: "20px",
                                                   borderBottomRightRadius: "20px"
                                               }}>
                                            <option value="">Chọn thành phố</option>
                                            {locationType && locationType.map((location, index) => (
                                                <option key={index} value={location.code}> {location.name}</option>
                                            ))}
                                        </Field>

                                    </div>
                                    <ErrorMessage name="location" component="span"
                                                  style={{color: "red", marginRight: "62px"}}></ErrorMessage>
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
                                    <ErrorMessage name="job" component="span"
                                                  style={{color: "red", marginRight: "62px"}}></ErrorMessage>
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
                                                  style={{color: "red", marginRight: "62px"}}></ErrorMessage>
                                    <div className="d-flex justify-content-center">
                                            <Link to="/public/search-name/:">
                                                <button className="btn btn-secondary border-0 py-2 hanh-bao-1"
                                                        style={{
                                                            backgroundColor: "#ccd2d3",
                                                            borderRadius: "20px",
                                                            width: "200px",
                                                            marginLeft: "10px"
                                                        }} type="submit">Huỷ
                                                </button>
                                            </Link>
                                        <button className="btn btn-secondary border-0 py-2 hanh-bao-1"
                                                style={{
                                                    backgroundColor: "#a36acb",
                                                    borderRadius: "20px",
                                                    width: "200px"
                                                }}
                                                // onClick={() => {
                                                //     setFound(true)

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
                    <h2 style={{fontSize: "300%", marginTop: "100px", textAlign: "center", fontFamily: "Agbalumo"}}>Kết
                        quả tìm kiếm</h2>
                    <div className='container'>
                        {account.length > 0 ? (
                            <div className="list-cards">
                                {
                                    account.map((item, index) => {
                                        return (
                                            <div key={index} className="lien-cards">
                                                <div className="icon">
                                                    <img className="cus-avatar"
                                                         src={item.avatar}
                                                         alt=""/>
                                                </div>
                                                <p className="user-name">{item.name}</p>
                                                {currentRole ?
                                                    <p className="text">
                                                    <button className="btn btn-secondary border-0 py-2"
                                                            type="submit" onClick={() => goPersonalPage(item.id)}
                                                            style={{marginTop: "50px"}}>Xem trang cá nhân
                                                    </button>
                                                </p>
                                                    :
                                                    <p className="text">
                                                        <button className="btn btn-secondary border-0 py-2"
                                                                type="submit" onClick={goLoginPage}
                                                                style={{marginTop: "50px"}}>Xem trang cá nhân
                                                        </button>
                                                    </p>
                                                }
                                                <span>Sống tại: {item.location}<br>
                                                    </br>Nghề nghiệp: {item.job}</span>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (<div style={{alignItems:"center",display:"flex"}}>
                            <p style={{
                                color: "#b2b2b2",
                                textAlign: "center",
                                fontSize: "150%",
                                marginTop: "30px",
                                marginLeft:"550px"
                            }}>Không có kết quả</p>
                            <button className="btn btn-secondary border-0 py-2"
                                    style={{
                                        backgroundColor: "#a36acb",
                                        borderRadius: "20px",
                                        width: "100px",
                                        float:'right',
                                        marginLeft:"20px",
                                        marginTop:"12px"
                                    }}
                                    onClick={() => {
                                        setFound(false)
                                    }}>Quay lại
                            </button>
                        </div>)}
                    </div>

                </div>

            }
        </>
    )
}

export default SearchAdvanced

