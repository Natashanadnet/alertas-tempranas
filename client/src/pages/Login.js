import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import LoginSchema from "../Schemas/LoginSchema";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Ejemplos from "../components/Ejemplos";

export default function SignInSide() {
  const [alert, setAlert] = useState({
    severity: "error",
    message: "",
    show: false,
  });
  const { login, isAuthenticated, usuario } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:3001/usuarios/login",
          values
        );
        if (res.status === 200) {
          const usuario = res.data.usuario;
          login(usuario);

          navigate(
            usuario.RoleId === 1
              ? "/profesor"
              : usuario.RoleId === 2
              ? "/director"
              : "/exp"
          );
        }
      } catch (error) {
        console.log(error);
        setAlert({
          severity: "error",
          message: error.response.data.message,
          show: true,
        });
      }
    },
    validationSchema: LoginSchema,
  });

  return (
    <>
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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{ backgroundColor: "#e0f2fe" }}>
          <Box
            sx={{
              width: "100%",
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/edu.png"}
              alt="Imagen de pagina no encontrada"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                value={formik.values.email}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"No tienes una cuenta? Registrate"}
                  </Link>
                  <Grid item>
                    <Box mt={4}>
                      {" "}
                      {/* Agrega un margen en la parte superior */}
                      <Typography variant="h6" color="primary">
                        Usuarios de ejemplo para usar:
                      </Typography>
                      <Ejemplos></Ejemplos>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
