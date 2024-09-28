import { faCheck, faTimes, faExclamationTriangle, faQuestion } from "@fortawesome/free-solid-svg-icons";

// Función para calcular la diferencia en días entre la fecha actual y la fecha de ingreso del usuario
const calcularDiasDesdeIngreso = (fechaIngreso) => {
  const fechaActual = new Date();
  const fechaUsuario = new Date(fechaIngreso);
  const difMilisegundos = fechaActual - fechaUsuario;
  const milisegundosPorDia = 1000 * 60 * 60 * 24;
  return Math.floor(difMilisegundos / milisegundosPorDia);
};

// Función para determinar el estado y el ícono según los días
const obtenerEstadoUsuario = (dias, styles) => {
  if (dias === '-') {
    return { stateUser: styles.pendiente, icon: faQuestion };
  } else if (dias >= 0 && dias < 60) {
    return { stateUser: styles.activo, icon: faCheck };
  } else if (dias >= 60 && dias < 120) {
    return { stateUser: styles.inactivo, icon: faExclamationTriangle };
  } else {
    return { stateUser: styles.bloqueado, icon: faTimes };
  }
};


export { calcularDiasDesdeIngreso, obtenerEstadoUsuario};