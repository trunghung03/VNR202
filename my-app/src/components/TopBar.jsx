import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import './TopBar.css';

const pages = [
  { name: 'Nội dung', path: '/' },
  { name: 'Crossword', path: '/crossword' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'Bảng Xếp Hạng', path: '/ranking' },
  { name: 'Hỏi AI', path: '/ask-ai' },
  { name: 'Sử dụng AI', path: '/ai-usage' },
];

export default function TopBar() {
  const location = useLocation();
  return (
    <header className="topbar">
      <div className="topbar-title">HCM202</div>
      <nav className="topbar-nav">
        {pages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className={location.pathname === page.path ? 'active' : ''}
          >
            {page.name}
          </Link>
        ))}
      </nav>
      <SearchBar />
    </header>
  );
}
