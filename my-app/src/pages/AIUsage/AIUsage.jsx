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

  return (
    <div className="ai-usage-container">
      <div className="ai-usage-header">
        <h1>Sử dụng AI trong dự án</h1>
        <p className="ai-usage-subtitle">Ghi chú về các công cụ AI đã được sử dụng trong quá trình phát triển</p>
      </div>
      
      <div className="ai-usage-grid">
        {aiUsageItems.map((item, index) => (
          <div key={index} className="ai-usage-card">
            <div className="ai-usage-icon">{item.icon}</div>
            <h3 className="ai-usage-title">{item.title}</h3>
            <p className="ai-usage-description">{item.description}</p>
          </div>
        ))}
      </div>
      
      <div className="ai-usage-footer">
        <p>Những công cụ AI trên đã góp phần quan trọng trong việc hoàn thiện dự án HCM202 này.</p>
      </div>
    </div>
  );
}