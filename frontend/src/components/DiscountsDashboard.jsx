import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DiscountsDashboard = ({ discounts }) => {
    return (
        <div className="card">
            <DataTable
                value={discounts}
                showGridlines
                stripedRows
                scrollable
                tableStyle={{ minWidth: "30rem" }}
                scrollHeight="60vh"
            >
                <Column field="discount_code_id" header="ID" />
                <Column field="code" header="Name" />
                <Column field="discount" header="Discount" />
                <Column field="is_active" header="Active" />
                <Column field="expiration_date" header="Expiration Date" />
                <Column field="created_at" header="Created At" />
            </DataTable>
        </div>
    );
};

export default DiscountsDashboard;
