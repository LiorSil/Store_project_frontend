//src/components/Utils/MaterialTableComp.jsx

import React from "react";
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

const StyledTableContainer = styled(TableContainer)({
  maxWidth: "100%",
});

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledTableFooter = styled(TableFooter)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

const StyledTableRow = styled(TableRow)(({ theme, odd }) => ({
  backgroundColor: odd ? theme.palette.action.hover : "inherit",
}));

const MaterialTableComp = ({ columns, data }) => {
  return (
    <StyledTableContainer component={Paper}>
      <Table>
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
          {data.map((item, index) => (
            <StyledTableRow key={index} odd={index % 2 !== 0}>
              {columns.map((column) => (
                <TableCell key={`${column.key}-${index}`}>
                  {item[column.key]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
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

export default MaterialTableComp;
