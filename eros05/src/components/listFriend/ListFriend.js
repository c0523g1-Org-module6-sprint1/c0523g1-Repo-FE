import { useEffect, useState } from "react";
import "./ListFriend.css"
import { list } from "firebase/storage";

function ListFriend(){
    const [list,setList] = useState([1,2,3,4,5]);
    // useEffect(() => {
       

    // })
    return(
        <>
       <div style={{background: 'linear-gradient(90deg, rgba(208,162,247,1) 0%, rgba(169,114,206,1) 0%, rgba(208,162,247,1) 26%, rgba(163,106,203,1) 100%, rgba(216,175,231,1) 100%, rgba(229,212,255,1) 100%, rgba(225,203,255,1) 100%)'}}>
  <h1 style={{textAlign: 'center', marginBottom: 50, fontFamily: "Agbalumo"}}>Xem danh sách bạn bè</h1>
  <div className="row" style={{marginBottom: 30, marginRight: 30}}>
    <div className="d-flex justify-content-end">
      <a href="/hung/HungHLP_XemLoiMoiKetBan.html" className="btn" style={{color: 'black', padding: '1rem', borderRadius: 20, background: 'radial-gradient(circle, rgba(208,162,247,1) 0%, rgb(216,175,231) 0%, rgba(241,234,255,1) 0%, rgb(227,206,251) 91%, rgba(229,212,255,1) 100%, rgba(183,132,213,1) 100%, rgba(163,106,203,1) 100%)'}}>
        Xem lời mời kết bạn</a>
    </div>
  </div>
  <form>
    <div className="input-group" style={{width: 300, margin: '0 auto'}}>
      <a type="button"><span style={{borderRadius: '20px 0px 0px 20px', fontSize: 24}} className="input-group-text" id="addon-wrapping">
          <i className="fa-solid fa-magnifying-glass" />
        </span></a>
      <input style={{borderRadius: '0px 20px 20px 0px'}} type="text" className="form-control" placeholder="Nhập tên" aria-label="Username" aria-describedby="addon-wrapping" />
    </div>
  </form>
  <div className="reponsive-card" style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '3rem', padding: '1rem 3.2rem 1rem 3.2rem'}}>
    {list.map((o,index) => {
        return(
            <>
            <div className="cards">
  <button className="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
    <img style={{width: '20%', height: '3rem', position: 'absolute', top: '3%', right: '3%'}} src="..//QuyNP/mau-thiet-ke-hop-qua-vector-06-removebg-preview.png" alt />
  </button>
  <div className="icon">
    <img className="cus-avatar" src="https://images.pexels.com/photos/2048716/pexels-photo-2048716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt />
  </div>
  <p className="title">Johny Dang</p>
  <p className="title" style={{opacity: '0.5'}}>Đà Nẵng</p>
  <p className="text">
    <button style={{width: '100%', backgroundColor: '#a36acb', color: 'white'}} className="btn">Chặn bạn
    </button>
    <button style={{width: '100%'}} className="btn btn-secondary mt-1" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Hủy kết bạn
    </button>
  </p>
</div>
            </>
        )
    })}
  </div>
</div>

        </>
    )
}
export default ListFriend;