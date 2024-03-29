import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { formatLocalISODate } from "../adminHelperFunctions";

const updateButton = (rowData, setSelectedUser, setShowUserUpdateForm) => {
    return (
        <Button
            label="Update"
            onClick={() => {
                setSelectedUser(rowData);
                setShowUserUpdateForm(true);
            }}
        />
    );
};

const deleteUserButton = (
    rowData,
    setSelectedUser,
    setShowUserDeleteDialog
) => {
    return (
        <Button
            label="Delete"
            onClick={() => {
                setSelectedUser(rowData);
                setShowUserDeleteDialog(true);
            }}
        />
    );
};

const UsersDashboard = ({
    users,
    setSelectedUser,
    setShowUserUpdateForm,
    setShowUserDeleteDialog,
}) => {
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
                <Column field="phone" header="Phone Number" />
                <Column field="user_type" header="User Type" />
                <Column field="address" header="Address" />
                <Column
                    field="created_at"
                    header="Created At"
                    body={(rowData) => {
                        return formatLocalISODate(rowData.created_at);
                    }}
                />
                <Column
                    header="Update User"
                    body={(rowData) => {
                        return updateButton(
                            rowData,
                            setSelectedUser,
                            setShowUserUpdateForm
                        );
                    }}
                />
                <Column
                    header="Delete User"
                    body={(rowData) => {
                        return deleteUserButton(
                            rowData,
                            setSelectedUser,
                            setShowUserDeleteDialog
                        );
                    }}
                />
            </DataTable>
        </div>
    );
};

export default UsersDashboard;
