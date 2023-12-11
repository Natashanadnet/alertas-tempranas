import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const initialState = { usuario: null, isAuthenticated: false, colegio: null };

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, usuario: action.payload, isAuthenticated: true };
      case "logout":
        return { ...state, usuario: null, isAuthenticated: false };
      case "colegio":
        return { ...state, colegio: action.payload };
      default:
        throw new Error("Unknown action");
    }
  }

  const [{ usuario, isAuthenticated, colegio }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Efecto para cargar usuario desde localStorage al cargar la página
  useEffect(() => {
    const storedUsuario = localStorage.getItem("usuario");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedUsuario && storedIsAuthenticated) {
      dispatch({
        type: "login",
        payload: JSON.parse(storedUsuario),
      });
    }
  }, []);

  function login(usuario) {
    // Guardar en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("isAuthenticated", true);

    dispatch({ type: "login", payload: usuario });
  }

  function logout() {
    // Eliminar del localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("isAuthenticated");

    dispatch({ type: "logout" });
  }

  function setColegio(colegio) {
    localStorage.setItem("colegio", JSON.stringify(colegio));
    dispatch({ type: "setColegio", payload: colegio });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, isAuthenticated, colegio, login, logout, setColegio }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
