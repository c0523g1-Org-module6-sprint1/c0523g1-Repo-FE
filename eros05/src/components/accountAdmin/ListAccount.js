import "./check.css"
import "./management.css"
import React, {useEffect, useState} from "react";
import {getAll} from "../../service/accountAdmin/AdminAccountService";



export function ListAccount() {
    const [account, setAccount] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        display()
    }, [name]);
    const display = async () => {
        const res = await getAll(name);
        setAccount(res);
    }


    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);


    const nextPage = () => {
        if (page + 1 < totalPage) {
            setPage((prev) => prev + 1)
        }
    }
    const prevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1)
        }
    }


    return (

        <>
            <div id="bd-mana">
                <h1 id="h1">Quản Lý Thành Viên</h1>

                <div className="container-fluid px-5 my-5">
                    <div className="input-group" style={{width: "300px"}}>
                    <span style={{borderRadius: "20px 0px 0px 20px "}} className="input-group-text" id="addon-wrapping"><i
                        className="fa-solid fa-magnifying-glass"></i></span>
                        <input style={{borderRadius: "0px 20px 20px 0px"}} type="text" className="form-control"
                               placeholder="Tên Thành Viên" aria-label="Username" aria-describedby="addon-wrapping"
                               onChange={(event) => {
                                   setName(event.target.value)
                               }}/>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="row mt-2" style={{width: "100%"}}>
                            <div className="col-lg-6">
                                <div>
                                    <form id="contactForm" data-sb-form-api-token="API_TOKEN">

                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className="form-label form-check-inline"
                                                       style={{fontSize: "medium"}}>Hiển Thị Thành Viên</label>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" id="tatca" type="radio"
                                                           checked="checked"
                                                           name="hienthi"
                                                           data-sb-validations=""/>
                                                    <label className="form-check-label" htmlFor="tatca">Tất Cả</label>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" id="platinums" type="radio"
                                                           name="hienthi"
                                                           data-sb-validations=""/>
                                                    <label className="form-check-label" htmlFor="platinums"><span
                                                        id="platinum">Platinum</span></label>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" id="golds" type="radio"
                                                           name="hienthi"
                                                           data-sb-validations=""/>
                                                    <label className="form-check-label" htmlFor="golds"><span
                                                        id="gold">Gold</span></label>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" id="cupid" type="radio"
                                                           name="hienthi"
                                                           data-sb-validations=""/>
                                                    <label className="form-check-label" htmlFor="cupid"><span
                                                        id="thuong">Cupid+</span></label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6">

                                <div className="ms-auto">
                                    <div style={{float: "right"}}>
                                        <button id="bt-mana" type="button" className="btn btn-warning btn-md">Cảnh Cáo
                                        </button>
                                        <button id="bt-mana" type="button" className="btn btn-danger btn-md">Khoá Nick 1
                                            Tuần
                                        </button>
                                        <button id="bt-mana" type="button" className="btn btn-danger btn-md">Khoá 1
                                            Tháng
                                        </button>
                                        <button id="bt-mana" type="button" className="btn btn-danger btn-md">Khoá Vĩnh
                                            Viễn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="container-fluid">
                    <table id="tb-mana" className="table table-hover">
                        <thead>
                        <tr>
                            <th id="tb-th">STT</th>
                            <th id="tb-th">Tên Thành Viên</th>
                            <th id="tb-th">Ngày Đăng Ký</th>
                            <th id="tb-th">Tiền</th>
                            <th id="tb-th">Số lỗi</th>
                            <th id="tb-th">Lỗi xảy ra</th>
                            <th id="tb-th">Ngày Vi phạm</th>
                            <th id="tb-th">Loại Thành Viên</th>
                        </tr>
                        </thead>
                        {
                          account &&  account.length !== 0 ?
                              <tbody>
                              {
                                  account.map((account, index) => (
                                      <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{account.userName}</td>
                                          <td>{account.regisDate}</td>
                                          <td>{account.money}</td>
                                          <td>{account.faultAmount}</td>
                                          <td>{account.description}</td>
                                          <td>{account.dateWarning}</td>
                                          <td>{account.typeAccount}</td>
                                      </tr>
                                  ))
                              }
                              </tbody>:
                              <p>
                                  ko du lieu
                              </p>

                        }

                    </table>
                    <div className="row" style={{alignItems: "center"}}>
                        <div className="col-md-3">


                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-outline-primary" style={{marginLeft: "15rem"}}
                                    onClick={() => prevPage()}>
                                Prev
                            </button>
                            <p className="btn btn-outline-primary">
                                {page + 1}/{totalPage}
                            </p>
                            <button className="btn btn-outline-primary" onClick={() => nextPage()}>
                                Next
                            </button>
                        </div>
                        <div className="col-md-3">

                        </div>
                        {/*<div className="col-sm-5 text" >*/}
                        {/*    <button className="btn btn-outline-primary" style={{ marginLeft: "13rem" }} onClick={() => prevPage()}>*/}
                        {/*        Prev*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        {/*<div className="col-sm-2 text" >*/}
                        {/*    <p className="btn btn-outline-primary" style={{ marginLeft: "1rem" }} >*/}
                        {/*        {page + 1}/{totalPage}*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        {/*<div className="col-sm-5 text" >*/}
                        {/*    <button className="btn btn-outline-primary" onClick={() => nextPage()}>*/}
                        {/*        Next*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}