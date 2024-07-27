import React from "react";
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
import useAddNewProductForm from "../../../hooks/admin/products/useAddNewProductForm"; // Adjust the path according to your project structure
import classes from "./AddNewProductForm.module.css";

const AddNewProductForm = ({ categories }) => {
  const {
    handleSubmit,
    register,
    errors,
    isDirty,
    handleOpenForm,
    handleCloseForm,
    onSubmitHandler,
    openForm,
  } = useAddNewProductForm(categories);

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
        <Box className={classes.modalBox}>
          <Typography id="add-new-product-form" variant="h6" component="h2">
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
              {...register("title", {
                required: "Title is required",
              })}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
              className={classes.textField}
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
                className={classes.textField}
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
              })}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              className={classes.textField}
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", {
                required: "Price is required",
              })}
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
              className={classes.textField}
            />
            <TextField
              label="Quantity"
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
              })}
              fullWidth
              margin="normal"
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              className={classes.textField}
            />
            <TextField
              label="Image Reference"
              placeholder="file_name.png"
              {...register("imageReference", {
                required: "Image Reference is required",
              })}
              fullWidth
              margin="normal"
              error={!!errors.imageReference}
              helperText={errors.imageReference?.message}
              className={classes.textField}
            />
            <Box className={classes.buttonContainer}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={!isDirty}
                className={classes.submitButton}
              >
                Add Product
              </Button>
              <Button
                onClick={handleCloseForm}
                variant="contained"
                color="error"
                className={classes.cancelButton}
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
