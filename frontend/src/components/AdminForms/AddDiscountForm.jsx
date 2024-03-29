import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const AddDiscountForm = (setShowAddDiscountForm, getAllDiscounts) => {
    return (
        <Formik
            initialValues={{
                code: "",
                discount: "",
                is_active: "",
                expiration_date: "",
            }}
            onSubmit={async (values) => {
                try {
                    const response = await axios.post(
                        "/api/admin/discounts/add",
                        values
                    );
                    setShowAddDiscountForm(false);
                    getAllDiscounts();
                } catch (error) {
                    console.error(error);
                }
            }}
        >
            {({ handleChange, handleBlur, values }) => {
                return (
                    <Form className="updateForm">
                        <div className="inputsContainer">
                            <div className="formGroup">
                                <label htmlFor="code">Code</label>
                                <InputText
                                    id="code"
                                    name="code"
                                    value={values.code}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="code" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="discount">Discount</label>
                                <InputText
                                    id="discount"
                                    name="discount"
                                    value={values.discount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="discount" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="is_active">Is Active</label>
                                <InputText
                                    id="is_active"
                                    name="is_active"
                                    value={values.is_active}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="is_active" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="expiration_date">
                                    Expiration Date
                                </label>
                                <InputText
                                    id="expiration_date"
                                    name="expiration_date"
                                    value={values.expiration_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="expiration_date" />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            label="Add Discount"
                            className="p-button-raised p-button-rounded p-button-success"
                        />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddDiscountForm;
