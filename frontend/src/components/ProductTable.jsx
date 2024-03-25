import React from "react";
import { DataView } from "primereact/dataview";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const ProductTable = ({ products }) => {
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState("");
    const sortOptions = [
        { label: "Price High to Low", value: "!price" },
        { label: "Price Low to High", value: "price" },
    ];
    const [severityString, setSeverityString] = useState("");

    const getSeverity = (product) => {
        if (product.items_in_stock > 50) {
            setSeverityString("IN STOCK");
            return "success";
        } else if (product.items_in_stock > 20) {
            setSeverityString("LOW STOCK");
            return "warning";
        } else {
            setSeverityString("OUT OF STOCK");
            return "danger";
        }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf("!") === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const header = () => {
        return (
            <Dropdown
                options={sortOptions}
                value={sortKey}
                optionLabel="label"
                placeholder="Sort By Price"
                onChange={onSortChange}
                className="w-full sm:w-14rem xl:w-20rem"
            />
        );
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div
                    className={classNames(
                        "flex flex-column xl:flex-row xl:align-items-start pl-8 pr-8 pt-6 pb-6 gap-4 prodCard",
                        { "border-top-1 surface-border": index !== 0 }
                    )}
                >
                    <img
                        className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                        src={product.image_url}
                        alt={product.name}
                    />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold">
                                {product.name}
                            </div>

                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">
                                        {product.category}
                                    </span>
                                </span>
                                <Tag
                                    value={severityString}
                                    severity={getSeverity(product)}
                                ></Tag>
                            </div>
                            <div className="flex align-items-center gap-3">
                                {product.description}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">
                                ${product.price}
                            </span>
                            <Button
                                icon="pi pi-shopping-cart"
                                className="p-button-rounded"
                                disabled={
                                    product.items_in_stock === 0 ? true : false
                                }
                                onClick={() => {
                                    console.log(
                                        product.name + " added to cart"
                                    );
                                }}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <DataView
                value={products}
                listTemplate={listTemplate}
                header={header()}
                sortField={sortField}
                sortOrder={sortOrder}
            />
        </div>
    );
};

export default ProductTable;
