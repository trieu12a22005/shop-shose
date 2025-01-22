import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./Product.scss";
import ProductSearch from "./ProductSearch";
function ProductList() {
  const [allProducts, setAllProducts] = useState([]); // Dữ liệu tất cả sản phẩm từ API
  const [searchResults, setSearchResults] = useState([]); // Dữ liệu sản phẩm tìm kiếm
  const [currentpage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("");

  // Hàm lấy toàn bộ danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3055/api/v1/product?page=${currentpage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setAllProducts(data.metadata.products || []);
        setPageSize(data.metadata.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentpage]);

  const handlePrev = () => {
    if (currentpage > 1) {
      setCurrentPage(currentpage - 1);
    } else {
      alert("Đây là trang đầu tiên rồi");
    }
  };

  const handleNext = () => {
    if (currentpage < pageSize) {
      setCurrentPage(currentpage + 1);
    } else {
      alert("Đây là trang cuối cùng rồi");
    }
  };

  return (
    <>
      <ProductSearch onSearchResults={setSearchResults} />
      <div className="product">
        {searchResults.length > 0 ? (
          // Hiển thị kết quả tìm kiếm
          <>
            {searchResults.map((item) => (
              <ProductItem key={item._id} item={item} />
            ))}
            <div className="product__trans">
              <button className="product__prev" onClick={handlePrev}>
                Prev
              </button>
              <div className="product__page">{currentpage}</div>
              <button className="product__next" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        ) : (
          // Hiển thị tất cả sản phẩm
          <>
            {allProducts.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
            <div className="product__trans">
              <button className="product__prev" onClick={handlePrev}>
                Prev
              </button>
              <div className="product__page">{currentpage}</div>
              <button className="product__next" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductList;
