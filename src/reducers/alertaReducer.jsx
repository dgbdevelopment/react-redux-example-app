import { MOSTRAR_ALERTA } from 'types/index';

const initialState = {
  alerta: null
};

export default function alertaReducer(state = initialState, action){
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {...state, alerta: action.payload}
    default:
      return state;
  }
};
