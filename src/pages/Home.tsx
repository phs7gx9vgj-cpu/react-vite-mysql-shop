import { useEffect, useState } from "react"
import ProductList from "../components/ProductList"
import type { Product } from "../types/Product"

interface Props {
  addToCart: (product: Product, quantity: number) => void
}

export default function Home({ addToCart }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then(res => res.json())
      .then(setProducts)
  }, [])

  return (
    <main className="home-container">
      <header className="home-header">
        <h1>Cửa Hàng Công Nghệ</h1>
        <p>Khám phá sản phẩm giá tốt</p>
      </header>

      <section className="product-section">
        <ProductList products={products} onAddToCart={addToCart} />
      </section>
    </main>
  )
}
