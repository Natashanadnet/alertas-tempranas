import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Missing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
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
            src={process.env.PUBLIC_URL + "/404.png"}
            alt="Imagen de pagina no encontrada"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button variant="contained" onClick={handleClick}>
            Volver Atrás
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Missing;
