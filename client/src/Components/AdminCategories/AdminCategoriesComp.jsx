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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesData,
  updateCategories,
} from "../../Redux/Reducers/categoriesReducer";
import LoadingComp from "../Utils/LoadingComp";
import ErrorPage from "../../Pages/Error/ErrorPage";

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
  console.table("categories", categories);

  const handleEditClick = (name) => {
    setEditMode(name);
    setEditValue(name);
  };

  const handleSaveClick = (name) => {};
  const handleDeleteClick = (name) => {};
  const handleAddClick = (name) => {};

  const columns = [
    { key: "name", title: "Category Name" },
    { key: "actions", title: "Actions" },
  ];

  const data = categories.map((category, index) => ({
    key: index,
    name: category,
    actions:
      editMode === category ? (
        <>
          <IconButton onClick={() => handleSaveClick(category)}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => setEditMode(null)}>
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

  if (loading) {
    return <LoadingComp />;
  }
  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <Suspense fallback={<LoadingComp />}>
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
          mt={2}
          sx={{
            justifyContent: "center",
            ColumnGap: 2,
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
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            variant="contained"
            color="primary"
          >
            Add Category
          </Button>
        </Stack>
      </Container>
    </Suspense>
  );
});

export default AdminCategoriesComp;
