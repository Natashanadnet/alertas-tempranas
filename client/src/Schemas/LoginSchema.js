import * as yup from "yup";

const LoginSchema = yup.object({
  email: yup
    .string("Ingrese su email")
    .required("El email es obligatorio")
    .email("Ingrese un email válido"),
  password: yup
    .string("Ingrese su contraseña")
    .required("La contraseña es obligatoria"),
});

export default LoginSchema;
