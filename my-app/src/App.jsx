import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import TopBar from './components/TopBar'
import NoiDung from './pages/NoiDung'
import AIQuiz from './pages/AIQuiz'
import BangXepHang from './pages/BangXepHang'
import HoiAI from './pages/HoiAI'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <TopBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<NoiDung />} />
          <Route path="/quiz" element={<AIQuiz />} />
          <Route path="/ranking" element={<BangXepHang />} />
          <Route path="/ask-ai" element={<HoiAI />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
