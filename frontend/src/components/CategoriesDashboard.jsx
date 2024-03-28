import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const CategoriesDashboard = ({ categories }) => {
    return (
        <div className="card">
            <DataTable
                value={categories}
                showGridlines
                stripedRows
                scrollable
                tableStyle={{ minWidth: "30rem" }}
                scrollHeight="60vh"
            >
                <Column field="category_id" header="Category ID" />
                <Column field="name" header="Name" />
            </DataTable>
        </div>
    );
};

export default CategoriesDashboard;
