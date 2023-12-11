import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const query = event.target.value;
    // You can perform any search-related actions here
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div>
      <TextField
        placeholder="Buscar Alumno"
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
