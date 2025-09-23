import { useState, useEffect } from 'react';
import { leaderboardService } from '../firebase/leaderboardService';
import './BangXepHang.css';

export default function BangXepHang() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await leaderboardService.getTopScores(50); // Get top 50 scores
      if (result.success) {
        setLeaderboard(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải bảng xếp hạng');
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeaderboard = leaderboard.filter(entry =>
    entry.playerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getScoreClass = (percentage) => {
    if (percentage >= 90) return 'score-perfect';
    if (percentage >= 80) return 'score-excellent';
    if (percentage >= 70) return 'score-good';
    if (percentage >= 60) return 'score-fair';
    return 'score-poor';
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2 className="leaderboard-title">Bảng Xếp Hạng</h2>
        </div>
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <p>Đang tải bảng xếp hạng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2 className="leaderboard-title">Bảng Xếp Hạng</h2>
        </div>
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={loadLeaderboard} className="retry-button">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">🏆 Bảng Xếp Hạng Quiz Tư Tưởng Hồ Chí Minh</h2>
        <p className="leaderboard-description">
          Thành tích xuất sắc của các học viên trong việc tìm hiểu tư tưởng Hồ Chí Minh
        </p>
      </div>

      <div className="leaderboard-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={loadLeaderboard} className="refresh-button">
          🔄 Làm mới
        </button>
      </div>

      {filteredLeaderboard.length === 0 ? (
        <div className="empty-state">
          {searchQuery ? (
            <p>Không tìm thấy kết quả cho "{searchQuery}"</p>
          ) : (
            <p>Chưa có ai hoàn thành quiz. Hãy là người đầu tiên!</p>
          )}
        </div>
      ) : (
        <div className="leaderboard-content">
          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-number">{filteredLeaderboard.length}</span>
              <span className="stat-label">Người tham gia</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {filteredLeaderboard.length > 0 ? 
                  Math.round(filteredLeaderboard.reduce((sum, entry) => sum + entry.percentage, 0) / filteredLeaderboard.length) : 0}%
              </span>
              <span className="stat-label">Điểm trung bình</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {filteredLeaderboard.filter(entry => entry.percentage >= 80).length}
              </span>
              <span className="stat-label">Xuất sắc (≥80%)</span>
            </div>
          </div>

          <div className="leaderboard-table">
            <div className="table-header">
              <div className="header-rank">Hạng</div>
              <div className="header-name">Tên</div>
              <div className="header-score">Điểm</div>
              <div className="header-percentage">Tỷ lệ</div>
              <div className="header-date">Thời gian</div>
            </div>

            <div className="table-body">
              {filteredLeaderboard.map((entry, index) => (
                <div key={entry.id} className={`table-row ${index < 3 ? 'podium-row' : ''}`}>
                  <div className="cell-rank">
                    <span className={`rank-badge ${index < 3 ? 'podium' : ''}`}>
                      {getRankIcon(index + 1)}
                    </span>
                  </div>
                  <div className="cell-name">
                    <span className="player-name">{entry.playerName}</span>
                  </div>
                  <div className="cell-score">
                    <span className="score-fraction">
                      {entry.score}/{entry.totalQuestions}
                    </span>
                  </div>
                  <div className="cell-percentage">
                    <span className={`percentage-badge ${getScoreClass(entry.percentage)}`}>
                      {entry.percentage}%
                    </span>
                  </div>
                  <div className="cell-date">
                    <span className="date-text">{formatDate(entry.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
