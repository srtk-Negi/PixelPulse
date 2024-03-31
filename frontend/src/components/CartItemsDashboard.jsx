import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatLocalISODate } from "../adminHelperFunctions";


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
                <Column field="quantity" header="Quantity" />
                <Column field="total_price" header="Total Price" />
                <Column
                    field="created_at"
                    header="Created At"
                    body={(rowData) => formatLocalISODate(rowData.created_at)}
                />
            </DataTable>
        </div>
    );
};

export default CartItemsDashboard;
