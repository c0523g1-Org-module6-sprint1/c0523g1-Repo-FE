import "./chatbox.css"
import {useEffect, useState} from "react";
import {GetFriendsApi, GetProfileApi, GetUnknowApi, SetBusyApi} from "../../service/chatbox/apiConnection";
import {
    compareId,
    dateFormatChatbox,
    dateFormatSendMessage,
    numberOfUnseenMess,
    sliceString
} from "../../service/chatbox/util";
import ChatDetail from "./ChatDetail";
import {database, onValue, refText} from "../../service/chatbox/firebase";
import {useNavigate} from "react-router-dom";
import {getIdByJwt} from "../../service/login/securityService";
export function Chatbox() {
    const [profile, setProfile] = useState();
    const [friendList, setFriendList] = useState([]);
    const [unknowList, setUnknowList] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [chatFriend, setChatFriend] = useState({});
    const [showChatBox, setShowChatBox] = useState(-1);
    const [hideList, setHideList] = useState(true);
    const [messageUnseen, setMessageUnseen] = useState(0);
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
        const dataProfile = await GetProfileApi();
        setProfile(dataProfile.data);
        setBusymode(dataProfile.data.messageStatus.name != "Busy");

        await onValue(refText(database, `lastmess`), data => {
            let item = data.val();
            setLastMessage(item);
            let count = 0;
            for (let key in item) {
                let recordMess = item[key];
                    if (recordMess.hasOwnProperty(dataProfile.data.id)){
                        if (recordMess[dataProfile.data.id]) {
                            count++;
                        }
                    }
            }
            setMessageUnseen(count);
        });
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
    const setBusy = async () => {
        const res = await SetBusyApi(!busymode);
        setBusymode(!busymode);
    }
    const getLastMess = (e) => {
        let item = lastMessage[`mess-${compareId(e.id, profile.id)}`];
        if (item) {
            return {
                mess: item.mess,
                time: dateFormatChatbox(item)
            };
        } else {
            return {
                mess: "",
                time: ""
            };
        }
    }
    const getUnseen = (e) => {
        let item = lastMessage[`mess-${compareId(e.id, profile.id)}`];
        if (item) {
            let count = item[profile.id];
            if (count != 0){
                return numberOfUnseenMess(count);
            } else {
                return ;
            }
        } else {
            return ;
        }
    }
    useEffect(() => {
        if (getIdByJwt()){
            getProfile();
            getFriendList();
            getUnknowList();
        } else {
            setProfile(null);
        }
        handleResize();
    }, [getIdByJwt()])
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
                    {!busymode ?
                        <span className="showListButton-numbermessage color0 borderRadius">
                        🔇</span>
                        :
                        <>{messageUnseen != 0 && <span className="showListButton-numbermessage color5 borderRadius">
                        {numberOfUnseenMess(messageUnseen)}</span>}</>}
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
                            <div className={`chatbox-feature-avata ${busymode ? "online" : "busy"}`}
                                 style={{backgroundImage: `url(${profile.avatar})`}}
                            />
                            <div/>
                            <div className="chatbox-feature-info">
                                <p className="border-text-white">{profile.name}</p>
                                <p>💎 {profile.money}</p>
                            </div>
                        </div>
                        <div className="chatbox-friendList color0 borderRadius" style={{height: chatlistHeight}}>
                            {unknowMess ?
                                <div className="chatbox-friendList-board">
                                    {(unknowList.length == 0) ? <h3>Không có kết quả</h3> :
                                        unknowList.map((e) => {
                                            return (
                                                <div className={`chatbox-friendList-board-detail cursorPoint borderRadius
                                                ${e.id == showChatBox ? "chatSelected" : ""}`}
                                                     onClick={() => {handleSelect(e)}}>
                                                    <div className={`chatbox-friendList-board-detail-avata ${["online", "busy", "offline"][e.messageStatus.id - 1]}`}
                                                         style={{backgroundImage: `url(${e.avatar})`}}/>
                                                    <div>
                                                        <h4 className="chatbox-friendList-board-detail-name">
                                                            <small className="chatbox-friendList-board-detail-name-name border-text-black">{sliceString(e.name, 15)}</small>
                                                            {getUnseen(e) && <small className="alertMess color5 borderRadius">{getUnseen(e)}</small>}
                                                        </h4>
                                                        <p className="chatbox-friendList-board-detail-mess text-smoke">{getLastMess(e).mess}</p>
                                                        <p className="chatbox-friendList-board-detail-time text-smoke">{getLastMess(e).time}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                : <div className="chatbox-friendList-board">
                                    {(friendList.length == 0) ? <h3>Không có kết quả</h3> :
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
                                                            {getUnseen(e) && <small className="alertMess color5 borderRadius">{getUnseen(e)}</small>}
                                                        </h4>
                                                        <p className="chatbox-friendList-board-detail-mess text-smoke">{getLastMess(e).mess}</p>
                                                        <p className="chatbox-friendList-board-detail-time text-smoke">{getLastMess(e).time}</p>
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
                            <div className="chatbox-button-mode border-text-white">{busymode ? "Trực tuyến" : "Đang bận"}</div>
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
