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
            <div>
            <h1>Lời mời kết bạn</h1>
            <div className="dropdown" style={{margin: "0 10px"}}>
                <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                    Type
                </button>
                <ul className="dropdown-menu">
                    <li className="dropdown-item" >Food</li>
                    <li className="dropdown-item">Drink</li>
                    <li className="dropdown-item">Alcohol</li>
                </ul>
            </div>
            <button className="btn btn-success" type="submit">Reset</button>
            </div>
            {invited.map((invited) =>
                <div className="d-flex">
                    <div className="cards">
                        <div className="icon">
                            <img className="cus-avatar"
                                 src={invited.avatar}
                                 alt=""/>
                        </div>
                        <p className="title mb-4">${invited.name}</p>
                        <p className="text">
                            <button id="confirm" className="btn ">Xác nhận</button>
                            <button id="delete" className="btn text-dark mt-1"
                                    type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Xóa
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}


