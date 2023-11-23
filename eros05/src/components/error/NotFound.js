import "./style/UnAuthor.css";
import {Link} from "react-router-dom";


export function NotFound() {
    return (
        <div id="thienbb-notfound">
            <div className="thienbb-notfound-bg">
            </div>
            <div className="thienbb-notfound">
                <div className="thienbb-notfound-404">
                    <span className="thienbb-notfound-title">OOPS!</span>
                </div>
                <span className="thienbb-notfound-title-2">Tính năng đang bảo trì, vui lòng liên hệ QTV để được hỗ trợ!</span>
                <div>
                    <Link to={"/"} className="thienbb-home-btn" >Trang chủ</Link>
                </div>
            </div>
        </div>
    );
}