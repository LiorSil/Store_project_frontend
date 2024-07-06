import React, { useId } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "100%",
  margin: "20px 0",
  borderRadius: "10px",
  border: "1px solid",
  boxShadow: "0px 3px 6px #00000029",
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300], // Slightly darker than row colors
  color: theme.palette.common.black,
}));

const StyledTableFooter = styled(TableFooter)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300], // Slightly darker than row colors
  color: theme.palette.common.black,
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.common.black,
  borderBottom: "2px solid",
  borderColor: theme.palette.grey[400],
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "1px solid",
  borderColor: theme.palette.grey[300],
}));

const MaterialTableComp = ({ columns = [], data = [] }) => {
  const rowIdBase = useId();
  const cellIdBase = useId();

  return (
    <StyledTableContainer component={Paper}>
      <Table
        sx={{ minWidth: 100, border: "1px solid", borderColor: "grey.500" }}
      >
        <StyledTableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableHeadCell key={column.key}>
                {column.title}
              </StyledTableHeadCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {data.map((item, rowIndex) => {
            const rowId = `${rowIdBase}-${rowIndex}`; // Unique row ID
            return (
              <StyledTableRow key={rowId}>
                {columns.map((column, colIndex) => {
                  const cellId = `${cellIdBase}-${rowIndex}-${colIndex}`; // Unique cell ID
                  return (
                    <StyledTableCell key={cellId}>
                      {item[column.key]}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
        <StyledTableFooter>
          <TableRow>
            <StyledTableHeadCell colSpan={columns.length}>
              Total Items: {data.length}
            </StyledTableHeadCell>
          </TableRow>
        </StyledTableFooter>
      </Table>
    </StyledTableContainer>
  );
};

export default React.memo(MaterialTableComp);
