export const getProductList = async() => {
    const response = await fetch("http://localhost:3055/api/v1/product");
            const result = await response.json();
            return result;
}