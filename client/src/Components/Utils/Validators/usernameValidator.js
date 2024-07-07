// utils/validators/usernameValidator.js
import * as yup from "yup";

const usernameSchema = yup
  .string()
  .trim() // Remove leading/trailing whitespace
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be at most 20 characters long")
  .matches(
    /^[a-zA-Z0-9_]+$/,
    "Username must contain only letters, numbers, and underscores"
  )
  .notOneOf(["admin", "Admin", "ADMIN"], 'Username cannot be "admin"')
  .required("Username is required");

export default async function validateUsername(username) {
  try {
    await usernameSchema.validate(username);
    // Additional async validation for uniqueness (e.g., check against database)
    const isUnique = await checkUsernameUniqueness(username); // Example async function
    if (isUnique) {
      return "Username already exists";
    }
    return true;
  } catch (error) {
    return error.message;
  }
}

// Example async function to check uniqueness (implementation depends on your backend)
async function checkUsernameUniqueness(username) {
  return false;
  // ... (your logic to query the database or API)
  // Return true if unique, false if not unique
}
