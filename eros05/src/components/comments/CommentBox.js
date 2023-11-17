import React, {useEffect, useState} from 'react';

function CommentBox() {


    return (
        <>
            <div className="" style={{ marginTop: 10, display: "flex", width: "100%" }}>
                <div className="" style={{ marginRight: 20 }}>
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
                    className="d-flex"
                    style={{
                        border: "1px solid #ccc",
                        padding: 5,
                        position: "relative",
                        borderRadius: 20,
                        width: "100%"}}>
                    <input
                        style={{
                            width: "93%",
                            boxSizing: "border-box",
                            left: 5,
                            borderRadius: 20}}
                        type="text"
                        id="new-input"
                        className="form-control"
                        placeholder="type here"/>
                    <a href=""
                        style={{
                            textDecoration: "none",
                            color: "#000",
                            fontSize: "130%",
                            position: "relative",
                            left: 6,
                            top: 4 }}>
                        <i className="fa-regular fa-face-smile mb-3" />
                    </a>
                    <a href=""
                        style={{
                            textDecoration: "none",
                            color: "#000",
                            fontSize: "130%",
                            position: "relative",
                            left: 15,
                            top: 4 }}>
                        <i className="fa-regular fa-paper-plane" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default CommentBox;