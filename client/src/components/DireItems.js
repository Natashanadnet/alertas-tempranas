import { useState } from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import SchoolIcon from "@mui/icons-material/School";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Collapse from "@mui/material/Collapse";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import List from "@mui/material/List";

export default function DireItems() {
  const [openColegio, setOpenColegio] = useState(false);
  const [openAlumno, setOpenAlumno] = useState(false);

  const handleClick = (state) => {
    state((curr) => !curr);
  };

  return (
    <List component="nav">
      <ListItemButton onClick={() => handleClick(setOpenColegio)}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Colegio" />
        {openColegio ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openColegio} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="./registrar-colegio"
          >
            <ListItemIcon>
              <AddBusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Añadir" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Eliminar" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="./asignar-colegio"
          >
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Asignar" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(setOpenAlumno)}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Alumnos" />
        {openAlumno ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAlumno} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="./registrar-alumno"
          >
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Añadir" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Eliminar" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Cursos" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SquareFootIcon />
        </ListItemIcon>
        <ListItemText primary="Materias" />
      </ListItemButton>
    </List>
  );
}
