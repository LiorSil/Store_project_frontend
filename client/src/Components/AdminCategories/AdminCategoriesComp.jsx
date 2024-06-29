import React, { useEffect, useState } from "react";
import { TextField, Button, IconButton, Stack, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MaterialTableComp from "../Utils/MaterialTableComp";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesData } from "../../Redux/Reducers/categoriesReducer";

const AdminCategoriesComp = () => {
  const dispatch = useDispatch();
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  console.log("categories", categories);

  const [categoriesDummies, setCategoriesDummies] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Books" },
    { id: 3, name: "Clothing" },
  ]);

  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleEditClick = (id, name) => {
    setEditMode(id);
    setEditValue(name);
  };

  const handleSaveClick = (id) => {
    setCategoriesDummies(
      categoriesDummies.map((cat) =>
        cat.id === id ? { ...cat, name: editValue } : cat
      )
    );
    setEditMode(null);
  };

  const handleDeleteClick = (id) => {
    setCategoriesDummies(categories.filter((cat) => cat.id !== id));
  };

  const handleAddClick = () => {
    if (newCategory.trim()) {
      setCategoriesDummies([
        ...categoriesDummies,
        { id: categoriesDummies.length + 1, name: newCategory },
      ]);
      setNewCategory("");
    }
  };

  const columns = [
    { key: "name", title: "Category Name" },
    { key: "actions", title: "Actions" },
  ];

  const data = categoriesDummies.map((category) => ({
    ...category,
    actions:
      editMode === category.id ? (
        <>
          <IconButton onClick={() => handleSaveClick(category.id)}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => setEditMode(null)}>
            <CancelIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={() => handleEditClick(category.id, category.name)}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(category.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
  }));

  return (
    <>
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
    </>
  );
};

export default AdminCategoriesComp;
