import "./NoiDung.css";

export default function NoiDung() {
  return (
    <section id="article" className="article-section">
      <div className="hero-section">
        <div className="hero-inner">
          <div className="hero-text">
            <h1 className="hero-title">NHIỆM VỤ CÁCH MẠNG CỦA MIỀN BẮC VÀ MIỀN NAM GIAI ĐOẠN 1954 - 1965</h1>
          </div>

          <div className="hero-image">
            {/* Put an image file at public/assets/banner-ai.jpg or use an external URL */}
            <img src="/public/banner.jpg" alt="Banner image" />
          </div>
        </div>
      </div>

      <article>
        <div className="article-content">
          <section className="mb-8">
            <h2 className="article-section-header">
              <span className="section-number">I</span>
              Bối cảnh lịch sử
            </h2>

            <div className="section-grid">
              <div className="section-body">
                <div className="space-y-4">
                  <p className="article-text">
                    Sau Hiệp định Giơnevơ (7/1954), đất nước bị chia cắt làm hai miền với hai chế độ chính trị, xã hội khác
                    nhau. Miền Bắc hoàn toàn giải phóng đi lên chủ nghĩa xã hội; miền Nam do Mỹ và chính quyền đối phương
                    (tay sai) kiểm soát.
                  </p>

                  <p className="article-text">
                    Thách thức lớn nhất: Đế quốc Mỹ trở thành kẻ thù trực tiếp của nhân dân Việt Nam, không chịu thực hiện
                    hòa bình thống nhất đất nước.
                  </p>

                  <h3 className="subheader">Đường lối chiến lược chung (Đại hội III - 9/1960)</h3>
                  <ul>
                    <li>Tiến hành đồng thời hai chiến lược cách mạng khác nhau ở hai miền: phát triển chế độ xã hội chủ nghĩa ở miền Bắc và tiến hành cách mạng dân tộc dân chủ nhân dân ở miền Nam.</li>
                    <li>Mục tiêu chung: Giải phóng miền Nam, hòa bình, thống nhất đất nước.</li>
                    <li>Vị trí, vai trò của hai miền:
                      <ul>
                        <li>Cách mạng miền Bắc giữ vai trò quyết định về mặt phát triển của toàn bộ cách mạng Việt Nam và sự nghiệp thống nhất.</li>
                        <li>Cách mạng miền Nam giữ vai trò quyết định trực tiếp đối với sự nghiệp giải phóng miền Nam và thống nhất đất nước.</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="section-image">
                <img src="/assets/section-1.jpg" alt="Bối cảnh lịch sử" />
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="article-section-header">
              <span className="section-number">II</span>
              Nhiệm vụ và Sự lãnh đạo của Đảng đối với Cách mạng Miền Bắc (Xây dựng CNXH)
            </h2>
            <div className="section-grid reverse">
              <div className="section-image">
                <img src="/assets/section-2.jpg" alt="Cách mạng miền Bắc" />
              </div>

              <div className="section-body">
                <div className="space-y-4">
                  <h4 className="subheader">A. Giai đoạn 1954–1960: Khôi phục kinh tế, cải tạo xã hội chủ nghĩa</h4>
                  <ul>
                    <li>Nhiệm vụ chủ yếu (9/1954): Hàn gắn vết thương chiến tranh, phục hồi kinh tế quốc dân (ưu tiên nông nghiệp), ổn định xã hội và đời sống nhân dân, tăng cường quan hệ quốc tế.</li>
                    <li>Hoàn thành cải cách dân chủ: lãnh đạo nhân dân miền Bắc đấu tranh buộc đối phương rút quân, hoàn thành giải phóng miền Bắc; cơ bản hoàn thành cải cách ruộng đất (đến 7/1956), xóa bỏ chế độ chiếm hữu ruộng đất phong kiến.</li>
                    <li>Cải tạo xã hội chủ nghĩa: Kế hoạch 3 năm (1958–1960) phát triển kinh tế, văn hóa; cải tạo kinh tế cá thể và tư bản tư doanh; hợp tác hóa nông nghiệp theo nguyên tắc tự nguyện, cùng có lợi, quản lý dân chủ; cải tạo công thương nghiệp tư bản tư doanh bằng chính sách hoà bình (công tư hợp doanh).</li>
                  </ul>

                  <h4 className="subheader">B. Giai đoạn 1961–1965: Phát triển thế tiến công và chi viện miền Nam</h4>
                  <ul>
                    <li>Nhiệm vụ trung tâm: Thực hiện Kế hoạch 5 năm lần thứ nhất (1961–1965) nhằm xây dựng cơ sở vật chất-kỹ thuật của CNXH và hoàn thành cải tạo xã hội chủ nghĩa.</li>
                    <li>Mục tiêu: Hoàn thiện quan hệ sản xuất xã hội chủ nghĩa; xây dựng cơ sở vật chất, cải thiện đời sống; đảm bảo an ninh quốc phòng, làm hậu thuẫn cho cuộc đấu tranh thống nhất đất nước.</li>
                    <li>Sự lãnh đạo và phong trào thi đua: Triển khai nhiều phong trào (ví dụ: "Ba sẵn sàng", "Ba đảm đang", phong trào làm việc tăng năng suất...) để tăng cường sản xuất và chi viện cho miền Nam.</li>
                    <li>Chi viện miền Nam: Tăng cường chi viện qua Đường Hồ Chí Minh trên bộ (559) và trên biển (759); số lượng bộ đội và vật chất chi viện đến 1965 tăng nhiều so với 1961.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="article-section-header">
              <span className="section-number">III</span>
              Nhiệm vụ và Sự lãnh đạo của Đảng đối với Cách mạng Miền Nam (Cách mạng Dân tộc Dân chủ Nhân dân)
            </h2>

            <div className="space-y-4">
              <div className="section-grid">
                <div className="section-body">
                  <h4 className="subheader">A. Giai đoạn 1954–1960: Từ giữ gìn lực lượng sang tiến công</h4>
                  <ul>
                    <li>Kẻ thù chính: Đế quốc Mỹ và chính quyền tay sai Ngô Đình Diệm.</li>
                    <li>Nhiệm vụ (9/1954): Đấu tranh đòi thi hành Hiệp định Giơnevơ; tập hợp mọi lực lượng dân tộc, dân chủ, hòa bình, thống nhất; đấu tranh nhằm lật đổ chính quyền bù nhìn thân Mỹ.</li>
                    <li>Phương thức đấu tranh: Chuyển từ đấu tranh quân sự sang đấu tranh chính trị; sau đó kết hợp chính trị và vũ trang (Nghị quyết 15 - 1/1959) tiến tới khởi nghĩa vũ trang.</li>
                    <li>Thắng lợi của phong trào Đồng khởi (từ 1/1960): Chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.</li>
                  </ul>

                  <h4 className="subheader">B. Giai đoạn 1961–1965: Đánh bại Chiến lược "Chiến tranh Đặc biệt"</h4>
                  <ul>
                    <li>Bối cảnh: Mỹ áp dụng "Chiến tranh đặc biệt" với cố vấn, vũ khí Mỹ và quân chủ lực VNCH; dùng trực thăng, thiết xa và chiến thuật chuyên nghiệp.</li>
                    <li>Sự lãnh đạo của Đảng (Chỉ thị 1/1961 &amp; 2/1962): Giữ vững thế tiến công; phát triển đấu tranh vũ trang song song với chính trị; tiến công trên cả ba vùng (đô thị, đồng bằng, rừng núi) bằng ba mũi giáp công (quân sự, chính trị, binh vận).</li>
                    <li>Kết quả: Quân và dân miền Nam với tinh thần chủ động đã làm phá sản chiến lược "Chiến tranh đặc biệt" của Mỹ vào giữa năm 1965.</li>
                  </ul>
                </div>

                <div className="section-image">
                  <img src="/assets/section-3.jpg" alt="Cách mạng miền Nam" />
                </div>
              </div>
            </div>
          </section>

          {/* Section IV removed as requested */}
        </div>
      </article>
    </section>
  );
}
