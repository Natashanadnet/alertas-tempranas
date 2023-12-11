import * as React from "react";
import { useState } from "react";
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
import ColegioSchema from "../Schemas/ColegioSchema";

export default function RegistrarColegio() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      codigo: "",
      nombre: "",
      telefono: "",
      direccion: "",
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
    validationSchema: ColegioSchema,
  });

  const handleDialogButton = () => {
    setOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Dialog open={open} onClose={handleDialogButton}>
        <DialogTitle id="confirmacion">
          {"Colegio creado correctamente"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmacion-text">
            El colegio {formik.values.nombre} {formik.values.apellido} ha sido
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

      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography component="h1" variant="h5">
          Registrar Colegio
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
                name="codigo"
                fullWidth
                id="codigo"
                label="Codigo"
                value={formik.values.codigo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                helperText={formik.touched.codigo && formik.errors.codigo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="telefono"
                label="Nro. Telefono"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.telefono && Boolean(formik.errors.telefono)
                }
                helperText={formik.touched.telefono && formik.errors.telefono}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="direccion"
                label="Direccion"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.direccion && Boolean(formik.errors.direccion)
                }
                helperText={formik.touched.direccion && formik.errors.direccion}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
          <Grid container justifyContent="center"></Grid>
        </Box>
      </Box>
    </>
  );
}
