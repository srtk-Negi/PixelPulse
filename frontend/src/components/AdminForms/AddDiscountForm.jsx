import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

const AddDiscountForm = ({ setShowAddDiscountForm, getAllDiscounts }) => {
    return (
        <Formik
            initialValues={{
                code: "",
                discount: "",
                is_active: true,
                expiration_date: "",
            }}
            onSubmit={async (values) => {
                try {
                    let expiration_date = new Date(values.expiration_date);
                    let timezoneOffset =
                        expiration_date.getTimezoneOffset() * 60000;
                    values.expiration_date = new Date(
                        expiration_date.getTime() - timezoneOffset
                    ).toISOString();
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
            {({
                handleChange,
                handleBlur,
                values,
                touched,
                setFieldTouched,
                setFieldValue,
                errors,
            }) => {
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
                                <label htmlFor="expiration_date">
                                    Expiration Date
                                </label>
                                <Calendar
                                    id="deadline"
                                    name="deadline"
                                    value={values.deadline}
                                    minDate={new Date()}
                                    onChange={(e) => {
                                        const selectedDate = e.value
                                            ? new Date(e.value)
                                            : null;
                                        const newDate = new Date();
                                        newDate.setDate(newDate.getDate() + 1);
                                        setFieldValue(
                                            "expiration_date",
                                            selectedDate < newDate
                                                ? newDate
                                                : selectedDate
                                        );
                                    }}
                                    onBlur={() =>
                                        setFieldTouched("expiration_date", true)
                                    }
                                    dateFormat="mm/dd/yy"
                                    className={` flex  ${
                                        touched.expiration_date &&
                                        errors.expiration_date
                                            ? "p-invalid"
                                            : ""
                                    }`}
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
