import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const initialState = { usuario: null, isAuthenticated: false, colegio: "" };

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, usuario: action.payload, isAuthenticated: true };
      case "logout":
        return {
          ...state,
          usuario: null,
          isAuthenticated: false,
          colegio: "",
        };
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
    // Restaurar usuario y autenticación desde localStorage
    const storedUsuario = localStorage.getItem("usuario");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    const storedColegio = localStorage.getItem("colegio");

    if (storedUsuario && storedIsAuthenticated) {
      dispatch({
        type: "login",
        payload: JSON.parse(storedUsuario),
      });
    }

    if (storedColegio) {
      dispatch({
        type: "colegio",
        payload: storedColegio,
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
    localStorage.removeItem("colegio");

    dispatch({ type: "logout" });
  }

  function setColegioId(colegio) {
    localStorage.setItem("colegio", colegio);
    dispatch({ type: "colegio", payload: colegio });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, isAuthenticated, colegio, login, logout, setColegioId }}
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
