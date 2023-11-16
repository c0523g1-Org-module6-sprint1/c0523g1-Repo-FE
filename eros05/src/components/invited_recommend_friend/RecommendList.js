import {useEffect, useState} from "react";
import * as service from "../../service/invited_recommend_friend/recommendService"

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
            <h1>Lời mời kết bạn</h1>
            recommend.map((recommend) => {
            <div className="d-flex" style="float: left; margin:0 32px">
                <div className="cards">
                    <div className="icon">
                        <img className="cus-avatar"
                             src="${recommend.image}"
                             alt=""/>
                    </div>
                    <p className="title mb-4">${recommend.name}</p>
                    <h6>${recommend.mutualFriends + " bạn chung"}</h6>
                    <p className="text">
                        <button id="confirm" className="btn mt-5 ">Xem trang cá nhân</button>
                    </p>
                </div>
            </div>
        })
        </>
    )
}

