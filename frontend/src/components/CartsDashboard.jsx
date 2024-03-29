import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatLocalISODate } from "../adminHelperFunctions";

const CartsDashboard = ({ carts }) => {
    return (
        <div className="card">
            <DataTable
                value={carts}
                showGridlines
                stripedRows
                scrollable
                tableStyle={{ minWidth: "30rem" }}
                scrollHeight="60vh"
            >
                <Column field="cart_id" header="Cart ID" />
                <Column field="user_id" header="User ID" />
                <Column
                    field="created_at"
                    header="Created At"
                    body={(rowData) => formatLocalISODate(rowData.created_at)}
                />
            </DataTable>
        </div>
    );
};

export default CartsDashboard;
