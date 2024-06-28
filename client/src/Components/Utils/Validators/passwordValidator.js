// passwordValidator.js
import * as yup from "yup";

const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  )
  .required("Password is required");

export default async function validatePassword(password) {
  try {
    await passwordSchema.validate(password);
    return true;
  } catch (error) {
    return error.message;
  }
}
