import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import TopBar from './components/TopBar'
import NoiDung from './pages/NoiDung/NoiDung'
import Crossword from './pages/Crossword/Crossword'
import BangXepHang from './pages/BangXepHang'
import HoiAI from './pages/HoiAI'
import Quiz from './pages/Quiz/Quiz'
import AIUsage from './pages/AIUsage/AIUsage'
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
          <Route path="/crossword" element={<Crossword />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/ranking" element={<BangXepHang />} />
          <Route path="/ask-ai" element={<HoiAI />} />
          <Route path="/ai-usage" element={<AIUsage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
