import * as yup from "yup";

const productImageReferenceSchema = yup
  .string()
  .trim() // Remove whitespace from both ends of the string
  .min(6, "Image reference must be at least 4 characters long")
  .max(15, "Image reference must be at most 15 characters long")
  .matches(/^[a-zA-Z0-9_]+\.(png|jpg|jpeg)$/, "Invalid image reference")
  .required("Image reference is required");

export default async function validateProductImageReference(imageReference) {
  try {
    await productImageReferenceSchema.validate(imageReference);
    return null;
  } catch (error) {
    return error.message;
  }
}
