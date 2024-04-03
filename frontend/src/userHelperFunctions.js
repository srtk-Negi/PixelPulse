import axios from "axios";

export const addToCart = async (prod_id, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try {
        console.log(headers);
        const response = await axios.post(`/api/cart/${prod_id}`, {
            headers: headers,
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error adding to cart");
        console.error(error);
    }
};
