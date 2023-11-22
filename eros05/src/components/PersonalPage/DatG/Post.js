import React, { useEffect, useState } from "react";
import "./post.css";
import {
  getListOfAnAccount,
  getListForFriend,
  getListForStranger,
  checkIsFriend,
} from "../../../service/posts/PostService";
import EditPost from "./EditPost";
import {
  getIdByJwt,
  getUsernameByJwt,
  getRoleByJwt,
} from "../../../service/login/securityService";
import { Link, useParams } from "react-router-dom";
import LikeButton from "../../posts/LikeButton";
import Gift from "../../gift/Gift";
import CommentBox from "../../comments/CommentBox";

export default function Post() {
  const [listNewsfeed, setListNewsfeed] = useState();
  const [showModal, setShowModal] = useState();
  const [postUpdate, setPostUpdate] = useState();
  const idLogin = getIdByJwt();
  const [showModaQuyNP, setShowModalQuyNP] = useState(false);

  console.log("ID đang đăng nhập là:" + idLogin);
  const role = getRoleByJwt();
  console.log("Role đang đăng nhập là:" + role);
  const { id } = useParams();
  console.log("Id đang tới trang cá nhân  là:" + id);

  const fetchDataListOfAnAccount = async () => {
    if (id == idLogin || role == "ADMIN") {
      const listNewsfeed = await getListOfAnAccount(id);
      setListNewsfeed(listNewsfeed);
    } else if (id !== idLogin) {
      const isFriend = await checkIsFriend(id, idLogin);
      console.log("IsFriend Frontend:" + isFriend);
      if (isFriend) {
        const listNewsfeed = await getListForFriend(id);
        setListNewsfeed(listNewsfeed);
      } else {
        const listNewsfeed = await getListForStranger(id);
        setListNewsfeed(listNewsfeed);
      }
    }
  };
  const handleModal = async () => {
    console.log("hi");
    setShowModalQuyNP(true);
  };

  const closeModal = async () => {
    setShowModalQuyNP(false);
  };
  useEffect(() => {
    fetchDataListOfAnAccount();
  }, [showModal, id]);

  const handleShowModal = (postUpdate) => {
    setShowModal(true);
    setPostUpdate(postUpdate);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const getTime = (dateStr) => {
    let dateTime = new Date(dateStr);
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();
    return `${hour}:${minute} ${day}/${month}/${year}`;
  };

  if (!listNewsfeed) {
    return null;
  }

  return (
      <div>
        <div
            className="container-fluid my-post"

        >
          {listNewsfeed.map((item) => {
            return (
                <div className="row" key={item.id} style={{ marginBottom: "50px" }}>
                  <div className="col-12 col-lg-3"></div>
                  <div className="col-12 col-lg-6" style={{marginTop:"5%"}}>
                    <div
                        className="middle-column"
                        style={{
                          border: "#A36ACB 1px solid",
                          borderRadius: 20,
                          overflow: "hidden",
                        }}
                    >
                      <div className="card">
                        <div className="card-body">
                          <div className="media">
                            <div className="media-header">
                              <div className="media-left">
                                <div
                                    style={{
                                      backgroundImage: `url(${item.account.avatar})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      aspectRatio: "1/1",
                                      width: 50,
                                      borderRadius: "100%",
                                      marginRight: 10,
                                    }}
                                />
                                <div className="info">
                                  <h5>
                                    <Link to={`/personal-page/${item.account.id}`}>
                                      {item.account.name}
                                    </Link>
                                  </h5>
                                  <small>{getTime(item.date)}</small>
                                </div>
                              </div>
                              <div className="post-options">
                                {(role === "ADMIN" ||
                                    idLogin === item.account.id) && (
                                    <button
                                        style={{
                                          border: "none",
                                          backgroundColor: "white",
                                        }}
                                        onClick={() => handleShowModal(item)}
                                    >
                                      <i className="fa fa-edit" />
                                    </button>
                                )}
                                {(role === "ADMIN" ||
                                    idLogin === item.account.id) && (
                                    <i className="fa fa-times close-icon" />
                                )}
                              </div>
                            </div>
                            <div style={{ width: "100%" }} className="media-body">
                              <p className="card-text text-justify">
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                ></div>
                              </p>
                              <div className="row no-gutters mb-3">
                                <img src={item.image} className="img-fluid mb-2" />
                              </div>
                            </div>
                            <div className="post-actions">
                              <div className="action-btn">
                                <LikeButton
                                    id={idLogin}
                                    postId={item.id}
                                ></LikeButton>
                              </div>
                              <div className="action-btn">
                                <button
                                    onClick={handleModal}

                                    style={{
                                      border: "none",
                                      backgroundColor: "white",
                                    }}
                                >
                                  <i className="fa-solid fa-gift"></i> Tặng quà
                                </button>
                              </div>
                            </div>
                            <CommentBox postId = {item.id}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3" />
                </div>
            );
          })}
        </div>
        <EditPost
            showModal={showModal}
            handleHideModal={handleHideModal}
            postUpdate={postUpdate}
        />
        <Gift showModaQuyNP={showModaQuyNP} handleClose={closeModal} />
      </div>
  );
}





