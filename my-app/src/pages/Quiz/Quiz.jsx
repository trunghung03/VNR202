"use client"

import { useState, useEffect } from "react"
import "./Quiz.css"
import { leaderboardService } from "../../firebase/leaderboardService"

const quizData = [
  {
    id: 1,
    question: "Vận dụng tư tưởng HCM cần phải nắm vững những nguyên tắc:",
    options: ["Quan điểm lịch sử thế giới", "Quan điểm lịch sử Việt Nam", "Quan điểm lịch sử cụ thể", "Quan điểm phát triển"],
    correctAnswer: 2,
    explanation:
      "Để vận dụng tư tưởng Hồ Chí Minh một cách đúng đắn, cần phải nắm vững quan điểm lịch sử cụ thể, tức là phải hiểu rõ hoàn cảnh lịch sử cụ thể mà tư tưởng đó được hình thành.",
    category: "philosophy",
    difficulty: "intermediate",
  },
  {
    id: 2,
    question: "Theo HCM, xây dựng đạo đức mới, trước hết là thực hành đạo đức cách mạng, thực hành...",
    options: ["Chí công vô tư", "Cần kiệm liêm chính", "Trung với nước, hiếu với dân", "Cần, kiệm, liêm, chính, chí công vô tư"],
    correctAnswer: 3,
    explanation:
      "Theo Hồ Chí Minh, để xây dựng đạo đức mới trước hết phải thực hành đầy đủ các phẩm chất: Cần, kiệm, liêm, chính, chí công vô tư - đây là hệ thống đạo đức hoàn chỉnh của người cách mạng.",
    category: "ideology",
    difficulty: "basic",
  },
  {
    id: 3,
    question: "HCM tiếp thu tư tưởng về đạo đức của Nho giáo trong việc xây dựng, đổi mới, phát triển tư tưởng đạo đức trong công tác gì?",
    options: ["Xây dựng con người mới", "Xây dựng Đảng về đạo đức", "Xây dựng văn hóa mới", "Xây dựng xã hội mới"],
    correctAnswer: 1,
    explanation:
      "Hồ Chí Minh đã tiếp thu và phát triển tư tưởng đạo đức của Nho giáo chủ yếu trong công tác xây dựng Đảng về đạo đức, tạo nên đạo đức cách mạng mới.",
    category: "philosophy",
    difficulty: "intermediate",
  },
  {
    id: 4,
    question: "Theo Nguyễn Ái Quốc \"Công nông là gốc cách mạng, còn học trò, địa chủ nhỏ, nhà buôn nhỏ là... của cách mạng\"?",
    options: ["Bạn bè", "Bầu bạn", "Đồng minh", "Liên minh"],
    correctAnswer: 2,
    explanation:
      "Theo Nguyễn Ái Quốc, công nông là gốc cách mạng, còn học trò, địa chủ nhỏ, nhà buôn nhỏ là đồng minh của cách mạng - thể hiện quan điểm về liên minh các giai tầng trong cách mạng giải phóng dân tộc.",
    category: "ideology",
    difficulty: "basic",
  },
  {
    id: 5,
    question: "Nội dung cốt lõi của vấn đề dân tộc thuộc địa được HCM tiếp cận từ:",
    options: ["Tự do dân chủ", "Quyền con người", "Khát vọng giải phóng dân tộc", "Chủ quyền dân tộc"],
    correctAnswer: 2,
    explanation:
      "Hồ Chí Minh tiếp cận vấn đề dân tộc thuộc địa từ khát vọng giải phóng dân tộc - đây là động lực cơ bản thúc đẩy cuộc đấu tranh cách mạng của các dân tộc bị áp bức.",
    category: "ideology",
    difficulty: "intermediate",
  },
  {
    id: 6,
    question: "Khi nói về đại đoàn kết dân tộc, HCM cho rằng:",
    options: ["Đại đoàn kết dân tộc là vấn đề sách lược", "Đại đoàn kết dân tộc là vấn đề chiến lược", "Đại đoàn kết dân tộc là vấn đề cấp bách", "Đại đoàn kết dân tộc là vấn đề quan trọng"],
    correctAnswer: 1,
    explanation:
      "Theo Hồ Chí Minh, đại đoàn kết dân tộc là vấn đề chiến lược - có ý nghĩa quyết định thành công của cách mạng, cần được duy trì lâu dài và có tầm nhìn xa.",
    category: "ideology",
    difficulty: "intermediate",
  },
  {
    id: 7,
    question: "Theo HCM, trung với nước là tuyệt đối trung thành với sự nghiệp dựng nước và giữ nước, trung thành với con đường đi lên của đất nước; là suốt đời phấn đấu cho:",
    options: ["Đảng, cho cách mạng", "Nhà nước, cho cách mạng", "Dân tộc, cho cách mạng", "Tổ quốc, cho cách mạng"],
    correctAnswer: 2,
    explanation:
      "Theo Hồ Chí Minh, trung với nước là suốt đời phấn đấu cho dân tộc, cho cách mạng - thể hiện tinh thần yêu nước sâu sắc và lý tưởng cách mạng cao cả.",
    category: "ideology",
    difficulty: "basic",
  },
  {
    id: 8,
    question: "Mặt trận dân tộc thống nhất trong tư tưởng HCM được xây dựng như thế nào?",
    options: ["Là nơi tập hợp mọi người dân ở trong nước Việt Nam", "Là tổ chức tập hợp ngẫu nhiên quần chúng nhân dân", "Là khối đại đoàn kết chặt chẽ có tổ chức trên nền tảng khối liên minh công - nông - tri thức do Đảng Cộng Sản lãnh đạo", "Là nơi quy tụ mọi người Việt Nam định cư ở nước ngoài, ở bất cứ phương trời nào"],
    correctAnswer: 2,
    explanation:
      "Mặt trận dân tộc thống nhất theo tư tưởng HCM là khối đại đoàn kết chặt chẽ có tổ chức trên nền tảng khối liên minh công - nông - tri thức do Đảng Cộng Sản lãnh đạo.",
    category: "ideology",
    difficulty: "advanced",
  },
  {
    id: 9,
    question: "Hồ Chí Minh được coi là linh hồn của cuộc kháng chiến chống Pháp trong giai đoạn nào?",
    options: ["1946 - 1954", "1945 - 1954", "1930 - 1945", "1939 - 1945"],
    correctAnswer: 0,
    explanation:
      "Hồ Chí Minh được coi là linh hồn của cuộc kháng chiến chống Pháp từ 1946 - 1954, từ khi cuộc kháng chiến toàn quốc bắt đầu đến chiến thắng Điện Biên Phủ.",
    category: "history",
    difficulty: "basic",
  },
  {
    id: 10,
    question: "Truyền thống nào của dân tộc Việt Nam là nguồn gốc hình thành tư tưởng HCM?",
    options: ["Truyền thống yêu nước, lạc quan yêu đời, có niềm tin vào chính nghĩa, tin vào sức mạnh của bản thân và dân tộc", "Truyền thống lạc quan, yêu đời; có niềm tin vào chính nghĩa, tin vào sức mạnh của bản thân và dân tộc", "Truyền thống nhân nghĩa, thủy chung, lạc quan, yêu đời, có niềm tin vào chính nghĩa, tin vào sức mạnh của bản thân và dân tộc", "Truyền thống đoàn kết, lạc quan, yêu đời; có niềm tin vào chính nghĩa, tin vào sức mạnh của bản thân và dân tộc"],
    correctAnswer: 2,
    explanation:
      "Nguồn gốc hình thành tư tưởng Hồ Chí Minh bao gồm truyền thống nhân nghĩa, thủy chung, lạc quan, yêu đời, có niềm tin vào chính nghĩa, tin vào sức mạnh của bản thân và dân tộc.",
    category: "philosophy",
    difficulty: "advanced",
  },
  {
    id: 11,
    question: "Khái niệm con người trong tư tưởng Hồ Chí Minh để chỉ:",
    options: ["Một con người cụ thể", "Một cộng đồng người", "Con người cụ thể gắn với hoàn cảnh lịch sử cụ thể", "Tất cả các phương án"],
    correctAnswer: 2,
    explanation:
      "Trong tư tưởng Hồ Chí Minh, khái niệm con người chỉ con người cụ thể gắn với hoàn cảnh lịch sử cụ thể - thể hiện quan điểm duy vật lịch sử về con người.",
    category: "philosophy",
    difficulty: "advanced",
  },
  {
    id: 12,
    question: "Theo Hồ Chí Minh, đạo đức là nhân tố tạo nên:",
    options: ["Sức mạnh, sức hấp dẫn của chủ nghĩa xã hội", "Sức mạnh, sức hấp dẫn của chủ nghĩa Mác-Lênin", "Sức mạnh, sức hấp dẫn của tư tưởng HCM"],
    correctAnswer: 0,
    explanation:
      "Theo Hồ Chí Minh, đạo đức là nhân tố tạo nên sức mạnh, sức hấp dẫn của chủ nghĩa xã hội - đây là yếu tố tinh thần quan trọng thu hút quần chúng nhân dân.",
    category: "philosophy",
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
