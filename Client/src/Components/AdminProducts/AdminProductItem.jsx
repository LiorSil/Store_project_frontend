import React, { useState, Suspense, useMemo, useCallback } from "react";
import {
  NoticeMessageComp,
  ConfirmComp,
  LoadingComp,
} from "../Utils/indexUtil";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
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
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import validateProductTitle from "../Utils/Validators/adminProductValidators/productTitleValidator";
import validateProductPrice from "../Utils/Validators/adminProductValidators/productPriceValidator";
import validateProductDescription from "../Utils/Validators/adminProductValidators/productDescriptionValidator";
import { useDispatch } from "react-redux";
import { updateProductData } from "../../Redux/Reducers/productsReducer";

const MaterialTableComp = React.lazy(() =>
  import("../Utils/MaterialTableComp")
);

const AdminProductItem = ({ product, orders, categories }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
      categoryName: product.categoryName,
    },
  });

  const [loading, setLoading] = useState(false);

  // dialog states
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState({
    open: false,
  });

  const handleOnSubmit = async (data) => {
    const { title, price, description } = data;
    const titleError = await validateProductTitle(title);
    const priceError = await validateProductPrice(price);
    const descriptionError = await validateProductDescription(description);
    if (titleError || priceError || descriptionError) {
      setError("title", { message: titleError });
      setError("price", { message: priceError });
      setError("description", { message: descriptionError });
      return;
    }
    setEditMode(false);
    clearErrors();
    setConfirmMessage(true);
  };

  const handleConfirmUpdate = (data) => {
    //match name to _id
    const category = categories.find((cat) => cat.name === data.categoryName);
    const updatedProduct = {
      ...product,
      title: data.title,
      price: data.price,
      imageUrl: data.imageUrl,
      description: data.description,
      category: category._id,
      categoryName: data.categoryName,
    };
    console.log("updatedProduct:", updatedProduct);
    dispatch(updateProductData(updatedProduct));
    setConfirmMessage(false);
    setNoticeMessage({
      open: true,
      message: "Product updated successfully",
      icon: CheckCircleIcon,
      color: "success",
    });
  };

  const confirmDialog = (
    <ConfirmComp
      open={confirmMessage}
      onClose={() => setConfirmMessage(false)}
      onConfirm={handleSubmit(handleConfirmUpdate)} // Pass the data here
      title="Update Product"
      description="Are you sure you want to update this product?"
    />
  );

  const noticeDialog = noticeMessage.open && (
    <NoticeMessageComp
      open={true}
      message={noticeMessage.message}
      IconComp={noticeMessage.icon}
      color={noticeMessage.color}
      onClose={() =>
        setNoticeMessage((prevMessage) => ({
          ...prevMessage,
          open: false,
        }))
      }
    />
  );

  const handleCancelEdit = () => {
    setEditMode(false);
    clearErrors();
  };

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
    <>
      {confirmDialog}
      {noticeDialog}
      <Card sx={{ margin: 2, boxShadow: 3 }}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
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
                    src={product.imageUrl}
                    alt={product.title}
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
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      {...register("title", {
                        required: "Title is required",
                        validate: validateProductTitle,
                      })}
                      label="Title"
                      fullWidth
                      variant="outlined"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                    <TextField
                      {...register("price", {
                        required: "Price is required",
                        validate: validateProductPrice,
                      })}
                      type="number"
                      label="Price"
                      fullWidth
                      variant="outlined"
                      error={!!errors.price}
                      helperText={errors.price?.message}
                    />
                    <TextField
                      {...register("categoryName", {
                        required: "Category is required",
                      })}
                      select
                      label="Category"
                      fullWidth
                      variant="outlined"
                      error={!!errors.categoryName}
                      helperText={errors.categoryName?.message}
                    >
                      <MenuItem value="" disabled>
                        Select Category
                      </MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat.name} _id={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      {...register("imageUrl")}
                      label="Picture URL"
                      fullWidth
                      variant="outlined"
                      disabled
                    />
                    <TextField
                      {...register("description", {
                        required: "Description is required",
                        validate: validateProductDescription,
                      })}
                      label="Description"
                      fullWidth
                      variant="outlined"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      multiline
                      rows={4}
                    />
                  </Box>
                ) : (
                  <>
                    <Typography variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {product.categoryName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {product.description}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
            {editMode && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            )}
            <Button
              onClick={editMode ? handleCancelEdit : () => setEditMode(true)}
              variant="contained"
              color="secondary"
              startIcon={editMode ? <CancelIcon /> : <EditIcon />}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
          </CardActions>
        </form>
        <CardContent>
          <Suspense fallback={<CircularProgress />}>
            <MaterialTableComp columns={columns} data={data} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminProductItem;
