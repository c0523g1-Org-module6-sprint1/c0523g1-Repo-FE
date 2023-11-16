import React, { useEffect, useState } from "react";
import * as giftService from "../../service/gift/giftService";
import "bootstrap/dist/css/bootstrap.min.css";
function Gift({ show, handleClose, userNow, userGift }) {
  const [listGift, setListGift] = useState([]);
  const [getMoney, setgetMoney] = useState(0);
  const [product, setProduct] = useState({});
  const [flagChoice, setFlagChoice] = useState(false);
  const display = async () => {
    const res = await giftService.getAll();
    const resMoney = await giftService.getMoney("2");
    const result = resMoney / 100;
    setgetMoney(result);
    setListGift(res);
    console.log();
  };
  useEffect(() => {
    display();
  }, []);

  const choiceProduct = (value) => {
    setProduct(value);
    console.log(value);
    setFlagChoice(true);
  };
  console.log(product);
  return (
    <>
      {show && (
        <div
          style={{
            borderRadius: "10px",
            textAlign: "center",
            alignItems: "center",
            display: "block",
          }}
          className="modal"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex={-1}
        >
          <div
            className="modal-dialog modal-lg"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <div
              className="modal-content"
              style={{ borderRadius: "20px", padding: "1rem " }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h4 style={{ marginTop: "1rem" }}>Lựa chọn quà tặng</h4>
                </div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    display: "flex",
                    alignItems: "center",

                    gap: "0.3rem",
                  }}
                >
                  <div className="title">Số dư tài khoản: {getMoney} 💎</div>
                  <div
                    tabIndex="0"
                    className="plusButton"
                    style={{
                      backgroundColor: "#a36acb",
                      borderRadius: "20px",
                    }}
                  >
                    <svg
                      className="plusIcon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      style={{ width: "2rem" }}
                    >
                      <g mask="url(#mask0_21_345)">
                        <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    marginTop: "1rem",
                  }}
                >
                  {flagChoice ? (
                    <>
                      <div className="title" style={{ marginTop: "0.2rem" }}>
                        Chọn số lượng:
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        <div
                          style={{
                            width: "2.4rem",
                            height: "2.4rem",
                            borderRadius: "5px",
                            backgroundColor: "#b295c6",
                            fontSize: "1.5rem",
                            color: "white",
                          }}
                        >
                          -
                        </div>
                        <div style={{ fontSize: "1.5rem" }}>0</div>
                        <div
                          style={{
                            width: "2.4rem",
                            height: "2.4rem",
                            borderRadius: "5px",
                            backgroundColor: "#b295c6",
                            fontSize: "1.5rem",
                            color: "white",
                          }}
                        >
                          +
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="title" style={{ marginTop: "0.2rem" }}>
                      Chọn quà tặng:
                    </div>
                  )}
                </div>
              </div>
              <div
                className="modal-body"
                style={{ padding: 0, marginTop: "1rem" }}
              >
                <div
                  className="content-body"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.2rem",
                    cursor: "pointer",
                  }}
                >
                  {flagChoice ? (
                    <div
                      style={{
                        border: "#a36acb 1px solid",
                        borderRadius: "10px",
                      }}
                    >
                      <div style={{ paddingTop: "0.2rem" }}>
                        <img
                          style={{ width: "50%" }}
                          src={product.image}
                          alt=""
                        />
                      </div>
                      <div style={{ fontSize: "14px" }}>{product.name}</div>
                      <div style={{ marginTop: "0, 8rem" }}>
                        {product.price} 💎
                      </div>
                    </div>
                  ) : (
                    listGift.map((item) => (
                      <div
                        onClick={() => choiceProduct(item)}
                        key={item.id}
                        style={{
                          border: "#a36acb 1px solid",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ paddingTop: "0.2rem" }}>
                          <img
                            style={{ width: "50%" }}
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div style={{ fontSize: "14px" }}>{item.name}</div>
                        <div style={{ marginTop: "0, 8rem" }}>
                          {item.price} 💎
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "7px",
                    color: "black",
                    border: "#a36acb solid 1px",
                  }}
                >
                  Huỷ
                </button>
                <button
                  className="btn btn-primary"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  style={{
                    backgroundColor: "#a36acb",
                    borderRadius: "7px",
                    border: "#a36acb solid 1px",
                    color: "white",
                  }}
                >
                  Tặng quà
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gift;
