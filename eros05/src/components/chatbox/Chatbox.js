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
    useEffect(() => {
        getProfile();
    }, [])
    useEffect(() => {
        getFriendList()
    }, [searchName])

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
                                <h3 className="title-text">{profile.name}</h3>
                                <h4>&#10084; {profile.money}</h4>
                            </div>

                        </div>
                        <div className="chatbox-friendList color0 borderRadius"
                             style={{height: `${window.innerHeight - 200 - 75}px`}}>
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
                                                    <h4 className="chatbox-friendList-board-detail-name title-text">{e.name}
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
                                <input type="checkbox"/>
                                <div className="toggle-switch-background">
                                    <div className="toggle-switch-handle"/>
                                </div>
                            </label>
                            <p className="chatbox-button-mode">Busy Mode</p>
                            <div className="chatbox-button-hidden" title="Hidden chatbox"
                                 onClick={() => {setHideList(true); setShowChatBox(-1)}}
                            />
                        </div>
                    </div>
                </div>
        }</>)
    }

}