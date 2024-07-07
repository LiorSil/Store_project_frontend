import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";

const AddNewProductForm = ({ onConfirm }) => {
  const categories = [
    { id: "category1", name: "Category 1" },
    { id: "category2", name: "Category 2" },
    { id: "category3", name: "Category 3" },
    { id: "category4", name: "Category 4" },
    { id: "category5", name: "Category 5" },
  ];

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    // Implement add product logic
    onConfirm({ title, price, category, picUrl, description });
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
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Picture URL"
            value={picUrl}
            onChange={(e) => setPicUrl(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Add Product
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddNewProductForm;
