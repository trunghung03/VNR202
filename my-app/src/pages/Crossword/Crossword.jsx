import React, { useState, useEffect } from "react";
import "./Crossword.css";

const crosswordData = [
  {
    id: 1,
    direction: "across",
    number: 1,
    clue: "Đảng phải là người ... trung thành của nhân dân",
    answer: "DAYTO",
    startRow: 0,
    startCol: 0,
  },
  {
    id: 2,
    direction: "down",
    number: 2,
    clue: "Việc đảng viên phải thường xuyên làm để sửa chữa bản thân",
    answer: "TUSUA",
    startRow: 0,
    startCol: 3,
  },
  {
    id: 3,
    direction: "across",
    number: 3,
    clue: "Tham nhũng được gọi là ... của đất nước",
    answer: "QUOCNAN",
    startRow: 2,
    startCol: 1,
  },
  {
    id: 4,
    direction: "down",
    number: 4,
    clue: "Bệnh ... làm cán bộ xa rời quần chúng",
    answer: "QUANLIEU",
    startRow: 1,
    startCol: 8,
  },
  {
    id: 5,
    direction: "across",
    number: 5,
    clue: "Phẩm chất cần, kiệm, liêm, chính, chí công vô ...",
    answer: "TU",
    startRow: 4,
    startCol: 6,
  },
  {
    id: 6,
    direction: "down",
    number: 6,
    clue: "Đảng cần lắng nghe ý kiến của ... để gần dân hơn",
    answer: "NHANDAM",
    startRow: 2,
    startCol: 12,
  },
  {
    id: 7,
    direction: "across",
    number: 7,
    clue: "Tinh thần đoàn kết, tương trợ giữa các đảng viên",
    answer: "TINHDONCHI",
    startRow: 6,
    startCol: 2,
  },
  {
    id: 8,
    direction: "down",
    number: 8,
    clue: "Cần phân biệt rõ của công và của ...",
    answer: "RIENG",
    startRow: 5,
    startCol: 5,
  },
  {
    id: 9,
    direction: "across",
    number: 9,
    clue: "Uy tín của Đảng được tạo nên từ uy tín của mỗi ...",
    answer: "DANGVIEN",
    startRow: 8,
    startCol: 3,
  },
  {
    id: 10,
    direction: "down",
    number: 10,
    clue: "Đảng cần tự làm mới, tự ... để hoàn thiện",
    answer: "CHINHDON",
    startRow: 7,
    startCol: 10,
  },
];

const GRID_SIZE = 15;

function generateGrid() {
  // Tạo lưới rỗng
  const grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""));
  // Đánh dấu các ô có chữ cái (dùng cho kiểm tra và disable input)
  const filled = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(false));

  crosswordData.forEach((clue) => {
    const { answer, startRow, startCol, direction } = clue;
    for (let i = 0; i < answer.length; i++) {
      const row = direction === "across" ? startRow : startRow + i;
      const col = direction === "across" ? startCol + i : startCol;
      if (row < GRID_SIZE && col < GRID_SIZE) {
        grid[row][col] = answer[i];
        filled[row][col] = true;
      }
    }
  });

  return { grid, filled };
}

export default function CrosswordGame() {
  const { grid, filled } = generateGrid();
  const [userAnswers, setUserAnswers] = useState(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);
  const [completedClues, setCompletedClues] = useState(new Set());
  const [showHints, setShowHints] = useState(false);

  // Kiểm tra hoàn thành từng clue
  useEffect(() => {
    const newCompleted = new Set();
    crosswordData.forEach((clue) => {
      const { answer, startRow, startCol, direction } = clue;
      let isComplete = true;
      for (let i = 0; i < answer.length; i++) {
        const row = direction === "across" ? startRow : startRow + i;
        const col = direction === "across" ? startCol + i : startCol;
        if (userAnswers[row][col] !== answer[i]) {
          isComplete = false;
          break;
        }
      }
      if (isComplete) newCompleted.add(clue.id);
    });
    setCompletedClues(newCompleted);
  }, [userAnswers]);

  const handleCellClick = (row, col) => {
    if (!filled[row][col]) return;
    setSelectedCell({ row, col });

    // Tìm clue chứa ô này (ưu tiên clue đang chọn)
    let clue = crosswordData.find((c) => {
      const { startRow, startCol, direction, answer } = c;
      if (direction === "across") {
        return row === startRow && col >= startCol && col < startCol + answer.length;
      } else {
        return col === startCol && row >= startRow && row < startRow + answer.length;
      }
    });
    setSelectedClue(clue || null);
  };

  const handleInputChange = (row, col, value) => {
    if (value.length > 1) return;
    if (!/^[a-zA-ZÀ-ỹ]?$/.test(value)) return;
    const newUserAnswers = userAnswers.map((r) => [...r]);
    newUserAnswers[row][col] = value.toUpperCase();
    setUserAnswers(newUserAnswers);
  };

  const getCellClass = (row, col) => {
    let base = "cell-input";
    if (!filled[row][col]) return `${base} cell-empty`;
    if (selectedCell?.row === row && selectedCell?.col === col) return `${base} cell-selected`;
    if (
      selectedClue &&
      (() => {
        const { startRow, startCol, direction, answer } = selectedClue;
        if (direction === "across") {
          return row === startRow && col >= startCol && col < startCol + answer.length;
        } else {
          return col === startCol && row >= startRow && row < startRow + answer.length;
        }
      })()
    ) {
      return `${base} cell-highlighted`;
    }
    return `${base} cell-normal`;
  };

  const getClueNumber = (row, col) => {
    const clue = crosswordData.find((c) => c.startRow === row && c.startCol === col);
    return clue?.number;
  };

  const resetGame = () => {
    setUserAnswers(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill("")));
    setCompletedClues(new Set());
    setSelectedCell(null);
    setSelectedClue(null);
  };

  const showSolution = () => {
    setUserAnswers(grid.map((row) => [...row]));
    setCompletedClues(new Set(crosswordData.map((c) => c.id)));
  };

  return (
    <section id="crossword" className="crossword-section">
      <div className="crossword-header">
        <h2 className="crossword-title">Trò Chơi Ô Chữ</h2>
        <p className="crossword-description">
          Kiểm tra kiến thức về tư tưởng Hồ Chí Minh qua trò chơi ô chữ thú vị
        </p>
      </div>

      <div className="crossword-layout">
        {/* Crossword Grid */}
        <div className="crossword-grid-container">
          <div className="grid-header">
            <h3 className="grid-title">Bảng Ô Chữ</h3>
            <div className="grid-controls">
              <button onClick={() => setShowHints((v) => !v)} className="control-button hint-button">
                {showHints ? "Ẩn gợi ý" : "Hiện gợi ý"}
              </button>
              <button onClick={resetGame} className="control-button reset-button">
                Làm lại
              </button>
              <button onClick={showSolution} className="control-button solution-button">
                Đáp án
              </button>
            </div>
          </div>

          <div className="crossword-grid">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const clueNumber = getClueNumber(rowIndex, colIndex);
                return (
                  <div key={`${rowIndex}-${colIndex}`} className="grid-cell">
                    {clueNumber && <span className="cell-number">{clueNumber}</span>}
                    <input
                      type="text"
                      value={userAnswers[rowIndex][colIndex] || ""}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={getCellClass(rowIndex, colIndex)}
                      maxLength={1}
                      disabled={!filled[rowIndex][colIndex]}
                    />
                  </div>
                );
              })
            )}
          </div>

          <div className="progress-container">
            <p className="progress-text">
              Hoàn thành: {completedClues.size}/{crosswordData.length} câu
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(completedClues.size / crosswordData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Clues */}
        <div className="clues-container">
          <div className="clues-section">
            <h3 className="clues-title">Câu Hỏi Ngang</h3>
            <div className="clues-list">
              {crosswordData
                .filter((clue) => clue.direction === "across")
                .map((clue) => (
                  <div
                    key={clue.id}
                    className={`clue-item ${
                      selectedClue?.id === clue.id
                        ? "clue-selected"
                        : completedClues.has(clue.id)
                        ? "clue-completed"
                        : "clue-normal"
                    }`}
                    onClick={() => setSelectedClue(clue)}
                  >
                    <div className="clue-content">
                      <span className="clue-number">{clue.number}.</span>
                      <div className="clue-text-container">
                        <p className="clue-text">{clue.clue}</p>
                        {showHints && <p className="clue-hint">({clue.answer.length} chữ cái)</p>}
                      </div>
                      {completedClues.has(clue.id) && <span className="clue-check">✓</span>}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="clues-section">
            <h3 className="clues-title">Câu Hỏi Dọc</h3>
            <div className="clues-list">
              {crosswordData
                .filter((clue) => clue.direction === "down")
                .map((clue) => (
                  <div
                    key={clue.id}
                    className={`clue-item ${
                      selectedClue?.id === clue.id
                        ? "clue-selected"
                        : completedClues.has(clue.id)
                        ? "clue-completed"
                        : "clue-normal"
                    }`}
                    onClick={() => setSelectedClue(clue)}
                  >
                    <div className="clue-content">
                      <span className="clue-number">{clue.number}.</span>
                      <div className="clue-text-container">
                        <p className="clue-text">{clue.clue}</p>
                        {showHints && <p className="clue-hint">({clue.answer.length} chữ cái)</p>}
                      </div>
                      {completedClues.has(clue.id) && <span className="clue-check">✓</span>}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {completedClues.size === crosswordData.length && (
            <div className="completion-message">
              <h3 className="completion-title">Chúc mừng!</h3>
              <p className="completion-text">
                Bạn đã hoàn thành trò chơi ô chữ. Kiến thức về tư tưởng Hồ Chí Minh của bạn thật tuyệt vời!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}