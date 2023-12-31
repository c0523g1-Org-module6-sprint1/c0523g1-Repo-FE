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
    update, set,
} from "../../service/chatbox/firebase";
import ImageDetail from "./ImageDetail";
import {compareId, dateFormatSendMessage, IdByNow, sliceString} from "../../service/chatbox/util";
import {useNavigate} from "react-router-dom";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {GetChatBoxApi} from "../../service/chatbox/apiConnection";

export default function ChatDetail({element, closeChatBox, own}) {
    const [content, setContent] = useState();
    const [inputMess, setInputMess] = useState("");
    const [showImgArr, setShowImgArr] = useState(false);
    const [detailImg, setDetailImg] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [path, setPath] = useState();
    const [idDelete, setIdDelete] = useState("");
    const navigator = useNavigate();
    const chatBoxRef = useRef();
    const inputImgRef = useRef();
    const typeArray = ["text", "image", "revoke"];
    const pushFireBase = async (type, textData) => {
        if (textData != "") {
            let last = sliceString(textData, 15);
            let countUnseenElement;
            if (type == 1) {
                last = "[hình ảnh]"
            }

            const idMessage = IdByNow();
            await push(refText(database, path), {
                id: idMessage,
                sender: own.id,
                receive: element.id,
                context: textData,
                type: typeArray[type],
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
                [own.id]: 0,
                release: new Date() + ""

            })
            setInputMess("");
            setShowEmoji(false);
        }
    }
    const handlePickEmoji = (emoji) => {
        setInputMess(inputMess + emoji.native);
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
        if (res){
            await setPath(res.path);
            await update(refText(database, `lastmess/${res.path}`), {
                [own.id]: 0
            })
        }
    }
    const getDatabase = () => {
        let finishpath = `mess-${compareId(element.id, own.id)}`
        onValue(refText(database, finishpath), data => {
            let getMessage = [];
            data.forEach((mess) => {
                let item = {...mess.val(), pathId: mess.key};
                getMessage.unshift(item);
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
    };
    const handleDeleteMessage = async (e) => {
        let pathDelete = path + "/" + e.pathId;
        await update(refText(database, pathDelete), {
            type: typeArray[2]
        })
        setIdDelete("");
        let check = await getLastMess();
        if (check){
            if (check.id == e.id){
                update(refText(database, `lastmess/${path}`), {
                    mess: "[Tin nhắn thu hồi]"
                })
            }
        }
    }
    const getLastMess = async () => {
        let finishpath = `lastmess/${path}`;
        let dataId;
        await onValue(refText(database, finishpath), data => {
            dataId = data.val();
        });
        return dataId;
    }

    useEffect(() => {
        getPath();
        getDatabase();
    },[]);
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
                            idDelete != e.pathId ?
                                <div
                                   className={`mess ${e.sender == own.id ? "ownMess" : "friendsMess"}`}>
                                    {(e.sender == own.id && e.type != "revoke") && <div className="option cursorPoint"
                                         onClick={() => setIdDelete(e.pathId)}/>}
                                    {e.type == "text" &&
                                        <p className={`${e.sender == own.id ? 'color5' : 'color2'} borderRadius`}
                                                            title={dateFormatSendMessage(e.release)}>{e.context}</p>}
                                    {e.type == "image" &&
                                        <img className="image-content color2 borderRadius cursorPoint"
                                                               src={e.context}
                                                               onClick={() => {detailImage(e.context)}}
                                                               title={dateFormatSendMessage(e.release)}
                                    />}
                                    {e.type == "revoke" &&
                                        <p className="color2 borderRadius mess-revoke"
                                           title={dateFormatSendMessage(e.release)}>-- tin nhắn đã thu hồi --</p>}
                                </div>
                                : <div key={index} className='mess-modal'>
                                    <div/>
                                <div className='cursorPoint color2'
                                     onClick={() => {setIdDelete("")}}>Hủy</div>
                                <div className='cursorPoint color5'
                                     onClick={() => {handleDeleteMessage(e)}}>Thu hồi</div>
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
                    maxFrequentRows="2"
                    navPosition="bottom"
                    perLine="8"
                    searchPosition="static"
                />
            </div>}
        </>
    )
}