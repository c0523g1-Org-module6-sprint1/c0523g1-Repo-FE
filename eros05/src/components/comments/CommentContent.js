import React, {useEffect, useState} from 'react';
import {deleteCommentService} from "../../service/comment/commentService";
import {toast} from "react-toastify";
import {Button, Modal} from "react-bootstrap";

function CommentContent(props) {
    const {commentId, comment} = props;
    console.log(commentId)
    console.log(comment)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [myModal, setMyModal] = useState({})
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false);
        setMyModal({})
    }
    const handleShow = (data) => {
        setShow(true);
        setMyModal(data)
    }

    const deleteComment = async (data) => {
        try {
            const res = await deleteCommentService(data.id);
            if (res.status === 200) {
                toast("Delete Successfully")
                handleClose();
            }
        }catch (e) {
            alert("Error")
        }
    }

    // chỉnh sủa và xoá
    const handleDropDown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    useEffect(() => {

    }, [commentId]);

    return (
        <>
            <div>
                <button
                    style={{
                        background: "none", border: "none", padding: 0,
                        position: "relative", left: 5, top: 20
                    }}
                    onClick={() => handleDropDown()}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
                {dropdownOpen && (
                    <ul style={{
                        listStyleType: "none",
                        position: "relative",
                        right: 25,
                        bottom: 20
                    }}>
                        <li>
                            <button type="submit"
                                    style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        color: "#000",
                                        fontSize: "100%",
                                        position: "relative",
                                        left: 15,
                                        top: 4
                                    }}>
                                Chỉnh sửa
                            </button>
                        </li>
                        <li>
                            <button type="submit"
                                    onClick={()=>handleShow(comment)}
                                    style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        color: "#000",
                                        fontSize: "100%",
                                        position: "relative",
                                        left: 15,
                                        top: 4
                                    }}>
                                Xoá
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
    function MyModal({data, action}) {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>{data.content}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this comment!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={action}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteComment(data)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </>
        )
    }
}

export default CommentContent;