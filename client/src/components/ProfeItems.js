import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import DashboardIcon from "@mui/icons-material/Dashboard";
import List from "@mui/material/List";

export default function ProfeItems() {
  return (
    <List component="nav">
      <ListItemButton component={Link} to="./seleccionar-materia">
        <ListItemIcon>
          <SquareFootIcon />
        </ListItemIcon>
        <ListItemText primary="Seleccionar materias" />
      </ListItemButton>
      <ListItemButton component={Link} to="./cargar-indicadores">
        <ListItemIcon>
          <NoteAltIcon />
        </ListItemIcon>
        <ListItemText primary="Cargar indicadores" />
      </ListItemButton>
      <ListItemButton component={Link} to="./reportes">
        <ListItemIcon>
          <QueryStatsIcon />
        </ListItemIcon>
        <ListItemText primary="Ver reportes" />
      </ListItemButton>
    </List>
  );
}
