import React, { useState, useMemo, useCallback, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
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
import { useForm } from "react-hook-form";
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { NoticeMessage, Confirm } from "../../../utils/shared/commonComponents";
import validateProductTitle from "../../../utils/validators/product/title";
import validateProductPrice from "../../../utils/validators/product/price";
import validateProductDescription from "../../../utils/validators/product/description";
import { updateProductData } from "../../../redux/reducers/products";

const MaterialTableComp = React.lazy(() =>
  import("../../../utils/shared/MaterialTable")
);

/**
 * AdminProductItem component for displaying and editing a product's details.
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product details.
 * @param {Array} props.orders - The list of orders for the product.
 * @param {Array} props.customers - The list of customers.
 * @returns {JSX.Element} - The rendered component.
 */
const AdminProductItem = ({ product, orders, customers }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [dialogState, setDialogState] = useState({
    confirm: false,
    notice: { open: false, message: "", icon: null, color: "" },
  });
  const [localProduct, setLocalProduct] = useState(product);
  const [categoryName, setCategoryName] = useState(product.categoryName);

  const categories = useSelector((state) => state.categories.data);

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: localProduct.title,
      price: localProduct.price,
      imageUrl: localProduct.imageUrl,
      description: localProduct.description,
      categoryName: localProduct.categoryName,
    },
  });

  /**
   * Handles form submission for updating product details.
   * @param {Object} data - The form data.
   */
  const onSubmitHandler = async (data) => {
    const titleError = await validateProductTitle(data.title);
    const priceError = await validateProductPrice(data.price);
    const descriptionError = await validateProductDescription(data.description);

    if (titleError || priceError || descriptionError) {
      setError("title", { message: titleError });
      setError("price", { message: priceError });
      setError("description", { message: descriptionError });
      return;
    }

    clearErrors();
    setDialogState((prev) => ({ ...prev, confirm: true }));
  };

  /**
   * Handles confirmation of product update.
   * @param {Object} data - The updated product data.
   */
  const onConfirmUpdateHandler = useCallback(
    (data) => {
      const category = categories.find((cat) => cat.name === data.categoryName);
      const updatedProduct = {
        ...localProduct,
        ...data,
        category: category._id,
      };

      dispatch(updateProductData(updatedProduct))
        .then((resolve) => {
          if (resolve.type === "products/updateData/fulfilled") {
            setLocalProduct(updatedProduct);
            setDialogState({
              confirm: false,
              notice: {
                open: true,
                message: "Product updated successfully",
                icon: CheckCircleIcon,
                color: "success",
              },
            });
          } else {
            setDialogState({
              confirm: false,
              notice: {
                open: true,
                message: resolve.error.message || "Something went wrong",
                icon: ErrorIcon,
                color: "error",
              },
            });
          }
        })
        .catch((error) => {
          setDialogState({
            confirm: false,
            notice: {
              open: true,
              message: error.message,
              icon: ErrorIcon,
              color: "error",
            },
          });
        });
    },
    [categories, localProduct, dispatch]
  );

  // Define columns for the MaterialTableComp
  const columns = useMemo(
    () => [
      { key: "customer", title: "Customer" },
      { key: "quantity", title: "Quantity" },
      { key: "date", title: "Date" },
    ],
    []
  );

  // Generate data for the MaterialTableComp
  const data = useMemo(
    () =>
      orders.map((order) => {
        const username =
          customers.find(
            (cust) => cust._id.toString() === order.customer.toString()
          )?.username || "Unknown Customer";
        return {
          customer: username,
          quantity: order.quantity,
          date: new Date(order.orderDate).toLocaleDateString(),
        };
      }),
    [orders, customers]
  );

  return (
    <>
      {dialogState.confirm && (
        <Confirm
          open={true}
          onClose={() =>
            setDialogState((prev) => ({ ...prev, confirm: false }))
          }
          onConfirm={handleSubmit(onConfirmUpdateHandler)}
          title="Update Product"
          description="Are you sure you want to update this product?"
        />
      )}
      {dialogState.notice.open && (
        <NoticeMessage
          open={true}
          message={dialogState.notice.message}
          IconComp={dialogState.notice.icon}
          color={dialogState.notice.color}
          onClose={() => {
            setDialogState((prev) => ({
              ...prev,
              notice: { ...prev.notice, open: false },
            }));
            window.location.reload();
          }}
        />
      )}
      <Card sx={{ margin: 2, boxShadow: 3 }}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                    src={localProduct.imageUrl}
                    alt={localProduct.title}
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
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                      }}
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
                        <MenuItem key={cat._id} value={cat.name}>
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
                      {localProduct.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {localProduct.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {localProduct.categoryName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {localProduct.description}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
            {editMode && (
              <Button
                disabled={!isDirty}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            )}
            <Button
              onClick={
                editMode ? () => setEditMode(false) : () => setEditMode(true)
              }
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

export default React.memo(AdminProductItem);
