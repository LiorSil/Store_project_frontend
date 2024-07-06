import React, { useState } from "react";
import { TextField, Select, MenuItem, Button } from "@mui/material";

const AddNewProductForm = ({ onConfirm }) => {
  const categories = [
    "category1",
    "category2",
    "category3",
    "category4",
    "category5",
  ];
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Implement add product logic
    onConfirm();
  };

  return (
    <div>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
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
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleSubmit}>Add Product</Button>
    </div>
  );
};

export default AddNewProductForm;
