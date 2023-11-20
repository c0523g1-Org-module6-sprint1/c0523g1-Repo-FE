import {useEffect, useState} from "react";
import * as service from "../../service/invited_recommend_friend/RecommendService"
import {useNavigate} from "react-router-dom";

export default function RecommendList() {
    const [recommend, setRecommend] = useState(null)
    const [role, setRole] = useState(1)
    const navigate = useNavigate();

    const findAll = async (accountID) => {
        let data = await service.findAll(accountID, role)
        await setRecommend(data)
        console.log(data)
    }

    useEffect(() => {
        findAll(1);
    }, [role])

    if (!recommend) return null;
    return (
        <div >
            <div>
                <div id="bg" style={{marginTop: "75px"}}>
                    <div>
                        <p className="hat1">Gợi ý kết bạn</p>
                        <div className="dropdown" style={{border: "none"}}>
                            <button className="btn btn-dark" type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{border: "none", background: "#a36acb"}}>
                                Lọc <i className="fa fa-sliders text-light" />
                            </button>
                            <ul className="dropdown-menu"
                                style={{cursor:"pointer", color:"#a36acb"}}>
                                <li className="dropdown-item  hlpdropitem"    onClick={(values) => setRole(1)}>
                                    <i  className="fa fa-home hlpdropitem "/> Cùng thành phố</li>
                                <li className="dropdown-item hlpdropitem"  onClick={(values) => setRole(2)}>
                                    <i className="fa fa-briefcase hlpdropitem "/> Cùng nghề nghiệp</li>
                                <li className="dropdown-item hlpdropitem" onClick={(values) => setRole(3)}>
                                    <i className="fa fa-smile-o hlpdropitem"/> Cùng sở thích</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    {recommend.map((recommend) =>
                        <div className="d-flex" style={{float: "left"}}>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="hlpicon">
                                            <img className="hlpcus-avatar"
                                                 src={recommend.avatar}
                                                 alt=""/>
                                        </div>
                                        <h5 className="hlptitle mb-4">{recommend.name}</h5>
                                        <p className="hlptext">

                                        </p>
                                    </div>
                                    <div className="flip-card-back">
                                        <div className="hlptitle" style={{
                                            position: "relative",
                                            top: "50px",
                                            textAlign: "start",
                                            left: "40px"
                                        }}>
                                            <p>
                                                <i className="fa fa-home  text-light"/> {recommend.location}
                                            </p>
                                            <p>
                                                <i className="fa fa-male text-light"
                                                   aria-hidden="true"/> {recommend.gender}
                                            </p>
                                            <p>
                                                <i className="fa fa-briefcase text-light"
                                                   aria-hidden="true"/> {recommend.job}
                                            </p>
                                            <p>
                                                <i className="fa fa-smile-o text-light"
                                                   aria-hidden="true"/> {recommend.hobby}
                                            </p>
                                        </div>
                                        <button id="confirm" className="btn"
                                                style={{
                                                    width: "80%",
                                                    alignSelf: "center",
                                                    background: "#a36acb",
                                                    color: "white",
                                                    marginTop: "100px"
                                                }}
                                                onClick={() => {
                                                    navigate(`/personal-page/${recommend.id}`)
                                                }}>Xem trang cá nhân
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


