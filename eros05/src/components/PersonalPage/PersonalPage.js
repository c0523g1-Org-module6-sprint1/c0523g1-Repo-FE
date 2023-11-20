import './PersonalPage.css'
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as personalService from "../../service/personalPage/PersonalpageService"
import Post from "./DatG/Post";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";
import * as loginService from "../../service/login/securityService";
import {getIdByJwt} from "../../service/login/securityService";


export function PersonalPage() {
    const [accountVisit,setAccountVisit] = useState({});
    const {id} = useParams();
    let idLogin =1;
    const [statusRelation, setStatusRelation] = useState({});

    const idUserLogin = loginService.getIdByJwt();



    useEffect(() => {
        getInfoAccount();
    },[]);

    const getInfoAccount = async () => {
        let result =  await personalService.getInfoPersonal(id)
        setAccountVisit(result.data);
        status(result.data)
    }
    const handleSentInvite = async (relationships) => {
      let result = await personalService.sentInvite(relationships);
      if (result.status === 201){
          toast.success("Lời mời kết bạn vừa gửi thành công ")
      }else {
          toast.error("Thất bại")
      }
    }
    const value = {
        sendAccount : idUserLogin,
        receiverAccount: accountVisit.id
    }

    const status = async (accVisit) => {
        console.log(idLogin);
        console.log(accVisit.id);
        if(accountVisit){
           const result = await personalService.getStatus(idUserLogin,accVisit.id);
            console.log(result)
            if(result){
                setStatusRelation(result.data.relationshipStatus);


            }
        }
    }

    return(
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className="panel profile-cover">
                            <div className="profile-cover__img">
                                <div  style={{
                                    backgroundImage : `url(${accountVisit.avatar})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    aspectRatio: '1/1',
                                    backgroundRepeat: 'no-repeat',
                                    borderRadius: '100%',
                                    marginLeft: '25px'}} >


                                </div>
                                <h3 className="h3" >
                                    <b style={{padding:"45px"}}>{accountVisit.name}</b>
                                </h3>


                            </div>
                            <div
                                className="profile-cover__action bg--img"
                                data-overlay="0.3"
                            ></div>
                            <div className="profile-cover__info" style={{ height: '120px' }}>
                                {idUserLogin !== accountVisit.id ?
                                    (<ul className="nav">
                                        <li>
                                            {(statusRelation.id === 2 )  ?
                                                (<button className="btn btn-rounded btn-info"
                                                         style={{ backgroundColor: "#a36acb", borderRadius: 20 }}>
                                                    <i className="fa-solid fa-user-group bt"/>
                                                    <span className="bt">Bạn bè</span>
                                                </button>)
                                                :
                                                (<button
                                                    className="btn btn-rounded btn-info"
                                                    style={{ backgroundColor: "#a36acb", borderRadius: 20 }}
                                                    onClick={() => handleSentInvite(value)}>
                                                    <i className="fa fa-plus bt" />
                                                    <span className="bt">Kết bạn</span>
                                                </button>)}

                                        </li>
                                        <li>
                                            <button
                                                className="btn btn-rounded btn-info"
                                                style={{ backgroundColor: "#a36acb", borderRadius: 20 }}
                                            >
                                                <i className="fa fa-comment bt" />
                                                <span className="bt">Tin nhắn</span>
                                            </button>
                                        </li>
                                        <li>
                                            <div
                                                data-bs-target="#exampleModalToggle"
                                                data-bs-toggle="modal"
                                            >
                                                <div>
                                                    <button
                                                        className="btn btn-rounded btn-info"
                                                        style={{ backgroundColor: "#a36acb", borderRadius: 20 }}
                                                    >
                                                        <i className="fa-solid fa-gift bt" />
                                                        <span className="bt">Tặng quà</span>
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
                                        style={{ color: "black", textAlign: "center", paddingTop:"85px",margin:0 }}
                                    >
                                        <hr style={{padding:0, margin:0,opacity:1}}/>
                                        <div className="col-lg-2" style={{ marginLeft: 30 }}>
                                            <Link to={"/friend/list"} style={{textDecoration:"none"}}>
                                                <small>
                                                    <i className="fa-solid fa-user-group"/> Bạn bè
                                                </small>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="col-12">
                                                <Link to={"/invited_recommend_friend/InvitedList"} style={{textDecoration:"none"}}>
                                                    <small>
                                                        <i className="fa-solid fa-list" /> Lời mời kết bạn{" "}
                                                    </small>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">

                                                    <Link to={"/updateAccount/eros+"} style={{textDecoration:"none"}}>
                                                        <small>
                                                            <i className="fa-solid fa-rocket" /> Nâng cấp tài khoản
                                                        </small>
                                                    </Link>

                                        </div>
                                        <div className="col-lg-3">
                                                <Link to={`/personal-page/edit/${idLogin}`} style={{textDecoration:"none"}}>
                                                    <small>
                                                        <i className="fa-solid fa-wrench" /> Chỉnh sửa thông tin
                                                    </small>
                                                </Link>
                                        </div>

                                    </div>) }
                            </div>
                        </div>
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Bài viết</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>

            </div>
            <Post/>
            {/*//modalquy*/}
            <div
                style={{ borderRadius: 10, textAlign: "center", alignItems: "center" }}
                className="modal fade"
                id="exampleModalToggle"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" style={{ borderRadius: 20 }}>
                        <div className="" style={{ textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <h4 style={{ marginTop: "1rem" }}>Lựa chọn quà tặng</h4>
                            </div>
                            <div style={{ fontSize: "1.2rem" }}>
                                <div className="title">Số dư tài khoản: 8000 💎</div>
                            </div>
                            <div style={{ fontSize: 18 }}>
                                <div className="title" style={{ marginTop: "0.2rem" }}>
                                    Lựa chọn quà tặng:
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div
                                className="content-body"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gap: "0.2rem"
                                }}
                            >
                                <div style={{ border: "#a36acb 1px solid", borderRadius: 10 }}>
                                    <div style={{ paddingTop: "0.2rem" }}>
                                        <img
                                            style={{ width: "50%" }}
                                            src="pngtree-beautiful-rose-flowers-barbed-rose-love-confession-png-image_3898999 Background Removed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ fontSize: 14 }}>Hoa Tươi</div>
                                    <div style={{ marginTop: "0, 8rem" }}>50 💎</div>
                                </div>
                                <div style={{ border: "#a36acb 1px solid", borderRadius: 10 }}>
                                    <div style={{ marginTop: "0.2rem" }}>
                                        <img
                                            style={{ width: "50%" }}
                                            src="pngtree-bear-toy-bear-doll-teddy-bear-png-image_3828904 Background Removed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ fontSize: 14 }}>Gấu bông cute</div>
                                    <div style={{ marginTop: "0, 8rem" }}>200 💎</div>
                                </div>
                                <div style={{ border: "#a36acb 1px solid", borderRadius: 10 }}>
                                    <div style={{ marginTop: "0.2rem" }}>
                                        <img
                                            style={{ width: "50%" }}
                                            src="fashion-2030046_1280 Background Removed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ fontSize: 14 }}>Guốc</div>
                                    <div style={{ marginTop: "0, 8rem" }}>400 💎</div>
                                </div>
                                <div style={{ border: "#a36acb 1px solid", borderRadius: 10 }}>
                                    <div style={{ marginTop: "0.2rem" }}>
                                        <img
                                            style={{ width: "50%" }}
                                            src="pngtree-3d-silver-diamond-ring-isolated-png-image_13325081 Background Removed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ fontSize: 14 }}>Nhẫn kim cương</div>
                                    <div style={{ marginTop: "0, 8rem" }}>800 💎</div>
                                </div>
                                <div style={{ border: "#a36acb 1px solid", borderRadius: 10 }}>
                                    <div style={{ marginTop: "0.2rem" }}>
                                        <img
                                            style={{ width: "50%" }}
                                            src="pngtree-3d-silver-diamond-ring-isolated-png-image_13325081 Background Removed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ fontSize: 14 }}>Nhẫn kim Cương</div>
                                    <div style={{ marginTop: "0.8rem" }}>800 💎</div>
                                </div>
                                <div style={{ border: "#a36acb 1px solid", borderRadius: 10 }}>
                                    <div style={{ marginTop: "0.2rem" }}>
                                        <img
                                            style={{ width: "50%" }}
                                            src="pngtree-bear-toy-bear-doll-teddy-bear-png-image_3828904 Background Removed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ fontSize: 14 }}>Gấu bông cute</div>
                                    <div style={{ marginTop: "0, 8rem" }}>300 💎</div>
                                </div>
                                <div style={{ border: "#a36acb 1px solid", borderRadius: 10 }}>
                                    <div style={{ marginTop: "0.2rem" }}>
                                        <img
                                            style={{ width: "50%" }}
                                            src="pngtree-beautiful-rose-flowers-barbed-rose-love-confession-png-image_3898999 Background Removed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ fontSize: 14 }}>Hoa tươi</div>
                                    <div style={{ marginTop: "0, 8rem" }}>100 💎</div>
                                </div>
                                <div style={{ border: "#a36acb 1px solid", borderRadius: 10 }}>
                                    <div style={{ marginTop: "0.2rem" }}>
                                        <img
                                            style={{ width: "50%" }}
                                            src="fashion-2030046_1280 Background Removed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ fontSize: 14 }}>Gốc</div>
                                    <div style={{ marginTop: "0, 8rem" }}>600 💎</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                data-bs-target="#exampleModalToggle2"
                                data-bs-toggle="modal"
                                style={{
                                    backgroundColor: "whitesmoke",
                                    borderRadius: 7,
                                    color: "black",
                                    border: "#a36acb solid 1px"
                                }}
                            >
                                Huỷ
                            </button>
                            <button
                                className="btn btn-primary"
                                data-bs-target="#exampleModalToggle2"
                                data-bs-toggle="modal"
                                style={{
                                    backgroundColor: "#a36acb",
                                    borderRadius: 7,
                                    border: "#a36acb solid 1px",
                                    color: "white"
                                }}
                            >
                                Tặng quà
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
                                style={{ color: "#a36acb", fontSize: 40 }}
                                className="fa-solid fa-check"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                style={{ background: "#a36acb" }}
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