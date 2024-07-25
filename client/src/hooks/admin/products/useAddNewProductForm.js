// src/hooks/useAddNewProductForm.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addProductData } from "../../../redux/reducers/addProduct"; // Adjust the path according to your project structure
import {
  validateProductTitle,
  validateProductPrice,
  validateProductDescription,
  validateProductImageReference,
  validateProductQuantity,
} from "../../../utils/validators/product/adminIndexValidator"; // Adjust the path according to your project structure

const useAddNewProductForm = (categories) => {
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      categoryName: "",
      description: "",
      price: "",
      quantity: "",
      imageReference: "",
    },
  });

  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);

  const handleCloseForm = () => {
    setOpenForm(false);
    reset();
  };

  const onSubmitHandler = async (data) => {
    const titleError = await validateProductTitle(data.title);
    const priceError = await validateProductPrice(data.price);
    const descriptionError = await validateProductDescription(data.description);
    const imageReferenceError = await validateProductImageReference(
      data.imageReference
    );
    const quantityError = await validateProductQuantity(data.quantity);

    if (
      titleError ||
      priceError ||
      descriptionError ||
      imageReferenceError ||
      quantityError
    ) {
      setError("title", { message: titleError });
      setError("price", { message: priceError });
      setError("description", { message: descriptionError });
      setError("imageReference", { message: imageReferenceError });
      setError("quantity", { message: quantityError });
      return;
    }

    dispatch(addProductData(data));

    setOpenForm(false);
    reset();
    clearErrors();
    //reload
    window.location.reload();
  };

  return {
    handleSubmit,
    register,
    errors,
    isDirty,
    handleOpenForm,
    handleCloseForm,
    onSubmitHandler,
    openForm,
  };
};

export default useAddNewProductForm;
