import { useState } from "react";
import Swal from "sweetalert2";
function ProductSearch({ onSearchResults}) {
  const [search, setSearch] = useState(""); // Giá trị nhập liệu
  const handleChange = (e) => {
    setSearch(e.target.value); // Cập nhật giá trị tìm kiếm
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      Swal.fire("Lỗi", "Vui lòng nhập từ khóa tìm kiếm.", "error");
      onSearchResults([]); // Reset kết quả tìm kiếm
      return;
    }
    fetch(`http://localhost:3055/api/v1/product/search?q=${search}&page=${1}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không tìm thấy sản phẩm phù hợp."); // Xử lý lỗi HTTP
        }
        return res.json();
      })
      .then((data) => {
        if (!data.metadata || data.metadata.results.length === 0) {
          Swal.fire("Thông báo", "Không có sản phẩm nào được tìm thấy.", "info");
          onSearchResults([]); // Đặt danh sách rỗng
        } else {
          onSearchResults(data.metadata.results);
        }
      })
      .catch((err) => {
        Swal.fire("Lỗi", err.message, "error");
        onSearchResults([]); // Đặt lại danh sách sản phẩm
      });
  };
  return (
    <>
      <div className="product__search">
        <input
          type="text"
          className="product__input"
          placeholder="Tìm kiếm sản phẩm tại đây"
          value={search}
          onChange={handleChange}
          autoFocus
        />
        <button className="product__search-button" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
    </>
  );
}

export default ProductSearch;
