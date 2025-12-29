import type { CartItem } from "../types/Product"
import './cart.css'    

interface Props {
  cart: CartItem[]
  onCheckout: () => void
}

export default function Cart({ cart, onCheckout }: Props) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-container">
      <h2 className="cart-title">Giỏ hàng</h2>

      {cart.length === 0 && <p className="cart-empty">Giỏ hàng trống</p>}

      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <span>{item.quantity} x {item.price.toLocaleString()} đ</span>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <p className="cart-total">Tổng tiền: {totalPrice.toLocaleString()} đ</p>
          <button className="checkout-btn" onClick={onCheckout}>
            Thanh toán
          </button>
        </>
      )}
    </div>
  )
}