import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardProfe from "./pages/DashboardProfe";
import DashboardDire from "./pages/DashboardDire";
import DashboarExp from "./pages/DashboardExp";
import RequireAuth from "./pages/RequireAuth";
import Layout from "./components/Layout";
import Missing from "./pages/Missing";
import AccesoDenegado from "./pages/AccesoDenegado";

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
          <Route path="profesor" element={<DashboardProfe />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={2} />}>
          <Route path="director" element={<DashboardDire />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={3} />}>
          <Route path="exp" element={<DashboarExp />} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
