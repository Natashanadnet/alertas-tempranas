import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function createData(email, password) {
  return { email, password };
}

const rows = [
  createData("profe@ejemplo.com", "profe"),
  createData("dire@ejemplo.com", "dire"),
  createData("exp@ejemplo.com", "exp"),
];

export default function Ejemplos() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Email
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                Password
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
