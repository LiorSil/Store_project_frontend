import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Grid,

} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import MaterialTableComp from "../Utils/MaterialTableComp";
import validateProductTitle from "../Utils/Validators/adminProductValidators/productTitleValidator";
import validateProductPrice from "../Utils/Validators/adminProductValidators/productPriceValidator";
import validateProductDescription from "../Utils/Validators/adminProductValidators/productDescriptionValidator";

const AdminProductItem = ({ product, orders, categories }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.categoryName);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [description, setDescription] = useState(product.description);
  const [validationError, setValidationError] = useState("");

  console.log("Product:", product);
  console.log("Orders:", orders);
  console.log("Categories:", categories);

  const handleSaveClick = async () => {
    const titleError = await validateProductTitle(title, ["title1", "title2"]);
    const priceError = await validateProductPrice(price);
    const descriptionError = await validateProductDescription(description);
    if (titleError || priceError || descriptionError) {
      setValidationError(
        `${titleError ? titleError + " " : ""}${
          priceError ? priceError + " " : ""
        }${descriptionError ? descriptionError + " " : ""}`
      );
      return;
    }
    // Assuming there's an async saveProduct function to save product details
    // await saveProduct({ title, price, category, imageUrl, description });
    setEditMode(false);
    setValidationError("");
  };

  const columns = [
    { key: "customer", title: "Customer" },
    { key: "quantity", title: "Quantity" },
    { key: "date", title: "Date" },
  ];

  const data = orders.map((order) => ({
    customer: order.customerName,
    quantity: order.quantity,
    date: new Date(order.orderDate).toLocaleDateString(),
  }));

  return (
    <Card sx={{ margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={imageUrl}
                alt={title}
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            {editMode ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={!!validationError}
                  helperText={validationError}
                />
                <TextField
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={!!validationError}
                  helperText={validationError}
                />
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label="Picture URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Box>
            ) : (
              <>
                <Typography variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {description}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {editMode ? (
          <Button
            onClick={handleSaveClick}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        )}
      </CardActions>
      <CardContent>
        <MaterialTableComp columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default AdminProductItem;
