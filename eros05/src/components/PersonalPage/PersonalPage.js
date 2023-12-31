import './PersonalPage.css'
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as personalService from "../../service/personalPage/PersonalpageService"
import Post from "./DatG/Post";
import {toast} from "react-toastify";
import * as loginService from "../../service/login/securityService";
import Gift from "../gift/Gift";
import UnknowMessage from "../chatbox/UnknowMessage";
import {database, ref, push, onValue} from "./LongTND"
import UpPost from "../update_account/UpPost";

export function PersonalPage() {
    const [accountVisit, setAccountVisit] = useState({});
    const [isClicked, setIsClicked] = useState(false);
    const [showMessageTable, setShowMessageTable] = useState(false);
    const [statusPending, setStatusPending] = useState('');
    const {id} = useParams();
    let idLogin = 1;
    const [statusRelation, setStatusRelation] = useState('');
    const navigate = useNavigate();
    const idUserLogin = loginService.getIdByJwt();
    const userNameLogin = loginService.getUsernameByJwt();
    const [showModaQuyNP, setShowModalQuyNP] = useState(false);
    const handleModal = async () => {
        console.log("hi");
        setShowModalQuyNP(true);
    };

    const closeModal = async () => {
        setShowModalQuyNP(false);
    };

    useEffect(() => {
        getInfoAccount();
    }, [id]);

    const getInfoAccount = async () => {
        try {
            let result = await personalService.getInfoPersonal(id)
            console.log(result)
            setAccountVisit(result.data);
            if (id !== idUserLogin) {
                status(result.data);
                getStatusPending(result.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getStatusPending = async (accountVisit) => {
        try {
            let result = await personalService.getStatusPending(idUserLogin, accountVisit.id)
            setStatusPending(result.data.relationshipStatus);
        } catch (e) {
            console.log(e)
        }
    }
    const handleSentInvite = async (relationships) => {
        try {
            if (!isClicked) {
                let result = await personalService.sentInvite(relationships);
                if (result.status === 201) {
                    toast.success("Lời mời kết bạn vừa gửi thành công ")
                    await status(accountVisit);

                } else {
                    toast.error("Thất bại")
                }
                setIsClicked(true);
            }
        } catch (e) {
            console.log(e)
        }
    }
    const value = {
        sendAccount: idUserLogin,
        receiverAccount: accountVisit.id
    }

    const status = async (accVisit) => {
        try {
            if (accountVisit || id !== idUserLogin) {
                const result = await personalService.getStatus(idUserLogin, accVisit.id);
                console.log(result)
                if (result) {
                    setStatusRelation(result.data.relationshipStatus);
                }
            }

        } catch (e) {
            console.log(e)
        }
    }

    const closeSenderMessage = () => {
        setShowMessageTable(false);
    }
    return (
        <>
            {(showMessageTable) &&
                <UnknowMessage
                    element={{id: accountVisit.id}}
                    profile={{id: idUserLogin}}
                    close={closeSenderMessage}
                />}

            {(accountVisit && (statusRelation.id !== 3)) ?

                (<div className="container-fluid" style={{marginTop: 80}}>
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6">
                            <div className="panel profile-cover">
                                <div className="profile-cover__img">
                                    <div style={{
                                        backgroundImage: `url(${accountVisit.avatar})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        aspectRatio: '1/1',
                                        backgroundRepeat: 'no-repeat',
                                        borderRadius: '100%',
                                        height: "180px",
                                        marginLeft: '25px'
                                    }}>


                                    </div>
                                    <h3 className="h3">
                                        <b style={{padding: "45px"}}>{accountVisit.name}</b>
                                    </h3>

                                </div>
                                <div
                                    className="profile-cover__action bg--img"
                                    data-overlay="0.3"
                                ></div>
                                <div className="profile-cover__info" style={{height: '130px'}}>
                                    {idUserLogin !== accountVisit.id ?
                                        (<ul className="nav">
                                            <li>
                                                <li>
                                                    {(() => {
                                                        switch (statusRelation.id) {
                                                            case 0:
                                                                return (
                                                                    <button
                                                                        className="btn btn-rounded btn-info"
                                                                        style={{
                                                                            backgroundColor: "#a36acb",
                                                                            borderRadius: 20
                                                                        }}
                                                                        onClick={() => handleSentInvite(value)}
                                                                    >
                                                                    <span className="bt">
                                                                        <i className="fa-solid fa-user-plus bt"></i>
                                                                         Kết bạn
                                                                    </span>
                                                                    </button>
                                                                );
                                                            case 1:
                                                                return (
                                                                    <button
                                                                        className="btn btn-rounded btn-info"
                                                                        style={{
                                                                            backgroundColor: "#a36acb",
                                                                            borderRadius: 20
                                                                        }}
                                                                    >
                                                                        {statusPending.id === 1 ? (<span className="bt">
                                                                         <i className="fa-solid fa-paper-plane bt"></i>
                                                                        Đang chờ đồng ý
                                                                    </span>)
                                                                            :
                                                                            (<span className="bt">
                                                                         <i className="fa-solid fa-paper-plane bt"></i>
                                                                          Đã gửi lời mời kết bạn
                                                                    </span>)
                                                                        }

                                                                    </button>
                                                                );
                                                            case 2:
                                                                return (
                                                                    <button
                                                                        className="btn btn-rounded btn-info"
                                                                        style={{
                                                                            backgroundColor: "#a36acb",
                                                                            borderRadius: 20
                                                                        }}
                                                                    >
                                                                    <span className="bt">
                                                                        <i className="fa-solid fa-user-group bt"/>
                                                                          Bạn bè
                                                                    </span>
                                                                    </button>
                                                                );
                                                        }
                                                    })()}
                                                </li>
                                            </li>
                                            <li>
                                                <button
                                                    className="btn btn-rounded btn-info"
                                                    style={{backgroundColor: "#a36acb", borderRadius: 20}}
                                                >

                                                <span className="bt"
                                                      onClick={() => {
                                                          setShowMessageTable(true)
                                                      }}><i className="fa fa-comment bt"/> Tin nhắn </span>
                                                </button>
                                            </li>
                                            <li>
                                                <div

                                                >
                                                    <div>
                                                        <button
                                                            className="btn btn-rounded btn-info"
                                                            style={{backgroundColor: "#a36acb", borderRadius: 20}}
                                                            onClick={handleModal}
                                                        >

                                                            <span className="bt"><i className="fa-solid fa-gift bt"/> Tặng quà</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="btn-group dropend"></div>
                                            </li>
                                        </ul>) :
                                        (<div
                                            className="row"
                                            style={{color: "black", textAlign: "center", paddingTop: "85px", margin: 0}}
                                        >
                                            <hr style={{padding: 0, marginBottom: "6px", opacity: 1}}/>
                                            <div className="col-lg-2" style={{marginLeft: 30}}>
                                                <Link to={"/friend/list"} style={{textDecoration: "none"}}>
                                                    <small>
                                                        <i className="fa-solid fa-user-group"/> Bạn bè
                                                    </small>
                                                </Link>
                                            </div>
                                            <div className="col-lg-3">
                                                <Link to={"/invited_recommend_friend/InvitedList"}
                                                      style={{textDecoration: "none"}}>
                                                    <small>
                                                        <i className="fa-solid fa-list"/> Lời mời kết bạn{" "}
                                                    </small>
                                                </Link>

                                            </div>
                                            <div className="col-lg-3">

                                                <Link to={"/updateAccount/gold"} style={{textDecoration: "none"}}>
                                                    <small>
                                                        <i className="fa-solid fa-rocket"/> Nâng cấp tài khoản
                                                    </small>
                                                </Link>

                                            </div>
                                            <div className="col-lg-3">
                                                <small>
                                                    <i className="fa-solid fa-wrench"/> Chỉnh sửa thông tin
                                                </small>
                                            </div>

                                        </div>)}
                                </div>
                            </div>
                            {/*<div className="panel">*/}
                            {/*    <div className="panel-heading">*/}
                            {/*        <h3 className="panel-title">Bài viết</h3>*/}
                            {/*    </div>*/}
                            {/*    <div className="panel-content panel-activity">*/}
                            {/*        <UpPost/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {idUserLogin === accountVisit.id && (
                                <div style={{margin: "22% 0px 0 -42%", width: "205%"}}>
                                    <UpPost></UpPost></div>)}


                        </div>
                        <div className="col-lg-3">
                        </div>
                    </div>
                    <Post/>
                </div>)
                :
                (<div>
                    <h1 className="iconLongTND">Không có dữ liệu để hiển thị</h1>
                </div>)}


            <Gift showModaQuyNP={showModaQuyNP} handleClose={closeModal}
                  userNow={userNameLogin}
                  userGift={accountVisit.userName}
            />

            {/*///modal Long*/}
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Thông báo
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <b>”Lời mời kết bạn vừa gửi thành công”</b>
                            <i
                                style={{color: "#a36acb", fontSize: 40}}
                                className="fa-solid fa-check"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                style={{background: "#a36acb"}}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}