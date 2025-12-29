import { Link, useLocation } from "react-router-dom"
import "./Navbar.css" // Import file CSS mới

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        🏠 Trang chủ
      </Link>
      <Link to="/cart" className={`nav-item ${location.pathname === '/cart' ? 'active' : ''}`}>
        🛒 Giỏ hàng
      </Link>
    </nav>
  )
}