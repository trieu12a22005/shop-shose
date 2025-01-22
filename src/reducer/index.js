import cartReducer from "./cart";
import { combineReducers } from "redux";
import DetailProduct from "./DetailProduct";
import ProductReducer from "./Product";
const allReducers = combineReducers({
    cartReducer,
    DetailProduct,
    ProductReducer
})
export default allReducers;