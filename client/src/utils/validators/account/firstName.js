// utils/validators/firstNameValidator.js
import * as yup from "yup";

// Schema for first and last names
const nameSchema = yup
  .string()
  .trim() // Remove leading/trailing whitespace
  .min(2, "Name must be at least 2 characters long")
  .max(20, "Name must be at most 50 characters long")
  .matches(
    /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/,
    "Name must contain only letters and a maximum of one space"
  )
  .notOneOf(["admin", "Admin", "ADMIN"], 'Username cannot be "admin"')
  .required("Name is required");

export default async function validateFirstName(firstName) {
  try {
    await nameSchema.validate(firstName);
    return true;
  } catch (error) {
    return error.message; // Return the specific error message
  }
}
