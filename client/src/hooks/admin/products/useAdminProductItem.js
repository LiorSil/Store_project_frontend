// src/hooks/useAdminProductItem.js

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProductData } from "../../../redux/reducers/products"; // Adjust the path according to your project structure
import validateProductTitle from "../../../utils/validators/product/title";
import validateProductPrice from "../../../utils/validators/product/price";
import validateProductDescription from "../../../utils/validators/product/description";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

const useAdminProductItem = (product) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const [editMode, setEditMode] = useState(false);
  const [dialogState, setDialogState] = useState({
    confirm: false,
    notice: { open: false, message: "", icon: null, color: "" },
  });
  const [localProduct, setLocalProduct] = useState(product);
  const [categoryName, setCategoryName] = useState(product.categoryName);

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

  return {
    categories,
    editMode,
    setEditMode,
    dialogState,
    setDialogState,
    localProduct,
    setLocalProduct,
    categoryName,
    setCategoryName,
    handleSubmit,
    register,
    errors,
    isDirty,
    onSubmitHandler,
    onConfirmUpdateHandler,
  };
};

export default useAdminProductItem;
