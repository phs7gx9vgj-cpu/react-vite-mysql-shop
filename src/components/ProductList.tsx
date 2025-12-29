import type { Product } from "../types/Product"
import './ProductList.css'

interface Props {
  products: Product[],
  onAddToCart: (product: Product, quantity: number) => void
}

export default function ProductList({ products, onAddToCart }: Props) {
  // Danh sách các ảnh dự phòng
  const PLACEHOLDER_IMAGES = [
    "htthttps://city89.com/wp-content/uploads/2023/10/TT-0015-black-back-copy.jpg",
    "https://city89.com/wp-content/uploads/2023/10/TT-0015-black-back-copy.jpg",
    "https://product.hstatic.net/1000402464/product/jn25ss09p-rg_jean__4__20ee1b6fb9a9466fab51326e6497caa3_master.jpg",
    "https://product.hstatic.net/200000126299/product/z5731188687196_a912b490066d450f58b9a1f92cfe8d2c_ddfa0309c84846db9a48b1e323237168_master.jpg"
  ];

  return (
    <div className="container">
      <div className="product-list">
        {products.map((p) => {
          // Lấy 1 ảnh từ mảng dựa trên ID (ví dụ: ID 1 lấy ảnh index 1, ID 5 lấy lại index 1)
          const fallbackIdx = p.id % PLACEHOLDER_IMAGES.length;
          const fallbackUrl = PLACEHOLDER_IMAGES[fallbackIdx];

          return (
            <div className="product-card" key={p.id}>
              <div className="product-image-wrapper">
                <img 
                  src={p.image || fallbackUrl} 
                  alt={p.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackUrl;
                  }}
                />
              </div>
              
              <div className="product-info">
                <p className="product-title">{p.name}</p>
                <p className="product-price">{p.price.toLocaleString()}₫</p>
                <button className="btn" onClick={() => onAddToCart(p, 1)}>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}