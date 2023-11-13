import "./chatbox.css"
import {useEffect, useState} from "react";
import {GetFriendsApi, GetProfileApi} from "../../service/chatbox/apiConnection";
import {numberOfUnseenMess, sliceString} from "../../service/chatbox/util";
import ChatDetail from "./ChatDetail";
export function Chatbox() {
    const [profile, setProfile] = useState();
    const [friendList, setFriendList] = useState();
    const [searchName, setSearchName] = useState("");
    const [chatFriend, setChatFriend] = useState({});
    const [showChatBox, setShowChatBox] = useState(-1);
    const [hideList, setHideList] = useState(false);
    const [messageUnseen, setMessageUnseen] = useState(100);
    const [chatlistHeight, setChatlistHeight] = useState(0);
    const [unknowList, setUnknowList] = useState(false);
    const [busymode, setBusymode] = useState(true);

    const handleSelect = async (e) => {
        await setShowChatBox(-1);
        await setChatFriend(e)
        await setShowChatBox(e.id);
    }
    const getProfile = async () => {
        const data = await GetProfileApi();
        setProfile(data.data);
    }
    const getFriendList = async () => {
        const data = await GetFriendsApi(searchName);
        setFriendList(data);
    }
    const closeChatbox = () => {
        setShowChatBox(-1);
    }
    const handleResize = () => {
        setChatlistHeight(window.innerHeight - 75 - 100 - 70 - 20);
    }

    useEffect(() => {
        getProfile();
        handleResize();
    }, [])
    useEffect(() => {
        getFriendList()
    }, [searchName])
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    if (!profile || !friendList){
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
                        <div className="chatbox-feature">
                            <div className="chatbox-feature-avata"
                                 style={{backgroundImage: `url(${profile.img})`}}
                            />
                            <div/>
                            <div className="chatbox-feature-info">
                                <h3 className="border-text-white">{profile.name}</h3>
                                <h4>💖 {profile.money}</h4>
                            </div>
                        </div>
                        <div className="chatbox-friendList color0 borderRadius" style={{height: chatlistHeight}}>
                            <div className="chatbox-friendList-board">
                                {friendList.length == 0 ? <h3>Không có kết quả</h3> :
                                    friendList.map((e) => {
                                        return (
                                            <div className={`chatbox-friendList-board-detail cursorPoint borderRadius 
                                            ${e.id == showChatBox ? "chatSelected" : ""}`}
                                                 onClick={() => {handleSelect(e)}}>
                                                <div className={`chatbox-friendList-board-detail-avata ${["online", "busy", "offline"][e.status.id - 1]}`}
                                                     style={{backgroundImage: `url(${e.img})`}}/>
                                                <div>
                                                    <h4 className="chatbox-friendList-board-detail-name">
                                                        <small className="chatbox-friendList-board-detail-name-name border-text-black">{e.name}</small>
                                                        {e.unseen != 0 && <small className="alertMess color5 borderRadius">{numberOfUnseenMess(e.unseen)}</small>}</h4>
                                                    <p className="chatbox-friendList-board-detail-mess">{sliceString(e.mess, 15)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <input className="chatbox-friendList-search borderRadius" placeholder="Tìm kiếm"
                                   onChange={(e) => {setSearchName(e.target.value)}}/>
                        </div>
                        <div className="chatbox-button">
                            <label className="toggle-switch">
                                <input type="checkbox" checked={busymode}
                                       onClick={() => {setBusymode(!busymode)}}/>
                                <div className="toggle-switch-background">
                                    <div className="toggle-switch-handle"/>
                                </div>
                            </label>
                            <div className="chatbox-button-mode border-text-white">{busymode ? "available" : "i'm busy"}</div>
                            <div className={`chatbox-button-key ${unknowList ? "chatbox-button-knowmessage" : "chatbox-button-unknowmessage"}`}
                                 title={unknowList ? "Open unknow message" : "Open friend message"}
                                 onClick={() => {setUnknowList(!unknowList)}}
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