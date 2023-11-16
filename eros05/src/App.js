import "./App.css";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Chatbox } from "./components/chatbox/Chatbox";

function App() {
  return (
    <>
      <ToastContainer />
      <Chatbox />
    </>
  );
}
export default App;
