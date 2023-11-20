/* eslint-disable react-hooks/exhaustive-deps */
import "./check.css"
import "./management.css"
import {Link} from "react-router-dom";
import {DeleteAccount} from "./DeleteAccount";
import {getAll, getAllType} from "../../service/accountAdmin/AdminAccountService";
import axios from "axios";
import {useEffect, useState} from "react";

export function ListAccount() {
    const [account, setAccount] = useState([]);


    const [username, setUserName] = useState("");
    const [typeAccount, setTypeAccount] = useState([])
    const [searchType, setSearchType] = useState("")


    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);


    const [status, setStatus] = useState(false);
    const [selectAccount, setSelectAccount] = useState([])


    const handleShowModal = () => {
        setStatus(true)
    }
    const closeModal = () => {
        setStatus(false)
        setSelectAccount(null)

    }

    useEffect(() => {
        display()
        displayTypeAccount()
    }, [username, searchType, page]);


    const displayTypeAccount = async () => {
        const res = await getAllType()
        setTypeAccount(res)
    }

    const handleFault = async () => {
        await axios.put(`http://localhost:8080/api/public/warning`, selectAccount);
        display();
    }


    const display = async () => {
        const res = await getAll(username, searchType, page);
        setTotalPage(res.data.totalPages);
        setAccount(res.data.content);
    }

    // const handleOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    // };

    // dinh dang ngay
    function formatDay(date) {
        let arrDate = date.split("-");
        return arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0]
    }

    //dinh dang ngay gio
    function formatDateTime(dateTime) {
        let formattedDate = new Date(dateTime);
        let year = formattedDate.getFullYear();
        let month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
        let day = formattedDate.getDate().toString().padStart(2, "0");
        let hours = formattedDate.getHours().toString().padStart(2, "0");
        let minutes = formattedDate.getMinutes().toString().padStart(2, "0");
        let seconds = formattedDate.getSeconds().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }


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
    const handleSelectAccount = (accountId) => {

        if (selectAccount.includes(accountId)) {
            setSelectAccount(selectAccount.filter((id) => id !== accountId));
        } else {
            setSelectAccount([...selectAccount, accountId]);
        }
    };


    return (

        <>
            <div id="trivn-bd-mana">
                <h1 id="trivn-h1">Quản Lý Thành Viên</h1>
                <div className="container-fluid px-5 my-5">
                    <div className="input-group" style={{width: "300px"}}>
                    <span style={{borderRadius: "20px 0px 0px 20px "}} className="input-group-text" id="addon-wrapping"><i
                        className="fa-solid fa-magnifying-glass"></i></span>
                        <input style={{borderRadius: "0px 20px 20px 0px"}} type="text" className="form-control"
                               placeholder="Tên Thành Viên" aria-label="Username" aria-describedby="addon-wrapping"
                               onChange={(event) => {
                                   setUserName(event.target.value)
                               }}/>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="row mt-2" style={{width: "100%"}}>
                            <div className="col-lg-6">
                                <div>
                                    <div className="col-md-2">
                                        <select onChange={(event) => {
                                            console.log(event.target.value)
                                            setSearchType(event.target.value);
                                        }} className="bg-light text-dark"
                                                style={{borderRadius: "15px", textAlign: "center"}}>
                                            <option value=''>Loại Thành Viên</option>
                                            {
                                                typeAccount.map((typeAccount) => (
                                                    <option key={typeAccount.id}
                                                            value={typeAccount.id}>{typeAccount.name}</option>
                                                ))
                                            }
                                            <option></option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-6">

                                <div className="ms-auto">
                                    <div style={{float: "right"}}>
                                        <button id="trivn-bt-mana" type="button" className="btn btn-warning btn-md "
                                                onClick={() => {
                                                    handleFault(selectAccount)
                                                }}>Cảnh
                                            Cáo
                                        </button>
                                        <button id="trivn-bt-mana" type="button" className="btn btn-danger btn-md">Khoá
                                            Nick 1
                                            Tuần
                                        </button>
                                        <button id="trivn-bt-mana" type="button" className="btn btn-danger btn-md">Khoá
                                            1
                                            Tháng
                                        </button>
                                        {
                                            <button id="trivn-bt-mana" type="button" className="btn btn-danger btn-md"
                                                    onClick={handleShowModal}>Khoá Vĩnh Viễn
                                            </button>}

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="container-fluid">
                    <table id="trivn-tb-mana" className="table table-hover">
                        <thead>
                        <tr>
                            <th id="trivn-tb-th">STT</th>
                            <th id="trivn-tb-th">Tên Thành Viên</th>
                            <th id="trivn-tb-th">Ngày Đăng Ký</th>
                            <th id="trivn-tb-th">Kim Cương</th>
                            <th id="trivn-tb-th">Số lỗi</th>
                            <th id="trivn-tb-th">Ngày Vi phạm</th>
                            <th id="trivn-tb-th">Loại Thành Viên</th>
                            <th id="trivn-tb-th">Trạng Thái</th>
                            <th id="trivn-tb-th">Chọn</th>
                        </tr>
                        </thead>
                        {
                            account && account.length !== 0 ?
                                <tbody>
                                {
                                    account.map((account, index) => (
                                        <tr key={account.id}>
                                            <td>{index + 1}</td>
                                            <td><Link to={`/personal-page/${account.userName}`}>
                                                {account.userName}
                                            </Link>
                                            </td>
                                            <td>{formatDay(account.regisDate)}</td>
                                            <td>{account.money / 1000} 💎</td>
                                            <td>{account.faultAmount}</td>
                                            <td>{formatDateTime(account.dateWarning)}</td>
                                            <td>{account.typeAccount}</td>
                                            <td>{account.isDeleted ? <div>
                                                true
                                            </div> : <div> false</div>}</td>
                                            <td>
                                                <label className="ctn-mana">
                                                    <input
                                                        type={"checkbox"}
                                                        onChange={() => handleSelectAccount(account.id)}
                                                    />
                                                    <div className="checkmark"></div>
                                                </label>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody> :

                                <tr>
                                    <td colSpan="8">
                                        <p id="trivn-p-a">
                                            Không Có Dữ Liệu. Vui Lòng Nhập Lại !!!
                                        </p>
                                    </td>
                                </tr>
                        }

                    </table>
                    <div className="row" style={{alignItems: "center"}}>
                        <div className="col-md-3">


                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-outline-primary" style={{marginLeft: "15rem"}}
                                    onClick={() => prevPage()}>
                                <i className="fa-solid fa-forward fa-rotate-180" style={{color: "#b966e5"}}></i>
                            </button>
                            <span className="btn btn-outline-primary">
                                {page + 1}/{totalPage}
                            </span>
                            <button className="btn btn-outline-primary" onClick={() => nextPage()}>
                                <span> <i className="fa-solid fa-forward" style={{color: "#b966e5"}}></i></span>
                            </button>
                        </div>
                        <div className="col-md-3">

                        </div>

                    </div>
                    <DeleteAccount
                        show={status}
                        handleClose={closeModal}
                        select={selectAccount}
                    >
                    </DeleteAccount>
                </div>
            </div>
        </>
    )
}