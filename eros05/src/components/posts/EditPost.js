import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getPrivacyPost } from "../../service/posts/PostService";
import { Formik, Form, Field } from "formik";

export default function EditPost({ showModal, handleHideModal, postUpdate }) {
  const [privacyPostList, setPrivacyPostList] = useState();
  const fetchDataPrivacyPost = async () => {
    const privacyPostList = await getPrivacyPost();
    setPrivacyPostList(privacyPostList);
  };
  useEffect(() => {
    fetchDataPrivacyPost();
  }, []);

  if (!postUpdate || !privacyPostList) {
    return null;
  }
  const initValue = {
    id: postUpdate.id,
    content: postUpdate.content,
    image: postUpdate.image,
    privacyPostId: postUpdate.privacyPostId,
  };
  return (
    <div>
      <Modal show={showModal}>
        <div>
          <Formik initialValues={initValue}>
            <Form>
              <div className="modal-content">
                <div className="modal-header">
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <h1 className=" fs-5" id="exampleModalLabel">
                      Chỉnh sửa bài viết
                    </h1>
                  </div>
                  <button className="btn-close" onClick={handleHideModal} />
                </div>
                <div className="modal-body1" style={{ padding: 15 }}>
                  <div className="middle-column">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-header">
                          <div className="media-left">
                            <div
                              style={{
                                backgroundImage:
                                  'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZDG0XwFyQdvQbMPR_X44NXKZXWRvDqPMMZQ&usqp=CAU")',
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
                              <select
                                as="select"
                                className="form-select"
                                aria-label="Default select example"
                                style={{
                                  marginTop: 6,
                                  width: "91%",
                                  fontSize: 13,
                                }}
                              >
                                {privacyPostList.map((item) => (
                                  <option key={item.id}>{item.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="media-body">
                          <Field
                            name="content"
                            style = {{width:"100%", border: "none"}}
                            className="card-text text-justify"
                          ></Field>
                          <div className="row no-gutters mb-3">
                            <Field
                              name="image"
                              className="img-fluid mb-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "#a36acb",
                      color: "white",
                    }}
                    type="button"
                    className="btn "
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  );
}
