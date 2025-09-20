import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  return (
    <div className="search-container">
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        className="search-bar"
        type="text"
        placeholder="Tìm kiếm..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}
