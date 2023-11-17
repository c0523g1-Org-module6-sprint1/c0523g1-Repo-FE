import React, {useState} from "react";
import {Form, Formik} from "formik";
import ReactQuill from "react-quill";
import {Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import * as accountTypesService from "../../service/update_account/accountTypeService";

export function ModalUpPost({showModalUpPost, handleHideModalUpPost, postUpdate}){
    const [formData, setFormData] = useState("");
    const [contents, setContents] = useState("");
    const [image, setImage] = useState("");
    const [img, setImg] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imagePath = URL.createObjectURL(file);
        setImage(imagePath);
        console.log(image)
        const upload = document.getElementById('upload');
        const preview = document.getElementById('preview');
        upload.addEventListener('mouseout', function() {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = function(e) { preview.src = e.target.result; };
            reader.readAsDataURL(file);
        });
    }

    const clickHandle = () => {
        let data = formData;
        setContents(data);
        setImg(image)
    }
    function upPostSucces() {
        setImage(resetSuccess);
        setFormData(resetSuccess);
        console.log(image)
        console.log(formData)
    }


    const innitValue = {
        content: "",
        date: "",
        image: "",
        account: JSON.stringify({
            id: 1,
            name: "Nguyễn Văn A",
        }),
        privacyPost: JSON.stringify({
            id: 1,
            name: "Công khai",
        })
    }

    const upPost = async (values) => {
        values.account = JSON.parse(values.account);
        values.privacyPost = JSON.parse(values.privacyPost);
        values.content = contents;
        values.date = new Date();
        values.image = img;
        console.log(values);
        let status = await accountTypesService.upPost(values);
        console.log(status)
        if (status === 201) {
            toast.success("Thêm mới thành công");
            upPostSucces();
        } else {
            toast.error("Thêm mới thất bại");
        }
    }


    return(
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <Modal show={showModalUpPost}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Tạo bài viết
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row" style={{ display: "flex" }}>
                                <div
                                    style={{
                                        backgroundImage: 'url("/DatNC/img/img21.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        aspectRatio: "1/1",
                                        width: "14%",
                                        borderRadius: "100%",
                                        marginLeft: "2%"
                                    }}
                                />
                                <div className="col-10">
                                    <h4>Lisa</h4>
                                    <select
                                        className="form-select custom-select"
                                        aria-label="Default select example"
                                    >
                                        <option value={1} selected="" className="form-select">
                                            Công khai
                                        </option>
                                        <option value={2}>Bạn bè</option>
                                    </select>
                                </div>
                            </div>
                            <Formik
                                initialValues={innitValue}
                                onSubmit={(value) => upPost(value)}>
                                <Form>
                                    <ReactQuill
                                        style={{margin: "13% 0"}}
                                        theme="snow" value={formData}
                                        onChange={setFormData}/>
                                    <input type="file" onChange={handleImageChange} id="upload" accept="image/*"/>
                                    <img style={{width: "300px"}} id="preview" src={image}/>
                                    <br/>
                                    {formData !== "" || image !== ""?(
                                        <button type="submit" className="btn btn-dark" onClick={clickHandle}>Đăng</button>

                                    ):(
                                        <button style={{cursor: "no-drop", outline:"none"}} disabled type="submit" className="btn btn-dark">Đăng</button>

                                    )}
                                </Form>
                            </Formik>
                            <button className="pushable">
                                <span className="shadow" />
                                <span className="edge" />
                                <span className="front">Đăng</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}