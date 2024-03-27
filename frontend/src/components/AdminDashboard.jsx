import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const updateButton = (rowData) => {
    return (
        <Button
            label="Update"
            onClick={() => {
                console.log(rowData);
                setSelectedUser(rowData);
            }}
        >
            Update
        </Button>
    );
};

const AdminDashboard = ({ users, setSelectedUser }) => {
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
                <Column
                    header="Update User"
                    body={(rowData) => {
                        return updateButton(rowData);
                    }}
                />
            </DataTable>
        </div>
    );
};

export default AdminDashboard;
