export const validateCategoryName = (name, existingCategories) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Category name cannot be empty.";
  }
  if (trimmedName.length < 3) {
    return "Category name must be at least 3 letters long.";
  }
  if (trimmedName.length > 25) {
    return "Category name cannot be longer than 50 characters.";
  }
  if (/[^a-zA-Z\s]/.test(trimmedName)) {
    return "Category name cannot contain special characters or numbers.";
  }
  if (
    existingCategories
      .map((cat) => cat.toLowerCase())
      .includes(trimmedName.toLowerCase())
  ) {
    return "Category name already exists.";
  }
  return null;
};
