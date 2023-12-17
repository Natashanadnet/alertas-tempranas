import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

function ListarAlumnos() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const { colegio: colegioId } = useAuth();
  const [habilitado, setHabilitado] = useState(colegioId ? true : false);
  const [alumnos, setAlumnos] = useState(null);
  const [alumnoAEliminar, setAlumnoAEliminar] = useState(null);
  const rows = alumnos;
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
      field: "sexo",
      headerName: "Genero",
      width: 150,
      headerClassName: "colorsito",
      renderCell: (params) =>
        params.row.sexo === "2" ? "Masculino" : "Femenino",
    },
    {
      field: "CursoId",
      headerName: "Curso/Grado",
      width: 150,
      headerClassName: "colorsito",
      valueGetter: (params) => params.row.Curso.descripcion,
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
            sx={{ pl: 5, pr: 5 }}
            component={Link}
            to={`/director/modificar-alumno/${params.row.id}`}
          >
            Modificar
          </Button>
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

  const abrirDialogoEliminar = (alumnoObject) => {
    setAlumnoAEliminar(alumnoObject);
    setOpen(true);
  };

  const handleDialogButton = () => {
    setOpen(false);
  };

  const confirmarEliminar = async () => {
    if (alumnoAEliminar) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/alumnos/eliminar/${alumnoAEliminar.id}`
        );
        if (response.status === 200) {
          // Eliminación exitosa, actualizar la lista de alumnos
          setAlumnos((alumnosPrev) =>
            alumnosPrev.filter((alumno) => alumno.id !== alumnoAEliminar.id)
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
        if (colegioId) {
          const res = await axios.get(
            `http://localhost:3001/alumnos/listar?colegioId=${colegioId}`
          );
          setAlumnos(res.data);
        }
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
          <DialogTitle id="confirmacion">Eliminar Alumno</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmacion-text">
              Desea eliminar al alumno {alumnoAEliminar?.nombre}{" "}
              {alumnoAEliminar?.apellido}?
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
            Lista de Alumnos
          </Typography>

          {habilitado ? null : (
            <Typography component="p" variant="h6" color="red">
              Debe seleccionar un colegio para ver la lista de alumnos.
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
            {alumnos && (
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

export default ListarAlumnos;
