const initialState = 0; // Giá trị mặc định cho tổng tiền

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOTAL_MONEY":
      return action.money; // Cập nhật tổng tiền từ action

    default:
      return state; // Giữ nguyên state nếu action không phù hợp
  }
};

export default cartReducer;
