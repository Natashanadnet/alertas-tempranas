import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserSchema from "../Schemas/UserSchema";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      documento: "",
      password: "",
      RoleId: 1,
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:3001/usuarios", values);
        setOpen(true);
      } catch (error) {
        setAlert({
          severity: "error",
          message: error.response.data.error,
          show: true,
        });
      }
    },
    validationSchema: UserSchema,
  });

  const handleDialogButton = () => {
    setOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Dialog open={open} onClose={handleDialogButton}>
        <DialogTitle id="confirmacion">
          {"Usuario creado correctamente"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmacion-text">
            El usuario {formik.values.nombre} {formik.values.apellido} ha sido
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Cuenta
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
                  label="Nro. Documento"
                  name="documento"
                  value={formik.values.documento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.documento && Boolean(formik.errors.documento)
                  }
                  helperText={
                    formik.touched.documento && formik.errors.documento
                  }
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
                <TextField
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="rol-label">Rol</InputLabel>
                  <Select
                    name="RoleId"
                    labelId="rol-label"
                    id="rol"
                    value={formik.values.RoleId}
                    label="Rol"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={1}>Profesor</MenuItem>
                    <MenuItem value={2}>Director</MenuItem>
                    <MenuItem value={3}>ExP</MenuItem>
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
              Crear
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to={"/"}>Ya tienes una cuenta? Inicia sesión</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
