import React, { useEffect, useMemo, useState } from "react";
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
  IconButton,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesData } from "../../Redux/Reducers/categoriesReducer";
import MaterialTableComp from "../Utils/MaterialTableComp";

const AdminProductItem = ({ product, orders }) => {
  const dispatch = useDispatch();

  const {
    data: categories,
    loading,
    error,
  } = useSelector(
    useMemo(() => (state) => state.categories, []),
    []
  );

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.categoryName);
  const [imageUrl, serImageUrl] = useState(product.imageUrl);
  const [description, setDescription] = useState(product.description);

  const handleSave = () => {
    // Implement save logic
    setEditMode(false);
  };

  const columns = [
    { key: "customer", title: "Customer" },

    { key: "quantity", title: "Quantity" },
    { key: "date", title: "Date" },
  ];
  const data = orders.map((order) => {
    const fDate = new Date(order.orderDate);

    return {
      customer: order.customer,
      quantity: order.quantity,
      date: fDate.toLocaleDateString(),
    };
  });

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
                />
                <TextField
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  variant="outlined"
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
                  onChange={(e) => serImageUrl(e.target.value)}
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
                <TextField
                  label="Picture URL"
                  value={imageUrl}
                  onChange={(e) => serImageUrl(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                />
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
            onClick={handleSave}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        ) : (
          // <IconButton onClick={() => setEditMode(true)} color="primary">
          //   <EditIcon />
          // </IconButton>
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
