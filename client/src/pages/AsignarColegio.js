import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import SearchBarProfes from "../components/SearchBarProfes";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../context/AuthContext";

function AsignarColegio() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const { colegio: colegioId } = useAuth();
  const [habilitado, setHabilitado] = useState(colegioId ? true : false);
  const navigate = useNavigate();
  const [profesor, setProfesor] = useState(null);
  const rows = [
    {
      id: profesor?.id,
      nombre: profesor?.nombre,
      apellido: profesor?.apellido,
      documento: profesor?.documento,
    },
  ];
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "colorsito",
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
      headerClassName: "colorsito",
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 150,
      headerClassName: "colorsito",
    },
    {
      field: "documento",
      headerName: "Documento",
      width: 150,
      headerClassName: "colorsito",
    },
    {
      field: "accion",
      headerName: "Asignar colegio",
      width: 200,
      headerClassName: "colorsito",
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
          <Button
            variant="contained"
            onClick={() => asignarColegio(params.row.id, colegioId)}
            disabled={habilitado ? false : true}
          >
            Asignar
          </Button>
        </Box>
      ),
    },
  ];

  const handleDialogButton = () => {
    setOpen(false);
    navigate("/director/listar-profes", { replace: true });
  };

  const asignarColegio = async (usuarioId, colegioId) => {
    console.log(colegioId, usuarioId);
    try {
      const res = await axios.post("http://localhost:3001/colegios/asignar", {
        usuarioId,
        colegioId,
      });
      setOpen(true);
    } catch (error) {
      setAlert({
        severity: "error",
        message: error.response.data.error,
        show: true,
      });
    }
  };

  useEffect(() => {
    setHabilitado(colegioId ? true : false);
  }, [colegioId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "100%",
        }}
      >
        <Dialog open={open} onClose={handleDialogButton}>
          <DialogTitle id="confirmacion">
            {"Profesor añadido correctamente"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmacion-text">
              El profesor {profesor?.nombre} {profesor?.apellido} ha sido
              añadido correctamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogButton} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {alert.show ? (
          <Alert
            severity={alert.severity}
            onClose={() => {
              setAlert({ ...alert, show: false });
            }}
          >
            {alert.message}
          </Alert>
        ) : null}

        <CssBaseline />
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography component="h1" variant="h5">
              Asignar colegio a profesor
            </Typography>
            <SearchBarProfes
              onSearch={setProfesor}
              setAlert={setAlert}
            ></SearchBarProfes>
          </Box>
          {habilitado ? null : (
            <Typography component="p" variant="h6" color="red">
              Debe seleccionar un colegio para asignar un profesor.
            </Typography>
          )}
          <Box
            sx={{
              mt: 5,
              "& .colorsito": {
                backgroundColor: "primary.main",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.2rem",
              },
            }}
          >
            {profesor && <DataGrid rows={rows} columns={columns} />}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AsignarColegio;
