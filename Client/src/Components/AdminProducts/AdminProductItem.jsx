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
import { useForm, Controller } from "react-hook-form";
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
    control,
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
    const titleError = await validateProductTitle(title, ["title1", "title2"]);
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

  const handleConfirmUpdate = () => {
    const updatedProduct = { ...product, ...data };
    console.log("updatedProduct:", updatedProduct);
    //dispatch(updateProductData(updatedProduct));
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

  const confirmDialog = (
    <ConfirmComp
      open={confirmMessage}
      onClose={() => setConfirmMessage(false)}
      onConfirm={handleConfirmUpdate}
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
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Title"
                          fullWidth
                          variant="outlined"
                          error={!!errors.title}
                          helperText={errors.title?.message}
                        />
                      )}
                    />
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Price"
                          fullWidth
                          variant="outlined"
                          error={!!errors.price}
                          helperText={errors.price?.message}
                        />
                      )}
                    />
                    <Controller
                      name="categoryName"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          fullWidth
                          variant="outlined"
                          displayEmpty
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
                      )}
                    />
                    <Controller
                      name="imageUrl"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Picture URL"
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Description"
                          fullWidth
                          variant="outlined"
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          multiline
                          rows={4}
                        />
                      )}
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
