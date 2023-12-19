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
import MateriaSelect from "../components/MateriaSelect";

function SeleccionarMateria() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const { colegio: colegioId, usuario } = useAuth();
  const [habilitado, setHabilitado] = useState(colegioId ? true : false);
  const [materiasList, setMateriasList] = useState(null);
  const [materiasListProfe, setMateriaListProfe] = useState(null);
  const [actualizarLista, setActualizarLista] = useState(false);
  const rows = materiasListProfe;
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "colorsito",
    },
    {
      field: "Materia",
      headerName: "Descripcion",
      width: 350,
      headerClassName: "colorsito",
      valueGetter: (params) => params.row.Materia.descripcion,
    },
  ];

  const handleDialogButton = () => {
    setOpen(false);
  };

  useEffect(() => {
    setHabilitado(colegioId ? true : false);
  }, [colegioId]);

  useEffect(() => {
    const getListaCompleta = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/materias/listar`);
        setMateriasList(res.data);
      } catch (error) {
        setAlert({
          severity: "error",
          message: error.response.data.error,
          show: true,
        });
      }
    };
    getListaCompleta();
  }, []);

  useEffect(() => {
    const getListaMateriasProfesor = async () => {
      if (!usuario || !usuario.id || !colegioId) {
        return; // Salir de la función si no hay datos
      }

      try {
        const url = `http://localhost:3001/materias/listar-profe?usuarioId=${usuario.id}&colegioId=${colegioId}`;
        const res = await axios.get(url);

        if (res.data && res.data.length === 0) {
          setAlert({
            severity: "info",
            message: "No tienes materias asignadas.",
            show: true,
          });
        }

        setMateriaListProfe(res.data);
      } catch (error) {
        if (error.response && error.response.data) {
          setAlert({
            severity: "error",
            message: error.response.data.error,
            show: true,
          });
        }
      }
    };

    getListaMateriasProfesor();
  }, [usuario, colegioId, actualizarLista]);

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
          <DialogTitle id="confirmacion">Añadir materias</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmacion-text">
              Materias seleccionadas correctamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ backgroundColor: "primary.main", color: "#fff" }}
              onClick={handleDialogButton}
              autoFocus
            >
              Aceptar
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
          <Typography component="h1" variant="h5">
            Seleccionar Materias:
          </Typography>
          {habilitado ? null : (
            <Typography component="p" variant="h6" color="red">
              Debe seleccionar un colegio para seleccionar materias.
            </Typography>
          )}
          {materiasList && habilitado && (
            <MateriaSelect
              setAlert={setAlert}
              setOpen={setOpen}
              usuarioId={usuario.id}
              colegioId={colegioId}
              setActualizarLista={setActualizarLista}
            >
              {materiasList}
            </MateriaSelect>
          )}

          <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
            Materias asignadas:
          </Typography>

          {habilitado ? null : (
            <Typography component="p" variant="h6" color="red">
              Debe seleccionar un colegio para ver las materias que tiene
              asignadas.
            </Typography>
          )}
          <Box
            sx={{
              "& .colorsito": {
                backgroundColor: "primary.main",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.2rem",
              },
            }}
          >
            {materiasListProfe ? (
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                slots={{ toolbar: GridToolbar }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SeleccionarMateria;
