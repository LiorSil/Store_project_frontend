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
import { LoadingComp } from "../Utils/indexUtil";
// import validators
import validateProductTitle from "../Utils/Validators/adminProductValidators/productTitleValidator";
import validateProductPrice from "../Utils/Validators/adminProductValidators/productPriceValidator";
import validateProductDescription from "../Utils/Validators/adminProductValidators/productDescriptionValidator";
import validateProductImageReference from "../Utils/Validators/adminProductValidators/productImageReferenceValidator";
import validateProductQuantity from "../Utils/Validators/adminProductValidators/productQuantityValidator";

const AddNewProductForm = ({ onConfirm, categories }) => {
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
      category: "",
      description: "",
      price: "",
      quantity: "",
      imageReference: "",
    },
  });

  const [openNewProductForm, setOpenNewProductForm] = useState(false);
  const openNewProductFormHandler = () => setOpenNewProductForm(true);
  const handleCloseForm = () => {
    setOpenNewProductForm(false);
    reset();
  };

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
    clearErrors();

    /**
     * TODO: add new product to the database
     */
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={openNewProductFormHandler}
      >
        Add New Product
      </Button>
      <Modal
        open={openNewProductForm}
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
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="add-new-product-form" variant="h6" component="h2">
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
              {...register("title", {
                required: true,
                validate: validateProductTitle,
              })}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                {...register("category", { required: true })}
                label="Category"
                defaultValue=""
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              {...register("description", {
                required: true,
                validate: validateProductDescription,
              })}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", {
                required: true,
                validate: validateProductPrice,
              })}
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              label="Quantity"
              type="number"
              {...register("quantity", {
                required: true,
                validate: validateProductQuantity,
              })}
              fullWidth
              margin="normal"
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
            <TextField
              label="Image Reference"
              placeholder="file_name.png"
              {...register("imageReference", {
                required: true,
                validate: validateProductImageReference,
              })}
              fullWidth
              margin="normal"
              error={!!errors.imageReference}
              helperText={errors.imageReference?.message}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isDirty}
              >
                Add Product
              </Button>
              <Button
                onClick={handleCloseForm}
                variant="contained"
                color="secondary"
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
