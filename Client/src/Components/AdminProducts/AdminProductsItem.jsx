import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import categories from "./categories"; // Import your categories

const AdminProductItem = ({ product }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [picUrl, setPicUrl] = useState(product.picUrl);
  const [description, setDescription] = useState(product.description);

  const handleSave = () => {
    // Implement save logic
    setEditMode(false);
  };

  return (
    <div>
      {editMode ? (
        <>
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
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{price}</p>
          <p>{category}</p>
          <p>{picUrl}</p>
          <p>{description}</p>
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        </>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{purchase.name}</TableCell>
              <TableCell>{purchase.amount}</TableCell>
              <TableCell>{purchase.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProductItem;
