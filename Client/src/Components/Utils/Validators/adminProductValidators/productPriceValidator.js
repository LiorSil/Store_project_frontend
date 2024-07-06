import * as yup from "yup";

const productPriceSchema = yup
  .number()

  .min(10, "Price must be at least 10 ILS")
  .max(10000, "Price must be less than 10,000 ILS")

  .required("Price is required");

export default async function validateProductPrice(price) {
  try {
    await productPriceSchema.validate(price);
    return "";
  } catch (error) {
    return error.message;
  }
}
