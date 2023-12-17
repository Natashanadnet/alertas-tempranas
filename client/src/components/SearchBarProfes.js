import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios"; // Asegúrate de importar axios

const SearchBarProfes = ({ onSearch, setAlert }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onSearch) {
      const documento = event.target.elements.searchQuery.value;

      try {
        const res = await axios.post(
          "http://localhost:3001/usuarios/buscar",
          { documento: documento } // Envía la consulta como objeto
        );

        if (res.status === 200) {
          const profesor = res.data.usuario;

          onSearch(profesor);
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
        placeholder="Buscar profesor por documento"
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

export default SearchBarProfes;