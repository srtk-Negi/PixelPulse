import { ProgressSpinner } from "primereact/progressspinner";

function LoadingSpinner() {
    return (
        <div className="text-center mt-4">
            <ProgressSpinner aria-label="Loading" />
        </div>
    );
}

export default LoadingSpinner;
