import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getPrivacyPost, update } from "../../service/posts/PostService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Yup from "yup";
import { imagePostDb } from "./firebase/ConfigFireBasePost";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./post.css";

export default function EditPost({ showModal, handleHideModal, postUpdate }) {
  const [privacyPostList, setPrivacyPostList] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const fetchDataPrivacyPost = async () => {
    const privacyPostList = await getPrivacyPost();
    setPrivacyPostList(privacyPostList);
  };

  const uploadImageToFirebase = async (image) => {
    const imgRef = ref(imagePostDb, `files/${v4()}`);
    const snapshot = await uploadBytes(imgRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleSubmit = async (id, values) => {
    const response = await update(id, values);
    if (response === 200) {
      handleHideModal();
      toast.success("Chỉnh sửa thành công");
    }
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
  const validatePost = {
    content: Yup.string().max(6000,"Tình yêu có thể viết ngắn lại được không ?"
    ),
    privacyPostId: Yup.string().required(
      "Tình yêu xin hãy chọn quyền riêng tư"
    ),
  };
  return (
    <div>
      <Modal
        className="modal-edit"
        style={{ marginTop: "50px" }}
        show={showModal}
        onHide={handleHideModal}
      >
        <Modal.Header className="modal-header">
          <div style={{ width: "100%" }}>
            <h1
              style={{ marginTop: "0px", marginBottom: "0px", color: "black" }}
              className=" fs-5"
              id="exampleModalLabel"
            >
              Chỉnh sửa bài viết
            </h1>
          </div>
          <Button
            className="my-btn btn-close"
            type="button"
            onClick={handleHideModal}
          ></Button>
        </Modal.Header>
        <Formik
          initialValues={initValue}
          validationSchema={Yup.object(validatePost)}
          onSubmit={(values) => {
            console.log(values.image);
            handleSubmit(postUpdate.id, values);
          }}
        >
          <Form>
            <Modal.Body className="modal-body" style={{ paddingBottom: "0px" }}>
              <div className="modal-body1">
                <div className="middle-column">
                  <div className="card-body">
                    <div className="media">
                      <div className="media-header">
                        <div className="media-left">
                          <div
                            style={{
                              backgroundImage: `url(${postUpdate.account.avatar})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              aspectRatio: "1/1",
                              width: 50,
                              borderRadius: "100%",
                              marginRight: 10,
                            }}
                          />
                          <div className="info">
                            <h5>{postUpdate.account.name}</h5>
                            <Field
                              name="privacyPostId"
                              as="select"
                              className="form-select"
                              aria-label="Default select example"
                              style={{
                                marginTop: 6,
                                width: "100%",
                                fontSize: 16,
                              }}
                            >
                              {privacyPostList.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="privacyPostId"
                              component="small"
                              style={{ color: "red" }}
                            ></ErrorMessage>
                          </div>
                        </div>
                      </div>
                      <div className="media-body" style={{ width: "100%" }}>
                        <div style={{ marginBottom: "30px" }}>
                          <Field name="content">
                            {({ field, form }) => (
                              <CKEditor
                                editor={ClassicEditor}
                                data={field.value}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  form.setFieldValue(field.name, data);
                                }}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="content"
                            component="small"
                            style={{ color: "red" }}
                          ></ErrorMessage>
                        </div>
                        <div className="row no-gutters mb-3">
                          <Field name="image">
                            {({ field, form }) => (
                              <div>
                                {field.value && (
                                  <div>
                                    <div className="image-container">
                                      <img
                                        src={field.value}
                                        className="img-fluid mb-2"
                                      />
                                    </div>
                                    <div className="button-container">
                                      <button
                                        className="delete-button"
                                        onClick={() =>
                                          form.setFieldValue(field.name, "")
                                        }
                                      >
                                        Xóa ảnh
                                      </button>
                                      <label
                                        htmlFor="image-upload"
                                        className="upload-button"
                                      >
                                        Thay đổi
                                        <input
                                          id="image-upload"
                                          className="hidden-input"
                                          type="file"
                                          accept="image/*"
                                          onChange={async (event) => {
                                            const file =
                                              event.currentTarget.files[0];
                                            const imageURL =
                                              await uploadImageToFirebase(file);
                                            form.setFieldValue(
                                              field.name,
                                              imageURL
                                            );
                                          }}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                )}
                                {!field.value && (
                                  <div style={{ textAlign: "center" }}>
                                    <label
                                      htmlFor="image-upload"
                                      className="upload-button"
                                    >
                                      Tải ảnh lên
                                      <input
                                        id="image-upload"
                                        className="hidden-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={async (event) => {
                                          const file =
                                            event.currentTarget.files[0];
                                          const imageURL =
                                            await uploadImageToFirebase(file);
                                          form.setFieldValue(
                                            field.name,
                                            imageURL
                                          );
                                        }}
                                      />
                                    </label>
                                  </div>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              <button
                style={{
                  width: "100%",
                  backgroundColor: "#a36acb",
                  color: "white",
                  marginBottom: "25px",
                }}
                type="submit"
                className="btn "
              >
                Lưu
              </button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
