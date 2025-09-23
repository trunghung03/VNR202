import { useState } from "react";
import "./NoiDung.css";

export default function NoiDung() {
  const [selectedQuote, setSelectedQuote] = useState(0)

  const quotes = [
    {
      text: "Đảng phải là một tổ chức trong sạch, vững mạnh, là người đầy tớ trung thành của nhân dân, không phải là ông chủ.",
      context: "Thể hiện quan điểm về bản chất phục vụ nhân dân của Đảng",
    },
    {
      text: "Sức mạnh của Đảng không chỉ nằm ở số lượng đảng viên mà còn ở chất lượng và đạo đức cách mạng của mỗi người.",
      context: "Nhấn mạnh tầm quan trọng của chất lượng đảng viên",
    },
    {
      text: "Đảng cần phải luôn tự làm mới, tự chỉnh đốn, giữ vững sự trong sạch, vững mạnh về chính trị, tư tưởng, đạo đức, và tổ chức.",
      context: "Về việc tự đổi mới và hoàn thiện bản thân của Đảng",
    },
  ]

  return (
<section id="article" className="article-section">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <img src="/ho-chi-minh.jpg" alt="Chủ tịch Hồ Chí Minh" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Tư tưởng Hồ Chí Minh về xây dựng Đảng</h1>
          <p className="hero-description">
            Khám phá những tư tưởng sâu sắc của Chủ tịch Hồ Chí Minh về xây dựng một Đảng trong sạch, vững mạnh, thực sự
            phục vụ nhân dân
          </p>
        </div>
      </div>

      {/* Interactive Quote Section */}
      <div className="quote-section">
        <h3 className="quote-title">Lời dạy của Bác về xây dựng Đảng</h3>
        <div className="quote-buttons">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedQuote(index)}
              className={`quote-button ${selectedQuote === index ? "active" : "inactive"}`}
            >
              Câu {index + 1}
            </button>
          ))}
        </div>
        <blockquote className="quote-text">"{quotes[selectedQuote].text}"</blockquote>
        <p className="quote-context">{quotes[selectedQuote].context}</p>
      </div>

      {/* Main Article Content */}
      <article>
        <div className="article-content">
          <section className="mb-8">
            <h2 className="article-section-header">
              <span className="section-number">1</span>
              Quan điểm về bản chất của Đảng
            </h2>

            <div className="space-y-4">
              <p className="article-text">
                <strong>
                  Hồ Chí Minh luôn nhấn mạnh rằng Đảng phải là một tổ chức trong sạch, vững mạnh, là người đầy tớ trung
                  thành của nhân dân, không phải là ông chủ.
                </strong>
                Người đã chỉ ra rằng, sức mạnh của Đảng không chỉ nằm ở số lượng đảng viên mà còn ở chất lượng và đạo
                đức cách mạng của mỗi người.
              </p>

              <div className="core-elements">
                <h4>Các yếu tố cốt lõi xây dựng Đảng:</h4>
                <ul>
                  <li>
                    <span className="bullet"></span>
                    <span>
                      <strong>Tự sửa:</strong> Đảng viên phải thường xuyên tự phê bình và sửa chữa
                    </span>
                  </li>
                  <li>
                    <span className="bullet"></span>
                    <span>
                      <strong>Phân biệt của công, của riêng:</strong> Không được lợi dụng chức vụ
                    </span>
                  </li>
                  <li>
                    <span className="bullet"></span>
                    <span>
                      <strong>Tình đồng chí:</strong> Đoàn kết, tương trợ lẫn nhau
                    </span>
                  </li>
                  <li>
                    <span className="bullet"></span>
                    <span>
                      <strong>Uy tín đảng viên:</strong> Mỗi cá nhân tạo nên uy tín chung
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="article-section-header">
              <span className="section-number">2</span>
              Các nguy cơ làm suy giảm lòng tin của nhân dân
            </h2>

            <div className="space-y-4">
              <p className="article-text">
                Nguy cơ lớn nhất mà Hồ Chí Minh cảnh báo là sự <strong>"hỏng" của Đảng</strong>, dẫn đến mất lòng tin
                của nhân dân. Các nguy cơ này bao gồm:
              </p>

              <div className="warning-grid">
                <div className="warning-box red">
                  <h4 className="warning-title red">
                    <span className="warning-icon red">!</span>
                    Tham nhũng, tiêu cực
                  </h4>
                  <p className="warning-text red">
                    Đây là "quốc nạn", làm xói mòn đạo đức cách mạng, gây bất bình trong nhân dân. Khi cán bộ, đảng viên
                    lợi dụng chức vụ, quyền hạn để trục lợi cá nhân, họ đã phản bội lại lợi ích của nhân dân.
                  </p>
                  <div className="warning-reference red">
                    Tham khảo: "Một sự thật nhức nhối", "Móc ngoặc", "bệnh sợ trách nhiệm"
                  </div>
                </div>

                <div className="warning-box orange">
                  <h4 className="warning-title orange">
                    <span className="warning-icon orange">!</span>
                    Quan liêu, xa dân
                  </h4>
                  <p className="warning-text orange">
                    Bệnh quan liêu thể hiện ở thái độ cửa quyền, xa rời quần chúng, không lắng nghe ý kiến và giải quyết
                    nguyện vọng chính đáng của nhân dân. Sự xa cách này khiến Đảng không còn hiểu dân, không còn được
                    dân tin yêu.
                  </p>
                </div>

                <div className="warning-box yellow">
                  <h4 className="warning-title yellow">
                    <span className="warning-icon yellow">!</span>
                    Suy thoái đạo đức, lối sống
                  </h4>
                  <p className="warning-text yellow">
                    Nhiều cán bộ, đảng viên không giữ được phẩm chất "cần, kiệm, liêm, chính, chí công vô tư", sa vào
                    lối sống hưởng thụ, thiếu bản lĩnh chính trị.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="article-section-header">
              <span className="section-number">3</span>
              Giải pháp củng cố uy tín và lòng tin của Đảng
            </h2>

            <div className="space-y-4">
              <p className="article-text">
                Để củng cố uy tín và niềm tin của nhân dân, <strong>Đảng cần thực hiện các giải pháp căn bản</strong>
                nhằm tự làm mới, tự chỉnh đốn một cách liên tục và kiên trì.
              </p>

              <div className="solution-grid">
                <div className="solution-box green">
                  <h4 className="solution-title green">1. Đấu tranh chống tham nhũng</h4>
                  <p className="solution-text green">
                    Cần phải kiên quyết, kiên trì xử lý nghiêm các vụ việc tham nhũng, không có vùng cấm, không có ngoại
                    lệ.
                  </p>
                  <div className="solution-reference green">Khẳng định sự trong sạch của Đảng</div>
                </div>

                <div className="solution-box blue">
                  <h4 className="solution-title blue">2. Thực hành dân chủ, gần dân</h4>
                  <p className="solution-text blue">
                    Đảng cần lắng nghe và tôn trọng ý kiến của nhân dân, thực sự coi dân là "gốc", xây dựng niềm tin qua
                    tương tác và đối thoại.
                  </p>
                  <div className="solution-reference blue">
                    Tham khảo: "Niềm tin của nhân dân", "Sự tin tưởng của đại biểu Quốc hội"
                  </div>
                </div>

                <div className="solution-box purple">
                  <h4 className="solution-title purple">3. Nâng cao chất lượng cán bộ</h4>
                  <p className="solution-text purple">
                    Mỗi cán bộ, đảng viên phải thường xuyên tự phê bình và phê bình, tự soi lại bản thân để "tự sửa".
                    Cần xây dựng đội ngũ có đủ cả tâm và tầm.
                  </p>
                  <div className="solution-reference purple">Uy tín Đảng từ uy tín từng đảng viên</div>
                </div>

                <div className="solution-box indigo">
                  <h4 className="solution-title indigo">4. Tăng cường kiểm tra, giám sát</h4>
                  <p className="solution-text indigo">
                    Cần có cơ chế kiểm tra, giám sát chặt chẽ cả từ nội bộ Đảng và từ phía nhân dân, đảm bảo "trên dưới
                    đồng lòng, dọc ngang thông suốt".
                  </p>
                  <div className="solution-reference indigo">Ngăn chặn nguy cơ từ sớm, từ xa</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="article-section-header">
              <span className="section-number">4</span>Ý nghĩa và giá trị thời đại
            </h2>

            <div className="space-y-4">
              <p className="article-text">
                Tư tưởng Hồ Chí Minh về xây dựng Đảng không chỉ có ý nghĩa lịch sử mà còn
                <strong> giữ nguyên giá trị định hướng trong thời đại mới</strong>, khi Đảng đối mặt với nhiều thách
                thức trong quá trình đổi mới và hội nhập.
              </p>

              <div className="modern-message">
                <h4>Thông điệp cho thời đại mới</h4>
                <div className="message-grid">
                  <div className="message-item">
                    <div className="message-icon">
                      <span>🏛️</span>
                    </div>
                    <p className="message-title">Đảng trong sạch</p>
                    <p className="message-subtitle">Vững mạnh, phục vụ nhân dân</p>
                  </div>
                  <div className="message-item">
                    <div className="message-icon">
                      <span>🤝</span>
                    </div>
                    <p className="message-title">Gần dân, hiểu dân</p>
                    <p className="message-subtitle">Lắng nghe, đối thoại</p>
                  </div>
                  <div className="message-item">
                    <div className="message-icon">
                      <span>⚖️</span>
                    </div>
                    <p className="message-title">Chống tham nhũng</p>
                    <p className="message-subtitle">Kiên quyết, không ngoại lệ</p>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <p className="conclusion-title">Kết luận:</p>
                <p className="conclusion-text">
                  "Để tránh nguy cơ mất lòng tin của nhân dân, Đảng cần phải luôn tự làm mới, tự chỉnh đốn, giữ vững sự
                  trong sạch, vững mạnh về chính trị, tư tưởng, đạo đức, và tổ chức. Chỉ khi Đảng thực sự vì dân, phục
                  vụ dân, thì niềm tin của nhân dân mới được củng cố và duy trì bền vững."
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </section>
  );
}
