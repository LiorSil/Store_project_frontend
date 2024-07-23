import * as yup from "yup";

const productQuantitySchema = yup
  .number()
  .min(10, "Quantity must be at least 10")
  .max(1000, "Quantity must be less than 1,000")
  .required("Quantity is required");

export default async function validateProductQuantity(quantity) {
  try {
    await productQuantitySchema.validate(quantity);
    return null;
  } catch (error) {
    return error.message;
  }
}
