import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import SearchBarAlumno from "../components/SearchBarAlumno";
import dayjs from "dayjs";

export default function ModificarAlumno() {
  let { id } = useParams();
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [cursoId, setCursoId] = useState("");
  const [lista, setLista] = React.useState([]);
  const [alumno, setAlumno] = useState({});
  const fechaMaxima = dayjs().subtract(3, "year");
  const fechaMinima = dayjs().subtract(20, "year");
  const [error, setError] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      id: "",
      nombre: "",
      apellido: "",
      documento: "",
      fechaNac: fechaMaxima,
      email: "",
      SexoId: "",
      ColegioId: "",
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
    navigate("/director/listar-alumno", { replace: true });
  };

  const handleCurso = (event) => {
    formik.values.CursoId = event.target.value;
    setCursoId(event.target.value);
  };

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate": {
        return "No puede tener menos de 3 años";
      }
      case "minDate": {
        return "No puede tener mas de 20 años ";
      }

      case "invalidDate": {
        return "Fecha invalida";
      }

      default: {
        return "";
      }
    }
  }, [error]);

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
    if (id) {
      const getAlumno = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3001/alumnos/buscar-id?alumnoId=${id}`
          );
          setAlumno(res.data);
        } catch (error) {
          console.log(error);
          setAlert({
            severity: "error",
            message: error.response.data.error,
            show: true,
          });
        }
      };
      getAlumno();
    }
  }, []);

  useEffect(() => {
    if (alumno) {
      formik.setValues({
        id: alumno.id || "",
        nombre: alumno.nombre || "",
        apellido: alumno.apellido || "",
        documento: alumno.documento || "",
        fechaNac: alumno.fechaNac || fechaMaxima,
        email: alumno.email || "",
        SexoId: alumno.SexoId || "",
        ColegioId: alumno.ColegioId || "",
        CursoId: alumno.CursoId || "",
      });
    }
  }, [alumno]);

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
          <SearchBarAlumno
            onSearch={setAlumno}
            setAlert={setAlert}
          ></SearchBarAlumno>
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
                <DatePicker
                  value={dayjs(formik.values.fechaNac)}
                  onChange={(newValue) => {
                    formik.values.fechaNac =
                      dayjs(newValue).format("YYYY-MM-DD");
                  }}
                  onError={(newError) => setError(newError)}
                  slotProps={{
                    textField: {
                      helperText: errorMessage,
                    },
                  }}
                  minDate={fechaMinima}
                  maxDate={fechaMaxima}
                />
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
                  name="SexoId"
                  labelId="sexo-label"
                  id="SexoId"
                  value={formik.values.SexoId}
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
