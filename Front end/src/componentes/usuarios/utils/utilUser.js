const filtrarUsuarios = (item, value) =>
  {
    return (item.nombreUsuario.toLowerCase().search(value.toLowerCase()) !== -1)
  }

  export {filtrarUsuarios}
