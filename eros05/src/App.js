
import './App.css';
import {ToastContainer} from "react-toastify";
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
import {requestFilter} from "./service/login/requestFilter";
function App() {
    requestFilter();
  return (
      <>
          <ToastContainer position="bottom-left" />
          <Chatbox/>
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="*" element={<Header/>}/>
          </Routes>
          <Routes>
              <Route path="/" element={<BodyMainPage/>}/>
              <Route path="/public/search-name/:name" element={<SearchPage/>}/>
              <Route path="/search_advanced" element={<SearchAdvanced/>}/>
              <Route path="/top_hundered" element={<TopHundered/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/initial-information" element={<InitInfo/>}/>
              <Route path="/friend/list" element={<ListFriend/>}/>
              <Route path="/invited_recommend_friend/InvitedList" element={<InvitedList/>}/>
              <Route path="/invited_recommend_friend/RecommendList" element={<RecommendList/>}/>
              <Route path="/personal-page/:id" element={<PersonalPage/>}/>
              <Route path="/updateAccount/eros+" element={<UpdateAccountEros/>}/>
              <Route path="/updateAccount/gold" element={<UpdateAccountGold/>}/>
              <Route path="/updateAccount/platinum" element={<UpdateAccountPlatinum/>}/>
              <Route path="/change_password" element={<ChangePassword/>}/>
              <Route path="/accounts" element={<ListAccount/>}/>
              <Route path="/tim-hieu" element={<TimHieu/>}/>
              <Route path="/ho-tro" element={<HoTro/>}/>
              <Route path="/an-toan" element={<AnToan/>}/>
              <Route path="/personal-page/edit" element={<EditAccount/>}/>
              <Route path="/newsfeed" element={<Post/>}/>
          </Routes>
          <Routes>
              <Route path="/" element={<Footer/>}/>
          </Routes>
      </>
  );
}

export default App;