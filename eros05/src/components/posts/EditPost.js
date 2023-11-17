import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getPrivacyPost,update } from "../../service/posts/PostService";
import { Formik, Form, Field } from "formik";
import{toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./post.css";

export default function EditPost({ showModal, handleHideModal, postUpdate }) {
  const [privacyPostList, setPrivacyPostList] = useState();
  const navigate = useNavigate();
  const fetchDataPrivacyPost = async () => {
    const privacyPostList = await getPrivacyPost();
    setPrivacyPostList(privacyPostList);
  };
  const handleSubmit = async (id,values) => {
    const respone = await update(id,values);
    if (respone == 200) {
      handleHideModal();
      toast.success("Success Updated");
    }

  }
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
      <Modal style={{marginTop:"50px"}} show={showModal}>
        <div>
          <Formik initialValues={initValue}
            onSubmit={(values)=> {
              console.log(values.image);
              handleSubmit(postUpdate.id,values)
            }}
          >
            <Form>
              <div className="modal-content">
                <div className="modal-header">
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <h1 className=" fs-5" id="exampleModalLabel">
                      Chỉnh sửa bài viết
                    </h1>
                  </div>
                  <button type="button" className="btn-close" onClick={handleHideModal} />
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
                              <Field
                              name = "privacyPostId"
                                as="select"
                                className="form-select"
                                aria-label="Default select example"
                                style={{
                                  marginTop: 6,
                                  width: "91%",
                                  fontSize: 16,
                                }}
                              >
                                {privacyPostList.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          </div>
                        </div>
                        <div className="media-body">
                          <Field
                            name="content"
                            as="textarea"
                            style={{
                              width: "100%",
                              border: "none",
                              marginBottom: "15px",
                             whiteSpace: "normal"
                            }}
                            className="card-text text-justify"
                          ></Field>
                          <div className="row no-gutters mb-3">
                            <Field name="image">
                              {({ field, form }) => (
                                <div>
                                  <img
                                    src={field.value} 
                                    className="img-fluid mb-2"
                                  />
                                  <input
                                  style={{width:"100%",marginTop:"15px"}}
                                    className="btn btn-primary"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.currentTarget.files[0];
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        form.setFieldValue(
                                          field.name,
                                          reader.result
                                        ); 
                                      };
                                      reader.readAsDataURL(file);
                                    }}
                                  />
                                </div>
                              )}
                            </Field>
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
                      marginBottom:"25px"
                    }}
                    type="submit"
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
