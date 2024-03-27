import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const updateButton = (
    rowData,
    setSelectedProduct,
    setShowProductUpdateForm
) => {
    return (
        <Button
            label="Update"
            onClick={() => {
                setSelectedProduct(rowData);
                setShowProductUpdateForm(true);
            }}
        />
    );
};

const deleteButton = (
    rowData,
    setSelectedProduct,
    setShowProductDeleteDialog
) => {
    return (
        <Button
            label="Delete"
            onClick={() => {
                setSelectedProduct(rowData);
                setShowProductDeleteDialog(true);
            }}
        />
    );
};

const ProductsDashboard = ({
    products,
    setSelectedProduct,
    setShowProductUpdateForm,
    setShowProductDeleteDialog,
}) => {
    return (
        <div className="card">
            <DataTable
                value={products}
                showGridlines
                stripedRows
                scrollable
                tableStyle={{ minWidth: "40rem" }}
                scrollHeight="60vh"
            >
                <Column field="prod_id" header="Product ID" />
                <Column field="name" header="Name" />
                <Column field="brand" header="Brand" />
                <Column field="description" header="Description" />
                <Column field="price" header="Price" />
                <Column field="category" header="Category" />
                <Column field="items_in_stock" header="Items In Stock" />
                <Column
                    header="Update Product"
                    body={(rowData) => {
                        return updateButton(
                            rowData,
                            setSelectedProduct,
                            setShowProductUpdateForm
                        );
                    }}
                />
                <Column
                    header="Delete Product"
                    body={(rowData) => {
                        return deleteButton(
                            rowData,
                            setSelectedProduct,
                            setShowProductDeleteDialog
                        );
                    }}
                />
            </DataTable>
        </div>
    );
};

export default ProductsDashboard;
