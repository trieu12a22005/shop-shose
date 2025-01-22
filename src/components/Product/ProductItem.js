import { useNavigate } from "react-router-dom";
import "./Product.scss"
function ProductItem(props) {
  const navigate = useNavigate();
  const { item } = props;
  const handleDetail = () => {
    navigate(`/detail/${item._id}`)
  };
  console.log(item.product_thumbnails);
  return (
    <>
      <div className="product__item" onClick={handleDetail}>
        <div className="product__image">
          <img src={item.product_thumbnails} alt={item.product_name} />
        </div>
        <div className="product__content">
        <div className="product__title">{item.product_name}</div>
        <div className="product__price">{item.product_price}đ</div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
