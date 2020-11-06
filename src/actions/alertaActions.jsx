import { MOSTRAR_ALERTA } from "types/index";

//Funciones para mostrar alertas
export function mostrarAlertaAction(alerta) {
  return dispatch => {
    dispatch(mostrarAlerta(alerta))
  }
}
const mostrarAlerta = (alerta) => ({
  type: MOSTRAR_ALERTA,
  payload: alerta
});