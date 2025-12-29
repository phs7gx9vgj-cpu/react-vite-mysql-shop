import { useEffect, useState } from "react"
import ProductList from "../components/ProductList"
import type { Product } from "../types/Product"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then(res => res.json())
      .then(setProducts)
  }, [])

  const addToCart = async (product: Product, quantity: number) => {
    await fetch("http://localhost:3001/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, quantity })
    })

    alert(`Đã thêm ${product.name} vào giỏ hàng!`)
  }

  return (
    <main className="home-container">
      <header className="home-header">
        <h1>Cửa Hàng Công Nghệ</h1>
        <p>Khám phá những sản phẩm mới nhất với giá ưu đãi</p>
      </header>

      <section className="product-section">
        <ProductList products={products} onAddToCart={addToCart} />
      </section>
    </main>
  )
}