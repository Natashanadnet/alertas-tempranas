import { useState } from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SchoolIcon from "@mui/icons-material/School";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Collapse from "@mui/material/Collapse";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import List from "@mui/material/List";

export default function DireItems() {
  const [openColegio, setOpenColegio] = useState(false);
  const [openAlumno, setOpenAlumno] = useState(false);
  const [openProfes, setOpenProfes] = useState(false);

  const handleClick = (state) => {
    state((curr) => !curr);
  };

  return (
    <List component="nav">
      <ListItemButton component={Link} to="./home-dire">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
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
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(setOpenProfes)}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Profesores" />
        {openProfes ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProfes} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
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

          <ListItemButton sx={{ pl: 4 }} component={Link} to="./listar-profes">
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Listar" />
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
          <ListItemButton sx={{ pl: 4 }} component={Link} to="./listar-alumno">
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Listar" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
