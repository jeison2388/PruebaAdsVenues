import {GUARDAR_ID_USUARIO} from '../constantesAcciones'

const guardarIdUsuario = (data) =>{
  return {
    type: GUARDAR_ID_USUARIO,
    data: data
  }
}

export {guardarIdUsuario}
