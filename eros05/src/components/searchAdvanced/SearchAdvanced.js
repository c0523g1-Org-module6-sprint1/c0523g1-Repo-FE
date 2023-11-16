import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";

function SearchAdvanced() {
    const [name, setName] = useState("");

    const [names, setNames] = useState("");
    const [nameType, setNameType] = useState([]);

    const [birthdays, setBirthdays] = useState("");
    const [birthdayType, setBirthdayType] = useState([]);

    const [genders, setGenders] = useState("");
    const [genderType, setGenderType] = useState([]);

    const [jobs, setJobs] = useState("");
    const [jobType, setJobType] = useState([]);

    const [locations, setLocations] = useState("");
    const [locationType, setLocationType] = useState([]);

    const [hobbies, setHobbies] = useState("");
    const [hobbyType, setHobbyType] = useState([]);

    const searchByName = async () => {
        const res = await accountService.searchByName(name);
        setAccounts(res.data);
    };
    useEffect(() => {

    }, [])


    return (
        <div>
            <div align="center"
                 style={{
                     border: "1px solid #d8afe7",
                     maxWidth: "40%",
                     margin: "0 auto",
                     backgroundImage: "linear-gradient(to right, #d8afe7, #ca86ef)",
                     marginTop: "60px",
                     borderRadius: "20px"
                 }}>
                <div style={{margin: "7%"}}>
                    <h2 className="mb-4" style={{textAlign: "center", fontFamily: "Agbalumo", fontSize: "45px"}}>Tìm
                        kiếm nâng cao</h2>
                    <Form method="post">
                        <div className="input-group mb-3">
                <span className="input-group-text"
                      style={{width: "30%", borderBottomLeftRadius: "20px", borderTopLeftRadius: "20px"}}>Tên</span>
                            <input type="text" className="form-control"
                                   style={{borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}}/><br/><small
                            style={{color: "red", fontSize: "10px"}}></small>
                        </div>
                        <div className="input-group mb-3">
                <span className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: "20px",
                          borderTopLeftRadius: "20px"
                      }}>Giới Tính</span>
                            <select className="form-select"
                                    style="height: 40px;border-top-right-radius: 20px; border-bottom-right-radius: 20px">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="LGBT">LGBT</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                <span className="input-group-text"
                      style={{width: "30%", borderBottomLeftRadius: "20px", borderTopLeftRadius: "20px"}}>Độ tuổi</span>
                            <div className="slider-container"
                                 style={{marginTop: "17px", width: "70%", height: "7px", borderRadius: "20px"}}>
                                <div id="ageSlider" className="slider-handle"></div>
                                <span className="slider-value">18</span>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                <span className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: "20px",
                          borderTopLeftRadius: "20px"
                      }}>Nơi sống</span>
                            <select className="form-select"
                                    style={{
                                        height: "40px",
                                        borderTopRightRadius: "20px",
                                        borderBottomRightRadius: "20px"
                                    }}>
                                <option value="Quảng Nam">Quảng Nam</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                                <option value="Bắc Giang">Bắc Giang</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                <option value="Thừa Thiên - Huế">Thừa Thiên - Huế</option>
                                <option value="Quảng Trị">Quảng Trị</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                <span className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: "20px",
                          borderTopLeftRadius: "20px"
                      }}>Nghề ne</span>
                            <input type="text" classN="form-control"
                                   style={{borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}}/><br/><small
                            style={{color: "red", fontSize: "10px"}}></small>
                        </div>
                        <div className="input-group mb-3">
                <span className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: "20px",
                          borderTopLeftRadius: "20px"
                      }}>Sở thích</span>
                            <input type="text" className="form-control"
                                   style={{borderTopRightRadius: "20px", borderTopLeftRadius: "20px"}}/><br/><small
                            style={{color: "red", fontSize: "10px"}}></small>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-secondary border-0 py-2"
                                    style={{
                                        backgroundColor: "#ccd2d3",
                                        color: "#5e6773",
                                        borderRadius: "20px",
                                        width: "90px"
                                    }} type="submit">Huỷ
                            </button>
                            <a href="/Users/myhanh/Documents/untitled2/search_advanced/card_test.html">
                                <button class="btn btn-secondary border-0 py-2"
                                        style={{backgroundColor: "#a36acb", borderRadius: "20px", marginLeft: "5px"}}
                                        type="submit">Xác
                                    Nhận
                                </button>
                            </a>

                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default SearchAdvanced