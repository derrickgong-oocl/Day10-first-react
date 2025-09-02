import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/">🚀 Sally Ride 的清单</NavLink>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" end>首页</NavLink></li>
        <li><NavLink to="/bypage">按页显示</NavLink></li>
        <li><NavLink to="/help">帮助</NavLink></li>
        <li><NavLink to="/contact">联系</NavLink></li>
      </ul>
    </nav>
  );
}