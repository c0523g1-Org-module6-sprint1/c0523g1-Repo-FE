import "./App.css";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Chatbox } from "./components/chatbox/Chatbox";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <ToastContainer />
      <Chatbox />
      <Header />
    </>
  );
}
export default App;
