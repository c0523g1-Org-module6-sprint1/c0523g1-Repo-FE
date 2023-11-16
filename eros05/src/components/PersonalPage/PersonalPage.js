import './PersonalPage.css'
import './header.css'
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as personalService from "../../service/personalPage/PersonalpageService"


export function PersonalPage() {
    const [account,setAccount] = useState({});
    const {id} = useParams();
    let idTemp =1;

    useEffect(() => {
        getInfoAccount();
    },[]);

    const getInfoAccount = async () => {
        let result =  await personalService.getInfoPersonal(id)
        console.log(result)
        setAccount(result.data);
    }



    return(
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className="panel profile-cover">
                            <div className="profile-cover__img">
                                <div className="ig" style={{
                                    backgroundImage : `url(${account.avatar})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    aspectRatio: '1/1',
                                    width: '80%',
                                    borderRadius: '100%',
                                    marginLeft: '25px'}} >


                                </div>
                                <h3 className="h3" >
                                    <b style={{padding:"45px"}}>{account.name}</b>
                                </h3>


                            </div>
                            <div
                                className="profile-cover__action bg--img"
                                data-overlay="0.3"
                            ></div>
                            <div className="profile-cover__info" style={{ height: '120px' }}>
                                {idTemp !== account.id ?
                                    (<ul className="nav">
                                        <li>
                                            <button
                                                className="btn btn-rounded btn-info"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                style={{ backgroundColor: "#a36acb", borderRadius: 20 }}
                                            >
                                                <i className="fa fa-plus bt" />
                                                <span className="bt">Kết bạn</span>
                                            </button>
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
                                            <Link to={"/THienPP"} style={{textDecoration:"none"}}>
                                                <small>
                                                    <i className="fa-solid fa-user-group"> </i> Bạn bè
                                                </small>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="col-12">
                                                <Link to={"/THienPT"} style={{textDecoration:"none"}}>
                                                    <small>
                                                        <i className="fa-solid fa-list" /> Lời mời kết bạn{" "}
                                                    </small>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="row">
                                                <div className="col-12">
                                                    <Link to={"/Hậu"} style={{textDecoration:"none"}}>
                                                        <small>
                                                            <i className="fa-solid fa-rocket" /> Nâng cấp tài khoản
                                                        </small>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="col-12">
                                                <Link to={"/ThienLCH"} style={{textDecoration:"none"}}>
                                                    <small>
                                                        <i className="fa-solid fa-wrench" /> Chỉnh sửa thông tin
                                                    </small>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>) }



                            </div>
                        </div>
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Bài viết</h3>
                            </div>
                            <div className="panel-content panel-activity">
                                <form action="#" className="panel-activity__status">
              <textarea
                  name="user_activity"
                  placeholder="Share what you've been up to..."
                  className="form-control"
                  style={{ background: "none" }}
                  defaultValue={""}
              />
                                    <div className="actions">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn-link"
                                                title=""
                                                data-toggle="tooltip"
                                                data-original-title="Post an Image"
                                            >
                                                <i className="fa fa-image" />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-link"
                                                title=""
                                                data-toggle="tooltip"
                                                data-original-title="Post an Video"
                                            >
                                                <i className="fa fa-video-camera" />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-link"
                                                title=""
                                                data-toggle="tooltip"
                                                data-original-title="Post an Idea"
                                            >
                                                <i className="fa fa-lightbulb-o" />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-link"
                                                title=""
                                                data-toggle="tooltip"
                                                data-original-title="Post an Question"
                                            >
                                                <i className="fa fa-question-circle-o" />
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-sm btn-rounded btn-info bt"
                                            style={{ backgroundColor: "#a36acb" }}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </form>
                                <ul className="panel-activity__list">
                                    <li>
                                        <div className="middle-column">
                                            <div className="card" style={{ borderRadius: 0 }}>
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="media-header">
                                                            <div className="media-left">
                                                                <div
                                                                    style={{
                                                                        backgroundImage: 'url("img/img.png")',
                                                                        backgroundSize: "cover",
                                                                        backgroundPosition: "center",
                                                                        aspectRatio: "1/1",
                                                                        width: 50,
                                                                        borderRadius: "100%",
                                                                        marginRight: 10
                                                                    }}
                                                                />
                                                                <div className="info">
                                                                    <h5>Lisa Black Pink</h5>
                                                                    <small>5 min</small>
                                                                </div>
                                                            </div>
                                                            <div className="post-options">
                                                                <a
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#editModal"
                                                                >
                                                                    {" "}
                                                                    <i className="fa fa-edit" />
                                                                </a>
                                                                <i className="fa fa-times close-icon" />
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <p className="card-text text-justify">
                                                                Mấy cưng thấy chị xinh không ?
                                                            </p>
                                                            <div className="row no-gutters mb-3">
                                                                <img
                                                                    src="img/img.png"
                                                                    alt=""
                                                                    className="img-fluid mb-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="post-actions">
                                                            <div className="action-btn">
                                                                <i className="fa-regular fa-heart" /> Thích
                                                            </div>
                                                            <div className="action-btn">
                                                                <i className="fa-regular fa-comment" /> Bình luận
                                                            </div>
                                                            <div className="action-btn">
                                                                <i className="fa-solid fa-gift" /> Tặng quà
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div
                                                            className=""
                                                            style={{
                                                                marginTop: 10,
                                                                display: "flex",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <div className="" style={{ marginRight: 20 }}>
                                                                <img
                                                                    src="https://tse1.mm.bing.net/th?id=OIP.50MrZSvhlsGV4Qs6aklK-QHaE8&pid=Api&P=0&h=180"
                                                                    alt="Avatar"
                                                                    style={{
                                                                        width: 50,
                                                                        height: 50,
                                                                        borderRadius: "50%",
                                                                        position: "relative",
                                                                        left: 12
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className=" w-auto"
                                                                style={{
                                                                    border: "1px solid #ccc",
                                                                    padding: 5,
                                                                    position: "relative",
                                                                    borderRadius: 20
                                                                }}
                                                            >
                                                                <div>
                                                                    <b style={{ color: "black" }}>John Doe</b>
                                                                </div>
                                                                <p>
                                                                    {" "}
                                                                    Iam gonna make you beg for the gift of death{" "}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className=""
                                                            style={{
                                                                marginTop: 10,
                                                                display: "flex",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <div className="" style={{ marginRight: 20 }}>
                                                                <img
                                                                    src="https://tse3.mm.bing.net/th?id=OIP.D8CoO-WSDf93QJYB3mZ9aAHaEK&pid=Api&P=0&h=180"
                                                                    alt="Avatar"
                                                                    style={{
                                                                        width: 50,
                                                                        height: 50,
                                                                        borderRadius: "50%",
                                                                        position: "relative",
                                                                        left: 12
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className=" w-auto"
                                                                style={{
                                                                    border: "1px solid #ccc",
                                                                    padding: 5,
                                                                    position: "relative",
                                                                    borderRadius: 20
                                                                }}
                                                            >
                                                                <div>
                                                                    <b style={{ color: "black" }}>Keanu Reeves</b>
                                                                </div>
                                                                <p> Beautiful honey !!!!!!!! </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className=""
                                                            style={{
                                                                marginTop: 10,
                                                                display: "flex",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <div className="" style={{ marginRight: 20 }}>
                                                                <img
                                                                    src="https://tse3.mm.bing.net/th?id=OIP.GtqfauNI1Nd7Hwg74Wjw7wHaHa&pid=Api&P=0&h=180"
                                                                    alt="Avatar"
                                                                    style={{
                                                                        width: 50,
                                                                        height: 50,
                                                                        borderRadius: "50%",
                                                                        position: "relative",
                                                                        left: 12
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    border: "1px solid #ccc",
                                                                    padding: 5,
                                                                    position: "relative",
                                                                    borderRadius: 20,
                                                                    width: "100%"
                                                                }}
                                                            >
                                                                <input
                                                                    style={{
                                                                        width: "93%",
                                                                        boxSizing: "border-box",
                                                                        left: 5,
                                                                        borderRadius: 20
                                                                    }}
                                                                    type="text"
                                                                    id="new-input"
                                                                    className="form-control"
                                                                    placeholder="Nhập tiêu đề"
                                                                />
                                                                <a
                                                                    href=""
                                                                    style={{
                                                                        textDecoration: "none",
                                                                        color: "#000",
                                                                        fontSize: "130%",
                                                                        position: "relative",
                                                                        left: 6,
                                                                        top: 4
                                                                    }}
                                                                >
                                                                    <i className="fa-regular fa-face-smile" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
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