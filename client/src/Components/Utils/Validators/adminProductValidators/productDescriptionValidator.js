import * as Yup from "yup";

const productDescriptionSchema = Yup.string()
  .trim()
  .min(4, "Description must be at least 10 characters long")
  .max(500, "Description must be at most 500 characters long")
  .required("Description is required");

export default async function validateProductDescription(description) {
  try {
    await productDescriptionSchema.validate(description);
    return null;
  } catch (error) {
    return error.message;
  }
}
