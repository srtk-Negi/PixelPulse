import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useContext } from "react";
import { AdminContext } from "../../pages/AdminHomePage";

const ProductUpdateForm = ({
    product,
    setShowProductUpdateForm,
    getAllProducts,
}) => {
    const { token, setToken } = useContext(AdminContext);
    return (
        <Formik
            initialValues={{
                name: product.name,
                brand: product.brand,
                description: product.description,
                price: product.price,
                category: product.category,
                image_url: product.image_url,
                items_in_stock: product.items_in_stock,
            }}
            onSubmit={async (values) => {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };
                try {
                    const response = await axios.patch(
                        `/api/admin/products/update/${product.prod_id}`,
                        values,
                        { headers: headers }
                    );
                    setShowProductUpdateForm(false);
                    getAllProducts();
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
                                <label htmlFor="name">Name</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="name" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="brand">Brand</label>
                                <InputText
                                    id="brand"
                                    name="brand"
                                    value={values.brand}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="brand" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="description">Description</label>
                                <InputText
                                    id="description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="description" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="price">Price</label>
                                <InputText
                                    id="price"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="price" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="category">Category</label>
                                <InputText
                                    id="category"
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="category" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="image_url">Image URL</label>
                                <InputText
                                    id="image_url"
                                    name="image_url"
                                    value={values.image_url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="image_url" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="items_in_stock">
                                    Items In Stock
                                </label>
                                <InputText
                                    id="items_in_stock"
                                    name="items_in_stock"
                                    value={values.items_in_stock}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="itemsInStock" />
                            </div>
                        </div>
                        <Button
                            label="Submit"
                            type="submit"
                            className="p-button-raised p-button-rounded p-button-success"
                        />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ProductUpdateForm;
