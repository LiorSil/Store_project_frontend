import React, { useMemo, Suspense } from "react";
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
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { NoticeMessage, Confirm } from "../../../utils/shared/commonComponents";
import useAdminProductItem from "../../../hooks/admin/products/useAdminProductItem"; // Adjust the path according to your project structure
import classes from "./AdminProductItem.module.css"; // Import the CSS module

const MaterialTableComp = React.lazy(() =>
  import("../../../utils/shared/MaterialTable")
);

const AdminProductItem = ({ product, orders, customers }) => {
  const {
    editMode,
    setEditMode,
    dialogState,
    setDialogState,
    localProduct,
    categoryName,
    setCategoryName,
    handleSubmit,
    register,
    errors,
    isDirty,
    onSubmitHandler,
    onConfirmUpdateHandler,
    categories,
  } = useAdminProductItem(product);

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
      <Card className={classes.card}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box className={classes.imgContainer}>
                  <Box
                    component="img"
                    src={localProduct.imageUrl}
                    alt={localProduct.title}
                    className={classes.img}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                {editMode ? (
                  <Box className={classes.cardContent}>
                    <TextField
                      {...register("title", {
                        required: "Title is required",
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
          <CardActions className={classes.cardActions}>
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
