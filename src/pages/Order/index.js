import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderITem";
import "./Order.scss"
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function CartOrder() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [error, setError] = useState(null);
  const totalMoney = useSelector((state) =>state.cartReducer);
  const [cart, setCart] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // lấy danh sách sản phẩm
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3055/api/v1/cart?userId=678c76ddabfc330ab46263a6",
          {
            headers: {
            Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhjNzZkZGFiZmMzMzBhYjQ2MjYzYTYiLCJlbWFpbCI6InRkaW5oQGdtYWlsLmNvbSIsImlhdCI6MTczNzUzNDQwMSwiZXhwIjoxNzM3NzA3MjAxfQ.NwRkAqsD58YOXFnBYcUgQ0GoYUHnWQGptQZ_JsicE_U",
          "x-client-id": "678c76ddabfc330ab46263a6"
          }
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setCart(data.metadata.cart_products);
      } catch (error) {
      }
    };
    fetchCart();
  }, []);
  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải dữ liệu tỉnh/thành phố");
        }
        return response.json();
      })
      .then((data) => {
        setProvinces(data.data.data);
        setLoadingProvinces(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingProvinces(false);
      });
  }, []);

  // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố
  useEffect(() => {
    if (selectedCity) {
      setLoadingDistricts(true);
      const provinceCode = provinces.find((province) => province.name === selectedCity)?.code;
      fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Lỗi khi tải dữ liệu quận/huyện");
          }
          return response.json();
        })
        .then((data) => {
          setDistricts(data.data.data);
          setLoadingDistricts(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoadingDistricts(false);
        });
    } else {
      setDistricts([]); // Xóa danh sách quận/huyện nếu không có tỉnh nào được chọn
    }
  }, [selectedCity, provinces]);

  // Lấy danh sách xã/thôn dựa trên quận/huyện
  useEffect(() => {
    if (selectedDistrict) {
      setLoadingWards(true);
      const districtCode = districts.find((district) => district.name === selectedDistrict)?.code;
      fetch(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Lỗi khi tải dữ liệu xã/thôn");
          }
          return response.json();
        })
        .then((data) => {
          setWards(data.data.data);
          setLoadingWards(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoadingWards(false);
        });
    } else {
      setWards([]); // Xóa danh sách xã/thôn nếu không có quận nào được chọn
    }
  }, [selectedDistrict, districts]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict(""); // Xóa quận/huyện khi đổi tỉnh
    setSelectedWard(""); // Xóa xã/thôn khi đổi tỉnh
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedWard(""); // Xóa xã/thôn khi đổi quận
  };
  const postCart = async () => {
    try {
      const response = await fetch("http://localhost:3055/api/v1/checkout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhjNzZkZGFiZmMzMzBhYjQ2MjYzYTYiLCJlbWFpbCI6InRkaW5oQGdtYWlsLmNvbSIsImlhdCI6MTczNzUzNDQwMSwiZXhwIjoxNzM3NzA3MjAxfQ.NwRkAqsD58YOXFnBYcUgQ0GoYUHnWQGptQZ_JsicE_U",
          "x-client-id": "678c76ddabfc330ab46263a6",
        },
        body: JSON.stringify({
          cart_products:cart
          ,
          totalPrice: totalMoney,
          user_address: {
            street: "123",
            ward: selectedWard,
            city: selectedCity,
            district: selectedDistrict,
            country: "VietNam"
          },
          user_payment: selectedOption
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: data.message || "Bạn đã thêm sản phẩm vào giỏ hàng",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() =>{
          navigate("/")
        },2000)
      } else {
        throw new Error(data.message || "Đã xảy ra lỗi khi thêm sản phẩm!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message || "Không thể thêm sản phẩm vào giỏ hàng!",
      });
    }
  };
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };
  const handleSubmit = () =>{
    postCart();
  }
  return (
    <>
      <div className="order">
      <h1>THÔNG TIN MUA HÀNG</h1>
      <h3>HÀNG ĐÃ MUA</h3>
      <div className="cart">
        {
          cart.map((item)=>(
            <OrderItem item = {item} key={item.productId} />
          ))
        }
      </div>
      <div className="order__total">
      <div className="cart__total">
        <div>
          Tổng tiền:<span>{totalMoney}</span>
        </div>
      </div>
      </div>
      <h3>ĐỊA CHỈ GIAO HÀNG</h3>

      {/* Dropdown tỉnh/thành phố */}
      <label className="address">Chọn tỉnh/thành phố:</label>
      {loadingProvinces ? (
        <p>Đang tải danh sách tỉnh/thành phố...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Lỗi: {error}</p>
      ) : (
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">-- Chọn tỉnh/thành phố --</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>
      )}
      <br/>
      {/* Dropdown quận/huyện */}
      <label className="address">Chọn quận/huyện:</label>
      {loadingDistricts ? (
        <p>Đang tải danh sách quận/huyện...</p>
      ) : (
        <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedCity}>
          <option value="">-- Chọn quận/huyện --</option>
          {districts.map((district) => (
            <option key={district.code} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      )}
      <br/>
      {/* Dropdown xã/thôn */}
      <label className="address">Chọn xã/phường/thị trấn:</label>
      {loadingWards ? (
        <p>Đang tải danh sách xã/phường/thị trấn...</p>
      ) : (
        <select value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
          <option value="">-- Chọn xã/phường/thị trấn --</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.name}>
              {ward.name}
            </option>
          ))}
        </select>
      )}
      <h3 className="order__method">CHỌN PHƯƠNG THỨC THANH TOÁN</h3>
      <label>
        <input
          type="radio"
          value="COD"
          checked={selectedOption === 'COD'}
          onChange={handleChange}
        />
        COD
      </label>
      <br/>
      <label>
        <input
          type="radio"
          value="Credit Card"
          checked={selectedOption === 'Credit Card'}
          onChange={handleChange}
        />
        Credit Card
      </label>
      <br/>
      <label>
        <input
          type="radio"
          value="Smart Banking"
          checked={selectedOption === 'Smart Banking'}
          onChange={handleChange}
        />
        Smart Banking
      </label>

      <br />
      <button className="cart__buy" onClick={handleSubmit}>Đặt hàng</button>
      </div>
    </>
  );
}

export default CartOrder;
