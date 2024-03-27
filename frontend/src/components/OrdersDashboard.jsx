import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColorPicker } from "primereact/colorpicker";

const OrdersDashboard = ({ orders }) => {
    return (
        <div className="card">
            <DataTable
                value={orders}
                showGridlines
                stripedRows
                scrollable
                tableStyle={{ minWidth: "40rem" }}
                scrollHeight="60vh"
            >
                <Column field="order_id" header="Order ID" />
                <Column field="user_id" header="User ID" />
                <Column field="created_at" header="Created At" />
                <Column field="total_price" header="Total Price" />
                <Column field="address" header="Address" />
                <Column field="payment_method" header="Payment Method" />
                <Column field="order_status" header="Order Status" />
                <Column field="tax" header="Tax" />
                <Column field="discount" header="Discount" />
                <Column field="discount_code" header="Discount Code" />
            </DataTable>
        </div>
    );
};

export default OrdersDashboard;
