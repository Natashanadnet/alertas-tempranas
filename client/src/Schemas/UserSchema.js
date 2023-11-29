import * as yup from "yup";

const UserSchema = yup.object({
  nombre: yup
    .string("Ingrese su nombre")
    .min(3)
    .max(15)
    .required("El nombre es obligatorio"),
  apellido: yup
    .string("Ingrese su apellido")
    .max(15)
    .min(3)
    .required("La contraseña es obligatoria"),
  email: yup
    .string("Ingrese su email")
    .required("El email es obligatorio")
    .email("Ingrese un email válido"),
  documento: yup
    .string("Ingrese su documento")
    .required("El documento es obligatorio"),
  password: yup
    .string("Ingrese su contraseña")
    .required("La contraseña es obligatoria"),
});

export default UserSchema;
