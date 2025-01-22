function OrderItem(props){

    const item = props.item;
    console.log(item);
    return(
        <>
          <div className="cart__item">
        <div className="cart__image">
          <img src={item.thumbnail} alt={item.name} />
        </div>
        <div className="cart__content">
          <div className="cart__name">Tên sản phẩm: {item.name}</div>
          <div className="cart__size">Size: {item.size}</div>
          <div className="cart__price">
          Giá:
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.price)}
          </div>
          <div className="cart__quantity">
          Số lượng: {item.quantity}
          </div>
        </div>
      </div>
        </>
    )
}
export default OrderItem