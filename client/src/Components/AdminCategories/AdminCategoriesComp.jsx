import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  useMemo,
  memo,
} from "react";
import { TextField, Button, IconButton, Stack, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesData,
  updateCategories,
} from "../../Redux/Reducers/categoriesReducer";
import LoadingComp from "../Utils/LoadingComp";
import ErrorPage from "../../Pages/Error/ErrorPage";
import ConfirmComp from "../Utils/ConfirmComp";
import NoticeMessageComp from "../Utils/NoticeMessageComp";

import { validateCategoryName } from "../Utils/Validators/categoriesFormValidator"; // Import validator

const MaterialTableComp = lazy(() => import("../Utils/MaterialTableComp"));

const AdminCategoriesComp = memo(() => {
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

  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState({ open: false });
  const [validationError, setValidationError] = useState("");

  const handleEditClick = (category) => {
    setEditMode(category._id);
    setEditValue(category.name);
  };

  const handleSaveClick = (category) => {
    const error = validateCategoryName(editValue, categories);
    if (error) {
      setValidationError(error);
      return;
    }

    const updatedCategories = categories.map((cat) =>
      cat._id === category._id ? { ...cat, name: editValue } : cat
    );
    dispatch(updateCategories(updatedCategories));

    setEditMode(null);
    setEditValue("");
  };

  const handleCancelClick = () => {
    setValidationError("");
    setEditMode(null);
    setEditValue("");
  };

  const handleDeleteClick = (category) => {
    const updatedCategories = categories.filter(
      (cat) => cat._id !== category._id
    );
    dispatch(updateCategories(updatedCategories));
  };

  const handleAddClick = () => {
    const error = validateCategoryName(newCategory, categories);
    if (error) {
      setValidationError(error);
      return;
    } else {
      setValidationError("");
    }
    //new is a boolean field that is used to db to identify new categories
    const newCat = { _id: Date.now().toString(), name: newCategory, new: true };
    const updatedCategories = [...categories, newCat];
    dispatch(updateCategories(updatedCategories));
    setNewCategory("");
  };

  const handleConfirmCategories = () => {
    console.log("Data to be saved: ", categories);
    setConfirmMessage(false);
    setNoticeMessage({
      open: true,
      message: "Categories have been updated.",
      color: "success",
      icon: CheckCircleIcon,
    });
  };

  const columns = [
    { key: "name", title: "Category Name" },
    { key: "actions", title: "Actions" },
  ];

  const data = categories.map((category) => ({
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
        category.name
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
      onClose={() =>
        setNoticeMessage((prevMessage) => ({
          ...prevMessage,
          open: false,
        }))
      }
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
          backgroundColor: "#b3e5fc",
          padding: 2,
        }}
      >
        <h2>Manage Categories</h2>
        <MaterialTableComp columns={columns} data={data} />
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
            }}
          />
          <Button
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              backgroundColor: "white",
            }}
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            variant="contained"
            backgroundColor="white"
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
