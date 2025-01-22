const ProductReducer = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_PRODUCT":
      // Ghi đè danh sách sản phẩm mới từ action.product
      return [...action.product];

    default:
      return state;
  }
};

export default ProductReducer;
