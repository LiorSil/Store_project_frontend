import { Avatar } from "@mui/material";

export const orderTableColumns = [
  { key: "title", title: "Title", field: "title" },
  {
    key: "image",
    title: "Image",
    field: "image",
    render: (rowData) => rowData.image,
  },
  { key: "quantity", title: "Quantity", field: "quantity" },
  { key: "total", title: "Total", field: "total" },
  { key: "date", title: "Date", field: "date" },
];
