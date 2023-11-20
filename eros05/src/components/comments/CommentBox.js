import React, {useEffect, useState} from 'react';
import Picker from "@emoji-mart/react";
import * as commentsService from '../../service/comment/commentService';
import CommentContent from "./CommentContent";
import * as securityService from '../../service/login/securityService'

function CommentBox(props) {
    const {postId} = props;
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [showChat, setShowChat] = useState(false)
    const [commentList, setCommentList] = useState([])
    const accountId = securityService.getIdByJwt()

    // show comment list
    const getCommentsList = async () => {
        try {
            const result = await commentsService.getAllCommentsService();
            setCommentList(result);
        } catch (e) {
            alert("Error")
        }
    }

    useEffect(() => {
        getCommentsList()
    }, []);

    const onEmojiClick = (event) => {
        setInputStr(prevInput => prevInput + event.native);
    };

    const onCommentClick = () => {
        setShowChat(true)
    }

    return (
        <>
            {commentList.map((list, index) => {
                    if (list.post.id === postId) {
                        return (
                            <div className="" style={{marginTop: 10, display: "flex", width: "100%"}}>
                                <div className="" style={{marginRight: 20}}>
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
                                    <CommentContent props={list.id}/>
                                }
                            </div>
                        );
                    } else return null;
                }
            )}
            <div className="" style={{marginTop: 10, display: "flex", width: "100%"}}>
                <div className="" style={{marginRight: 20}}>
                    <img
                        src="https://tse3.mm.bing.net/th?id=OIP.GtqfauNI1Nd7Hwg74Wjw7wHaHa&pid=Api&P=0&h=180"
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
                    <input
                        style={{width: "90%", boxSizing: "border-box", left: 5}}
                        type="text"
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
                    <a href=""
                       style={{
                           textDecoration: "none",
                           color: "#000",
                           fontSize: "130%",
                           position: "relative",
                           left: 15,
                           top: 4
                       }}>
                        <i className="fa-regular fa-paper-plane"/>
                    </a>
                    {showPicker && <Picker
                        pickerStyle={{width: '100%'}}
                        onEmojiSelect={(e) => {
                            onEmojiClick(e)
                            setShowPicker(!showPicker);
                        }}/>}
                </div>
            </div>
        </>
    );
}

export default CommentBox;