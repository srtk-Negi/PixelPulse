import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Formik, Form, ErrorMessage } from "formik";
import { creditCardSchema, discountCodeSchema } from "../schemas";
import axios from "axios";
import { Toast } from "primereact/toast";

const applyDiscount = async (discount, setDiscount, setDiscountError) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    try {
        const { data } = await axios.post(
            "/api/discounts/check",
            { code: discount },
            { headers: headers }
        );
        setDiscount(data.discount);
    } catch (error) {
        setDiscountError(error.response.data.detail);
    }
};

const CheckoutDialog = ({
    setShowCheckoutDialog,
    cartTotal,
    handlePlaceOrder,
}) => {
    const tax = 8.25;
    const [taxAmount, setTaxAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountError, setDiscountError] = useState("");
    const toast = useRef(null);

    const showDiscountApplied = () => {
        toast.current.show({
            severity: "success",
            summary: "Discount Applied",
            detail: `${discount}% iscount has been applied`,
            life: 3000,
        });
    };

    const showDiscountError = () => {
        toast.current.show({
            severity: "error",
            summary: "Invalid Discount",
            detail: `${discountError}`,
            life: 3000,
        });
    };

    useEffect(() => {
        setTaxAmount(parseFloat((cartTotal * (tax / 100)).toFixed(2)));
        setTotal(cartTotal + taxAmount);
    }, [taxAmount]);

    return (
        <div className="checkoutDialog">
            <Toast ref={toast} />
            <div className="bill">
                <h3>Subtotal: ${cartTotal}</h3>
                <h3>Tax: ${taxAmount}</h3>
                <h3>Total: ${total}</h3>
                <Formik
                    validationSchema={discountCodeSchema}
                    initialValues={{
                        discountCode: "",
                    }}
                    onSubmit={async (values) => {
                        applyDiscount(
                            values.discountCode,
                            setDiscount,
                            setDiscountError
                        ).then(() => {
                            console.log(discount);
                            if (discount) {
                                setTotal(
                                    parseFloat(
                                        (
                                            total -
                                            total * (discount / 100)
                                        ).toFixed(2)
                                    )
                                );
                                showDiscountApplied();
                                setDiscount(0);
                            } else {
                                showDiscountError();
                            }
                        });
                    }}
                >
                    {({ handleChange, values }) => (
                        <Form className="form">
                            <InputText
                                id="discountCode"
                                name="discountCode"
                                placeholder="Discount code"
                                value={values.discountCode}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="discountCode"
                                component="div"
                                className="p-error"
                            />
                            <Button
                                style={{ marginTop: "2rem" }}
                                label="Submit"
                                type="submit"
                                className="p-button-raised p-button-rounded"
                                disabled={!values.discountCode}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="cardInfo">
                <Formik
                    // validationSchema={creditCardSchema}
                    initialValues={{
                        nameOnCard: "",
                        cardNumber: "",
                        expirationDate: "",
                        cvv: "",
                    }}
                    onSubmit={async (values) => {
                        handlePlaceOrder(taxAmount, total);
                        setShowCheckoutDialog(false);
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
