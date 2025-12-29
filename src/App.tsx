import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import CartPage from "./pages/CartPage"
import type { Product, CartItem } from "./types/Product"

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id)
      if (exist) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const checkout = async () => {
    const total = cart.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    )
    
    try {
      await fetch("http://localhost:3001/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, total })
      })

      alert("Thanh toán thành công")
      setCart([])
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Có lỗi xảy ra khi thanh toán")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Shop Basic</h1>
   
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart} 
                onCheckout={checkout} 
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}