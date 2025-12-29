import { useEffect, useState } from "react"
import type { CartItem } from "../types/Product"
import "./CartPage.css" // Import file CSS

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  const loadCart = () => {
    fetch("http://localhost:3001/api/cart")
      .then(res => res.json())
      .then(setCart)
  }

  useEffect(loadCart, [])

  // Tính tổng tiền của giỏ hàng
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const checkout = async () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn thanh toán?")
    if (!confirm) return

    await fetch("http://localhost:3001/api/cart", { method: "DELETE" })
    alert("Thanh toán thành công!")
    loadCart()
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <h2 className="cart-title">Giỏ hàng của bạn</h2>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Giỏ hàng đang trống.</p>
            <a href="/" className="back-link">Tiếp tục mua sắm</a>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-details">
                      {item.quantity} x {item.price.toLocaleString()} đ
                    </span>
                  </div>
                  <span className="item-subtotal">
                    {(item.quantity * item.price).toLocaleString()} đ
                  </span>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="total-row">
                <span>Tổng thanh toán:</span>
                <span className="total-price">{totalPrice.toLocaleString()} đ</span>
              </div>
              <button className="checkout-btn" onClick={checkout}>
                Thanh toán ngay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}