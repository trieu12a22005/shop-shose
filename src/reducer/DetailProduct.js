const DetailProduct = (state = null, action) => {
    switch (action.type) {
        case "DETAIL_PRODUCT":
            return action.id; // Cập nhật state với id từ action
        default:
            return state; // Trả về state hiện tại nếu action không khớp
    }
};
export default DetailProduct;
