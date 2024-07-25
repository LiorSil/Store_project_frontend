// src/hooks/useCategories.js

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesData,
  fetchConfirmChanges,
  updateCategories,
} from "../../../redux/reducers/categories"; // Adjust the path according to your project structure
import { validateCategory } from "../../../utils/validators/product/adminIndexValidator"; // Adjust the path according to your project structure
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const useCategories = () => {
  const dispatch = useDispatch();
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState({ open: false });
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  const handleEditClick = useCallback((category) => {
    setEditMode(category._id);
  }, []);

  const handleEditValue = useCallback((category) => {
    setEditValue(category.name);
  }, []);

  const handleSaveClick = useCallback(
    (category) => {
      const error = validateCategory(editValue, categories);
      if (error) {
        setValidationError(error);
        return;
      }

      const updatedCategories = categories.map((cat) =>
        cat._id === category._id
          ? { ...cat, name: editValue, isDirty: true }
          : cat
      );
      dispatch(updateCategories(updatedCategories));

      setEditMode(null);
      setEditValue("");
    },
    [dispatch, editValue, categories]
  );

  const handleCancelClick = useCallback(() => {
    setValidationError("");
    setEditMode(null);
    setEditValue("");
  }, []);

  const handleDeleteClick = useCallback(
    (category) => {
      const updatedCategories = categories.map((cat) =>
        cat._id === category._id ? { ...cat, isDeleted: true } : cat
      );
      dispatch(updateCategories(updatedCategories));
    },
    [dispatch, categories]
  );

  const handleAddClick = useCallback(() => {
    const error = validateCategory(newCategory, categories);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");

    const newCat = {
      _id: Date.now().toString(),
      name: newCategory,
      isNew: true,
    };
    const updatedCategories = [...categories, newCat];
    dispatch(updateCategories(updatedCategories));
    setNewCategory("");
  }, [dispatch, newCategory, categories]);

  const handleConfirmCategories = useCallback(() => {
    dispatch(fetchConfirmChanges(categories)).then((resolve) => {
      if (resolve.type === "categories/confirmChange/fulfilled") {
        setNoticeMessage({
          open: true,
          message: "Categories have been updated.",
          color: "success",
          icon: CheckCircleIcon,
        });
      } else {
        setNoticeMessage({
          open: true,
          message: "Error updating categories.",
          color: "error",
          icon: ErrorIcon,
        });
      }
    });

    setConfirmMessage(false);
  }, [dispatch, categories]);

  return {
    categories,
    loading,
    error,
    editMode,
    editValue,
    newCategory,
    confirmMessage,
    noticeMessage,
    validationError,
    setNewCategory,
    setConfirmMessage,
    handleEditClick,
    handleSaveClick,
    handleEditValue,
    handleCancelClick,
    handleDeleteClick,
    handleAddClick,
    handleConfirmCategories,
    setEditValue,
  };
};

export default useCategories;
