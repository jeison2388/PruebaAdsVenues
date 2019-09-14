const filtrarUsuarios = (item, value) =>
  {
    return (item.nombreUsuario.toLowerCase().search(value.toLowerCase()) !== -1)
  }

  const filtrarAQuienSigo = (item, value) =>{
    return (item.a_quien_sigue.nombreUsuario.toLowerCase().search(value.toLowerCase()) !== -1)
  }

  export {filtrarUsuarios, filtrarAQuienSigo}
