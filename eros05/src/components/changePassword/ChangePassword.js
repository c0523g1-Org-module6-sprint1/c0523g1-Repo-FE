import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as changepasswordService from "../../service/changePassword/changepassword";
import { getUsernameByJwt } from "../../service/login/securityService";
function Changepassword() {
  const [passwordNow, setPasswordNow] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [status, setStatus] = useState(false);
  const [buttonStatus, setButtonStatuss] = useState(false);
  const [userName, setuserName] = useState(null);

  const getUserName = async () => {
    const result = await getUsernameByJwt();
    if (result !== null) {
      setuserName(result);
    }
  };

  useEffect(() => {
    getUserName();
    checkPassword();
    checkempty();
  }, [password2]);

  const checkPassword = () => {
    if (password1 !== password2) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };
  const handleSaveChanges = async () => {
    if (status || passwordNow === "" || password1 === "" || password2 === "") {
      setStatus(true);
      setButtonStatuss(true);
    } else {
      const account = {
        userName: userName,
        password: passwordNow,
        newPassword: password2,
      };
      const flag = await changepasswordService.changepassword(account);
      if (flag === 200) {
        toast.success("đổi mật khẩu thành công");
        close();
      }
      if (flag === undefined) {
        setButtonStatuss(true);
        toast.error("sai mật khẩu vui lòng nhập lại");
      }
    }
  };
  const close = () => {
    setPassword1("");
    setPassword2("");
    setPasswordNow("");
    setButtonStatuss(false);
    setStatus(false);
  };
  const checkempty = () => {};
  const checkpassNow = (value) => {
    setPasswordNow(value);
  };
  const checkpass = (value) => {
    setPassword1(value);
  };
  const checkpass2 = (value) => {
    setPassword2(value);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15rem",
        }}
      >
        <div>
          <div>
            <div>
              <h1 style={{ left: "10%", top: "-3rem" }}>Đổi mật khẩu</h1>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "1rem",
                justifyContent: "space-between",
                // alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  padding: "0.2rem",
                  marginTop: "0.4rem",
                }}
              >
                Mật khẩu hiện tại:
              </div>
              <div>
                <input
                  onChange={(event) => checkpassNow(event.target.value)}
                  style={{
                    padding: "0.5rem 2rem",
                    borderRadius: "20px",
                    border: "2px solid #a36acb",
                    border: `2px solid ${
                      status && passwordNow === "" ? "red" : "#a36acb"
                    }`,
                  }}
                  value={passwordNow}
                  className="input-change"
                  type="password"
                />
                {buttonStatus ? (
                  <div style={{ color: "red" }}>Mật khẩu không đúng!</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "1rem",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  padding: "0.2rem",
                }}
              >
                Mật khẩu mới:
              </div>
              <div>
                <input
                  value={password1}
                  onChange={(event) => checkpass(event.target.value)}
                  style={{
                    padding: "0.5rem 2rem",
                    borderRadius: "20px",
                    border: "2px solid #a36acb",
                  }}
                  className="input-change"
                  type="password"
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "1rem",
                justifyContent: "space-between",
                alignItems: "",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  padding: "0.2rem",
                  marginTop: "0.4rem",
                }}
              >
                Nhập lại mật khẩu:
              </div>
              <div>
                <input
                  value={password2}
                  onChange={(event) => checkpass2(event.target.value)}
                  style={{
                    padding: "0.5rem 2rem",
                    borderRadius: "20px",
                    border: "2px solid #a36acb",
                  }}
                  className="input-change"
                  type="password"
                />
                {status ? (
                  <div style={{ color: "red" }}>Mật khẩu không trùng khớp</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <div
                  onClick={close}
                  style={{
                    // color: "white",
                    padding: "0.8rem 2rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    backgroundColor: "#adb5bd",
                  }}
                >
                  Huỷ
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                }}
              >
                <button
                  onClick={(value) => handleSaveChanges(value)}
                  style={{
                    color: "white",
                    padding: "0.7rem 1rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#a36acb",
                  }}
                >
                  <div
                    style={{ color: "white" }}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Lưu thay đổi
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Changepassword;
