import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
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
import {
  NoticeMessageComp,
  ConfirmComp,
  LoadingComp,
} from "../Utils/indexUtil";

const AddNewProductForm = ({ onConfirm, categories }) => {
  const { register, handleSubmit, control, reset } = useForm();
  const { isDirty, isValid } = useFormState({ control });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    onConfirm({
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity, 10),
    });
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Title"
              {...register("title", { required: true })}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                {...register("category", { required: true })}
                label="Category"
                defaultValue=""
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
              {...register("description", { required: true })}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", { required: true })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              type="number"
              {...register("quantity", { required: true })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image Reference"
              placeholder="file_name.png"
              {...register("imageReference", { required: true })}
              fullWidth
              margin="normal"
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isDirty || !isValid}
              >
                Add Product
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddNewProductForm;
