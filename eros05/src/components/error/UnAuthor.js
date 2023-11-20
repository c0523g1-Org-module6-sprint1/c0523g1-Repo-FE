import "./UnAuthor.css";

export default function UnAuthor() {
    return (
        <div id="thienbb-notfound">
            <div className="thienbb-notfound-bg">
            </div>
            <div className="thienbb-notfound">
                <div className="thienbb-notfound-404">
                    <span className="thienbb-notfound-title">Oops!</span>
                </div>
                <span className="thienbb-notfound-title-2">Bạn không có quyền truy cập vào trang này!</span>
                <a href="" className="thienbb-home-btn">Trang chủ</a>
            </div>
        </div>
    );
}