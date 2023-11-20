import { useEffect, useRef, useState } from "react";
import "./ListFriend.css"
import { list } from "firebase/storage";
import { getList, handleBlockFriend, handleDeleteFriend } from "../../service/listFriend/ListFriendService";
import { Modal } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { getIdByJwt, getUsernameByJwt } from "../../service/login/securityService";
import Gift from "../gift/Gift";

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

  const [showModaQuyNP, setShowModalQuyNP] = useState(false);
  const handleModal = async (value) => {
    setUsernameGift(value);
    console.log("hi");
    setShowModalQuyNP(true);
  };
  console.log("usernameGift" +usernameGift);
  console.log("username: " +userNameLogin);

  const closeModal = async () => {
    setShowModalQuyNP(false);
  };


  const getListFriend = async () => {
    if (idLogin !== null) {
      setListFriend(await getList(idLogin,nameSearch))
    } else{
      setListFriend(null)
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
  const takeFriendBlock = (friend) => {
    setFriendBlock(friend)
    setFriendDelete(null);
    handleShowModal()
  }
  const takeFriendDelete = (friend) => {
    setFriendDelete(friend)
    setFriendBlock(null);
    handleShowModal()
  }
  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setFriendBlock(null);
    setFriendDelete(null);
    getListFriend();
  }
  const blockFriend = async () => {
    const result = await handleBlockFriend(idLogin, friendBlock);
    console.log(result);
    handleCloseModal()
  }

  const deleteFriend = async () => {
    const result = await handleDeleteFriend(idLogin,friendDelete);
    console.log(result);
    handleCloseModal()
  }



  const getGenderIcon = (value) => {
    if (value === "female") {
      return <i className="fa-solid fa-venus" style={{ color: '#f08ee8' }}></i>;
    } else if (value === "male") {
      return <i className="fa-solid fa-mars" style={{ color: '#4567ed' }}></i>;
    } else {
      return <i className="fa-solid fa-rainbow" style={{ color: '#fc90fe' }}></i>;
    }
  }
  console.log(nameSearch);
  const goToPersonalPage = async (id) => {
    await navigate(`/personal-page/${id}`);
  }

  useEffect(() => {
    getIdLogin()
    getListFriend();
    getUsername();
  },[idLogin])
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #8BC6EC 0%, #784BA0 100%)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 50, fontFamily: "Agbalumo" }}>Xem danh sách bạn bè</h1>
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
            style={{ borderRadius: '0px 20px 20px 0px' }} type="text" className="form-control" placeholder="Nhập tên" aria-label="Username" aria-describedby="addon-wrapping" />
          </div>
        </form>
        {listFriend ? <div className="reponsive-cardThienPT" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '3rem', padding: '1rem 3.2rem 1rem 3.2rem' }}>
          {listFriend.map((o, index) => {
            return (
              <>
                <div className="cardsThienPT">
                  <button  onClick={()=>handleModal(o.usernameAccount)} className="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                  <img style={{width: '20%', height: '3rem', position: 'absolute', top: '3%', right: '3%'}} 
                    src="https://firebasestorage.googleapis.com/v0/b/cupid-project-439b5.appspot.com/o/img-quy%2Fbox.png?alt=media&token=f991f1b6-fd6b-45e4-9b61-df5ae995e43f" alt />
                  </button>
                  <div className="iconThienPT" onClick={()=>goToPersonalPage(o.id)}>
                    
                    {/* <Link  to={o.avatarAccount} >
                      <img className="cus-avatarThienPT" src="" alt />
                    </Link> */}
                    <div  style={{
                                    backgroundImage : `url(${o.avatarAccount})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    aspectRatio: '1/1',
                                    backgroundRepeat: 'no-repeat',
                                }}  
                            className="cus-avatarThienPT"         
                                    >
                                </div>
                  </div>
                  <p className="titleThienPT">{o.nameAccount} {getGenderIcon(o.nameGender)}</p>
                  <p className="titleThienPT" style={{ opacity: '0.5' }}>{o.nameLocation}</p>
                  <p className="textThienPT">
                    <button style={{ width: '100%', backgroundColor: '#a36acb', color: 'white' }}
                      className="btn" onClick={() => takeFriendBlock(o)}  >
                      Chặn bạn
                    </button>
                    <button style={{ width: '100%', backgroundColor: '#a36acb', color: 'white' }} className="btn btn-secondary mt-1"
                      type="button"
                      onClick={() => takeFriendDelete(o)}>
                      Hủy kết bạn
                    </button>
                    <Modal show={showModal} onHide={handleCloseModal} >
                      {friendDelete && (
                        <MyModalDelete action={handleCloseModal} data={friendDelete} deleteFunc={deleteFriend} />
                      )}
                      {friendBlock && (
                        <MyModalBlock action={handleCloseModal} data={friendBlock} blockFunc={blockFriend} />
                      )}
                    </Modal>


                  </p>
                </div>
              </>
            )
          })}
        </div> : <div className="iconThienPT">
          <h1>Không có dữ liệu để hiển thị</h1>
        </div>}
      </div>



      <Gift showModaQuyNP={showModaQuyNP} handleClose={closeModal} userNow={userNameLogin} userGift={usernameGift} />
  
    </>
  )
}



function MyModalBlock({ action, data, blockFunc }) {
  return (
    <>
    <Modal.Header >
        <h5 className="modal-title" id="deleteModalLabel">Thông báo!</h5>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có muốn chặn {data.nameAccount}</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-outline-primary" onClick={() => blockFunc()} >Xác nhận</button>
        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={() => action()}>Hủy</button>
      </Modal.Footer>
    </>
  )

}

function MyModalDelete({ action, data, deleteFunc }) {
  return (
    <>
      <Modal.Header>
        <h5 className="modal-title" id="deleteModalLabel">Thông báo!</h5>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có muốn hủy kết bạn {data.nameAccount} </p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-outline-primary" onClick={() => deleteFunc()} >Hủy kết bạn</button>
        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={() => action()}>Hủy</button>
      </Modal.Footer>
    </>
  )

}
export default ListFriend;