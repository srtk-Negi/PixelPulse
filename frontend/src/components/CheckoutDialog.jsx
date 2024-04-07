import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Formik, Form, ErrorMessage } from "formik";
import { creditCardSchema } from "../schemas";

const placeOrder = async (cart, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const { data } = await axios.post(
            "/api/order/placeorder",
            { cart },
            { headers: headers }
        );
        return data;
    } catch (error) {
        return error.response.data.detail;
    }
};

const CheckoutDialog = ({ setShowCheckoutDialog, cartTotal }) => {
    const tax = 8.25;
    const taxAmount = parseFloat((cartTotal * (tax / 100)).toFixed(2));
    const total = cartTotal + taxAmount;

    return (
        <div className="checkoutDialog">
            <div className="bill">
                <h3>Subtotal: ${cartTotal}</h3>
                <h3>Tax: ${taxAmount}</h3>
                <h3>Total: ${total}</h3>
                <InputText placeholder="Enter discount code" />
                <Button label="Apply" className="p-button-secondary" />
            </div>
            <div className="cardInfo">
                <Formik
                    validationSchema={creditCardSchema}
                    initialValues={{
                        nameOnCard: "",
                        cardNumber: "",
                        expirationDate: "",
                        cvv: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ handleChange, handleBlur, values }) => (
                        <Form className="form">
                            <div className="nameOnCard">
                                <InputText
                                    id="nameOnCard"
                                    name="nameOnCard"
                                    placeholder="Name on card"
                                    value={values.nameOnCard}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="nameOnCard"
                                    component="div"
                                    className="p-error"
                                />
                            </div>
                            <div className="cardNumber">
                                <InputText
                                    id="cardNumber"
                                    name="cardNumber"
                                    placeholder="Card number"
                                    value={values.cardNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="cardNumber"
                                    component="div"
                                    className="p-error"
                                />
                            </div>
                            <div className="expirationDate">
                                <InputText
                                    id="expirationDate"
                                    name="expirationDate"
                                    placeholder="Expiration Date (MM/YY)"
                                    value={values.expirationDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="expirationDate"
                                    component="div"
                                    className="p-error"
                                />
                            </div>
                            <div className="cvv">
                                <InputText
                                    id="cvv"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={values.cvv}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="cvv"
                                    component="div"
                                    className="p-error"
                                />
                            </div>
                            <Button
                                label="Submit"
                                type="submit"
                                className="p-button-raised p-button-rounded"
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CheckoutDialog;
