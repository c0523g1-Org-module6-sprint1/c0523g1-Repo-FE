import { useEffect, useRef, useState } from "react";
import "./ListFriend.css"
import { list } from "firebase/storage";
import { getList, handleBlockFriend, handleDeleteFriend, handleUnBlockFriend } from "../../service/listFriend/ListFriendService";
import { Modal } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { getIdByJwt, getUsernameByJwt } from "../../service/login/securityService";
import Gift from "../gift/Gift";
import Swal from "sweetalert2";



function ListFriend() {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const navigate = useNavigate();
 
  const [friendDelete, setFriendDelete] = useState();
  const [friendBlock, setFriendBlock] = useState();
  const [showModal, setShowModal] = useState(false);
  const [nameSearch,setNameSearch] = useState("");
  const [listFriend, setListFriend] = useState(null);
  const [idLogin,setIdLogin] = useState(null);
  const [usernameGift,setUsernameGift] = useState(null);
  const [userNameLogin,setUserNameLogin] = useState(null);
  const [limit,setLimit] = useState(4);
  const [loading, setLoading] = useState(false);

  const [showModaQuyNP, setShowModalQuyNP] = useState(false);
  const [limitTotal,setLimitTotal] = useState(0);
  const handleModal = async (value) => {
    setUsernameGift(value);
    console.log("hi");
    setShowModalQuyNP(true);
  };

  const handleScroll = () => {
    setLimit(limit + 4);
  }

  useEffect(() => {
    getIdLogin()
    getListFriend();
    getUsername();
  },[idLogin,limit])
  const closeModal = async () => {
    setShowModalQuyNP(false);
  };


  const getListFriend = async () => {
    if (idLogin !== null){
      const res = await getList(idLogin,nameSearch,limit);
      console.log(res);
      setListFriend(res[0]);
      setLimitTotal(res[1]);
    }else {
      setListFriend(null);
    }
  }
  const getUsername = async () => {
    const res = await getUsernameByJwt();
    if(res !== undefined){
      setUserNameLogin(res)
     }
  }

  const getIdLogin = async () => {
         const res = await getIdByJwt()
         if(res !== undefined){
          setIdLogin(res)
         }
  }
  console.log("đây là id login :" + idLogin);

  const handleSetNameSearch = () => {
    const specialCharsRegex = /[!#$%^&*(),?":{}|<>+_]/;
    if(!specialCharsRegex.test(nameSearch)){
      getListFriend();
    }else{
      setListFriend(null);
    }
  }
  const takeFriendBlock = async (friend) => {
    Swal.fire({
      title: `Bạn có muốn chặn ${friend.nameAccount} không?` ,
      text: "Bạn sẽ không thể nhắn tin hoặc xem trang cá nhân của người này !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a36acb",
      cancelButtonColor: "#cbd2d4",
      confirmButtonText: "Chấp nhận!",
      cancelButtonText:"Hủy"
    }).then(async (result) => {
      if (result.isConfirmed) {
         const result =  await handleBlockFriend(idLogin,friend);
        await getListFriend();
        Swal.fire({
          title: "Chặn thành công!",
          text: "Bạn đã chặn tương tác với người này ",
          icon: "success"
        })
        ;
      }
    });
  }

  const takeFriendUnblock = async (friend) => {
    const result = await handleUnBlockFriend(idLogin,friend);
    if(result == 204){
      await getListFriend();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đã gỡ chặn",
        showConfirmButton: false,
        timer: 1500
      });
    }
}


  const takeFriendDelete = (friend) => {
    Swal.fire({
      title: `Bạn có muốn hủy kết bạn với ${friend.nameAccount} không?` ,
      text: `Bạn và ${friend.nameAccount} sẽ trở thành người lạ đó !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a36acb",
      cancelButtonColor: "#cbd2d4",
      confirmButtonText: "Chấp nhận!",
      cancelButtonText:"Hủy"
    }).then(async (result) => {
      if (result.isConfirmed) {
         const result =  await handleDeleteFriend(idLogin,friend);
        await getListFriend();
        Swal.fire({
          title: "Hủy kết bạn thành công!",
          text: "Bạn đã hủy bạn bè với người này ",
          icon: "success"
        })
        ;
      }
    });
  }

  const handleKeyPress =  (event) => {
      if(event.key === "Enter"){
        event.preventDefault();
         handleSetNameSearch();
      }
  }

  const getGenderIcon = (value) => {
    if (value === "Female") {
      return <i className="fa-solid fa-venus" style={{ color: '#f08ee8' }}></i>;
    } else if (value === "Male") {
      return <i className="fa-solid fa-mars" style={{ color: '#4567ed' }}></i>;
    } else {
      return "🏳️‍🌈";
    }
  }

  const goToPersonalPage =  (id) => {
     navigate(`/personal-page/${id}`);
  }

  return (  
    <>
      <div >
        <div>
          <h1 style={{ textAlign: 'center', fontSize: 50, paddingTop: 100 , fontFamily: "Agbalumo" }}>Xem danh sách bạn bè</h1>
        </div>
        <div className="row" style={{ marginBottom: 30, marginRight: 30 }}>
          <div className="d-flex justify-content-end">
            <Link to={`/invited_recommend_friend/InvitedList`} className="btn" style={{ color: 'black', padding: '1rem', borderRadius: 20, background: 'radial-gradient(circle, rgba(208,162,247,1) 0%, rgb(216,175,231) 0%, rgba(241,234,255,1) 0%, rgb(227,206,251) 91%, rgba(229,212,255,1) 100%, rgba(183,132,213,1) 100%, rgba(163,106,203,1) 100%)' }}>
              Xem lời mời kết bạn</Link>
          </div>
        </div>
        <form>
          <div className="input-group" style={{ width: 300, margin: '0 auto' }}>
            <a type="button" onClick={handleSetNameSearch} ><span style={{ borderRadius: '20px 0px 0px 20px', fontSize: 24 }} className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-magnifying-glass" />
            </span></a>
            <input 
            onChange={(event) => setNameSearch(event.target.value)}
            onKeyDown={(event) => handleKeyPress(event)}
            style={{ borderRadius: '0px 20px 20px 0px' }} type="text" className="form-control" placeholder="Nhập tên" aria-label="Username" aria-describedby="addon-wrapping" />
          </div>
        </form>
        {listFriend ? <div className="reponsive-cardThienPT" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '3rem', padding: '1rem 3.2rem 1rem 3.2rem' }}>
          {listFriend.map((o, index) => {
            console.log(o)
            return (
              <>
                <div className={`cardsThienPT`}
                >
                  {o.idRel == 3 ?
                      <img style={{width: '20%', height: '3rem', position: 'absolute', top: '3%', right: '3%'}}
                           src="https://firebasestorage.googleapis.com/v0/b/cupid-project-439b5.appspot.com/o/img-quy%2F360_F_129559908_BuXa2ZOYwP1f2kRC8unjeHfnXkJ34we6.png?alt=media&token=ba62dbcd-772d-49dc-ba16-7a2c3377ea50" alt />
                      :
                    <button  onClick={()=>handleModal(o.usernameAccount)} className="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                  <img style={{width: '20%', height: '3rem', position: 'absolute', top: '3%', right: '3%'}} 
                    src="https://firebasestorage.googleapis.com/v0/b/cupid-project-439b5.appspot.com/o/img-quy%2Fbox.png?alt=media&token=f991f1b6-fd6b-45e4-9b61-df5ae995e43f" alt />
                  </button>}
                  <div className="iconThienPT" onClick={()=>goToPersonalPage(o.id)}>
                                   <img className="cus-avatarThienPT"
                                             src={o.avatarAccount}
                                             alt=""/>
                  </div>
                  <p className="titleThienPT">{o.nameAccount} {getGenderIcon(o.nameGender)}</p>
                  <p className="titleThienPT" style={{ opacity: '0.5' }}>{o.nameLocation}</p>
                  <p className="textThienPT">
               
                    {o.idRel === 2 ?  
                    <button style={{ width: '100%', backgroundColor: '#a36acb', color: 'white' }}
                      className="btn" onClick={() => takeFriendBlock(o)}  >
                      Chặn bạn
                    </button> : 
                    <button style={{ width: '100%', backgroundColor: '#a36acb', color: 'white' }}
                      className="btn" onClick={() => takeFriendUnblock(o)}  >
                      Hủy chặn
                    </button>
                    }
                    <button style={{ width: '100%', background: "#cbd2d4", color: "white" }} className="btn  mt-1"
                      type="button"
                      onClick={() => takeFriendDelete(o)}>
                      Hủy kết bạn
                    </button>
                  </p>
                </div>
              </>
            )
          })}
        </div> : <div className="iconThienPT">
          <h1>Không có dữ liệu để hiển thị</h1>
        </div>}
        {limitTotal > limit &&
            <div style={{display:'flex',justifyContent:'center'}}>
              <button className="btn" style={{ color: 'black', padding: '1rem', borderRadius: 20, background: 'radial-gradient(circle, rgba(208,162,247,1) 0%, rgb(216,175,231) 0%, rgba(241,234,255,1) 0%, rgb(227,206,251) 91%, rgba(229,212,255,1) 100%, rgba(183,132,213,1) 100%, rgba(163,106,203,1) 100%)' }}
                      onClick={handleScroll}
              >
                Xem thêm </button>
            </div>
        }

      </div>



      <Gift showModaQuyNP={showModaQuyNP} handleClose={closeModal} userNow={userNameLogin} userGift={usernameGift} />
  
    </>
  )
}


export default ListFriend;