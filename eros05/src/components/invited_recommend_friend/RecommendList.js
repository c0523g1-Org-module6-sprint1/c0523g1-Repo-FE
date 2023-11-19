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
                <div id="bg" style={{marginTop: "75px"}}>
                    <div>
                        <h1>Gợi ý kết bạn</h1>
                        <div className="dropdown">
                            <button className="btn btn-dark dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        cursor: "pointer", border: "none", background: "#a36acb"
                                    }}>
                                Sắp xếp
                            </button>
                            <ul className="dropdown-menu"
                                style={{backgroundColor: "#d0a8de", cursor: "pointer"}}>
                                <li className="dropdown-item ">Theo lời mời mới nhất</li>
                                <li className="dropdown-item ">Theo lời mời cũ nhất</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{backgroundColor: "white"}}>
                    {recommend.map((recommend) =>
                        <div className="d-flex" style={{float: "left", backgroundColor: "white"}}>
                            <div className="hlpcards">
                                <div className="hlpicon">
                                    <img className="hlpcus-avatar"
                                         src={recommend.avatarAccount}
                                         alt=""/>
                                </div>
                                <p className="hlptitle mb-4">{recommend.nameAccount}</p>
                                <p className="hlptext">
                                    <button id="confirm" className="btn "
                                            style={{width: "100%", background: "#d0a8de", color: "white"}}
                                           >Xác
                                        nhận
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

