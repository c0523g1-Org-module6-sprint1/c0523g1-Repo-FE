import "../update_account/css/header.css"
export function Header(){
    return(
        <div>
            <header className="header">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="d-flex align-items-center justify-content-between">
                            <a className="navbar-brand" href="/">
                                <img
                                    src="/Logo.jpg"
                                    style={{ width: 90 }}
                                />
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul
                                className="navbar-nav me-auto mb-2 mb-lg-0"
                                style={{ marginLeft: "30%" }}
                            >
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="/"
                                        style={{ paddingLeft: 40 }}
                                    >
                                        <i
                                            className="fa-solid fa-building-shield"
                                            style={{ color: "#ffffff", fontSize: 30 }}
                                        />
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="/"
                                        style={{ paddingLeft: 40 }}
                                    >
                                        <i
                                            className="fa-solid fa-user-plus"
                                            style={{ color: "#ffffff", fontSize: 30 }}
                                        />
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="/"
                                        style={{ paddingLeft: 40 }}
                                    >
                                        <i
                                            className="fa-solid fa-crown"
                                            style={{ color: "#f8f9fc", fontSize: 30 }}
                                        />
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="/"
                                        style={{ paddingLeft: 40 }}
                                    >
                                        <i
                                            className="fa-solid fa-people-group"
                                            style={{ color: "#ffffff", fontSize: 30 }}
                                        />
                                    </a>
                                </li>
                            </ul>
                            <form>
                                <div className="input-group" style={{ width: 250 }}>
                                    <a type="button">
              <span
                  style={{ borderRadius: "20px 0px 0px 20px", fontSize: 24 }}
                  className="input-group-text"
                  id="addon-wrapping"
              >
                <i className="fa-solid fa-magnifying-glass" />
              </span>
                                    </a>
                                    <input
                                        style={{ borderRadius: "0px 20px 20px 0px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập tên"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                    />
                                </div>
                            </form>
                        </div>
                        <a className="nav-link active" aria-current="page" href="/">
                            <i
                                className="fa-solid fa-right-from-bracket"
                                style={{ color: "#ffffff", fontSize: 30 }}
                            />
                        </a>
                    </nav>
                </div>
            </header>
        </div>
    )
}