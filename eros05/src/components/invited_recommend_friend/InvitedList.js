import {useEffect, useState} from "react";
import * as service from "../../service/invited_recommend_friend/InvitedService"
import "./content.css"
import {acceptFriends, deleteInviteds} from "../../service/invited_recommend_friend/InvitedService";
import {toast} from "react-toastify";
import {FormartDateRequest} from "./FormartDateRequest";
import {useNavigate} from "react-router-dom";
import * as loginService from "../../service/login/securityService";


export default function InvitedList() {

    const [invited, setInvited] = useState([])
    const [sort, setSort] = useState(true)
    const navigate = useNavigate();

    const userLogin = loginService.getIdByJwt();

    const findAll = async () => {
        let data = await service.findAll(userLogin, sort)
        await setInvited(data)
        console.log(data)
    }


    const acceptFriend = async (invitedID) => {
        console.log(invitedID)
        const res = await acceptFriends(invitedID)
        console.log(res.status)
        if (res.status === 200) {
            toast.success("Đã chấp nhận lời mời kết bạn")
            findAll()

        }
    }
    const deleteInvited = async (invitedID) => {
        console.log(invitedID)
        const res = await deleteInviteds(invitedID)
        console.log(res.status)
        if (res.status === 200) {
            toast.success("Đã xóa lời mời kết bạn")
            findAll()
        }
    }
    const getGenderIcon = (value) => {
        if (value === "Nữ") {
            return <i className="fa-solid fa-venus" style={{color: '#f08ee8'}}></i>;
        } else if (value === "Nam") {
            return <i className="fa-solid fa-mars" style={{color: '#4567ed'}}></i>;
        } else {
            return "🏳️‍🌈";
        }
    }

    useEffect(() => {
        findAll();
    }, [sort])

    // if (!invited) return null;
    return (
        <div>
            <div>
                <div style={{marginTop: "75px"}}>

                    <div>
                        <p className="hat1">Lời mời kết bạn</p>
                        <select className="ms-3 sortdrop" aria-label="Default select example"
                                onChange={(e) => setSort(e.target.value)}>
                            <option className="opt" value="true">
                                Theo lời mời mới nhất
                            </option>
                            <option className="opt" value="false">
                                Theo lời mời cũ nhất
                            </option>
                        </select>
                    </div>
                    {invited.length > 0 ? <div>
                        {invited.map((invited) =>
                            <div className="d-flex" style={{float: "left"}}>
                                <div className="hlpcards">
                                    <div className="hlpicon">
                                        <img className="hlpcus-avatar"
                                             onClick={() => {
                                                 navigate(`/personal-page/${invited.accountID}`)
                                             }}
                                             src={invited.avatarAccount}
                                             alt=""/>
                                    </div>
                                    <p className="hlptitle mb-4"
                                       onClick={() => {
                                           navigate(`/personal-page/${invited.accountID}`)
                                       }}>{invited.nameAccount} {getGenderIcon(invited.genderName)}</p>
                                    <p>{FormartDateRequest(invited.dateRequest)}</p>
                                    <p className="hlptext">
                                        <button id="confirm" className="btn "
                                                style={{width: "100%", background: "#a36acb", color: "white"}}
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
                    </div> : <h5 style={{textAlign: "center", fontFamily: "sans-serif", color: "#a36acb"}}
                                 className="text-sencondary">
                        Chưa có lời mời kết bạn nào😓 <br/><br/>
                        Vào mục gợi ý kết bạn để tìm một nửa phù hợp với bạn nhé 💑
                    </h5>}
                </div>
            </div>
        </div>
    )
}


