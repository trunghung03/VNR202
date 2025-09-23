import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import './HoiAI.css';

export default function HoiAI() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: '🌟 Xin chào! Tôi là AI chuyên về môn **Tư tưởng Hồ Chí Minh (HCM202)**. Tôi có thể giúp bạn:\n\n• Hiểu sâu về tư tưởng và quan điểm của Chủ tịch Hồ Chí Minh\n• Giải thích các lý luận và học thuyết trong chương trình HCM202\n• Phân tích tác phẩm và di sản tinh thần của Bác Hồ\n• Liên hệ tư tưởng HCM với thực tiễn hiện đại\n\nHãy đặt câu hỏi về bất kỳ chủ đề nào trong chương trình học!'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Disabled auto-scroll - users can manually scroll
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found in environment variables');
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
      
      // System prompt cho HCM202
      const systemPrompt = `Bạn là một giảng viên chuyên về môn Tư tưởng Hồ Chí Minh (HCM202). Hãy trả lời câu hỏi một cách học thuật, chính xác và dễ hiểu, tập trung vào:

1. Các quan điểm và tư tưởng cốt lõi của Chủ tịch Hồ Chí Minh
2. Lý luận về độc lập dân tộc, dân chủ và chủ nghĩa xã hội
3. Tư tưởng về đạo đức, văn hóa và giáo dục
4. Quan điểm về đại đoàn kết dân tộc và quốc tế
5. Phương pháp tư duy và lãnh đạo của Bác Hồ
6. Ứng dụng tư tưởng HCM trong thời đại hiện tại

Trả lời bằng tiếng Việt, có cấu trúc rõ ràng và dẫn chứng cụ thể khi cần thiết.

Câu hỏi: ${userMessage}`;
      
      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Xin lỗi, đã có lỗi xảy ra khi kết nối với AI. Vui lòng kiểm tra API key trong file .env hoặc thử lại sau.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: '🌟 Cuộc trò chuyện đã được đặt lại. Hãy tiếp tục hỏi tôi về **Tư tưởng Hồ Chí Minh (HCM202)**! Tôi sẵn sàng hỗ trợ bạn tìm hiểu sâu hơn về di sản tinh thần vĩ đại của Bác Hồ.'
    }]);
  };

  return (
    <div className="hoi-ai-container">
      <div className="chat-header">
        <h2>💭 Hỏi AI về Tư tưởng Hồ Chí Minh</h2>
        <div className="chat-controls">
          <button onClick={resetChat} className="reset-btn">
            Đặt lại cuộc trò chuyện
          </button>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              <div className="message-avatar">
                {message.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-text">
                {message.role === 'assistant' ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="message-avatar">🤖</div>
              <div className="message-text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input-form">
        <div className="chat-input-container">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Hỏi về tư tưởng HCM, lịch sử, quan điểm chính trị, văn hóa..."
            className="chat-input"
            rows="1"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
      </form>
    </div>
  );
}
