import React, { useState, useEffect } from 'react';

// Simple Vietnamese crossword puzzle data
const crosswordData = {
  grid: [
    ['H', 'O', 'C', 'H', 'I', 'M', 'I'],
    ['A', '', '', 'H', '', '', 'N'],
    ['N', '', '', 'I', '', '', 'H'],
    ['O', 'C', 'A', 'F', 'E', '', ''],
    ['I', '', '', '', '', '', ''],
    ['', '', '', 'S', 'E', 'N', ''],
    ['', '', '', '', '', '', '']
  ],
  clues: {
    across: [
      { number: 1, clue: "Thành phố lớn nhất Việt Nam", answer: "HOCHIMINH", startRow: 0, startCol: 0, length: 7 },
      { number: 3, clue: "Đồ uống phổ biến từ cà phê", answer: "CAFE", startRow: 3, startCol: 1, length: 4 },
      { number: 5, clue: "Loại hoa quốc gia", answer: "SEN", startRow: 5, startCol: 3, length: 3 }
    ],
    down: [
      { number: 1, clue: "Thủ đô Việt Nam", answer: "HANOI", startRow: 0, startCol: 0, length: 5 },
      { number: 2, clue: "Con vật biểu tượng may mắn", answer: "CHIM", startRow: 0, startCol: 3, length: 4 },
      { number: 4, clue: "Món ăn truyền thống", answer: "PHO", startRow: 0, startCol: 6, length: 3 }
    ]
  }
};

export default function AIQuiz() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [userInput, setUserInput] = useState(Array(7).fill(null).map(() => Array(7).fill('')));
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [selectedDirection, setSelectedDirection] = useState('across');

  // Timer effect
  useEffect(() => {
    let interval;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  // Start timer on mount
  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, []);

  // Check if crossword is completed
  useEffect(() => {
    if (startTime && !isCompleted) {
      const isComplete = checkCompletion();
      if (isComplete) {
        setEndTime(Date.now());
        setIsCompleted(true);
      }
    }
  }, [userInput, startTime, isCompleted]);

  const checkCompletion = () => {
    // Check across clues
    for (const clue of crosswordData.clues.across) {
      for (let i = 0; i < clue.length; i++) {
        const row = clue.startRow;
        const col = clue.startCol + i;
        if (userInput[row][col].toLowerCase() !== clue.answer[i].toLowerCase()) {
          return false;
        }
      }
    }
    
    // Check down clues
    for (const clue of crosswordData.clues.down) {
      for (let i = 0; i < clue.length; i++) {
        const row = clue.startRow + i;
        const col = clue.startCol;
        if (userInput[row][col].toLowerCase() !== clue.answer[i].toLowerCase()) {
          return false;
        }
      }
    }
    
    return true;
  };

  const formatTime = (timeMs) => {
    const seconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const resetCrossword = () => {
    setUserInput(Array(7).fill(null).map(() => Array(7).fill('')));
    setStartTime(Date.now());
    setEndTime(null);
    setIsCompleted(false);
    setElapsedTime(0);
    setSelectedCell({ row: 0, col: 0 });
  };

  const handleCellClick = (row, col) => {
    if (crosswordData.grid[row][col] !== '') {
      setSelectedCell({ row, col });
    }
  };

  const handleInputChange = (row, col, value) => {
    if (value.length <= 1 && /^[a-zA-ZÀ-ỹ]*$/.test(value)) {
      const newInput = [...userInput];
      newInput[row][col] = value.toUpperCase();
      setUserInput(newInput);
      
      // Move to next cell automatically
      if (value && selectedDirection === 'across') {
        if (col < 6 && crosswordData.grid[row][col + 1] !== '') {
          setSelectedCell({ row, col: col + 1 });
        }
      } else if (value && selectedDirection === 'down') {
        if (row < 6 && crosswordData.grid[row + 1][col] !== '') {
          setSelectedCell({ row: row + 1, col });
        }
      }
    }
  };

  const handleKeyDown = (e, row, col) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (row > 0 && crosswordData.grid[row - 1][col] !== '') {
          setSelectedCell({ row: row - 1, col });
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (row < 6 && crosswordData.grid[row + 1][col] !== '') {
          setSelectedCell({ row: row + 1, col });
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (col > 0 && crosswordData.grid[row][col - 1] !== '') {
          setSelectedCell({ row, col: col - 1 });
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (col < 6 && crosswordData.grid[row][col + 1] !== '') {
          setSelectedCell({ row, col: col + 1 });
        }
        break;
      case 'Backspace':
        handleInputChange(row, col, '');
        break;
    }
  };

  const getCellNumber = (row, col) => {
    // Check if this cell is the start of a clue
    for (const clue of [...crosswordData.clues.across, ...crosswordData.clues.down]) {
      if (clue.startRow === row && clue.startCol === col) {
        return clue.number;
      }
    }
    return null;
  };

  const renderGrid = () => {
    return crosswordData.grid.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: 'flex' }}>
        {row.map((cell, colIndex) => {
          const cellNumber = getCellNumber(rowIndex, colIndex);
          const isSelected = selectedCell.row === rowIndex && selectedCell.col === colIndex;
          const isActive = cell !== '';
          
          return (
            <div
              key={colIndex}
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #000',
                backgroundColor: isActive ? (isSelected ? '#ffeb3b' : '#fff') : '#000',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isActive ? 'pointer' : 'default'
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cellNumber && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {cellNumber}
                </span>
              )}
              {isActive && (
                <input
                  type="text"
                  value={userInput[rowIndex][colIndex]}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    outline: 'none'
                  }}
                  maxLength={1}
                />
              )}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Giải đố - Crossword Puzzle</h2>
      
      {/* Timer and status */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
          Thời gian: {formatTime(endTime ? endTime - startTime : elapsedTime)}
        </div>
        {isCompleted && (
          <div style={{ 
            fontSize: '18px', 
            color: '#28a745', 
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            🎉 Chúc mừng! Bạn đã hoàn thành crossword trong {formatTime(endTime - startTime)}!
          </div>
        )}
        <button 
          onClick={resetCrossword}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Chơi lại
        </button>
      </div>

      {/* Crossword container */}
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}>
        {/* Grid */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3>Bảng ô chữ</h3>
          <div style={{ 
            border: '2px solid #ddd', 
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: 'white',
            display: 'inline-block'
          }}>
            {renderGrid()}
          </div>
        </div>

        {/* Clues */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3>Câu hỏi</h3>
          <div style={{ 
            border: '2px solid #ddd', 
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: 'white',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            <h4>Ngang (Across):</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {crosswordData.clues.across.map((clue, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <strong>{clue.number}.</strong> {clue.clue}
                </li>
              ))}
            </ul>
            
            <h4 style={{ marginTop: '20px' }}>Dọc (Down):</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {crosswordData.clues.down.map((clue, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <strong>{clue.number}.</strong> {clue.clue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '8px' 
      }}>
        <h4>Hướng dẫn:</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Click vào ô để chọn và nhập chữ cái</li>
          <li>Sử dụng phím mũi tên để di chuyển</li>
          <li>Nhập chữ cái để tự động chuyển sang ô tiếp theo</li>
          <li>Nhấn Backspace để xóa</li>
          <li>Hoàn thành tất cả các ô đúng để kết thúc trò chơi</li>
        </ul>
      </div>
    </div>
  );
}
