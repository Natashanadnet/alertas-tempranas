import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AccesoDenegado() {
  const { usuario } = useAuth();
  console.log(usuario);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <CssBaseline />
      <Container>
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
            src={process.env.PUBLIC_URL + "/denegado.png"}
            alt="Imagen de pagina no encontrada"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography mb={3} component="h1" variant="h5">
            Acceso Denegado
          </Typography>
          <Button variant="contained" onClick={goBack}>
            Volver Atrás
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AccesoDenegado;
