import React from 'react';
import Header from "../header/Header";
import './editAccount.css'

function EditAccount() {


    return (
        <>
            <Header/>
            <div className="edit-account"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(208,162,247,1) 0%, rgba(169,114,206,1) 0%, rgba(208,162,247,1) 26%, rgba(163,106,203,1) 100%, rgba(216,175,231,1) 100%, rgba(229,212,255,1) 100%, rgba(225,203,255,1) 100%)",
                    minHeight: "687.78px",
                    position: "relative",
                    top: 65
                }}>
                <div className="contents" style={{display: "flex"}}>
                    <div
                        className="col-6 d-flex"
                        style={{
                            margin: "10px auto",
                            borderRadius: 20,
                            background:
                                "radial-gradient(circle, rgba(208,162,247,1) 0%, rgba(216,175,231,1) 0%, rgba(241,234,255,1) 0%, rgba(227,206,251,1) 91%, rgba(229,212,255,1) 100%, rgba(183,132,213,1) 100%, rgba(163,106,203,1) 100%"}}>
                        <div className="col-4">
                            <div className="avatar" style={{position: "relative", top: 50}}>
                                <img src="https://tse2.mm.bing.net/th?id=OIP.c17XAqg6srb_lo1ElbyJSgHaEK&pid=Api&P=0&h=180"
                                    alt="Avatar"
                                    style={{
                                        width: 200,
                                        height: 400,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginBottom: 10,
                                        border: "3px solid #9d66c3"}}/>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    accept="image/*"
                                    onchange="loadAvatar(event)"/>
                                <button className="cssbuttons-io-button">
                                    <svg
                                        viewBox="0 0 640 512"
                                        fill="white"
                                        height="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
                                    </svg>
                                    <span>Upload</span>
                                </button>
                                <br/>
                                <h6>LE CONG HOAN THIEN</h6>
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
                                    <form method="post">
                                        <div className="input-group mb-3">
                  <span
                      className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: 20,
                          borderTopLeftRadius: 20}}>
                    Tên
                    <span style={{color: "red"}}>*</span>
                  </span>
                                            <input
                                                className="form-control"
                                                style={{
                                                    borderTopRightRadius: 20,
                                                    borderBottomRightRadius: 20
                                                }}/>
                                            <br/>
                                            <small style={{color: "red", fontSize: 10}}/>
                                        </div>
                                        <div className="input-group mb-3">
                  <span
                      className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: 20,
                          borderTopLeftRadius: 20}}>
                    Giới Tính
                  </span>
                                            <select
                                                className="form-select"
                                                style={{
                                                    height: 47,
                                                    borderTopRightRadius: 20,
                                                    borderBottomRightRadius: 20}}>
                                                <option value={0}>Nam</option>
                                                <option value={1}>Nữ</option>
                                                <option value={2}>LGBT</option>
                                            </select>
                                        </div>
                                        <div className="input-group mb-3">
                  <span
                      className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: 20,
                          borderTopLeftRadius: 20}}>
                    Ngày Sinh
                  </span>
                                            <input
                                                type="date"
                                                className="form-control"
                                                style={{
                                                    borderTopRightRadius: 20,
                                                    borderBottomRightRadius: 20}}/>
                                            <br/>
                                            <small style={{color: "red", fontSize: 10}}/>
                                        </div>
                                        <div className="input-group mb-3">
                  <span
                      className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: 20,
                          borderTopLeftRadius: 20}}>
                    Địa chỉ
                  </span>
                    <select
                        className="form-select"
                        style={{
                            height: 47,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20}}>
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
                  <span
                      className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: 20,
                          borderTopLeftRadius: 20}}>
                    Nghề nghiệp
                  </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{
                                                    borderTopRightRadius: 20,
                                                    borderBottomRightRadius: 20
                                                }}
                                            />
                                            <br/>
                                            <small style={{color: "red", fontSize: 10}}/>
                                        </div>
                                        <div className="input-group mb-3">
                  <span
                      className="input-group-text"
                      style={{
                          width: "30%",
                          borderBottomLeftRadius: 20,
                          borderTopLeftRadius: 20}}>
                    Sở thích
                  </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{
                                                    borderTopRightRadius: 20,
                                                    borderBottomRightRadius: 20}}/>
                                            <br/>
                                            <small style={{color: "red", fontSize: 10}}/>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <a href="" className="btn sm-3">
                                                <button
                                                    className="btn btn-secondary border-0 py-2"
                                                    style={{
                                                        backgroundColor: "#ccd2d3",
                                                        color: "#5e6773",
                                                        borderRadius: 20,
                                                        width: 90}}
                                                    type="submit">
                                                    <b>Hủy</b>
                                                </button>
                                            </a>
                                            <a href="" className="btn">
                                                <button
                                                    className="btn btn-secondary border-0 py-2"
                                                    style={{
                                                        backgroundColor: "#a36acb",
                                                        borderRadius: 20,
                                                        marginLeft: 5}}
                                                    type="submit">
                                                    <b>Xác Nhận</b>
                                                </button>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default EditAccount;