import "./style/UnAuthor.css";
import {Link} from "react-router-dom";


export function UnAuthor() {
    return (
        <div id="thienbb-notfound">
            <div className="thienbb-notfound-bg">
            </div>
            <div className="thienbb-notfound">
                <div className="thienbb-notfound-404">
                    <span className="thienbb-notfound-title">Oops!</span>
                </div>
                <span className="thienbb-notfound-title-2">Bạn không có quyền truy cập vào trang này!</span>
                <div>
                    <Link to={"/"} className="thienbb-home-btn" >Trang chủ</Link>
                </div>
            </div>
        </div>
    );
}