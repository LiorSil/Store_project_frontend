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
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import {
  Loading,
  Confirm,
  NoticeMessage,
} from "../../../utils/shared/commonComponents";
import Error from "../../../app/pages/error/NotFound";
import useCategories from "../../../hooks/admin/categories/useCategories"; // Adjust the path according to your project structure

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

export default Categories;
