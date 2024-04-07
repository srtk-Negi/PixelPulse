import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Required"),
});

export const registrationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain a lowercase, uppercase, number, and special symbol"
        ),
    user_type: Yup.string().required("User type is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
});

export const creditCardSchema = Yup.object().shape({
    nameOnCard: Yup.string().required("Name is required"),
    cardNumber: Yup.string()
        .required("Card number is required")
        .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
    expirationDate: Yup.string()
        .required("Expiration date is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format should be MM/YY"),
    cvv: Yup.string()
        .required("CVV is required")
        .matches(/^[0-9]{3}$/, "CVV must be 3 digits"),
});
