import React, { useEffect, useRef, useState } from "react";
import "./post.css";
import { getListPublic } from "../../service/posts/PostService";
import EditPost from "./EditPost";
import {getIdByJwt, getUsernameByJwt}  from "../../service/login/securityService";
import { Link } from "react-router-dom";

export default function Post() {
  const [listPublic, setListPublic] = useState();
  const [showModal,setShowModal] = useState(false);
  const [postUpdate,setPostUpdate] = useState();

const username = getUsernameByJwt();
console.log(username);

const idLogin = getIdByJwt ();
console.log(idLogin);

  const fetchDataListPublic = async () => {
    const listPublic = await getListPublic();
    setListPublic(listPublic);
  };
  useEffect(() => {
    fetchDataListPublic();
  }, [showModal]);

  const handleShowModal = (postUpdate) => {
    setShowModal(true);
    setPostUpdate(postUpdate);
  }

  const handleHideModal = () => {
    setShowModal(false);
  }
  const getTime = (dateStr) => {
    let dateTime = new Date(dateStr);
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();
    return `${hour}h-${minute}m ${day}/${month}/${year}`
  }

  if (!listPublic) {
    return null;
  }

  return (
    <div>
      <div
        className="container-fluid"
        style={{ marginTop: 150, position: "relative" }}
      >
        {listPublic.map((item) => {
          return (
            <div className="row" key={item.id} style={{marginBottom:"50px"}}>
              <div className="col-12 col-lg-3"></div>
              <div className="col-12 col-lg-6">
                <div
                  className="middle-column"
                  style={{
                    border: "#A36ACB 1px solid",
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                >
                  <div className="card" >
                    <div className="card-body">
                      <div className="media">
                        <div className="media-header">
                          <div className="media-left">
                            <div
                              style={{
                                backgroundImage:
                                  `url(${item.account.avatar})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                aspectRatio: "1/1",
                                width: 50,
                                borderRadius: "100%",
                                marginRight: 10,
                              }}
                            />
                            <div className="info">
                              <h5><Link to = {`/personal-page/${item.account.id}`}>{item.account.name}</Link></h5>
                              <small>{getTime(item.date)}</small>
                            </div>
                          </div>
                          <div className="post-options">
                            <button style={{border:"none", backgroundColor:"white"}}
                             onClick={() => handleShowModal(item)}
                            >
                              {" "}
                              <i className="fa fa-edit" />
                            </button>
                            <i className="fa fa-times close-icon" />
                          </div>
                        </div>
                        <div style={{width:"100%"}} className="media-body">
                          <p className="card-text text-justify">
                            {item.content}
                          </p>
                          <div className="row no-gutters mb-3">
                            <img
                              src={item.image}
                              className="img-fluid mb-2"
                            />
                          </div>
                        </div>
                        <div className="post-actions">
                          <div className="action-btn">
                            <i className="fa-regular fa-heart" /> Thích
                          </div>
                          <div className="action-btn">
                            <i className="fa-regular fa-comment"></i> Bình luận
                          </div>
                          <div className="action-btn">
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#giftModal"
                              style={{
                                border: "none",
                                backgroundColor: "white",
                              }}
                            >
                              <i className="fa-solid fa-gift"></i> Tặng quà
                            </button>
                          </div>
                        </div>
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
      <EditPost showModal = {showModal} handleHideModal = {handleHideModal} postUpdate = {postUpdate}/>
    </div>
  );
}
