import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AdminDashboard = ({ users }) => {
    return (
        <div className="card">
            <DataTable
                value={users}
                showGridlines
                stripedRows
                scrollable
                tableStyle={{ minWidth: "40rem" }}
                scrollHeight="60vh"
            >
                <Column field="user_id" header="User ID" />
                <Column field="first_name" header="First Name" />
                <Column field="last_name" header="Last Name" />
                <Column field="email" header="Email" />
                <Column field="user_type" header="User Type" />
                <Column field="address" header="Address" />
                <Column field="created_at" header="Created At" />
            </DataTable>
        </div>
    );
};

export default AdminDashboard;
