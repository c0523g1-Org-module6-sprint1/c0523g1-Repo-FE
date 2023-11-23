import React, {useEffect, useState} from 'react';
import {database, push, ref, onValue} from "./config"

function Comment({name}) {
    const [message, setMessage] = useState("")
    const [InpMessage, setInpMessage] = useState([])
    useEffect(() => {
        onValue(ref(database, "message"), data => {
            let getMsg = [];
            data.forEach(d => {
                getMsg.push(d.val())
            })
            setMessage(getMsg);
        })
    }, []);

    return (
        <></>
    );
}

export default Comment;