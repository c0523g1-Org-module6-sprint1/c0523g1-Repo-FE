import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Gift from "./Gift";
function GiftBackup() {
  const [showModaQuyNP, setShowModalQuyNP] = useState(false);
  const handleModal = async () => {
    console.log("hi");
    setShowModalQuyNP(true);
  };

  const closeModal = async () => {
    setShowModalQuyNP(false);
  };
  return (
    <div>
      <Gift showModaQuyNP={showModaQuyNP} handleClose={closeModal} />
      <button
        onClick={handleModal}
        style={{
          width: "7rem",
          height: "3rem",
          backgroundColor: "#a36acb",
          borderRadius: "20px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3rem",
        }}
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Tặng quà
      </button>
    </div>
  );
}

export default GiftBackup;
