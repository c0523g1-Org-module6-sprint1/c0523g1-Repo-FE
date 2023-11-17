import { useEffect, useRef, useState } from "react";
import "./ListFriend.css"
import { list } from "firebase/storage";
import { getList, handleBlockFriend, handleDeleteFriend } from "../../service/listFriend/ListFriendService";
import { Modal } from "react-bootstrap";
import {Link} from "react-router-dom";
import { getIdByJwt } from "../../service/login/securityService";

function ListFriend() {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
 
  const [friendDelete, setFriendDelete] = useState();
  const [friendBlock, setFriendBlock] = useState();
  const [showModal, setShowModal] = useState(false);
  const [nameSearch,setNameSearch] = useState("");
  const [listFriend, setListFriend] = useState(null);
  const [idLogin,setIdLogin] = useState(null);
  const getListFriend = async () => {
    if (idLogin !== null) {
      setListFriend(await getList(idLogin,nameSearch))
    } else{
      setListFriend(null)
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
    const result = await handleBlockFriend(1, friendBlock);
    console.log(result);
    handleCloseModal()
  }

  const deleteFriend = async () => {
    const result = await handleDeleteFriend(1, friendDelete);
    console.log(result);
    handleCloseModal()
  }

  const unFriend = async () => {
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

  useEffect(() => {
    getIdLogin()
    getListFriend();
  },[idLogin])
  return (
    <>
      <div style={{ background: 'linear-gradient(90deg, rgba(208,162,247,1) 0%, rgba(169,114,206,1) 0%, rgba(208,162,247,1) 26%, rgba(163,106,203,1) 100%, rgba(216,175,231,1) 100%, rgba(229,212,255,1) 100%, rgba(225,203,255,1) 100%)' }}>
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
                  {/* <button className="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
    <img style={{width: '20%', height: '3rem', position: 'absolute', top: '3%', right: '3%'}} src="..//QuyNP/mau-thiet-ke-hop-qua-vector-06-removebg-preview.png" alt />
  </button> */}
                  <div className="iconThienPT">
                    <img className="cus-avatarThienPT" src="https://images.pexels.com/photos/2048716/pexels-photo-2048716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt />
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
                      onClick={() => takeFriendDelete(o)}  >
                      Hủy kết bạn
                    </button>
                    <Modal show={showModal} onHide={handleCloseModal} >
                      {friendDelete && (
                        <MyModalDelete action={handleCloseModal} data={friendDelete} deleteFunc={deleteFriend} />
                      )}
                      {friendBlock && (
                        <MyModalBlock action={handleCloseModal} data={friendBlock} deleteFunc={blockFriend} />
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




    </>
  )
}

function MyModalBlock({ action, data, deleteFunc }) {
  return (
    <>
      <Modal.Header>
        <h5 className="modal-title" id="deleteModalLabel">Thông báo!</h5>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có muốn chặn {data.nameAccount}</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-outline-primary" onClick={() => deleteFunc()} >Xác nhận</button>
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