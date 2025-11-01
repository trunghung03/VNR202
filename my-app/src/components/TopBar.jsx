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
  { name: 'Phụ lục', path: '/ai-usage' },
];

export default function TopBar() {
  const location = useLocation();
  return (
    <header className="topbar">
      <div className="topbar-title">VNR202</div>
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
        <a
          href="https://padlet.com/annqk569/vnr202-t-c-u-h-i-cho-nh-m-6-nh-3-i4gvq0flhz0f69ru"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar-padlet-btn"
        >
          Đặt câu hỏi
        </a>
      </nav>
      {/* <SearchBar /> */}
    </header>
  );
}
