import * as yup from "yup";

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
  fechaNac: yup
    .date("Ingrese una fecha válida")
    .required("La fecha de nacimiento es obligatoria")
    .max(new Date(), "La fecha de nacimiento no puede ser en el futuro"),
  email: yup
    .string("Ingrese su email")
    .required("El email es obligatorio")
    .email("Ingrese un email válido"),
  sexo: yup.string("Seleccione su genero").required("El genero es obligatorio"),
});

export default AlumnoSchema;
