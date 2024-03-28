import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const OrderItemsDashboard = ({ orderItems }) => {
    return (
        <div className="card">
            <DataTable
                value={orderItems}
                showGridlines
                stripedRows
                scrollable
                tableStyle={{ minWidth: "40rem" }}
                scrollHeight="60vh"
            >
                <Column field="order_item_id" header="Order Item ID" />
                <Column field="order_id" header="Order ID" />
                <Column field="prod_id" header="Product ID" />
                <Column field="prod_name" header="Product Name" />
                <Column field="quantity" header="Quantity" />
                <Column field="total_price" header="Total Price" />
                <Column field="created_at" header="Created At" />
            </DataTable>
        </div>
    );
};

export default OrderItemsDashboard;
