import express from "express"
import cors from "cors"
import { db } from "./db.js"

const app = express()
app.use(cors())
app.use(express.json())

// 1️⃣ Lấy danh sách sản phẩm
app.get("/api/products", async (_, res) => {
  const [rows] = await db.execute("SELECT * FROM products")
  res.json(rows)
})

// 2️⃣ Thêm vào giỏ hàng
app.post("/api/cart", async (req, res) => {
  const { product, quantity } = req.body

  const [exist] = await db.execute(
    "SELECT * FROM cart_items WHERE product_id = ?",
    [product.id]
  )

  if (exist.length > 0) {
    await db.execute(
      "UPDATE cart_items SET quantity = quantity + ? WHERE product_id = ?",
      [quantity, product.id]
    )
  } else {
    await db.execute(
      "INSERT INTO cart_items (product_id, name, price, quantity) VALUES (?, ?, ?, ?)",
      [product.id, product.name, product.price, quantity]
    )
  }

  res.json({ message: "Added to cart" })
})

// 3️⃣ Lấy giỏ hàng
app.get("/api/cart", async (_, res) => {
  const [rows] = await db.execute("SELECT * FROM cart_items")
  res.json(rows)
})

// 4️⃣ Thanh toán → xoá giỏ hàng
app.delete("/api/cart", async (_, res) => {
  await db.execute("DELETE FROM cart_items")
  res.json({ message: "Checkout success" })
})

app.listen(3001, () =>
  console.log("Server running http://localhost:3001")
)
