import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function CartItem({ item, triggerReload }) {
  const handlePlus = () => {
    fetch("http://localhost:3055/api/v1/cart/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhjNzZkZGFiZmMzMzBhYjQ2MjYzYTYiLCJlbWFpbCI6InRkaW5oQGdtYWlsLmNvbSIsImlhdCI6MTczNzUzNDQwMSwiZXhwIjoxNzM3NzA3MjAxfQ.NwRkAqsD58YOXFnBYcUgQ0GoYUHnWQGptQZ_JsicE_U",
        "x-client-id": "678c76ddabfc330ab46263a6",
      },
      body: JSON.stringify({
        products: [
          {
            productId: item.productId,
            quantity: item.quantity + 1,
            size: item.size
          },
        ],
      }),
    }).then(() => {
      triggerReload();
    });
  };

  const handleExcept = () => {
    fetch("http://localhost:3055/api/v1/cart/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhjNzZkZGFiZmMzMzBhYjQ2MjYzYTYiLCJlbWFpbCI6InRkaW5oQGdtYWlsLmNvbSIsImlhdCI6MTczNzUzNDQwMSwiZXhwIjoxNzM3NzA3MjAxfQ.NwRkAqsD58YOXFnBYcUgQ0GoYUHnWQGptQZ_JsicE_U",
        "x-client-id": "678c76ddabfc330ab46263a6",
      },
      body: JSON.stringify({
        products: [
          {
            productId: item.productId,
            quantity: item.quantity - 1,
            size: item.size
          },
        ],
      }),
    }).then(() => {
      triggerReload();
    });
  };
  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:3055/api/v1/cart", {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhjNzZkZGFiZmMzMzBhYjQ2MjYzYTYiLCJlbWFpbCI6InRkaW5oQGdtYWlsLmNvbSIsImlhdCI6MTczNzUzNDQwMSwiZXhwIjoxNzM3NzA3MjAxfQ.NwRkAqsD58YOXFnBYcUgQ0GoYUHnWQGptQZ_JsicE_U",
              "x-client-id": "678c76ddabfc330ab46263a6",
            },
            body: JSON.stringify({
              product:{
                productId: item.productId,
                size: item.size,
              }
            }),
          })
            .then((response) => response.json())
            .then(() => {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your item has been deleted.",
                "success"
              );
              triggerReload();
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire(
                "Error",
                "Failed to delete item!",
                "error"
              );
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your item is safe :)",
            "error"
          );
        }
      });
  };
  return (
    <>
      <div className="cart__item">
        <div className="cart__image">
          <img src={item.thumbnail} alt={item.name} />
        </div>
        <div className="cart__content">
          <div className="cart__name">Tên sản phẩm: {item.name}</div>
          <div className="cart__size">Size: {item.size}</div>
          <div className="cart__price">
          Đơn giá:
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.price)}
          </div>
          <div className="cart__quantity">
          Số lượng: 
            <button className="button-2" onClick={handleExcept}>
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              readOnly
            />
            <button className="button-2" onClick={handlePlus}>
              +
            </button>
          </div>
          <button className="cart__delete" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
