import React, { useState, Suspense, useMemo, useCallback } from "react";
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
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import validateProductTitle from "../Utils/Validators/adminProductValidators/productTitleValidator";
import validateProductPrice from "../Utils/Validators/adminProductValidators/productPriceValidator";
import validateProductDescription from "../Utils/Validators/adminProductValidators/productDescriptionValidator";

const MaterialTableComp = React.lazy(() =>
  import("../Utils/MaterialTableComp")
);

const AdminProductItem = ({ product, orders, categories }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    category: product.categoryName,
    imageUrl: product.imageUrl,
    description: product.description,
  });
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    description: "",
  });

  const handleInputChange = useCallback((e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    })); // Clear the error when user starts typing
  }, []);

  const handleSaveClick = useCallback(async () => {
    const { title, price, description } = formData;
    const titleError = await validateProductTitle(title, ["title1", "title2"]);
    const priceError = await validateProductPrice(price);
    const descriptionError = await validateProductDescription(description);
    if (titleError || priceError || descriptionError) {
      setErrors({
        title: titleError || "",
        price: priceError || "",
        description: descriptionError || "",
      });
      return;
    }
    setEditMode(false);
    setErrors({ title: "", price: "", description: "" });
  }, [formData]);

  const renderTextField = useCallback(
    (label, name, multiline = false, rows = 1) => (
      <TextField
        label={label}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        error={!!errors[name]}
        helperText={errors[name]}
        multiline={multiline}
        rows={rows}
      />
    ),
    [formData, errors, handleInputChange]
  );

  const columns = useMemo(
    () => [
      { key: "customer", title: "Customer" },
      { key: "quantity", title: "Quantity" },
      { key: "date", title: "Date" },
    ],
    []
  );

  const data = useMemo(
    () =>
      orders.map((order) => ({
        customer: order.customerName,
        quantity: order.quantity,
        date: new Date(order.orderDate).toLocaleDateString(),
      })),
    [orders]
  );

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
                src={formData.imageUrl}
                alt={formData.title}
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
                {renderTextField("Title", "title")}
                {renderTextField("Price", "price")}
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
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
                {renderTextField("Picture URL", "imageUrl")}
                {renderTextField("Description", "description", true, 4)}
              </Box>
            ) : (
              <>
                <Typography variant="h5" component="div">
                  {formData.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {formData.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {formData.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {formData.description}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={editMode ? handleSaveClick : () => setEditMode(true)}
          variant="contained"
          color="primary"
          startIcon={editMode ? <SaveIcon /> : <EditIcon />}
        >
          {editMode ? "Save" : "Edit"}
        </Button>
      </CardActions>
      <CardContent>
        <Suspense fallback={<CircularProgress />}>
          <MaterialTableComp columns={columns} data={data} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default AdminProductItem;
