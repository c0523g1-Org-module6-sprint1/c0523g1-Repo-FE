import {useEffect, useState} from "react";
import * as service from "../../service/invited_recommend_friend/InvitedService"
import "./content.css"
import {acceptFriends, deleteInviteds} from "../../service/invited_recommend_friend/InvitedService";
import {toast} from "react-toastify";
import {FormartDateRequest} from "./FormartDateRequest";
import {useNavigate} from "react-router-dom";

export default function InvitedList() {

    const [invited, setInvited] = useState(null)
    const [sort, setSort] = useState(true)
    const navigate = useNavigate();

    const findAll = async (accountID) => {
        let data = await service.findAll(accountID, sort)
        await setInvited(data)
        console.log(data)
    }


    const acceptFriend = async (invitedID) => {
        console.log(invitedID)
        const res = await acceptFriends(invitedID)
        console.log(res.status)
        if (res.status === 200) {
            toast.success("Đã chấp nhận lời mời kết bạn")
            findAll(1)

        }
    }
    const deleteInvited = async (invitedID) => {
        console.log(invitedID)
        const res = await deleteInviteds(invitedID)
        console.log(res.status)
        if (res.status === 200) {
            toast.success("Đã xóa lời mời kết bạn")
            findAll(1)
        }
    }

    useEffect(() => {
        findAll(1);
    }, [sort])

    if (!invited) return null;
    return (
        <div style={{backgroundColor:"white"}}>
            <div>
                <div style={{marginTop: "75px"}}>
                    <div>
                        <p className="hat1">Lời mời kết bạn</p>
                        <div className="dropdown">
                            <button className="btn btn-dark " type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        cursor: "pointer", border: "none", background: "#a36acb"
                                    }}>
                                Sắp xếp <i className="fa fa-sliders text-light"/>
                            </button>
                            <ul className="dropdown-menu"
                                style={{backgroundColor: "#d0a8de", cursor: "pointer"}}>
                                <li className="dropdown-item " onClick={(values) => setSort(true)}>
                                    <i className="fa fa-sort-amount-desc"/>Theo lời mời mới nhất
                                </li>
                                <li className="dropdown-item " onClick={(values) => setSort(false)}>
                                    <i className="fa fa-sort-amount-asc"/>Theo lời mời cũ nhất
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        {invited.map((invited) =>
                            <div className="d-flex" style={{float: "left"}}>
                                <div className="hlpcards">
                                    <div className="hlpicon">
                                        <img className="hlpcus-avatar"
                                             src={invited.avatarAccount}
                                             alt=""/>
                                    </div>
                                    <p className="hlptitle mb-4"
                                       onClick={() => {
                                           alert(invited.id)
                                           navigate(`personal-page/${invited.id}`)
                                       }}>{invited.nameAccount}</p>
                                    <p>{FormartDateRequest(invited.dateRequest)}</p>
                                    <p className="hlptext">
                                        <button id="confirm" className="btn "
                                                style={{width: "100%", background: "#d0a8de", color: "white"}}
                                                onClick={() => acceptFriend(invited.id)}>Xác
                                            nhận
                                        </button>
                                        <button id="delete" className="btn text-dark mt-1"
                                                style={{width: "100%", background: "#cbd2d4", color: "white"}}
                                                onClick={() => deleteInvited(invited.id)}
                                                type="button">Xóa
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


