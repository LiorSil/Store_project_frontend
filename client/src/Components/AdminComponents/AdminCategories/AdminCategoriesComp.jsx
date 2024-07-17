import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  useMemo,
  memo,
} from "react";
import {
  TextField,
  Button,
  IconButton,
  Stack,
  Container,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesData,
  fetchConfirmChanges,
  updateCategories,
} from "../../../Redux/Reducers/categoriesReducer";
import LoadingComp from "../../Utils/LoadingComp";
import ErrorPage from "../../../Pages/Error/ErrorPage";
import ConfirmComp from "../../Utils/ConfirmComp";
import NoticeMessageComp from "../../Utils/NoticeMessageComp";
import { validateCategoryName } from "../../Utils/Validators/categoriesFormValidator";

const MaterialTableComp = lazy(() => import("../../Utils/MaterialTableComp"));

/**
 * AdminCategoriesComp Component
 *
 * This component allows the admin to manage product categories. It includes
 * functionalities for adding, editing, and deleting categories.
 */
const AdminCategoriesComp = memo(() => {
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

  /**
   * Handles the click event to edit a category.
   *
   * @param {Object} category - The category to edit.
   */
  const handleEditClick = (category) => {
    setEditMode(category._id);
    setEditValue(category.name);
  };

  /**
   * Handles the save event after editing a category.
   *
   * @param {Object} category - The category to save.
   */
  const handleSaveClick = (category) => {
    const error = validateCategoryName(editValue, categories);
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
  };

  /**
   * Handles the cancel event to discard changes.
   */
  const handleCancelClick = () => {
    setValidationError("");
    setEditMode(null);
    setEditValue("");
  };

  /**
   * Handles the delete event to mark a category as deleted.
   *
   * @param {Object} category - The category to delete.
   */
  const handleDeleteClick = (category) => {
    const updatedCategories = categories.map((cat) =>
      cat._id === category._id ? { ...cat, isDeleted: true } : cat
    );
    dispatch(updateCategories(updatedCategories));
  };

  /**
   * Handles the add event to add a new category.
   */
  const handleAddClick = () => {
    const error = validateCategoryName(newCategory, categories);
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
  };

  /**
   * Handles the confirm event to save all changes to the categories.
   */
  const handleConfirmCategories = () => {
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
  };

  const columns = [
    { key: "name", title: "Category Name" },
    { key: "actions", title: "Actions" },
  ];

  const tableData = categories.map((category) => ({
    key: category._id,
    name:
      editMode === category._id ? (
        <TextField
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          error={!!validationError}
          helperText={validationError}
        />
      ) : (
        <span
          style={{
            color: category.isDeleted
              ? "red"
              : category.isDirty
              ? "orange"
              : category.isNew
              ? "green"
              : "black",
            textDecoration: category.isDeleted ? "line-through" : "none",
            fontSize: "1.2rem",
          }}
        >
          {category.name}
        </span>
      ),
    actions:
      editMode === category._id ? (
        <>
          <IconButton onClick={() => handleSaveClick(category)}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={handleCancelClick}>
            <CancelIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={() => handleEditClick(category)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(category)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
  }));

  const confirmDialog = (
    <ConfirmComp
      open={confirmMessage}
      onClose={() => setConfirmMessage(false)}
      onConfirm={handleConfirmCategories}
      title="Confirm Categories"
      description="Are you sure you want to save the changes?"
    />
  );

  const noticeDialog = noticeMessage.open && (
    <NoticeMessageComp
      open={true}
      message={noticeMessage.message}
      IconComp={noticeMessage.icon}
      color={noticeMessage.color}
      onClose={() => window.location.reload()}
    />
  );

  if (loading) {
    return <LoadingComp />;
  }
  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <Suspense fallback={<LoadingComp />}>
      {confirmDialog}
      {noticeDialog}
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          marginTop: 2,
          borderRadius: 4,
          border: "2px solid",
          borderColor: "primary.main",
          padding: 2,
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Manage Categories
        </Typography>
        <MaterialTableComp columns={columns} data={tableData} />
        <Stack
          direction="row"
          spacing={1}
          mt={1}
          sx={{
            justifyContent: "center",
            columnGap: 2,
          }}
        >
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            error={!!validationError}
            helperText={validationError}
            sx={{
              backgroundColor: "#eeeeee",
              borderRadius: 2,
              fontFamily: "Open Sans, sans-serif",
            }}
          />
          <Button
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              backgroundColor: "white",
              fontFamily: "Open Sans, sans-serif",
            }}
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            variant="contained"
            color="primary"
          >
            Add Category
          </Button>
        </Stack>
        <Button
          sx={{
            marginTop: 2,
            height: 50,
            borderRadius: 1,
            fontFamily: "Open Sans, sans-serif",
          }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setConfirmMessage(true)}
        >
          Save
        </Button>
      </Container>
    </Suspense>
  );
});

export default AdminCategoriesComp;
