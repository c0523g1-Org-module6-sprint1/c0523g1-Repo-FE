import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useEffect, useState} from "react";
import * as accountTypesService from "../../service/update_account/accountTypeService"
import {toast} from "react-toastify";
import {Form, Formik} from "formik";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {load} from "./LoadPay";

export function Test() {
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




    return (
        <div>
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
                    {formData !== "" ?(
                        <button disabled type="submit" className="btn btn-dark">Đăng</button>
                    ):(
                        <button style={{cursor: "no-drop", outline:"none"}} type="submit" className="btn btn-dark" onClick={clickHandle}>Đăng</button>
                    )}
                </Form>
            </Formik>

            <br/><h1>Đây là nội dung</h1>
                    <div className="preview"
                        dangerouslySetInnerHTML={{__html: contents}}
                    />
            <img style={{width: "300px"}} src={img}/>
        </div>
    );
    // return (
    //     <div style={{margin: "6% 0"}}>
    //         <h2>Using CKEditor&nbsp;5 build in React</h2>
    //         <Formik
    //             initialValues={innitValue}
    //             onSubmit={(values) => upPost(values)}>
    //             <Form>
    //                 <CKEditor
    //                     editor={ClassicEditor}
    //                     data
    //                     onReady={editor => {
    //                         // You can store the "editor" and use when it is needed.
    //                         // console.log( 'Editor is ready to use!', editor );
    //                     }}
    //                     onChange={(event, editor) => {
    //                         const data = editor.getData();
    //                         // console.log( { event, editor, data } );
    //                         setFormData({...data, contents: data})
    //                     }}
    //                     onBlur={(event, editor) => {
    //                         // console.log( 'Blur.', editor );
    //                     }}
    //                     onFocus={(event, editor) => {
    //                         // console.log( 'Focus.', editor );
    //                     }}
    //                 />
    //                 <button type="submit" className="btn btn-dark" onClick={clickHandle}>Dark</button>
    //             </Form>
    //         </Formik>
    //
    //         <br/><h1>Đây là nội dung</h1>
    //         <div className="preview"
    //             dangerouslySetInnerHTML={{__html: contents}}
    //         />
    //     </div>
    // )
}