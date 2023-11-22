import React, {useEffect, useRef, useState} from 'react';
import Picker from "@emoji-mart/react";
import * as commentsService from '../../service/comment/commentService';
import CommentContent from "./CommentContent";
import * as securityService from '../../service/login/securityService'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {now} from "moment";
import {Field, Form, Formik} from "formik";
import {getInfoPersonal} from "../../service/personalPage/PersonalpageService";
import * as packageTypesService from "../../service/update_account/packageTypesService";
import button from "bootstrap/js/src/button";

function CommentBox(props) {
    const {postId} = props;
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isRender, setIsRender] = useState(false);
    const accountId = securityService.getIdByJwt();
    const navigate = useNavigate();
    const inputFocus = useRef(null);
    const [account, setAccount] = useState({});
    const [isExpand, setIsExpand] = useState(false);
    const [visibleComment, setVisibleComment] = useState(3);


    const [accountType, setAccountType] = useState()
    //xem thêm comment

    const toggleExpansion = () => {
        setIsExpand(true);
        setVisibleComment(commentList.length);
    }

    const filteredComments = commentList.filter((item) => item.post.id === postId);
    const displayedComments = filteredComments.slice(0, visibleComment);

    const renderedComments = displayedComments.map((list, index) => (
        <div className="" style={{marginTop: 10, display: "flex", width: "100%"}}>
            <div className="" style={{marginRight: 20}} key={index}>
                <img src={list.account.avatar}
                     alt="Avatar"
                     style={{
                         width: 50,
                         height: 50,
                         borderRadius: "50%",
                         position: "relative",
                         left: 12
                     }}>
                </img>
            </div>
            <div className=" w-auto"
                 style={{
                     border: "1px solid #ccc",
                     padding: 5,
                     position: "relative",
                     borderRadius: 20
                 }}>
                <div>
                    <b style={{color: "black"}}>
                        {list.account.name}
                    </b>
                </div>
                <p>
                    {list.content}
                </p>
            </div>
            {accountId === list.account.id &&
                <CommentContent props={list.id} props2={list}/>
            }
        </div>
    ))
    const getAccount = async (accountId) => {
        try {
            const res = await getInfoPersonal(accountId);
            setAccount(res.data);
        } catch (e) {
            alert("Error")
        }
    }

    // show comment list
    const getCommentsList = async () => {
        try {
            const result = await commentsService.getAllCommentsService();
            setCommentList(result);
        } catch (e) {
            alert("Error")
        }
    }

    const createComment = async (data) => {
        const newInput = {...data, content: inputStr}
        try {
            if (inputStr === "" || inputStr.trim() === "") {
                toast("Hãy nhập nội dung tin nhắn")
            } else {
                const res = await commentsService.createCommentService(newInput);
                console.log(res.data)
                if (res.status === 200) {
                    setIsRender(!isRender)
                    setInputStr("")
                    inputFocus.current.focus();
                } else toast(res.data)
            }
        } catch (e) {
            toast(e)
        }
    }
    const initialValue = {
        "content": "",
        "idDeleted": 0,
        "accountId": accountId,
        "postId": postId
    }

    useEffect(() => {
        getCommentsList()
        getAccount(accountId);
    }, [isRender]);

    const onEmojiClick = (event) => {
        setInputStr(prevInput => prevInput + event.native);
    };

    const onCommentClick = () => {
        setShowChat(true)
    }

    const updateOnclick = () => {
        toast.warning("Bạn cần nâng cấp lên Eros Gold để sử dụng dịch vụ này")
    }

    return (
        <>
            {renderedComments}
            <div className="" style={{marginTop: 10, display: "flex", width: "100%"}}>
                <div className="" style={{marginRight: 20}}>
                    <img
                        src={account.avatar}
                        alt="Avatar"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            position: "relative",
                            left: 12
                        }}/>
                </div>

                <div
                    style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        padding: 5,
                        position: "relative",
                        borderRadius: 20
                    }}>

                    <Formik initialValues={initialValue} onSubmit={values => createComment(values)}>
                        <Form>
                            <Field
                                ref={inputFocus}
                                style={{width: "85%", boxSizing: "border-box", left: 5, borderRadius: 20, height: 35}}
                                type="text"
                                name="content"
                                value={inputStr}
                                id="new-input"
                                className="input-style"
                                onChange={e => setInputStr(e.target.value)}
                            />
                            <a
                                style={{
                                    textDecoration: "none",
                                    color: "#000",
                                    fontSize: "130%",
                                    position: "relative",
                                    left: 6,
                                    top: 4
                                }}
                                onClick={() => setShowPicker(val => !val)}>
                                <i className="fa-regular fa-face-smile mb-3"/>
                            </a>
                            <button type="submit"
                                    style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        color: "#000",
                                        fontSize: "130%",
                                        position: "relative",
                                        left: 15,
                                        top: 4
                                    }}>
                                <i className="fa-regular fa-paper-plane"/>
                            </button>
                        </Form>
                    </Formik>

                </div>

                {showPicker && <Picker
                    pickerStyle={{width: '100%'}}
                    onEmojiSelect={(e) => {
                        onEmojiClick(e)
                        setShowPicker(!showPicker);
                    }}/>}
            </div>
            {!isExpand && filteredComments.length > visibleComment && (<div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",

                        color: "purple",
                        fontSize: "100%",
                    }}
                    onClick={toggleExpansion}>Xem Thêm
                </button>
            </div>)}
        </>
    );
}

export default CommentBox;