import feedback7 from "./image/feedback7.jpg"
export default function TimHieu(){
    return (
        <div className="container" style={{margin: "100px 5%", alignItems: "center"}}>
            <div style={{margin: "50px 100px"}}>
                <h1 style={{fontFamily: "Agbalumo, sans-serif",fontSize: "2rem"}}>Vậy tại sao bạn nên chọn ứng dụng hẹn hò
                    như
                    Eros05?</h1>
                <p style={{fontFamily: "Nunito Sans, sans-serif"}}>Khi nói tới ứng
                    dụng hẹn hò, bạn có khả nhiều lựa chọn:Tinder, Badoo, Bumble, Joyride, Match, POF, OKCupid và ngay
                    cả
                    Instagram
                    hay Facebook cũng trở thành điểm kết nối khá phổ biến giúp mọi người gặp gỡ nhau. Dù bạn đang muốn
                    tìm
                    "riêu lớp", bồ bịch hay chỉ đơn giản là tìm người kết nối trò chuyện, bạn vẫn muốn tìm ứng dụng phù
                    hợp
                    nhất cho mình. Và đời này đâu phải mọi thứ lúc nào cũng rõ ràng đen trắng — khi bạn muốn gặp gỡ
                    người
                    mới, những người bạn từ Tinder có thể giúp bạn qua các tính năng được thiết kế theo hướng biến những
                    điều không thể thành có thể. Hẹn hò qua mạng từ nay còn dễ hơn nữa!</p>
                <p className="">Chúng tôi không hề
                    nói quá về chuyện Eros05 là một trang web miễn phí cool nhất — hãy thử tìm hiểu nhanh về Eros05 và
                    bạn
                    có toàn quyền quyết định xem liệu chuyện này có thật như những gì mọi người vẫn nói.</p>
            </div>

            <div style={{display: "grid",gridTemplateColumns: "repeat(2,1fr)",gap: "1rem"}}>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={feedback7} alt="Ảnh feedback"/>
                </div>
                <div>
                    <div style={{textAlign: "left"}}>
                        <h2 style={{fontFamily: "Agbalumo, sans-serif",fontSize: "1rem"}}>Cùng chúng tôi chu du khắp thiên
                            hạ</h2>
                        <p>Khi bạn muốn gặp gỡ người bản địa thì dù bạn đang ở bất kỳ thành phố nào trên thế giới, sẽ
                            luôn có
                            một
                            ứng dụng giúp bạn thỏa lòng thỏa chí — đó chính là Tinder. Chat với mọi người "dù gần nhà
                            hay xa
                            ngõ"
                            qua các tính năng cho phép bạn nối dây "tơ hồng" với bất kỳ ai ở bất kỳ đâu trên thế giới
                            này.
                            Tinder
                            chính là người bạn đồng hành trong chuyến chu du thỏa chí tang bồng của bạn. Chúng tôi có
                            khả năng
                            đưa
                            bạn tới gần hơn với 190 quốc gia, điều mà ngay cả mấy huynh đệ bên OKCupid và Plenty of Fish
                            cũng
                            khó
                            nói mạnh được.</p>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <div style={{textAlign: "right"}}>
                        <h2 style={{fontFamily: "Agbalumo, sans-serif",fontSize: "1rem"}}>Hẹn hò an toàn hơn với tính năng
                            Video
                            Chat</h2>
                        <p>Ai mà chẳng có chút háo hức khi gặp gỡ người mới ngoài đời, nhưng hẹn hò trong thời COVID-19
                            đâu phải
                            chuyện dễ dàng vì chúng ta đều phải đặt an toàn lên hàng đầu. Khi mà khoảng cách giữa hai
                            người 2
                            mét
                            vẫn là chưa đủ để đảm bảo an toàn thì tính năng Video Chat chính là cứu cánh giúp chúng ta
                            thỏa ước
                            trò
                            chuyện "mặt đối mặt" với bạn tương hợp, để các bạn có thể giữ kết nối qua mạng.</p>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{textAlign: "left"}}>
                        <h2 style={{fontFamily: "Agbalumo, sans-serif",fontSize: "1rem"}}>Khám phá các sở thích
                            của bạn</h2>
                        <p>Thật dễ dàng trò chuyện với bạn tương hợp khi biết rằng hai bên có chung một vài sở thích.
                            Ứng dụng
                            Tinder cho phép bạn thêm Sở thích vào hồ sơ của mình và kết nối với những người cùng chung
                            "chí
                            hướng".</p>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{textAlign: "right"}}>
                        <h2 style={{fontFamily: "Agbalumo, sans-serif",fontSize: "1rem"}}>Kết nối với mọi người khắp
                            nơi</h2>
                        <p>Vượt ra ngoài thiết đặt khoảng cách của bạn và chat với mọi người trên khắp địa cầu cùng tính
                            năng Hộ
                            Chiếu. Tất cả những gì bạn cần làm là nâng cấp lên thuê bao hạng Eros05 Platinum, từ đó bạn
                            có thể kết
                            nối tương hợp với mọi người khắp nơi từ bất kỳ đâu trên thế giới.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}