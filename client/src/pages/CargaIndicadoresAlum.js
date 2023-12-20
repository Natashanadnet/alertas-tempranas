import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
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
import IndicadoresSchema from "../Schemas/IndicadoresSchema";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import Slider from "@mui/material/Slider";

export default function CargaIndicadoresAlum() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [listaMaterias, setListaMaterias] = React.useState([]);
  const location = useLocation();
  const [alumno, setAlumno] = useState(null);
  const [habilitado, setHabilitado] = useState(false);

  //Sacamos el colegioId, usuarioId y alumnoId del query params
  const queryParams = new URLSearchParams(location.search);
  const usuarioId = queryParams.get("usuarioId");
  const colegioId = queryParams.get("colegioId");
  const alumnoId = queryParams.get("alumnoId");
  const rows = [alumno];
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
      field: "CursoId",
      headerName: "Curso/Grado",
      width: 150,
      headerClassName: "colorsito",
      valueGetter: (params) => params.row.Curso.descripcion,
    },
  ];

  //Tengo que traer el alumno con sus datos, y la lista de materias que enseña el profesor, hacer el schema de yup de la carga de indicadores

  const formik = useFormik({
    initialValues: {
      nota: 0,
      comportamientoId: "",
      asistencia: 0,
      materiaId: "",
      alumnoId: alumnoId,
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:3001/alumnos/vincular-materia",
          values
        );
        setOpen(true);
      } catch (error) {
        setAlert({
          severity: "error",
          message: error.response.data.error,
          show: true,
        });
      }
    },
    validationSchema: IndicadoresSchema,
  });

  const handleDialogButton = () => {
    setOpen(false);
    navigate("/profesor/cargar-indicadores", { replace: true });
  };

  useEffect(() => {
    const getAlum = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/alumnos/buscar-id-curso?alumnoId=${alumnoId}`
        );
        setAlumno(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getMaterias = async () => {
      try {
        const url = `http://localhost:3001/materias/listar-profe?usuarioId=${usuarioId}&colegioId=${colegioId}`;
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

        setListaMaterias(res.data);
      } catch (error) {
        setAlert({
          severity: "error",
          message: error.response.data.error,
          show: true,
        });
      }
    };
    getAlum();
    getMaterias();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <Box>
        <Dialog open={open} onClose={handleDialogButton}>
          <DialogTitle id="confirmacion">
            Carga de Indicadores Exitosa
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmacion-text">
              Los indicadores del alumno {alumno?.nombre} {alumno?.apellido} han
              sido cargados correctamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogButton} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Alumno:
        </Typography>
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
          {alumno && (
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              slots={{ toolbar: GridToolbar }}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            />
          )}
        </Box>
        <Box>
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
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Cargar Indicadores
          </Typography>
          {habilitado ? null : (
            <Typography component="p" variant="h6" color="red">
              Debe tener materias asignadas para cargar indicadores.
            </Typography>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="materia-label">Materia</InputLabel>
                {habilitado && (
                  <Select
                    name="materiaId"
                    labelId="materia-label"
                    id="materiaId"
                    value={formik.values.materiaId}
                    label="Materia"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {listaMaterias.map((materia) => (
                      <MenuItem key={materia.id} value={materia.materiaId}>
                        {materia.Materia.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                {formik.touched.materiaId && formik.errors.materiaId && (
                  <Typography color="error">
                    {formik.errors.materiaId}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Asistencia</Typography>
              <Slider
                id="asistencia"
                name="asistencia"
                label="asistencia"
                aria-label="asistencia"
                defaultValue={0}
                value={formik.values.asistencia}
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Nota</Typography>
              <Slider
                id="nota"
                name="nota"
                label="Nota"
                aria-label="Nota"
                defaultValue={1}
                step={1}
                marks
                min={1}
                max={5}
                valueLabelDisplay="auto"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="comportamiento-label">
                  Comportamiento
                </InputLabel>
                <Select
                  name="comportamientoId"
                  labelId="comportamientoId-label"
                  id="comportamientoId"
                  value={formik.values.comportamientoId}
                  label="comportamientoId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={1}>Inaceptable</MenuItem>
                  <MenuItem value={2}>Aceptable</MenuItem>
                  <MenuItem value={3}>Excelente</MenuItem>
                </Select>
                {formik.touched.comportamientoId &&
                  formik.errors.comportamientoId && (
                    <Typography color="error">
                      {formik.errors.comportamientoId}
                    </Typography>
                  )}
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={habilitado ? false : true}
          >
            Cargar
          </Button>
          <Grid container justifyContent="center"></Grid>
        </Box>
      </Box>
    </Box>
  );
}
