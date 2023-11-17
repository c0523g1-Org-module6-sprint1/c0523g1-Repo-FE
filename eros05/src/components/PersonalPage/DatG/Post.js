import React, { useEffect, useRef, useState } from "react";
import "./post.css"
import { getListPublic } from "../../../service/posts/PostService";
import EditPost from "./EditPost";




export default function Post() {
  const [listPublic, setListPublic] = useState();
  const [showModal,setShowModal] = useState(false);
  const [postUpdate,setPostUpdate] = useState();

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

 
  if (!listPublic) {
    return null;
  }

  return (
    <div>
      <div
        className="container-fluid"
        style={{ marginTop: 100, position: "relative" }}
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
                                  'url("https://images.kienthuc.net.vn/zoom/800/uploaded/ctvkhoahoc/2020_04_29/khong-chi-la-co-may-nhay-lisa-blackpink-con-co-so-thich-dac-biet-nay.jpg")',
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                aspectRatio: "1/1",
                                width: 50,
                                borderRadius: "100%",
                                marginRight: 10,
                              }}
                            />
                            <div className="info">
                              <h5>Lisa Black Pink</h5>
                              <small>{item.date}</small>
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
                        <div className="media-body">
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
