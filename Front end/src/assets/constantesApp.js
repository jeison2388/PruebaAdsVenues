const URL = 'http://localhost:1337';

export const GET_USUARIOS = URL + '/usuario/listaUsuarios'
export const GET_A_QUIEN_SIGO = URL + '/usuario/aQuienSigo'
export const GET_QUIEN_ME_SIGUE = URL + '/usuario/quienMeSigue'
export const DELETE_AMISTAD = URL + '/usuario/eliminarAmistad'

export default {GET_USUARIOS, GET_A_QUIEN_SIGO, GET_QUIEN_ME_SIGUE,
                DELETE_AMISTAD}
