import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios"; // Asegúrate de importar axios

const SearchBar = ({ onSearch, setAlert }) => {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Realiza la búsqueda solo si se proporciona la función onSearch
    if (onSearch) {
      const documento = event.target.elements.searchQuery.value;
      console.log(documento);

      try {
        const res = await axios.post(
          "http://localhost:3001/alumnos/buscar",
          { documento: documento } // Envía la consulta como objeto
        );

        if (res.status === 200) {
          const alumno = res.data.alumno;
          console.log(alumno);
          // Hacer algo con el resultado, por ejemplo, llamar a onSearch
          onSearch(alumno);
        }
      } catch (error) {
        console.error(error);

        setAlert({
          severity: "error",
          message: error.response.data.error,
          show: true,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="searchQuery"
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
