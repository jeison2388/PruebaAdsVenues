import {GUARDAR_ID_USUARIO} from '../../actions/constantesAcciones'
const datosUsuario = {};

const reducer = (state = datosUsuario, action)=>{
  switch (action.type) {
    case GUARDAR_ID_USUARIO:
            let nuevosDatosDeUsuario = Object.assign(state)
            nuevosDatosDeUsuario.idUsuario = action.data.id
            nuevosDatosDeUsuario.nombreUsuario = action.data.nombre
            return nuevosDatosDeUsuario
    default:
      break;
  }
  return state
}

export default reducer
