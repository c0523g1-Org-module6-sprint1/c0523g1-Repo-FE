import {useEffect, useState} from "react";
import * as service from "../../service/invited_recommend_friend/RecommendService"
import {useNavigate} from "react-router-dom";
import * as loginService from "../../service/login/securityService";

export default function RecommendList() {
    const [recommend, setRecommend] = useState([])
    const [role, setRole] = useState("3")
    const [gender, setGender] = useState("")
    const navigate = useNavigate();
    const userLogin = loginService.getIdByJwt();
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState("");

    useEffect(() => {
        findAllLocation();
    }, [])

    useEffect(() => {
        findAll();
    }, [role, gender, location])

    const findAllLocation = async () => {
        const data = await service.findAllLocation();
        setLocations(data);
    }

    const findAll = async () => {
        let data = await service.findAll(userLogin, role, gender, location)
        setRecommend(data);
    }

    const getGenderIcon = (value) => {
        if (value === "Female") {
            return <i className="fa-solid fa-venus" style={{color: '#f08ee8'}}></i>;
        } else if (value === "Male") {
            return <i className="fa-solid fa-mars" style={{color: '#4567ed'}}></i>;
        } else {
            return "🏳️‍🌈";
        }
    }

    // if(!recommend||!locations){
    //     return null;
    // }

    return (
        <div>
            <div>
                <div id="bg" style={{marginTop: "75px"}}>
                    <div>
                        <p className="hat1">Gợi ý kết bạn</p>
                        <div className="d-flex dropdown">
                            <select className="generaldrop" aria-label="Default select example"
                                    onChange={(e) => setRole(e.target.value)}>
                                <option className="opt" value="3">
                                    Chọn
                                </option>
                                <option className="opt" value="1">
                                    Cùng nghề nghiệp
                                </option>
                                <option className="opt" value="2">
                                    Cùng sở thích
                                </option>
                            </select>
                            <select className="ms-3 genderdrop" aria-label="Default select example"
                                    onChange={(e) => setGender(e.target.value)}>
                                <option className="opt" value="">
                                    Giới tính
                                </option>
                                <option value="Male">
                                    👱
                                </option>
                                <option value="Female">
                                    👩
                                </option>
                                <option value="LGBT">
                                    🏳️‍🌈
                                </option>
                            </select>
                            <form className="ms-3 citydrop" aria-label="Default select example"
                                  onChange={(e) => setLocation(e.target.value)}>
                                <input list="magicHouses" id="myHouse" name="myHouse"
                                       placeholder="Nhập thành phố cần tìm "/>
                                <datalist id="magicHouses">
                                    <option value="">Thành phố</option>
                                    {
                                        locations.map((location) => (
                                            <option
                                                key={location.id}
                                                value={location.name}
                                            >
                                                {location.name}
                                            </option>
                                        ))
                                    }
                                </datalist>
                                <button className="resetbtn" type="submit">Tạo lại</button>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    recommend.length === 0 ?
                        <div>
                            <h5 style={{textAlign: "center", fontFamily: "sans-serif", color: "#a36acb"}}
                                className="text-sencondary">
                                Không tìm thấy gợi ý kết bạn nào 😔
                            </h5>
                        </div>
                        :
                        <div>
                            {recommend.map((recommend) =>
                                <div className="d-flex" style={{float: "left"}} key={recommend.id}>
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <div className="hlpicon">
                                                    <img className="hlpcus-avatar"
                                                         src={recommend.avatar}
                                                         alt=""/>
                                                </div>
                                                <h5 className="hlptitle mb-4">{recommend.name} {getGenderIcon(recommend.genderName)}</h5>
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
                }
            </div>
        </div>
    )
}


