export interface Product {
  id: number
  name: string
  price: number
  image?: string  // <-- Thêm dòng này, dùng optional (?) cho an toàn
}

export interface CartItem extends Product {
  quantity: number
}
