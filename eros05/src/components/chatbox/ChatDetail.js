import {useEffect, useRef, useState} from "react";
import {
    database,
    refText,
    push,
    onValue,
    storage,
    refImage,
    uploadBytes,
    getDownloadURL,
    set
} from "../../service/chatbox/firebase";
import ImageDetail from "./ImageDetail";
import {compareId, dateFormatSendMessage, sliceString} from "../../service/chatbox/util";
import {useNavigate} from "react-router-dom";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {GetChatBoxApi} from "../../service/chatbox/apiConnection";
import {toast} from "react-toastify";

export default function ChatDetail({element, closeChatBox, own}) {
    const [content, setContent] = useState();
    const [inputMess, setInputMess] = useState("");
    const [showImgArr, setShowImgArr] = useState(false);
    const [detailImg, setDetailImg] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [path, setPath] = useState();
    const navigator = useNavigate();
    const chatBoxRef = useRef();
    const inputImgRef = useRef();

    const typeArray = ["text", "image", "video", "voice"];
    const pushFireBase = (type, textData) => {
        if (textData != "") {
            push(refText(database, path), {
                sender: own.id,
                receive: element.id,
                // receive: own.id,
                // sender: element.id,
                context: textData,
                type: typeArray[type],
                release: new Date() + "",
                seen: false
            })
            set(refText(database, path + "/last"), {
                context: textData,
                type: typeArray[type],
            })
            setInputMess("");
            setShowEmoji(false);
        }
    }
    const handlePickEmoji = (emoji) => {
        setInputMess(inputMess + emoji.native);
        toast.success("alo alo")
    }
    const handleSendMessage = async () => {
        await pushFireBase(0, inputMess);
        scrollToBottom();
    }
    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };
    const getPath = async () => {
        const res = await GetChatBoxApi(element.id);
        await setPath(res.path);
    }
    const getDatabase = () => {
        let finishpath = `mess-${compareId(element.id, own.id)}`
        onValue(refText(database, finishpath), data => {
            let getMessage = [];
            data.forEach((mess) => {
                getMessage.push(mess.val());
            });
            setContent(getMessage);
        });
    }
    const enterButton = (key) => {
        if (key == "Enter") {
            handleSendMessage();
        }
    }
    const handleImageUpload = async (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            try {
                let file = files[i];
                let storageRef = refImage(storage, `images-eros05/` + file.name);
                let snapshot = await uploadBytes(storageRef, file);
                let downloadURL = await getDownloadURL(snapshot.ref);
                pushFireBase(1, downloadURL);
            } catch (e) {
                console.log(e);
            }
        }
    };
    const detailImage = async (e) => {
        await setDetailImg(e);
        setShowImgArr(true);
    };
    const closeDetailImage = () => {
        setShowImgArr(false);
    }

    useEffect(() => {
        getPath();
        getDatabase();
    },[]);
    useEffect(() => {
        scrollToBottom();
    }, [content]);

    if (!path) {
        return null;
    }
    return (
        <>
        <div className="chatdetail color4">
            <div className="chatdetail-profile">
                <div className="chatdetail-profile-info color0 cursorPoint"
                     onClick={() => {navigator(`personal-page/${element.id}`)}}>
                    <div className="chatdetail-profile-info-avata"
                         style={{backgroundImage: `url(${element.avatar})`}}/>
                    <div className="chatdetail-profile-info-text">
                        <p className="border-text-black">{sliceString(element.name, 15)}</p>
                        {[
                            <small className="text-online">-- online --</small>,
                            <small className="text-busy">-- busy --</small>,
                            <small className="text-offline">-- offline --</small>
                        ][element.messageStatus.id - 1]}
                    </div>
                </div>
                <div onClick={closeChatBox} title="Close this chatbox"
                     className="chatdetail-profile-button cursorPoint"/>
            </div>
            <div className="chatdetail-box color0 borderRadius" ref={chatBoxRef}>
                {
                    content && content.map((e, index) => {
                        return (
                            <div key={index}
                               className={`mess ${e.sender == own.id ? "ownMess" : "friendsMess"}`}>
                                {/*{e.type != "delete" && <div className="option"/>}*/}
                                {(e.type == "text" && e.release) &&
                                    <p className="color2 borderRadius"
                                                        title={dateFormatSendMessage(e.release)}>{e.context}</p>}
                                {(e.type == "image" && e.release) &&
                                    <img className="image-content color2 borderRadius cursorPoint"
                                                           src={e.context}
                                                           onClick={() => {detailImage(e.context)}}
                                                           title={dateFormatSendMessage(e.release)}
                                />}
                            </div>
                        )
                    })
                }
            </div>
            <div className="chatdetail-feature"
                 style={inputMess == "" ?
                     {gridTemplateColumns : `repeat(2, 50px) 1fr 50px`} :
                     {gridTemplateColumns : `50px 1fr 50px`}}>
                <div className="chatdetail-feature-icon" title="Send Emoji"
                                         onClick={() => {setShowEmoji(!showEmoji)}}/>
                {inputMess == "" && <div className="chatdetail-feature-img" title="Send your image"
                                         onClick={() => {inputImgRef.current.click()}}/>}
                <input className="chatdetail-feature-inputText color0 borderRadius"
                        placeholder="Aa" value={inputMess}
                       onKeyDown={(e) => {enterButton(e.key)}}
                       onChange={(e) => {setInputMess(e.target.value)}}/>
                <div className="chatdetail-feature-send" title="Send the Message"
                     onClick={handleSendMessage}/>
            </div>
        </div>
            <input onChange={handleImageUpload} ref={inputImgRef} type="file" multiple={true} hidden={true}/>
            {showImgArr && <ImageDetail path={path} linkImg={detailImg} close={closeDetailImage}/>}
            {showEmoji &&
                <div className="emoji-table">
                <Picker
                    data={data}
                    previewPosition="none"
                    theme="light"
                    onEmojiSelect={(e) => handlePickEmoji(e)}
                />
            </div>}
        </>
    )
}