import * as yup from "yup";

const productTitleSchema = yup
  .string()
  .trim() // Remove leading/trailing whitespace
  .min(3, "Title must be at least 3 characters long")
  .max(50, "Title must be at most 50 characters long")
  .matches(/^[a-zA-Z\s]+$/, "Title must contain only letters and spaces")
  .required("Title is required");

export default function validateProductTitle(title) {
  try {
    productTitleSchema.validateSync(title);
    return null;
  } catch (error) {
    return error.message;
  }
}
