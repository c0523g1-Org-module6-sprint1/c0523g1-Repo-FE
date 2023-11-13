import React from 'react';
import './Footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-content">
                    <div className="footer-items">
                        <h2>Chính sách</h2>
                        <ul>
                            <li>Chính sách Cookie</li>
                            <li>Điều khoản</li>
                            <li>Quyền riêng tư</li>
                            <li>Sở hữu trí tuệ</li>
                        </ul>
                    </div>
                    <div className="footer-items">
                        <h2>Quick Links</h2>
                        <ul>
                            <li>Về chúng tôi</li>
                            <li>Các điều khoản và điều kiện</li>
                            <li>Chính sách bảo mật</li>
                            <li>FAQs</li>
                        </ul>
                    </div>
                    <div className="footer-items">
                        <h2>Sitemap</h2>
                        <ul>
                            <li>Tìm hiểu</li>
                            <li>An toàn</li>
                            <li>Hỗ trợ</li>
                            <li>Liên lạc</li>
                        </ul>
                    </div>
                    <div className="footer-items">
                        <h2>Thông tin</h2>
                        <ul className="info">
                            <li>
                                <i className="bi bi-geo-alt-fill"></i>
                                ABCD, ABCD, Viet Nam
                            </li>
                            <li><i className="bi bi-envelope-fill"></i> c0523g1@gmail.com</li>
                            <li><i className="bi bi-telephone-fill"></i> (+84)12-345-6789</li>
                        </ul>
                        <ul className="social">
                            <li>
                                <i className="fa-brands fa-facebook fs-3 text-white"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-square-google-plus fs-3 text-white"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-instagram fs-3 text-white"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-content">
                    <div>
                        <span style={{color: "#b2b2b2"}}>© 2023 All rights reserved | </span>
                        <span className="copyright__content" style={{color: "#b2b2b2"}}>Designed by C0523G1</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;