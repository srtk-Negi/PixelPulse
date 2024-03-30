import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatLocalISODate } from "../adminHelperFunctions";

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
                <Column field="discount_code_id" header="Discount Code ID" />
                <Column field="code" header="Code" />
                <Column
                    field="discount"
                    header="Discount"
                    body={(rowData) => {
                        return rowData.discount + "%";
                    }}
                />
                <Column field="is_active" header="Active" />
                <Column
                    field="created_at"
                    header="Created At"
                    body={(rowData) => formatLocalISODate(rowData.created_at)}
                />
                <Column
                    field="expiration_date"
                    header="Expiration Date"
                    body={(rowData) =>
                        formatLocalISODate(rowData.expiration_date)
                    }
                />
            </DataTable>
        </div>
    );
};

export default DiscountsDashboard;
