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
import CheckCircle from "@mui/icons-material/CheckCircle";

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

  const handleEditClick = (name) => {
    setEditMode(name);
    setEditValue(name);
  };

  const handleSaveClick = (name) => {
    const updatedCategories = categories.map((category) =>
      category === name ? editValue : category
    );
    dispatch(updateCategories(updatedCategories));
    setEditMode(null);
    setEditValue("");
  };

  const handleCancelClick = () => {
    setEditMode(null);
    setEditValue("");
  };

  const handleDeleteClick = (name) => {
    // Logic to delete a category
    const updatedCategories = categories.filter(
      (category) => category !== name
    );
    dispatch(updateCategories(updatedCategories));
  };

  const handleAddClick = () => {
    // Logic to add a new category
    const updatedCategories = [...categories, newCategory];
    dispatch(updateCategories(updatedCategories));
    setNewCategory("");
  };

  const handleConfirmCategories = () => {
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

  const data = categories.map((category, index) => ({
    key: index,
    name:
      editMode === category ? (
        <TextField
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      ) : (
        category
      ),
    actions:
      editMode === category ? (
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
