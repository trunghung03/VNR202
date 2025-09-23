"use client"

import { useState, useEffect } from "react"
import "./Quiz.css"
import { leaderboardService } from "../../firebase/leaderboardService"

const quizData = [
  {
    id: 1,
    question: "Theo Hồ Chí Minh, Đảng phải là gì đối với nhân dân?",
    options: ["Người lãnh đạo tối cao", "Người đầy tớ trung thành", "Người thầy dạy dỗ", "Người bạn đồng hành"],
    correctAnswer: 1,
    explanation:
      "Hồ Chí Minh luôn nhấn mạnh rằng Đảng phải là một tổ chức trong sạch, vững mạnh, là người đầy tớ trung thành của nhân dân, không phải là ông chủ.",
    category: "ideology",
    difficulty: "basic",
  },
  {
    id: 2,
    question: "Sức mạnh của Đảng theo Hồ Chí Minh nằm ở đâu?",
    options: [
      "Chỉ ở số lượng đảng viên đông đảo",
      "Chỉ ở chất lượng đảng viên",
      "Ở cả số lượng và chất lượng đảng viên",
      "Ở quyền lực chính trị",
    ],
    correctAnswer: 2,
    explanation:
      "Hồ Chí Minh chỉ ra rằng sức mạnh của Đảng không chỉ nằm ở số lượng đảng viên mà còn ở chất lượng và đạo đức cách mạng của mỗi người.",
    category: "ideology",
    difficulty: "intermediate",
  },
  {
    id: 3,
    question: "Yếu tố nào KHÔNG phải là nguy cơ làm suy giảm lòng tin của nhân dân theo bài học?",
    options: ["Tham nhũng, tiêu cực", "Quan liêu, xa dân", "Suy thoái đạo đức", "Thiếu kiến thức chuyên môn"],
    correctAnswer: 3,
    explanation:
      "Ba nguy cơ chính làm suy giảm lòng tin của nhân dân là: tham nhũng tiêu cực, quan liêu xa dân, và suy thoái đạo đức lối sống.",
    category: "ideology",
    difficulty: "intermediate",
  },
  {
    id: 4,
    question: "Theo tài liệu, tham nhũng được gọi là gì?",
    options: ["Bệnh xã hội", "Quốc nạn", "Vấn đề cấp bách", "Thách thức lớn"],
    correctAnswer: 1,
    explanation:
      "Trong tài liệu, tham nhũng được gọi là 'quốc nạn', làm xói mòn đạo đức cách mạng và gây bất bình trong nhân dân.",
    category: "ideology",
    difficulty: "basic",
  },
  {
    id: 5,
    question: "Cụm từ 'tự sửa' trong tài liệu có ý nghĩa gì?",
    options: [
      "Tự học hỏi kiến thức mới",
      "Tự phê bình và sửa chữa bản thân",
      "Tự cải thiện điều kiện sống",
      "Tự nâng cao trình độ",
    ],
    correctAnswer: 1,
    explanation:
      "Cụm từ 'tự sửa' thể hiện việc đảng viên phải thường xuyên tự phê bình và phê bình, tự soi lại bản thân để sửa chữa.",
    category: "philosophy",
    difficulty: "advanced",
  },
  {
    id: 6,
    question: "Để củng cố uy tín Đảng, cần làm gì với các vụ việc tham nhũng?",
    options: [
      "Xử lý nhẹ nhàng để giữ ổn định",
      "Kiên quyết xử lý nghiêm, không có vùng cấm",
      "Chỉ xử lý các trường hợp nghiêm trọng",
      "Để thời gian tự giải quyết",
    ],
    correctAnswer: 1,
    explanation:
      "Cần phải kiên quyết, kiên trì xử lý nghiêm các vụ việc tham nhũng, không có vùng cấm, không có ngoại lệ.",
    category: "ideology",
    difficulty: "intermediate",
  },
  {
    id: 7,
    question: "Cụm từ 'của công, của riêng' trong tài liệu cảnh báo về vấn đề gì?",
    options: ["Quản lý tài sản nhà nước", "Phân biệt lợi ích công và tư", "Chia sẻ tài sản chung", "Đầu tư công tư"],
    correctAnswer: 1,
    explanation:
      "Cụm từ 'của công, của riêng' cảnh báo về việc cán bộ đảng viên phải phân biệt rõ ràng giữa lợi ích công và lợi ích cá nhân, không được lợi dụng chức vụ.",
    category: "philosophy",
    difficulty: "advanced",
  },
  {
    id: 8,
    question: "Theo bài học, để Đảng gần dân hơn cần làm gì?",
    options: [
      "Tăng cường tuyên truyền",
      "Lắng nghe và tôn trọng ý kiến nhân dân",
      "Tổ chức nhiều cuộc họp",
      "Mở rộng tổ chức Đảng",
    ],
    correctAnswer: 1,
    explanation:
      "Đảng cần lắng nghe và tôn trọng ý kiến của nhân dân, thực sự coi dân là 'gốc', xây dựng niềm tin qua tương tác và đối thoại.",
    category: "ideology",
    difficulty: "intermediate",
  },
  {
    id: 9,
    question: "Cụm từ 'tình đồng chí' trong tài liệu thể hiện điều gì?",
    options: ["Tình bạn cá nhân", "Đoàn kết, tương trợ lẫn nhau trong Đảng", "Quan hệ xã hội", "Tình cảm gia đình"],
    correctAnswer: 1,
    explanation:
      "Cụm từ 'tình đồng chí' thể hiện tinh thần đoàn kết, tương trợ lẫn nhau giữa các đảng viên, là một trong những yếu tố cốt lõi xây dựng Đảng.",
    category: "philosophy",
    difficulty: "advanced",
  },
  {
    id: 10,
    question: "Theo tài liệu, uy tín của Đảng được tạo nên từ đâu?",
    options: [
      "Từ lịch sử lâu đời",
      "Từ uy tín của mỗi cá nhân đảng viên",
      "Từ thành tựu kinh tế",
      "Từ sự ủng hộ quốc tế",
    ],
    correctAnswer: 1,
    explanation:
      "Uy tín của Đảng được tạo nên từ uy tín của mỗi cá nhân đảng viên, như được đề cập trong 'cái làm nên uy tín đảng viên'.",
    category: "ideology",
    difficulty: "basic",
  },
  {
    id: 11,
    question: "Cụm từ 'trên dưới đồng lòng, dọc ngang thông suốt' liên quan đến vấn đề gì?",
    options: ["Tổ chức bộ máy", "Kiểm tra, giám sát trong Đảng", "Phân công nhiệm vụ", "Đào tạo cán bộ"],
    correctAnswer: 1,
    explanation:
      "Cụm từ này liên quan đến việc tăng cường công tác kiểm tra, giám sát chặt chẽ cả từ nội bộ Đảng và từ phía nhân dân.",
    category: "philosophy",
    difficulty: "advanced",
  },
  {
    id: 12,
    question: "Theo bài học, để tránh nguy cơ mất lòng tin của nhân dân, Đảng cần làm gì?",
    options: ["Tăng cường tuyên truyền", "Tự làm mới, tự chỉnh đốn liên tục", "Mở rộng quyền lực", "Thay đổi lãnh đạo"],
    correctAnswer: 1,
    explanation:
      "Đảng cần phải luôn tự làm mới, tự chỉnh đốn, giữ vững sự trong sạch, vững mạnh về chính trị, tư tưởng, đạo đức, và tổ chức.",
    category: "ideology",
    difficulty: "intermediate",
  },
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
