import React, { Suspense, lazy, memo } from "react";
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
} from "@mui/icons-material";
import {
  Loading,
  Confirm,
  NoticeMessage,
} from "../../../utils/shared/commonComponents";
import Error from "../../../app/pages/error/NotFound";
import useCategories from "../../../hooks/admin/categories/useCategories"; 
import classes from "./Categories.module.css";

const MaterialTableComp = lazy(() =>
  import("../../../utils/shared/MaterialTable")
);

const Categories = memo(() => {
  const {
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
    handleCancelClick,
    handleDeleteClick,
    handleAddClick,
    handleConfirmCategories,
    setEditValue,
  } = useCategories();

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
    <Confirm
      open={confirmMessage}
      onClose={() => setConfirmMessage(false)}
      onConfirm={handleConfirmCategories}
      title="Confirm Categories"
      description="Are you sure you want to save the changes?"
    />
  );

  const noticeDialog = noticeMessage.open && (
    <NoticeMessage
      open={true}
      message={noticeMessage.message}
      IconComp={noticeMessage.icon}
      color={noticeMessage.color}
      onClose={() => window.location.reload()}
    />
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }

  return (
    <Suspense fallback={<Loading />}>
      {confirmDialog}
      {noticeDialog}
      <Container component="main" maxWidth="sm" className={classes.container}>
        <Typography variant="h4" gutterBottom className={classes.heading}>
          Manage Categories
        </Typography>
        <MaterialTableComp columns={columns} data={tableData} />
        <Stack direction="row" spacing={1} mt={1} className={classes.stack}>
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            error={!!validationError}
            helperText={validationError}
            className={classes.textField}
          />
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            variant="contained"
            color="primary"
            className={classes.addButton}
          >
            Add Category
          </Button>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setConfirmMessage(true)}
          className={classes.saveButton}
        >
          Save
        </Button>
      </Container>
    </Suspense>
  );
});

export default Categories;
