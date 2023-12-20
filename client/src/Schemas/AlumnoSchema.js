import * as yup from "yup";
import dayjs from "dayjs";

const fechaMaxima = dayjs().subtract(3, "year").format("DD-MM-YYYY");
const fechaMinima = dayjs().subtract(20, "year").format("DD-MM-YYYY");

const AlumnoSchema = yup.object({
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
  documento: yup
    .string("Ingrese su documento")
    .required("El documento es obligatorio"),
  email: yup
    .string("Ingrese su email")
    .required("El email es obligatorio")
    .email("Ingrese un email válido"),
  SexoId: yup
    .number("Seleccione su genero")
    .required("El genero es obligatorio"),
});

export default AlumnoSchema;
