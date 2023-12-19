import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

export default function MateriaSelect({
  children,
  setAlert,
  setOpen,
  usuarioId,
  colegioId,
}) {
  const materiasList = children;
  const [materias, setMaterias] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (materias.length === 0) {
      setAlert({
        severity: "error",
        message: "Debe seleccionar al menos una materia",
        show: true,
      });
      return; // No hacer la solicitud si no se selecciona ninguna materia
    }

    // Construir el payload para la solicitud
    const payload = materias.map((materiaId) => ({
      materiaId,
      usuarioId,
      ColegioId: colegioId,
    }));

    try {
      // Realizar la solicitud POST
      const response = await axios.post(
        "http://localhost:3001/materias/agregar",
        payload
      );

      setOpen(true);
    } catch (error) {
      console.error(error);
      setAlert({
        severity: "error",
        message: error.response.data.error,
        show: true,
      });
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const valoresSeleccionados =
      typeof value === "string" ? value.split(",") : value;

    // Limitar la selección a 2 valores
    if (valoresSeleccionados.length > 2) {
      setAlert({
        severity: "warning",
        message: "Solo puedes seleccionar hasta 2 materias",
        show: true,
      });
      return; // No actualizar el estado si se seleccionan más de 2 materias
    }

    setMaterias(valoresSeleccionados);
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, display: "flex", flexDirection: "column" }}
      >
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="materia-select-label">Materias</InputLabel>
          <Select
            labelId="materia-select-label"
            label="Materias"
            id="materia-select"
            multiple
            value={materias}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) =>
              selected
                .map((id) => {
                  const materiaEncontrada = materiasList.find(
                    (materia) => materia.id === id
                  );
                  return materiaEncontrada ? materiaEncontrada.descripcion : "";
                })
                .join(", ")
            }
          >
            {materiasList.map((materia) => (
              <MenuItem key={materia.id} value={materia.id}>
                <Checkbox checked={materias.indexOf(materia.id) > -1} />
                <ListItemText primary={materia.descripcion} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Añadir
        </Button>
      </Box>
    </>
  );
}
