import * as yup from "yup";

const IndicadoresSchema = yup.object({
  nota: yup
    .number("La nota debe tener un valor numerico")
    .min(1)
    .max(5)
    .required("La nota es obligatoria"),
  comportamientoId: yup
    .number("Debe seleccionar un comportamiento")
    .max(3)
    .min(1)
    .required("El comportamiento es obligatorio"),
  asistencia: yup
    .number("La asistencia debe tener un valor numerico")
    .min(0)
    .max(100)
    .required("La asistencia es obligatoria"),
  materiaId: yup
    .number("Debe seleccionar una materia")
    .required("La materia es obligatoria"),
});

export default IndicadoresSchema;
