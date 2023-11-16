import "./App.css";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Chatbox } from "./components/chatbox/Chatbox";
import Header from "./components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import Changepassword from "./components/changePassword/Changepassword";
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
