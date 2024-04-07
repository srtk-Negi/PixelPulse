import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Formik, Form, ErrorMessage } from "formik";

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
                <h2>Card Information</h2>
                <Formik
                    initialValues={{
                        cardNumber: "",
                        expirationDate: "",
                        cvv: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    <Form>
                        <div className="p-inputgroup">
                            <InputText
                                placeholder="Card Number"
                                name="cardNumber"
                            />
                        </div>
                        <ErrorMessage name="cardNumber" component="div" />
                        <div className="p-inputgroup">
                            <InputText
                                placeholder="Expiration Date"
                                name="expirationDate"
                            />
                        </div>
                        <ErrorMessage name="expirationDate" component="div" />
                        <div className="p-inputgroup">
                            <InputText placeholder="CVV" name="cvv" />
                        </div>
                        <ErrorMessage name="cvv" component="div" />
                        <Button label="Checkout" type="submit" />
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default CheckoutDialog;
