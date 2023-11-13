import {useEffect, useState} from "react";
import * as service from "../../service/invited_recommend_friend/InvitedService"

export default function InvitedList() {
    const [invited, setInvited] = useState([])

    const findAll = async () => {
        let data = await service.findAll()
        await setInvited(data)
        console.log(data)
    }

    useEffect(() => {
        findAll();
    },)


    if (!invited) return null;
    return (
        <>
            <h1>Lời mời kết bạn</h1>
            invited.map((invited) => {
            <div className="d-flex" style="float: left; margin:0 32px">
                <div className="cards">
                    <div className="icon">
                        <img className="cus-avatar"
                             src="${invited.image}"
                             alt=""/>
                    </div>
                    <p className="title mb-4">${invited.name}</p>
                    <h6>${invited.mutualFriends + " bạn chung"}</h6>
                    <p className="text">
                        <button id="confirm" className="btn ">Xác nhận</button>
                        <button id="delete" className="btn text-dark mt-1"
                                type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Xóa
                        </button>
                    </p>
                </div>
            </div>
        })
        </>
    )
}

