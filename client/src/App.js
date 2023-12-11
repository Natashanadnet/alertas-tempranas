import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardDire from "./pages/DashboardDire";
import RequireAuth from "./pages/RequireAuth";
import Layout from "./components/Layout";
import Missing from "./pages/Missing";
import AccesoDenegado from "./pages/AccesoDenegado";
import RegistrarAlumno from "./pages/RegistrarAlumno";
import RegistrarColegio from "./pages/RegistrarColegio";
import AsignarColegio from "./pages/AsignarColegio";
import ModificarAlumno from "./pages/ModificarAlumno";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function App() {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="acceso-denegado" element={<AccesoDenegado />}></Route>

        {/* Rutas protegidas */}
        <Route element={<RequireAuth allowedRoles={1} />}>
          <Route path="profesor" element={<DashboardDire />}>
            <Route path="registrar-alumno" element={<RegistrarAlumno />} />
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={2} />}>
          <Route path="director" element={<DashboardDire />}>
            <Route path="registrar-colegio" element={<RegistrarColegio />} />
            <Route path="registrar-alumno" element={<RegistrarAlumno />} />
            <Route path="modificar-alumno" element={<ModificarAlumno />} />
            <Route path="asignar-colegio" element={<AsignarColegio />} />
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={3} />}>
          <Route path="exp" element={<DashboardDire />} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
