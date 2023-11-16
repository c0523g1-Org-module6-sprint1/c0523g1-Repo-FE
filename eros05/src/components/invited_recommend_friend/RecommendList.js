import {useEffect, useState} from "react";
import * as service from "../../service/invited_recommend_friend/RecommendService"

export default function RecommendList() {
    const [recommend, setRecommend] = useState([])

    const findAll = async () => {
        let data = await service.findAll()
        await setRecommend(data)
        console.log(data)
    }

    useEffect(() => {
        findAll();
    },)


    if (!recommend) return null;
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
                        <li className="dropdown-item" >Theo lời mời mới nhất</li>
                        <li className="dropdown-item">Theo lời mời cũ nhất</li>
                    </ul>
                </div>
                <button className="btn btn-success" type="submit">Reset</button>
            </div>
            {recommend.map((recommend) =>
                <div className="d-flex">
                    <div className="cards">
                        <div className="icon">
                            <img className="cus-avatar"
                                 src={recommend.avatar}
                                 alt=""/>
                        </div>
                        <p className="title mb-4">${recommend.name}</p>
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

