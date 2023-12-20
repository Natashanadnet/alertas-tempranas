import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useAuth } from "../context/AuthContext";
import CircleIcon from "@mui/icons-material/Circle";

function Reportes() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const { colegio: colegioId, usuario } = useAuth();
  const [habilitado, setHabilitado] = useState(colegioId ? true : false);
  const [alumnos, setAlumnos] = useState([]);
  const [materiasProfe, setMateriasProfe] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const rows = alumnos ? alumnos : [];
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "colorsito",
      valueGetter: (params) => params.row.Alumno?.id,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
      headerClassName: "colorsito",
      valueGetter: (params) => params.row.Alumno?.nombre,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 150,
      headerClassName: "colorsito",
      valueGetter: (params) => params.row.Alumno?.apellido,
    },
    {
      field: "curso",
      headerName: "Curso/Grado",
      width: 150,
      headerClassName: "colorsito",
      valueGetter: (params) => params.row.Alumno.Curso.descripcion,
    },
    {
      field: "nota",
      headerName: "Nota",
      width: 150,
      headerClassName: "colorsito",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <CircleIcon
            sx={{
              color:
                params.row.nota === 1
                  ? "red"
                  : params.row.nota > 1 && params.row.nota <= 3
                  ? "yellow"
                  : "green",
            }}
          />
          <Typography>{params.row.nota}</Typography>
        </Box>
      ),
    },
    {
      field: "asistencia",
      headerName: "Asistencia",
      width: 150,
      headerClassName: "colorsito",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <CircleIcon
            sx={{
              color:
                params.row.asistencia <= 50
                  ? "red"
                  : params.row.asistencia > 50 && params.row.asistencia <= 75
                  ? "yellow"
                  : "green",
            }}
          />
          <Typography>{params.row.asistencia}%</Typography>
        </Box>
      ),
    },
    {
      field: "comportamientoId",
      headerName: "Comportamiento",
      width: 300,
      headerClassName: "colorsito",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <CircleIcon
            sx={{
              color:
                params.row.comportamientoId === 1
                  ? "red"
                  : params.row.comportamientoId > 1 &&
                    params.row.comportamientoId < 3
                  ? "yellow"
                  : "green",
            }}
          />
          <Typography>{params.row.Comportamiento.descripcion}</Typography>
        </Box>
      ),
    },
  ];

  const handleChange = async (event) => {
    setMateriaSeleccionada(event.target.value);
  };
  useEffect(() => {
    const getReportes = async () => {
      if (materiaSeleccionada === null) return;
      try {
        const res = await axios.get(
          `http://localhost:3001/alumnos/listar-reporte?colegioId=${colegioId}&materiaId=${materiaSeleccionada}&usuarioId=${usuario.id}`
        );
        if (res.data && res.data.length === 0) {
          setAlert({
            severity: "info",
            message: "No hay datos para mostrar.",
            show: true,
          });
        } else {
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
    getReportes();
  }, [materiaSeleccionada]);

  useEffect(() => {
    setHabilitado(colegioId ? true : false);
  }, [colegioId]);

  useEffect(() => {
    const getMaterias = async () => {
      try {
        const url = `http://localhost:3001/materias/listar-profe?usuarioId=${usuario.id}&colegioId=${colegioId}`;
        const res = await axios.get(url);

        if (res.data && res.data.length === 0) {
          setAlert({
            severity: "info",
            message: "No tienes materias asignadas.",
            show: true,
          });
        } else {
          setHabilitado(true);
        }

        setMateriasProfe(res.data);
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
    getMaterias();
  }, [colegioId, usuario.id]);

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
            Reporte
          </Typography>
          <Typography sx={{ mt: 2 }} component="h1" variant="h6">
            Elija una materia para ver el reporte:
          </Typography>

          {habilitado ? null : (
            <Typography component="p" variant="h6" color="red">
              Debe seleccionar un colegio para ver el reporte.
            </Typography>
          )}
          {materiasProfe && (
            <FormControl sx={{ mt: 3 }}>
              <FormLabel id="radio-materias">Materias</FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-materia"
                name="materias"
              >
                {materiasProfe.map((materia) => (
                  <FormControlLabel
                    key={materia.id}
                    value={materia.materiaId}
                    control={<Radio />}
                    label={materia.Materia.descripcion}
                    onChange={handleChange}
                  />
                ))}
              </RadioGroup>
            </FormControl>
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
            {alumnos.length > 0 && (
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

export default Reportes;
