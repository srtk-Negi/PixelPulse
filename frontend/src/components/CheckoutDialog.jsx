import React from "react";

const CheckoutDialog = ({ setShowCheckoutDialog, cartTotal }) => {
    const tax = 8.25;
    const taxAmount = parseFloat(
        Math.round(cartTotal * (tax / 100)).toFixed(2)
    );
    const total = cartTotal + taxAmount;

    return (
        <div>
            <h3>Subtotal: ${cartTotal}</h3>
            <h3>Tax: ${taxAmount}</h3>
            <h3>Total: ${total}</h3>
            <button
                className="p-button p-component p-button-raised p-button-rounded"
                onClick={() => setShowCheckoutDialog(false)}
            >
                Cancel
            </button>
            <button
                className="p-button p-component p-button-raised p-button-rounded p-button-success"
                onClick={() => alert("Checkout successful!")}
            >
                Checkout
            </button>
        </div>
    );
};

export default CheckoutDialog;
