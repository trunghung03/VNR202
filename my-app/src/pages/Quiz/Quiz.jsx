"use client"

import { useState, useEffect } from "react"
import "./Quiz.css"
import { leaderboardService } from "../../firebase/leaderboardService"

const quizData = 
[
  {
    "id": 1,
    "question": "Đại hội nào của Đảng đã xác lập đường lối chiến lược chung cho cách mạng Việt Nam giai đoạn 1954–1965?",
    "options": ["Đại hội II (2/1951)", "Đại hội III (9/1960)", "Hội nghị Trung ương 15 (1/1959)", "Hội nghị Trung ương 9 (12/1963)"],
    "correctAnswer": 1,
    "explanation": "Đường lối chiến lược chung cho cả hai miền trong giai đoạn 1954-1965 đã được xác lập tại Đại hội III của Đảng vào tháng 9 năm 1960.",
    "category": "history",
    "difficulty": "basic"
  },
  {
    "id": 2,
    "question": "Theo đường lối của Đảng, cách mạng miền Bắc có vai trò gì?",
    "options": ["Quyết định trực tiếp", "Hỗ trợ quốc tế", "Quyết định nhất", "Tiền tuyến chủ yếu"],
    "correctAnswer": 2,
    "explanation": "Đảng xác định cách mạng xã hội chủ nghĩa ở miền Bắc giữ vai trò quyết định nhất đối với sự phát triển của toàn bộ cách mạng Việt Nam.",
    "category": "history",
    "difficulty": "basic"
  },
  {
    "id": 3,
    "question": "Nhiệm vụ trung tâm trong công cuộc xây dựng XHCN ở miền Bắc là gì?",
    "options": ["Cải cách ruộng đất", "Công nghiệp hóa XHCN", "Xóa nạn mù chữ", "Phát triển thương nghiệp"],
    "correctAnswer": 1,
    "explanation": "Đường lối cách mạng XHCN ở miền Bắc xác định công nghiệp hóa xã hội chủ nghĩa là nhiệm vụ trung tâm trong suốt thời kỳ quá độ.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 4,
    "question": "Phong trào thi đua 'Đại Phong' được triển khai trong lĩnh vực nào ở miền Bắc?",
    "options": ["Công nghiệp", "Giáo dục", "Quân đội", "Nông nghiệp"],
    "correctAnswer": 3,
    "explanation": "Phong trào thi đua 'Đại Phong' là phong trào thi đua tiêu biểu trong lĩnh vực nông nghiệp ở miền Bắc.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 5,
    "question": "Tuyến đường vận tải chiến lược trên biển chi viện cho miền Nam được biết đến với tên gọi nào?",
    "options": ["Đường mòn Hồ Chí Minh", "Tàu không số", "Con đường tơ lụa", "Hành lang Đông - Tây"],
    "correctAnswer": 1,
    "explanation": "Tuyến đường vận tải chiến lược chi viện cho miền Nam trên biển được thực hiện bởi những con 'tàu không số' đầy huyền thoại.",
    "category": "history",
    "difficulty": "basic"
  },
  {
    "id": 6,
    "question": "Hội nghị Trung ương 15 (1/1959) đã quyết định chuyển hướng chiến lược ở miền Nam sang:",
    "options": ["Đấu tranh hòa bình", "Đấu tranh chính trị", "Sử dụng bạo lực cách mạng", "Giữ gìn lực lượng"],
    "correctAnswer": 2,
    "explanation": "Hội nghị Trung ương 15 (1/1959) đã đề ra Nghị quyết chuyển hướng chiến lược, xác định con đường cách mạng miền Nam là sử dụng bạo lực cách mạng.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 7,
    "question": "Phong trào nào là kết quả trực tiếp từ Nghị quyết 15, đánh dấu bước nhảy vọt của cách mạng miền Nam?",
    "options": ["Thi đua yêu nước", "Đồng khởi", "Phá ấp chiến lược", "Tổng tiến công"],
    "correctAnswer": 1,
    "explanation": "Sau Nghị quyết 15, phong trào Đồng khởi (bắt đầu từ 1/1960) đã bùng nổ, đưa cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.",
    "category": "history",
    "difficulty": "basic"
  },
  {
    "id": 8,
    "question": "Giai đoạn 1961–1965, đế quốc Mỹ đã triển khai chiến lược chiến tranh nào ở miền Nam?",
    "options": ["Chiến tranh cục bộ", "Chiến tranh đặc biệt", "Chiến tranh đơn phương", "Việt Nam hóa chiến tranh"],
    "correctAnswer": 1,
    "explanation": "Trong giai đoạn 1961–1965, Mỹ và chính quyền Sài Gòn đã thực hiện chiến lược 'Chiến tranh đặc biệt' ở miền Nam Việt Nam.",
    "category": "history",
    "difficulty": "basic"
  },
  {
    "id": 9,
    "question": "Hai chiến thuật quân sự mới được Mỹ áp dụng trong 'Chiến tranh đặc biệt' là gì?",
    "options": ["Tìm và diệt, bình định", "Đóng và giữ", "Trực thăng vận, thiết xa vận", "Dồn dân, lập ấp"],
    "correctAnswer": 2,
    "explanation": "Hai chiến thuật quân sự chủ yếu được Mỹ áp dụng trong 'Chiến tranh đặc biệt' là 'trực thăng vận' và 'thiết xa vận'.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 10,
    "question": "'Ba mũi giáp công' được Đảng xác định trong cuộc đấu tranh chống 'Chiến tranh đặc biệt' bao gồm:",
    "options": ["Kinh tế, chính trị, ngoại giao", "Quân sự, chính trị, binh vận", "Công, nông, binh", "Rừng núi, đồng bằng, đô thị"],
    "correctAnswer": 1,
    "explanation": "Đảng đã chỉ đạo tiến công địch trên cả ba vùng chiến lược bằng ba mũi giáp công: quân sự, chính trị và binh vận.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 11,
    "question": "Tổ chức nào được thành lập vào tháng 10/1961 để trực tiếp lãnh đạo cách mạng miền Nam?",
    "options": ["Trung ương Cục miền Nam", "Mặt trận Tổ quốc Việt Nam", "Quân giải phóng miền Nam", "Chính phủ Cách mạng lâm thời"],
    "correctAnswer": 0,
    "explanation": "Để củng cố sự lãnh đạo, Trung ương Cục miền Nam đã được thành lập vào tháng 10 năm 1961.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 12,
    "question": "Mặt trận Dân tộc giải phóng miền Nam Việt Nam được thành lập vào thời gian nào?",
    "options": ["Tháng 1 năm 1959", "Tháng 9 năm 1960", "Tháng 12 năm 1960", "Tháng 2 năm 1961"],
    "correctAnswer": 2,
    "explanation": "Mặt trận Dân tộc giải phóng miền Nam Việt Nam ra đời vào ngày 20/12/1960 để đoàn kết mọi tầng lớp nhân dân chống Mỹ - Diệm.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 13,
    "question": "Một trong những sai lầm nghiêm trọng trong cải cách ruộng đất ở miền Bắc là gì?",
    "options": ["Chia đất không đều", "Bỏ qua giai cấp địa chủ", "Đấu tố sai, quy kết nhầm lẫn", "Chỉ tập trung vào nông nghiệp"],
    "correctAnswer": 2,
    "explanation": "Trong cải cách ruộng đất, đã xảy ra những sai lầm nghiêm trọng như quy kết địa chủ sai, áp dụng máy móc phương pháp đấu tố, dẫn tới oan sai.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 14,
    "question": "Đâu là một trong những trận thắng quân sự tiêu biểu, làm phá sản chiến thuật mới của Mỹ - Ngụy trong 'Chiến tranh đặc biệt'?",
    "options": ["Trận Điện Biên Phủ", "Trận Ấp Bắc", "Trận Đồng Xoài", "Trận Vạn Tường"],
    "correctAnswer": 1,
    "explanation": "Trận Ấp Bắc (1/1963) là một minh chứng quân Mỹ - Diệm gặp thất bại nặng nề trước lực lượng vũ trang cách mạng, làm phá sản các chiến thuật mới của địch.",
    "category": "history",
    "difficulty": "intermediate"
  },
  {
    "id": 15,
    "question": "Phương châm đấu tranh ở vùng đô thị miền Nam trong giai đoạn 1961-1965 là gì?",
    "options": ["Lấy đấu tranh vũ trang là chủ yếu", "Kết hợp vũ trang và chính trị", "Lấy đấu tranh chính trị là chủ yếu", "Lấy binh vận làm trọng tâm"],
    "correctAnswer": 2,
    "explanation": "Theo chỉ đạo của Đảng, phương châm đấu tranh ở vùng đô thị là lấy đấu tranh chính trị làm chủ yếu.",
    "category": "history",
    "difficulty": "intermediate"
  }
]

const categories = {
  ideology: "Tư tưởng chính trị",
  history: "Lịch sử",
  legacy: "Di sản",
  philosophy: "Triết học",
}

const difficulties = {
  basic: "Cơ bản",
  intermediate: "Trung bình",
  advanced: "Nâng cao",
}

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds per question
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  const [showNameInput, setShowNameInput] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [submittingScore, setSubmittingScore] = useState(false)
  const [scoreSubmitted, setScoreSubmitted] = useState(false)

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp()
    }
  }, [timeLeft, quizStarted, quizCompleted, showResult])

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(30)
    setUserAnswers(new Array(quizData.length).fill(null))
    setQuizCompleted(false)
  }

  const handleTimeUp = () => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = null
    setUserAnswers(newAnswers)
    setShowResult(true)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null && timeLeft > 0) return

    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = selectedAnswer
    setUserAnswers(newAnswers)

    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const goToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      setQuizCompleted(true)
      setShowNameInput(true) // Show name input after completing quiz
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setTimeLeft(30)
    setQuizCompleted(false)
    setUserAnswers([])
    setShowNameInput(false)
    setPlayerName("")
    setSubmittingScore(false)
    setScoreSubmitted(false)
  }

  const handleNameSubmit = async () => {
    if (!playerName.trim()) {
      alert("Vui lòng nhập tên của bạn!")
      return
    }

    setSubmittingScore(true)
    try {
      const result = await leaderboardService.addScore(playerName, score, quizData.length)
      if (result.success) {
        setScoreSubmitted(true)
        setShowNameInput(false)
      } else {
        alert("Có lỗi xảy ra khi lưu điểm. Vui lòng thử lại!")
      }
    } catch (error) {
      console.error("Error submitting score:", error)
      alert("Có lỗi xảy ra khi lưu điểm. Vui lòng thử lại!")
    } finally {
      setSubmittingScore(false)
    }
  }

  const skipNameInput = () => {
    setShowNameInput(false)
  }

  const getScoreColor = () => {
    const percentage = (score / quizData.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (!quizStarted) {
    return (
      <section className="quiz-section">
        <div className="quiz-header">
          <h2 className="quiz-title">Quiz Tư Tưởng Hồ Chí Minh</h2>
          <p className="quiz-description">Kiểm tra kiến thức của bạn về tư tưởng và cuộc đời Chủ tịch Hồ Chí Minh</p>
        </div>

        <div className="quiz-card">
          <div className="quiz-rules">
            <h3 className="quiz-rules-title">Quy tắc Quiz</h3>
            <div className="quiz-rules-grid">
              <div className="quiz-rules-section">
                <h4>Thông tin:</h4>
                <ul className="quiz-rules-list">
                  <li>• Tổng cộng: {quizData.length} câu hỏi</li>
                  <li>• Thời gian: 30 giây/câu</li>
                  <li>• Điểm tối đa: {quizData.length} điểm</li>
                  <li>• Có giải thích đáp án</li>
                </ul>
              </div>
              <div className="quiz-rules-section">
                <h4>Lưu ý:</h4>
                <ul className="quiz-rules-list">
                  <li>• Chọn đáp án trước khi hết giờ</li>
                  <li>• Không thể quay lại câu trước</li>
                  <li>• Đọc kỹ câu hỏi trước khi chọn</li>
                  <li>• Có thể làm lại nhiều lần</li>
                </ul>
              </div>
            </div>
          </div>

          <button onClick={startQuiz} className="quiz-start-button">
            Bắt Đầu Quiz
          </button>
        </div>
      </section>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quizData.length) * 100)
    const scoreClass = percentage >= 80 ? "score-excellent" : percentage >= 60 ? "score-good" : "score-poor"

    // Show name input form if user hasn't submitted yet
    if (showNameInput) {
      return (
        <section className="quiz-section">
          <div className="quiz-header">
            <h2 className="quiz-title">Hoàn Thành Quiz!</h2>
          </div>

          <div className="quiz-card">
            <div className="quiz-rules">
              <div className={`quiz-result-score ${scoreClass}`}>
                {score}/{quizData.length}
              </div>
              <div className={`quiz-result-percentage ${scoreClass}`}>{percentage}%</div>
              <p className="quiz-description">
                {percentage >= 80
                  ? "Xuất sắc! Bạn hiểu rất rõ về tư tưởng Hồ Chí Minh."
                  : percentage >= 60
                    ? "Khá tốt! Hãy ôn tập thêm để hiểu sâu hơn."
                    : "Cần cố gắng hơn! Hãy đọc lại bài học và thử lại."}
              </p>
              
              <div className="name-input-section">
                <h3 className="name-input-title">Nhập tên để lưu vào bảng xếp hạng</h3>
                <div className="name-input-container">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Nhập tên của bạn..."
                    className="name-input"
                    maxLength={50}
                    onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                    disabled={submittingScore}
                  />
                  <div className="name-input-actions">
                    <button 
                      onClick={handleNameSubmit} 
                      disabled={submittingScore || !playerName.trim()}
                      className="action-button"
                    >
                      {submittingScore ? "Đang lưu..." : "Lưu điểm"}
                    </button>
                    <button 
                      onClick={skipNameInput} 
                      disabled={submittingScore}
                      className="action-button secondary"
                    >
                      Bỏ qua
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="quiz-section">
        <div className="quiz-header">
          <h2 className="quiz-title">Kết Quả Quiz</h2>
        </div>

        <div className="quiz-card">
          <div className="quiz-rules">
            <div className={`quiz-result-score ${scoreClass}`}>
              {score}/{quizData.length}
            </div>
            <div className={`quiz-result-percentage ${scoreClass}`}>{percentage}%</div>
            <p className="quiz-description">
              {percentage >= 80
                ? "Xuất sắc! Bạn hiểu rất rõ về tư tưởng Hồ Chí Minh."
                : percentage >= 60
                  ? "Khá tốt! Hãy ôn tập thêm để hiểu sâu hơn."
                  : "Cần cố gắng hơn! Hãy đọc lại bài học và thử lại."}
            </p>
            
            {scoreSubmitted && (
              <div className="score-submitted-message">
                <p className="success-message">✓ Điểm số đã được lưu vào bảng xếp hạng!</p>
              </div>
            )}
          </div>

          <div className="result-actions">
            <button onClick={resetQuiz} className="action-button">
              Làm Lại Quiz
            </button>
          </div>
        </div>
      </section>
    )
  }

  const currentQ = quizData[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.length) * 100

  return (
    <section className="quiz-section">
      <div className="quiz-header">
        <h2 className="quiz-title">Quiz Tư Tưởng Hồ Chí Minh</h2>
        <div className="quiz-progress">
          <span>
            Câu {currentQuestion + 1}/{quizData.length}
          </span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span>Điểm: {score}</span>
        </div>
      </div>

      <div className="quiz-card">
        {/* Timer */}
        <div className="quiz-timer">
          <div
            className={`timer-display ${
              timeLeft <= 10 ? "timer-danger" : timeLeft <= 20 ? "timer-warning" : "timer-safe"
            }`}
          >
            {timeLeft}s
          </div>
        </div>

        {/* Question */}
        <div className="question-section">
          <div className="question-tags">
            <span className="question-category">{categories[currentQ.category]}</span>
            <span className={`difficulty-${currentQ.difficulty}`}>{difficulties[currentQ.difficulty]}</span>
          </div>
          <h3 className="question-text">{currentQ.question}</h3>
        </div>

        {/* Options */}
        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`option-button ${
                showResult
                  ? index === currentQ.correctAnswer
                    ? "option-correct"
                    : index === selectedAnswer && index !== currentQ.correctAnswer
                      ? "option-incorrect"
                      : ""
                  : selectedAnswer === index
                    ? "option-selected"
                    : ""
              } ${showResult ? "option-disabled" : ""}`}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>

        {/* Result and Explanation */}
        {showResult && (
          <div className="result-explanation">
            <div className="result-status">
              {selectedAnswer === currentQ.correctAnswer ? (
                <span className="status-correct">✓ Chính xác!</span>
              ) : (
                <span className="status-incorrect">✗ Sai rồi!</span>
              )}
            </div>
            <p className="explanation-text">{currentQ.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="quiz-actions">
          <div className="quiz-status">
            {showResult ? "Đã trả lời" : selectedAnswer !== null ? "Đã chọn đáp án" : "Chọn đáp án"}
          </div>

          {!showResult ? (
            <button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="action-button">
              {selectedAnswer === null ? "Chọn đáp án" : "Xác nhận"}
            </button>
          ) : (
            <button onClick={goToNextQuestion} className="action-button">
              {currentQuestion < quizData.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
