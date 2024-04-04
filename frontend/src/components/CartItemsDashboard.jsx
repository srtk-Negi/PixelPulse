import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const CartItemsDashboard = ({ cartItems }) => {
    return (
        <div className="card">
            <DataTable
                value={cartItems}
                showGridlines
                stripedRows
                scrollable
                tableStyle={{ minWidth: "30rem" }}
                scrollHeight="60vh"
            >
                <Column field="cart_item_id" header="Cart Item ID" />
                <Column field="cart_id" header="Cart ID" />
                <Column field="prod_id" header="Product ID" />
                <Column field="prod_name" header="Product Name" />
                <Column field="quantity" header="Quantity" />
                <Column field="price" header="Price" />
                <Column field="total_price" header="Total Price" />
            </DataTable>
        </div>
    );
};

export default CartItemsDashboard;
