import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.scss";
import DetailItem from "./DetailItem";

function ProductDetail() {
  const { postId } = useParams(); // Lấy `postId` từ URL params
  const [product, setProduct] = useState(null); // Lưu chi tiết sản phẩm
  const [error, setError] = useState(null); // Lưu lỗi nếu có
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3055/api/v1/product/${postId}`);
        if (!response.ok) {
          throw new Error("Không tìm thấy sản phẩm"); // Xử lý lỗi HTTP
        }
        const data = await response.json();
        setProduct(data.metadata); // Lưu chi tiết sản phẩm
        setLoading(false); // Dừng trạng thái tải
      } catch (err) {
        setError(err.message);
        setLoading(false); // Dừng trạng thái tải
      }
    };

    fetchProductDetail();
  }, [postId]);
  console.log(product);
  if (loading) {
    return <div>Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <>
      {product ? (
        <DetailItem detail={product} />
      ) : (
        <div>Không có chi tiết sản phẩm để hiển thị.</div>
      )}
    </>
  );
}

export default ProductDetail;
