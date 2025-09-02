// src/NotFound.js
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="not-found">
      <h2>404 - 页面未找到</h2>
      <p>抱歉，您访问的页面不存在。</p>
      <Link to="/" className="home-link">
        ← 返回待办清单
      </Link>
    </section>
  );
}