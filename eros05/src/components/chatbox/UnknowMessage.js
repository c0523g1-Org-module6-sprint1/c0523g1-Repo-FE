import {IdByNow, sliceString} from "../../service/chatbox/util";
import {database, onValue, push, refText, set, update} from "../../service/chatbox/firebase";
import {useEffect, useState} from "react";
import {GetChatBoxApi} from "../../service/chatbox/apiConnection";

export default function UnknowMessage({profile, element, close}) {
    const [inputMess, setInputMess] = useState("");
    const [path, setPath] = useState();
    const pushFireBase = async (textData) => {
        if (textData != "") {
            let last = sliceString(textData, 15);
            let countUnseenElement;
            const idMessage = IdByNow();
            await push(refText(database, path), {
                id: idMessage,
                sender: profile.id,
                receive: element.id,
                context: textData,
                type: "text",
                release: new Date() + "",
                seen: false
            })
            await onValue(refText(database, `lastmess/${path}`), data => {
                let count = data.val()[element.id];
                if (count) {
                    countUnseenElement = count + 1;
                } else {
                    countUnseenElement = 1;
                }
            });
            await update(refText(database, `lastmess/${path}`), {
                mess: last,
                id: idMessage,
                [element.id]: countUnseenElement,
                [profile.id]: 0,
                release: new Date() + ""
            })
            close();
        }
    }
    const enterButton = (key) => {
        if (key == "Enter") {
            handleSendMessage();
        }
    }
    const getPath = async () => {
        const res = await GetChatBoxApi(element.id);
        if (res){
            await setPath(res.path);
            await set(refText(database, `lastmess/${res.path}/${profile.id}`), 0)
        }
    }
    useEffect(() => {
        getPath();
    },[]);
    const handleSendMessage = async () => {
        await pushFireBase(inputMess);
    }
    if (!profile || !element) return null;
    return (
        <div className="unknowMessageTable color3 borderRadius">
            <input className="unknowMessageTable-input borderRadius"
                   type="text"
                   placeholder="Gửi tin nhắn..."
                   onKeyDown={(e) => {enterButton(e.key)}}
                   onChange={(e) => {setInputMess(e.target.value)}}
            />
            <div className="unknowMessageTable-close borderRadius color0"
            onClick={close}
            />
            <div className="unknowMessageTable-send borderRadius color0"
                 onClick={handleSendMessage}
            />
            <span className="unknowMessageTable-note">
                --- Kết bạn với nhau để có thể nhắn tin được nhiều hơn ---
            </span>
        </div>
    )

}