import * as yup from "yup";

const productPriceSchema = yup
  .number()
  .min(0, "Price must be a positive number")
  .max(10000, "Price must be less than 10,000")

  .required("Price is required");

export default async function validateProductPrice(price) {
  try {
    await productPriceSchema.validate(price);
    return "";
  } catch (error) {
    return error.message;
  }
}
