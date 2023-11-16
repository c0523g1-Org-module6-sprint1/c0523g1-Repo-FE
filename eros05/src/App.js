import './App.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {Outlet, Route, Routes} from "react-router-dom";
import BodyMainPage from "./components/bodyMainPage/BodyMainPage";
import SearchPage from "./components/searchNamePage/SearchPage";
import TimHieu from "./components/bodyMainPage/TimHieu";
import AnToan from "./components/bodyMainPage/AnToan";
import HoTro from "./components/bodyMainPage/HoTro";
import {Chatbox} from "./components/chatbox/Chatbox";
import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  return (
      <>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route path="/"
                         element={<BodyMainPage/>}
                  />
                  <Route path="/tim-hieu"
                         element={<TimHieu/>}
                  />
                  <Route path="/an-toan"
                         element={<AnToan/>}
                  />
                  <Route path="/ho-tro"
                         element={<HoTro/>}
                  />
                  <Route path="/public/search-name/:name"
                         element={<SearchPage/>}
                  />
              </Route>
          </Routes>
          <ToastContainer/>
          {/*<Chatbox/>*/}
      </>
  );
}
const Layout = () => {
    return <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}

export default App;
