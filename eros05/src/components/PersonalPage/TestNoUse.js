import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as personalService from "../../service/personalPage/PersonalpageService"

export function TestNoUse() {
    const[account, setAccount] = useState({})
    const userName = "ronaldo123"
    const other = 3
    const [other3,setOther] = useState({})

    useEffect(()=>{
        getAccountByUserName();
        getID();
    },[])

    const getAccountByUserName = async () => {
        let result =  await personalService.getInfoAccount(userName)
        setAccount(result.data)
    }
    const getID = async () =>{
        let result = await personalService.getInfoPersonal(3)
        setOther(result.data)
    }


    return(
        <div>

            <div className="card" style={{width: "18rem"}}>
                <img src={other3.avatar} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{other3.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                        <Link to={`/personal-page/${other3.id}`}>Trang ca nhan</Link>
                    </div>
            </div>
        </div>


    )
}