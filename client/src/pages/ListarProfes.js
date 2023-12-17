import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useAuth } from "../context/AuthContext";

function ListarProfes() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const { colegio: colegioId } = useAuth();
  const [habilitado, setHabilitado] = useState(colegioId ? true : false);
  const [profesores, setProfesores] = useState(null);
  const [profeAEliminar, setProfeAEliminar] = useState(false);
  const rows = profesores;
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
      headerName: "Acciones",
      width: 250,
      headerClassName: "colorsito",
      sortable: false,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          sx={{ width: "100%", gap: 3 }}
        >
          <Button
            variant="contained"
            disabled={habilitado ? false : true}
            sx={{ pl: 5, pr: 5, backgroundColor: "red" }}
            onClick={() =>
              abrirDialogoEliminar({
                id: params.row.id,
                nombre: params.row.nombre,
                apellido: params.row.apellido,
              })
            }
          >
            Eliminar
          </Button>
        </Box>
      ),
    },
  ];

  const abrirDialogoEliminar = (profeObject) => {
    setProfeAEliminar(profeObject);
    setOpen(true);
  };

  const handleDialogButton = () => {
    setOpen(false);
  };

  const confirmarEliminar = async () => {
    if (profeAEliminar) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/usuarios/eliminar-cole?colegioId=${colegioId}&usuarioId=${profeAEliminar.id}`
        );
        if (response.status === 200) {
          // Eliminación exitosa, actualizar la lista de profesores
          setProfesores((profesPrev) =>
            profesPrev.filter((profe) => profe.id !== profeAEliminar.id)
          );
        }
        setAlert({
          severity: "success",
          message: response.data.message,
          show: true,
        });
      } catch (error) {
        setAlert({
          severity: "error",
          message: error.response.data.error,
          show: true,
        });
      } finally {
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    setHabilitado(colegioId ? true : false);
  }, [colegioId]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/usuarios/listar?colegioId=${colegioId}`
        );
        setProfesores(res.data);
      } catch (error) {
        setAlert({
          severity: "error",
          message: error.response.data.error,
          show: true,
        });
      }
    };
    getLista();
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
          <DialogTitle id="confirmacion">"Eliminar Profesor"</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmacion-text">
              Desea eliminar al profesor {profeAEliminar?.nombre}{" "}
              {profeAEliminar?.apellido}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                gap: 3,
              }}
            >
              <Button
                sx={{ backgroundColor: "primary.main", color: "#fff" }}
                onClick={handleDialogButton}
                autoFocus
              >
                Cancelar
              </Button>
              <Button
                sx={{ backgroundColor: "red", color: "#fff" }}
                onClick={confirmarEliminar}
                autoFocus
              >
                Eliminar
              </Button>
            </Box>
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
          <Typography component="h1" variant="h5">
            Lista de Profesores
          </Typography>

          {habilitado ? null : (
            <Typography component="p" variant="h6" color="red">
              Debe seleccionar un colegio para ver la lista de profesores.
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
            {profesores && (
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                slots={{ toolbar: GridToolbar }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ListarProfes;
