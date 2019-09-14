import {GUARDAR_ID_USUARIO} from '../../actions/constantesAcciones'
const datosUsuario = {};

const reducer = (state = datosUsuario, action)=>{
  switch (action.type) {
    case GUARDAR_ID_USUARIO:
            let nuevosDatosDeUsuario = Object.assign(state)
            nuevosDatosDeUsuario.idUsuario = action.data
            return nuevosDatosDeUsuario
    default:
      break;
  }
  return state
}

export default reducer
