import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addProductData } from "../../../redux/reducers/addProduct.js";
import {
  validateProductTitle,
  validateProductPrice,
  validateProductDescription,
  validateProductImageReference,
  validateProductQuantity,
} from "../../utils/validators/product/adminIndexValidator.js";

/**
 * AddNewProductForm component for adding a new product.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onConfirm - Callback function for when the form is submitted.
 * @param {Array} props.categories - List of categories to select from.
 * @returns {JSX.Element} - The rendered component.
 */
const AddNewProductForm = ({ categories }) => {
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      categoryName: "",
      description: "",
      price: "",
      quantity: "",
      imageReference: "",
    },
  });

  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  /**
   * Opens the form modal.
   */
  const handleOpenForm = () => setOpenForm(true);

  /**
   * Closes the form modal and resets the form.
   */
  const handleCloseForm = () => {
    setOpenForm(false);
    reset();
  };

  /**
   * Handles form submission for adding a new product.
   *
   * @param {Object} data - The form data.
   */
  const onSubmitHandler = async (data) => {
    const titleError = await validateProductTitle(data.title);
    const priceError = await validateProductPrice(data.price);
    const descriptionError = await validateProductDescription(data.description);
    const imageReferenceError = await validateProductImageReference(
      data.imageReference
    );
    const quantityError = await validateProductQuantity(data.quantity);

    if (
      titleError ||
      priceError ||
      descriptionError ||
      imageReferenceError ||
      quantityError
    ) {
      setError("title", { message: titleError });
      setError("price", { message: priceError });
      setError("description", { message: descriptionError });
      setError("imageReference", { message: imageReferenceError });
      setError("quantity", { message: quantityError });
      return;
    }

    dispatch(addProductData(data));

    setOpenForm(false);
    reset();
    clearErrors();
    //reload
    window.location.reload();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpenForm}>
        Add New Product
      </Button>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="add-new-product-form"
        aria-describedby="form-to-add-new-product"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            "@media (max-width: 7612px)": {
              width: "400",
              p: 2,
            },
            "@media (max-width: 600px)": {
              width: "80%",
              p: 1,
            },
            "@media (max-width: 480px)": {
              width: "80%",
              p: 1,
            },
          }}
        >
          <Typography id="add-new-product-form" variant="h6" component="h2">
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
              {...register("title", {
                required: "Title is required",
                validate: validateProductTitle,
              })}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{
                "@media (max-width: 480px)": {
                  margin: "12px 0",
                },
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                {...register("categoryName", {
                  required: "Category is required",
                })}
                label="Category"
                defaultValue=""
                error={!!errors.categoryName}
                sx={{
                  "@media (max-width: 480px)": {
                    margin: "12px 0",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              {...register("description", {
                required: "Description is required",
                validate: validateProductDescription,
              })}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{
                "@media (max-width: 480px)": {
                  margin: "12px 0",
                },
              }}
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", {
                required: "Price is required",
                validate: validateProductPrice,
              })}
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
              sx={{
                "@media (max-width: 480px)": {
                  margin: "12px 0",
                },
              }}
            />
            <TextField
              label="Quantity"
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                validate: validateProductQuantity,
              })}
              fullWidth
              margin="normal"
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              sx={{
                "@media (max-width: 480px)": {
                  margin: "12px 0",
                },
              }}
            />
            <TextField
              label="Image Reference"
              placeholder="file_name.png"
              {...register("imageReference", {
                required: "Image Reference is required",
                validate: validateProductImageReference,
              })}
              fullWidth
              margin="normal"
              error={!!errors.imageReference}
              helperText={errors.imageReference?.message}
              sx={{
                "@media (max-width: 480px)": {
                  margin: "12px 0",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                "@media (max-width: 480px)": {
                  flexDirection: "column",
                  alignItems: "center",
                },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isDirty}
                sx={{
                  "@media (max-width: 480px)": {
                    width: "80%",
                    marginBottom: "16px",
                  },
                }}
              >
                Add Product
              </Button>
              <Button
                onClick={handleCloseForm}
                variant="contained"
                color="warning"
                sx={{
                  "@media (max-width: 480px)": {
                    width: "80%",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddNewProductForm;
