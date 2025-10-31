import React from 'react';
import './AIUsage.css';

export default function AIUsage() {
  const aiUsageItems = [
    {
      title: 'Hỗ trợ lập trình',
      description: 'Đã sử dụng GitHub Copilot để hỗ trợ viết code, tự động hoàn thành code và debug các lỗi trong quá trình phát triển dự án này.',
      icon: '💻'
    },
    {
      title: 'AI Chatbot',
      description: 'Sử dụng ChatGPT và Claude để tư vấn giải pháp kỹ thuật, giải thích các khái niệm phức tạp và hỗ trợ giải quyết vấn đề trong dự án.',
      icon: '🤖'
    },
    {
      title: 'Thiết kế web',
      description: 'Áp dụng AI để tạo layout, chọn màu sắc phù hợp và tối ưu hóa giao diện người dùng cho trang web HCM202.',
      icon: '🎨'
    }
  ];

  const referenceDocuments = [
    {
      title: 'Giáo trình học phần Lịch sử đảng',
      description: 'Tài liệu chính thức sử dụng trong học phần, cung cấp kiến thức nền tảng về lịch sử đảng.',
      icon: '📚'
    },
    {
      title: 'Các tài liệu tham khảo bổ sung',
      description: 'Sách, báo, tạp chí khoa học và các nguồn tài liệu uy tín khác về lịch sử đảng.',
      icon: '📖'
    }
  ];

  return (
    <div className="ai-usage-container">
      <div className="ai-usage-header">
        <h1>Phụ lục</h1>
        <p className="ai-usage-subtitle">Tài liệu sử dụng và ghi chú về các công cụ hỗ trợ</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">Tài liệu tham khảo</h2>
        <div className="ai-usage-grid">
          {referenceDocuments.map((item, index) => (
            <div key={index} className="ai-usage-card">
              <div className="ai-usage-icon">{item.icon}</div>
              <h3 className="ai-usage-title">{item.title}</h3>
              <p className="ai-usage-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Sử dụng AI trong dự án</h2>
        <div className="ai-usage-grid">
          {aiUsageItems.map((item, index) => (
            <div key={index} className="ai-usage-card">
              <div className="ai-usage-icon">{item.icon}</div>
              <h3 className="ai-usage-title">{item.title}</h3>
              <p className="ai-usage-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="ai-usage-footer">
        <p>Dự án này được phát triển dựa trên các tài liệu tham khảo chính thức và sự hỗ trợ của các công cụ AI hiện đại. Cam kết không copy từ tài liệu trái phép hoặc vi phạm bản quyền.</p>
      </div>
    </div>
  );
}