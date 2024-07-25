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
            "@media (max-width: 768px)": {
              width: "80%",
              p: 2,
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
