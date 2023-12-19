import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import AlumnoSchema from "../Schemas/AlumnoSchema";
import dayjs from "dayjs";

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

  //Sacamos el colegioId, usuarioId y alumnoId del query params
  const queryParams = new URLSearchParams(location.search);
  const usuarioId = queryParams.get("usuarioId");
  const colegioId = queryParams.get("colegioId");
  const alumnoId = queryParams.get("alumnoId");

  //Tengo que traer el alumno con sus datos, y la lista de materias que enseña el profesor, hacer el schema de yup de la carga de indicadores

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      documento: "",
      fechaNac: dayjs().subtract(3, "year"),
      email: "",
      sexo: "",
      ColegioId: "",
      CursoId: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:3001/alumnos", values);
        setOpen(true);
      } catch (error) {
        setAlert({
          severity: "error",
          message: error.response.data.error,
          show: true,
        });
      }
    },
    validationSchema: AlumnoSchema,
  });

  console.log(formik.values);

  const handleDialogButton = () => {
    setOpen(false);
    navigate("/profesor/cargar-indicadores", { replace: true });
  };

  useEffect(() => {
    const getLista = async () => {
      try {
        const res = await axios.get("http://localhost:3001/alumnos/cursos");
        setListaMaterias(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
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
              El alumno {formik.values.nombre} {formik.values.apellido} ha sido
              creado correctamente.
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
      </Box>

      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography component="h1" variant="h5">
          Cargar Indicadores
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nombre"
                fullWidth
                id="nombre"
                label="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.apellido && Boolean(formik.errors.apellido)
                }
                helperText={formik.touched.apellido && formik.errors.apellido}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="documento"
                label="Documento"
                name="documento"
                value={formik.values.documento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.documento && Boolean(formik.errors.documento)
                }
                helperText={formik.touched.documento && formik.errors.documento}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="sexo-label">Sexo</InputLabel>
                <Select
                  name="sexo"
                  labelId="sexo-label"
                  id="sexo"
                  value={formik.values.sexo}
                  label="Sexo"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={1}>Femenino</MenuItem>
                  <MenuItem value={2}>Masculino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cargar
          </Button>
          <Grid container justifyContent="center"></Grid>
        </Box>
      </Box>
    </Box>
  );
}
