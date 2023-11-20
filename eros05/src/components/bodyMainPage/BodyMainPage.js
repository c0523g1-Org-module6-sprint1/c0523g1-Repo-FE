import React from 'react';
import './BodyMainPage.css'
import feedbackImg1 from './image/feedback2.jpg'
import feedbackImg2 from './image/feedback3.jpg'
import feedbackImg3 from './image/feedback7.jpg'
import feedbackImg4 from './image/feedback8.jpg'
import {useNavigate} from "react-router-dom";
const BodyMainPage = () => {
    const navigate = useNavigate();
    const goRegisterPage = ()=>{
        navigate(`register`)
    }
    return (
        <section className="body-main-page">
            <div className="carousel">
                <div className="carousel-content">
                    <div className="description">
                        <h1 className="typeing-text">Thấy bạn ế hơi lâu?</h1>
                    </div>
                    <div className="lien-carousel-btn d-flex justify-content-center align-items-center">
                        <button className="btn" onClick={goRegisterPage}>
                            Đăng Ký Ngay
                        </button>
                    </div>
                </div>f
            </div>
            <div className="feedbacks">
                <div className="feedback-list">
                    <section id="card1" className="card">
                        <img alt={""} src={feedbackImg1}/>
                        <div className="card__content">
                            <p className="card__title">Puka & Gin</p>
                            <p className="card__description">
                                Tôi yêu anh ấy từ ánh nhìn đầu tiên. Lúc đầu chúng tôi trò chuyện như bạn bè ở đây, vì
                                có quá nhiều sở thích chung ^^. Sau đó 1 tháng, anh ấy hẹn gặp tôi ở quán cafe gần nhà.
                                Anh đã rất chủ động, hài hước và lãng mạn.
                            </p>
                        </div>
                    </section>


                    <section id="card2" className="card">
                        <img alt={''} src={feedbackImg2}/>
                        <div className="card__content">
                            <p className="card__title">Chuột & Heo</p>
                            <p className="card__description">
                                Chúng tôi bắt đầu nói chuyện lúc Covid diễn ra, cả 2 đều làm việc online nên tình cờ
                                tham gia Eros. Bây giờ cô ấy là bà xã của tôi. Bức ảnh này là hình cưới của chúng tôi.
                                Tôi rất mong các bạn sẽ sớm tìm thấy tình yêu của đời mình.
                            </p>
                        </div>
                    </section>


                    <section id="card3" className="card">
                        <img alt={''} src={feedbackImg3}/>
                        <div className="card__content">
                            <p className="card__title">Hưng & Thắng</p>
                            <p className="card__description">
                                Bọn tôi đều rất con nít, nên định lên đây để trap thôi. Ai dè dính luôn hì hì. Anh ấy
                                cũng dần trưởng thành hơn, yêu tôi hơn, và tôi cũng rất yêu anh ấy!!!
                            </p>
                        </div>
                    </section>

                    <section id="card4" className="card">
                        <img alt={''} src={feedbackImg4}/>
                        <div className="card__content">
                            <p className="card__title">Đạt & Thiện</p>
                            <p className="card__description">
                                Tôi thật sự hạnh phúc! Tôi thật sự hạnh phúc! Tôi thật sự hạnh phúc! Điều quan trọng nói
                                3 lần. Tôi cởi bỏ mọi ánh nhìn dị nghị của mọi người từ khi gặp anh ấy. Anh ấy cho tôi
                                cảm nhận được sự yêu thương chưa bao giờ có. Cảm ơn anh &lt;3
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default BodyMainPage;