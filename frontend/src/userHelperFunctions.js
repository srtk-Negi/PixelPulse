import axios from "axios";

export const addToCart = async (prod_id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
        console.log(headers);
        await axios.post(`/api/cart/carts/${prod_id}`, {
            headers,
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error adding to cart");
        console.error(error);
    }
};
