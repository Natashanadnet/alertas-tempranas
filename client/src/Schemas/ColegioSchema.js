import * as yup from "yup";

const ColegioSchema = yup.object({
  codigo: yup
    .string("Ingrese el identificador del colegio")
    .min(3)
    .max(15)
    .required("El codigo es obligatorio"),
  nombre: yup
    .string("Ingrese el nombre del colegio")
    .max(30)
    .min(3)
    .required("El nombre es obligatorio"),
  telefono: yup
    .string("Ingrese el telefono del colegio")
    .required("El telefono es obligatorio"),
  direccion: yup
    .string("Ingrese la direccion del colegio")
    .required("La direccion es obligatoria"),
});

export default ColegioSchema;
