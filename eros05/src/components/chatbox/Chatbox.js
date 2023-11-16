import "./chatbox.css"
import {useEffect, useState} from "react";
import {GetFriendsApi, GetProfileApi, GetUnknowApi, SetBusyApi} from "../../service/chatbox/apiConnection";
import {compareId, numberOfUnseenMess, sliceString} from "../../service/chatbox/util";
import ChatDetail from "./ChatDetail";
import {database, onValue, refText} from "../../service/chatbox/firebase";
import {useNavigate} from "react-router-dom";
export function Chatbox() {
    const [profile, setProfile] = useState();
    const [friendList, setFriendList] = useState([]);
    const [unknowList, setUnknowList] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [chatFriend, setChatFriend] = useState({});
    const [showChatBox, setShowChatBox] = useState(-1);
    const [hideList, setHideList] = useState(false);
    const [messageUnseen, setMessageUnseen] = useState(100);
    const [chatlistHeight, setChatlistHeight] = useState(0);
    const [unknowMess, setUnknowMess] = useState(false);
    const [busymode, setBusymode] = useState(true);
    const [lastMessage, setLastMessage] = useState();
    const navigate = useNavigate();

    const handleSelect = async (e) => {
        await setShowChatBox(-1);
        await setChatFriend(e);
        await setShowChatBox(e.id);
    }
    const getProfile = async () => {
        const data = await GetProfileApi();
        setProfile(data.data);
        setBusymode(data.data.messageStatus.name != "Busy");
    }
    const getFriendList = async () => {
        const data = await GetFriendsApi(searchName);
        setFriendList(data);
    }
    const getUnknowList = async () => {
        const data = await GetUnknowApi(searchName);
        setUnknowList(data);
    }
    const closeChatbox = () => {
        setShowChatBox(-1);
    }
    const handleResize = () => {
        setChatlistHeight(window.innerHeight - 75 - 100 - 70 - 20);
    }
    const changeUnknowMessage = () => {
        setUnknowMess(!unknowMess);
    }
    const getDatabase = () => {
        let finishpath = `lastmess`
        onValue(refText(database, finishpath), data => {
            setLastMessage(data.val());
        });
    }
    const setBusy = async () => {
        const res = await SetBusyApi(!busymode);
        setBusymode(!busymode);
        console.log(res);
    }
    useEffect(() => {
        getProfile();
        handleResize();
        getDatabase();
    }, [])
    useEffect(() => {
        getFriendList();
        getUnknowList();
    }, [searchName])
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    if (!profile || !lastMessage){
        return null;
    } else {
        return (<>
            {hideList ?
                <div onClick={() => setHideList(false)}
                            className="showListButton color5 borderRadius cursorPoint">
                    {messageUnseen != 0 && <span className="showListButton-numbermessage color0 borderRadius">
                        {numberOfUnseenMess(messageUnseen)}</span>}
                </div> :
                <div>
                    {showChatBox != -1 && <ChatDetail
                        element={chatFriend}
                        closeChatBox={closeChatbox}
                        own={profile}
                    />}
                    <div className="chatbox color4">
                        <div className="chatbox-feature cursorPoint"
                             onClick={() => {navigate(`/personal-page/${profile.id}`)}}>
                            <div className="chatbox-feature-avata"
                                 style={{backgroundImage: `url(${profile.avatar})`}}
                            />
                            <div/>
                            <div className="chatbox-feature-info">
                                <p className="border-text-white">{profile.name}</p>
                                <p>💵 {profile.money}</p>
                            </div>
                        </div>
                        <div className="chatbox-friendList color0 borderRadius" style={{height: chatlistHeight}}>
                            {unknowMess ?
                                <div className="chatbox-friendList-board">
                                    {unknowList.length == 0 ? <h3>Không có kết quả</h3> :
                                        unknowList.map((e) => {
                                            return (
                                                <div className={`chatbox-friendList-board-detail cursorPoint borderRadius
                                                ${e.senderAccount.id == showChatBox ? "chatSelected" : ""}`}
                                                     onClick={() => {handleSelect(e.senderAccount)}}>
                                                    <div className={`chatbox-friendList-board-detail-avata ${["online", "busy", "offline"][e.senderAccount.messageStatus.id - 1]}`}
                                                         style={{backgroundImage: `url(${e.senderAccount.avatar})`}}/>
                                                    <div>
                                                        <h4 className="chatbox-friendList-board-detail-name">
                                                            <small className="chatbox-friendList-board-detail-name-name border-text-black">{e.senderAccount.name}</small>
                                                            {/*{e.unseen != 0 && <small className="alertMess color5 borderRadius">{numberOfUnseenMess(e.unseen)}</small>}*/}
                                                        </h4>
                                                        <p className="chatbox-friendList-board-detail-mess">
                                                            {sliceString(lastMessage[`mess-${compareId(e.senderAccount.id, profile.id)}`])}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                : <div className="chatbox-friendList-board">
                                    {friendList.length == 0 ? <h3>Không có kết quả</h3> :
                                        friendList.map((e) => {
                                            return (
                                                <div className={`chatbox-friendList-board-detail cursorPoint borderRadius 
                                                ${e.id == showChatBox ? "chatSelected" : ""}`}
                                                     onClick={() => {handleSelect(e)}}>
                                                    <div className={`chatbox-friendList-board-detail-avata ${["online", "busy", "offline"][e.messageStatus.id - 1]}`}
                                                         style={{backgroundImage: `url(${e.avatar})`}}/>
                                                    <div>
                                                        <h4 className="chatbox-friendList-board-detail-name">
                                                            <small className="chatbox-friendList-board-detail-name-name border-text-black">{sliceString(e.name, 15)}</small>
                                                            {/*{e.unseen != 0 && <small className="alertMess color5 borderRadius">{numberOfUnseenMess(e.unseen)}</small>}*/}
                                                        </h4>
                                                        <p className="chatbox-friendList-board-detail-mess">
                                                            {sliceString(lastMessage[`mess-${compareId(e.id, profile.id)}`])}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            <input className="chatbox-friendList-search borderRadius" placeholder="Tìm kiếm"
                                   onChange={(e) => {setSearchName(e.target.value)}}/>
                        </div>
                        <div className="chatbox-button">
                            <label className="toggle-switch">
                                <input type="checkbox" checked={busymode}
                                       onClick={setBusy}/>
                                <div className="toggle-switch-background">
                                    <div className="toggle-switch-handle"/>
                                </div>
                            </label>
                            <div className="chatbox-button-mode border-text-white">{busymode ? "available" : "i'm busy"}</div>
                            <div className={`chatbox-button-key ${unknowMess ? "chatbox-button-knowmessage" : "chatbox-button-unknowmessage"}`}
                                 title={unknowMess ? "Open unknow message" : "Open friend message"}
                                 onClick={changeUnknowMessage}
                            />
                            <div></div>
                            <div className="chatbox-button-key chatbox-button-hidden" title="Hidden chatbox"
                                 onClick={() => {setHideList(true); setShowChatBox(-1)}}
                            />
                        </div>
                    </div>
                </div>
        }</>)
    }
}
