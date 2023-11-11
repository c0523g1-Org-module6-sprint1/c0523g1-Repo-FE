import {useEffect, useRef, useState} from "react";
import { database, refText, push, onValue, storage, refImage, uploadBytes, getDownloadURL } from "../../service/chatbox/firebase";
import ImageDetail from "./ImageDetail";
import {dateFormatSendMessage} from "../../service/chatbox/util";
import {useNavigate} from "react-router-dom";
import ChatEmoji from "./ChatEmoji";

export default function ChatDetail({element, closeChatBox, own}) {
    const [content, setContent] = useState();
    const [inputMess, setInputMess] = useState("");
    const [showImgArr, setShowImgArr] = useState(false);
    const [detailImg, setDetailImg] = useState("");
    const [showEmoji, setShowEmoji] = useState(true);
    const navigator = useNavigate();
    const chatBoxRef = useRef();
    const inputImgRef = useRef();
    const path = `mess-${+own.id > +element.id ? element.id + "-" + own.id : own.id + "-" + element.id}`;
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
            setInputMess("");
        }
    }

    const handleSendMessage = () => {
        pushFireBase(0, inputMess);
    }
    const scrollToBottom = () => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    };
    const getDatabase = () => {
        onValue(refText(database, path), data => {
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
                let storageRef = refImage(storage, `images/` + file.name);
                let snapshot = await uploadBytes(storageRef, file);
                let downloadURL = await getDownloadURL(snapshot.ref);
                await pushFireBase(1, downloadURL);
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
        getDatabase();
    },[]);
    useEffect(() => {
        scrollToBottom();
    }, [inputMess]);

    if (!path) return null;
    return (
        <>
        <div className="chatdetail color4">
            <div className="chatdetail-profile">
                <div className="chatdetail-profile-info color0 cursorPoint">
                    <div className="chatdetail-profile-info-avata"
                         style={{backgroundImage: `url(${element.img})`}}/>
                    <div className="chatdetail-profile-info-text">
                        <p className="border-text-black">{element.name}</p>
                        {[
                            <small className="text-online">-- online --</small>,
                            <small className="text-busy">-- busy --</small>,
                            <small className="text-offline">-- offline --</small>
                        ][element.status.id - 1]}
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
                                {e.type == "text" && <p className="color2 borderRadius"
                                                        title={dateFormatSendMessage(e.release)}>{e.context}</p>}
                                {e.type == "image" && <img className="image-content color2 borderRadius cursorPoint"
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
                     {gridTemplateColumns : `1fr 50px`}}>
                {inputMess == "" && <div className="chatdetail-feature-icon" title="Send Icon"/>}
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
            {showEmoji && <ChatEmoji/>}
        </>
    )
}