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

// Styled components for table customization
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "100%",
  margin: "20px 0",
  borderRadius: "10px",
  border: "1px solid",
  boxShadow: "0px 3px 6px #00000029",
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.common.black,
}));

const StyledTableFooter = styled(TableFooter)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
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

/**
 * MaterialTableComp Component
 *
 * Renders a customizable table using Material-UI components. It can handle both
 * primitive data and nested tables within its cells.
 *
 * @param {Array} columns - Array of column definitions, each containing a key and title.
 * @param {Array} data - Array of data objects to be displayed in the table. Can contain nested tables.
 */
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
                  const cellData = item[column.key];
                  return (
                    <StyledTableCell key={cellId}>
                      {Array.isArray(cellData) ? (
                        <MaterialTableComp
                          columns={column.subColumns || []}
                          data={cellData}
                        />
                      ) : (
                        cellData
                      )}
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

// Using React.memo to optimize the component and prevent unnecessary re-renders
export default React.memo(MaterialTableComp);
