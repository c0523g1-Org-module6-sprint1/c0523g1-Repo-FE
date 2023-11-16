import './App.css';
import {ToastContainer} from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import {Chatbox} from "./components/chatbox/Chatbox";
import Header from "./components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css"
import {Route, Routes} from "react-router-dom";
import BodyMainPage from "./components/bodyMainPage/BodyMainPage";
import SearchPage from "./components/searchNamePage/SearchPage";
import SearchAdvanced from "./components/searchAdvanced/SearchAdvanced";
import TopHundered from "./components/top_hundered/TopHundered";
import {Register} from "./components/account_register/AccountRegister";
import {InitInfo} from "./components/account_initial_info/InitInfo";
import Login from "./components/login/Login";
import ListFriend from "./components/listFriend/ListFriend";
import InvitedList from "./components/invited_recommend_friend/InvitedList";
import RecommendList from "./components/invited_recommend_friend/RecommendList";
import {PersonalPage} from "./components/PersonalPage/PersonalPage";
import {UpdateAccountEros} from "./components/update_account/UpdateAccountEros";
import {UpdateAccountGold} from "./components/update_account/UpdateAccountGold";
import {UpdateAccountPlatinum} from "./components/update_account/UpdateAccountPlatinum";
import ChangePassword from "./components/changePassword/ChangePassword";
import {ListAccount} from "./components/accountAdmin/ListAccount";
import Footer from "./components/footer/Footer";
import TimHieu from "./components/bodyMainPage/TimHieu";
import HoTro from "./components/bodyMainPage/HoTro";
import AnToan from "./components/bodyMainPage/AnToan";
import EditAccount from "./components/account_edit/EditAccount";
import Post from "./components/posts/Post";
function App() {

  return (
      <>
        <ToastContainer/>
          <Chatbox/>
          <Header/>
          <Routes>
              <Route path="/" Component={<BodyMainPage/>}/>
              <Route path="/public/search-name/:name" Component={<SearchPage/>}/>
              <Route path="/search_advanced" Component={<SearchAdvanced/>}/>
              <Route path="/top_hundered" Component={<TopHundered/>}/>
              <Route path="/register" Component={<Register/>}/>
              <Route path="/initial-information" Component={<InitInfo/>}/>
              <Route path="/login" Component={<Login/>}/>
              <Route path="/friend/list" Component={<ListFriend/>}/>
              <Route path="/invited_recommend_friend/InvitedList" Component={<InvitedList/>}/>
              <Route path="/invited_recommend_friend/RecommendList" Component={<RecommendList/>}/>
              <Route path="/personal-page/:id" Component={<PersonalPage/>}/>
              <Route path="/updateAccount/eros+" Component={<UpdateAccountEros/>}/>
              <Route path="/updateAccount/gold" Component={<UpdateAccountGold/>}/>
              <Route path="/updateAccount/platinum" Component={<UpdateAccountPlatinum/>}/>
              <Route path="/change_password" Component={<ChangePassword/>}/>
              <Route path="/accounts/:id" Component={<ListAccount/>}/>
              <Route path="/tim-hieu" Component={<TimHieu/>}/>
              <Route path="/ho-tro" Component={<HoTro/>}/>
              <Route path="/an-toan" Component={<AnToan/>}/>
              <Route path="/personal-page/edit" Component={<EditAccount/>}/>
              <Route path="/newsfeed" Component={<Post/>}/>
          </Routes>
          <Routes>
              <Route path="/" Component={<Footer/>}/>
          </Routes>
      </>
  );
}
export default App;