import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import SearchBar from "../components/SearchBar";

export default function ModificarAlumno() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const colegioId = localStorage.getItem("colegio");
  const [cursoId, setCursoId] = useState("");
  const [lista, setLista] = React.useState([]);
  const dayjs = require("dayjs");
  const [alumno, setAlumno] = useState({});

  const formik = useFormik({
    initialValues: {
      id: "",
      nombre: "",
      apellido: "",
      documento: "",
      fechaNac: "",
      email: "",
      sexo: "",
      ColegioId: colegioId,
      CursoId: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.put(
          "http://localhost:3001/alumnos/modificar",
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
    validationSchema: AlumnoSchema,
  });

  const handleDialogButton = () => {
    setOpen(false);
    navigate("/director", { replace: true });
  };

  const handleCurso = (event) => {
    formik.values.CursoId = event.target.value;
    setCursoId(event.target.value);
  };

  const handleDateChange = (date) => {
    formik.values.fechaNac = dayjs(date).format("YYYY-MM-DD");
  };

  useEffect(() => {
    const getLista = async () => {
      try {
        const res = await axios.get("http://localhost:3001/alumnos/cursos");
        setLista(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  useEffect(() => {
    if (alumno) {
      formik.setValues({
        id: alumno.id || "",
        nombre: alumno.nombre || "",
        apellido: alumno.apellido || "",
        documento: alumno.documento || "",
        fechaNac: alumno.fechaNac || "",
        email: alumno.email || "",
        sexo: alumno.sexo || "",
        ColegioId: colegioId,
        CursoId: alumno.CursoId || "",
      });
    }
  }, [alumno, colegioId]);

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
            {"Alumno modificado correctamente"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmacion-text">
              El alumno {formik.values.nombre} {formik.values.apellido} ha sido
              modificado correctamente.
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography component="h1" variant="h5">
            Modificar Alumno
          </Typography>
          <SearchBar onSearch={setAlumno} setAlert={setAlert}></SearchBar>
        </Box>

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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]}>
                  <DateField
                    label="Fecha de Nacimiento"
                    onChange={handleDateChange}
                    value={dayjs(formik.values.fechaNac)}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="curso-label">Curso/Grado</InputLabel>
                <Select
                  name="curso"
                  labelId="curso-label"
                  id="curso"
                  value={formik.values.CursoId}
                  label="curso"
                  onChange={handleCurso}
                >
                  {lista.map((curso) => (
                    <MenuItem value={curso.id} key={curso.id}>
                      {curso.descripcion}
                    </MenuItem>
                  ))}
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
            Modificar
          </Button>
          <Grid container justifyContent="center"></Grid>
        </Box>
      </Box>
    </Box>
  );
}
