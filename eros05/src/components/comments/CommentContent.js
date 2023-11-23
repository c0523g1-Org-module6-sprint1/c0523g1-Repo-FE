import React, {useEffect, useState} from 'react';
import {deleteCommentService} from "../../service/comment/commentService";
import {toast} from "react-toastify";
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function CommentContent({props, props2}) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [myModal, setMyModal] = useState({})
    const [show, setShow] = useState(false)
    const navigate = useNavigate();

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
                navigate("/newsfeed")
                toast("Delete Successfully")
                handleClose();

            }
        } catch (e) {
            alert("Error")
        }
    }
    // chỉnh sủa và xoá
    const handleDropDown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    useEffect(() => {
    }, []);

    return (
        <>
            <div>
                <button
                    style={{
                        background: "none", border: "none", padding: 0,
                        position: "relative", left: 5, top: 20
                    }}
                    onClick={handleDropDown}>
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
                                    onClick={() => handleShow(props2)}
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
                            <Modal show={show} onHide={handleClose}>
                                <MyModal action={handleClose} data={myModal}></MyModal>
                            </Modal>
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
                    <Modal.Title>Xoá Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xoá comment này không ?</Modal.Body>
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