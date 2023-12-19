import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useAuth } from "../context/AuthContext";

function CargarIndicadores() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const { colegio: colegioId, usuario } = useAuth();
  const [habilitado, setHabilitado] = useState(colegioId ? true : false);
  const [alumnos, setAlumnos] = useState(null);
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
      headerName: "Género",
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
      headerName: "Cargar Indicadores",
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
            to={`/profesor/carga?usuarioId=${usuario.id}&colegioId=${colegioId}&alumnoId=${params.row.id}`}
          >
            Cargar
          </Button>
        </Box>
      ),
    },
  ];

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

export default CargarIndicadores;