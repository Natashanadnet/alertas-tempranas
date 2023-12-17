import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to dark
  },
});

export default function SelectColegioUsuario({ usuarioId }) {
  const [colegio, setColegio] = React.useState("");
  const [lista, setLista] = React.useState([]);
  const { setColegioId } = useAuth();
  const colegioUsuario = JSON.parse(localStorage.getItem("colegio"));

  useEffect(() => {
    if (colegioUsuario) setColegio(colegioUsuario);
  }, [colegioUsuario]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/colegios/${usuarioId}`
        );
        setLista(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, [usuarioId]);

  const handleChange = (event) => {
    setColegio(event.target.value);
    setColegioId(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Colegio</InputLabel>
          {lista.length > 0 ? (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={colegio}
              label="Colegio"
              onChange={handleChange}
            >
              {lista.map((colegio) => (
                <MenuItem key={colegio.id} value={colegio.id}>
                  {colegio.nombre}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <p>Cargando colegios...</p>
          )}
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
