import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as accountService from "../../service/search_advanced/accountService"


function SearchAdvanced() {
    const [account, setAccount] = useState("");

    // const [searchName, setSearchName] = useState("");
    // const [searchBirthday, setSearchBirthday] = useState("");
    // const [searchGender, setSearchGender] = useState("");
    // const [searchLocation, setSearchLocation] = useState("");
    // const [searchJob, setSearchJob] = useState("");
    // const [searchHobby, setSearchHobby] = useState("");


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

    const searchByAdvanced = async () => {
        const res = await accountService.searchAdvanced(name);
        setAccount(res.data);
    };

    const displayGender = async () => {
        setGenderType(await accountService.searchAdvanced())
    }
    const displayBirthday = async () => {
        setBirthdayType(await accountService.searchAdvanced())
    }

    const displayJob = async () => {
        setJobType(await accountService.searchAdvanced())
    }
    const displayHobby = async () => {
        setJobType(await accountService.searchAdvanced())
    }

    const displayLocation = async () => {
        setLocationType(await accountService.cities())
    }

    useEffect(() => {

    }, [])


    const initValue = {
        name: "",
        birthday: "",
        gender: JSON.stringify(),
        job: JSON.stringify(),
        location: JSON.stringify(),
        hobby: JSON.stringify(),
    }

    const validateObject = {}

    return (
        <div>
            <Formik initialValues={initValue}
                    onSubmit={(values) => {
                    }}
                    validationSchema
            >

            </Formik>
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
                            <input onChange={(evt) => setNames(evt.target.value)} type="text" className="form-control"
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
                            <select onChange={(evt) => setGenders(evt.target.value)} className="form-select"
                                    style="height: 40px;border-top-right-radius: 20px; border-bottom-right-radius: 20px">
                                {genderType.map((gender, index) => (
                                    <option key={index} value={JSON.stringify(gender)}> {gender.name}</option>
                                ))}
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
                                {locationType.map((location, index) => (
                                    <option key={index} value={JSON.stringify(location)}> {location.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group mb-3">
                <span className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: "20px",
                          borderTopLeftRadius: "20px"
                      }}>Nghề Nghiệp</span>
                            <select onChange={(evt) => setJobType(evt.target.value)} className="form-select"
                                    style="height: 40px;border-top-right-radius: 20px; border-bottom-right-radius: 20px">
                                {jobType.map((job, index) => (
                                    <option key={index} value={JSON.stringify(job)}> {job.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group mb-3">
                <span className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: "20px",
                          borderTopLeftRadius: "20px"
                      }}>Sở thích</span>
                            <select onChange={(evt) => setHobbies(evt.target.value)} className="form-select"
                                    style="height: 40px;border-top-right-radius: 20px; border-bottom-right-radius: 20px">
                                {hobbyType.map((hobby, index) => (
                                    <option key={index} value={JSON.stringify(hobby)}> {hobby.name}</option>
                                ))}
                            </select>
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


    const ageSlider = document.getElementById('ageSlider');
    const sliderValue = document.querySelector('.slider-value');
    const sliderContainer = document.querySelector('.slider-container');
    const sliderContainerWidth = sliderContainer.offsetWidth;
    const sliderHandleWidth = ageSlider.offsetWidth;

// Thiết lập giá trị ban đầu và giới hạn của thanh trượt
    const minValue = 18;
    const maxValue = 40;
    let currentValue = minValue;

// Cập nhật hiển thị giá trị
    function updateValue() {
        sliderValue.textContent = currentValue;
    }

// Xử lý việc kéo thanh trượt
    function handleDrag(event) {
        const newPosition = event.clientX - sliderContainer.getBoundingClientRect().left;
        let percentage = (newPosition / sliderContainerWidth) * 100;

        if (percentage < 0) {
            percentage = 0;
        } else if (percentage > 100) {
            percentage = 100;
        }

        const handlePosition = (percentage * sliderContainerWidth) / 100;
        const handleLeftOffset = handlePosition - sliderHandleWidth / 2;
        ageSlider.style.left = handleLeftOffset + 'px';

        currentValue = Math.round((maxValue - minValue) * (percentage / 100) + minValue);
        updateValue();
    }

// Bắt đầu xử lý kéo thanh trượt khi nhấn chuột xuống
    ageSlider.addEventListener('mousedown', function (event) {
        handleDrag(event);
        document.addEventListener('mousemove', handleDrag);
    });

// Kết thúc xử lý kéo thanh trượt khi nhả chuột
    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', handleDrag);
    });

// Cập nhật giá trị ban đầu
    updateValue();

}

export default SearchAdvanced