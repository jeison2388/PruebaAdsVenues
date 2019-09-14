import React from 'react';


const ListaUsuarios = React.lazy(() => import('./componentes/usuarios/ListaUsuarios'))
const AccionesParaElUsuario = React.lazy(() => import('./componentes/usuarios/AccionesParaElUsuario'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/usuarios/listaUsuarios', name: 'Lista Usuarios', component: ListaUsuarios},
  { path: '/usuarios/accionesParaElUsuario', name: 'Acciones para el Usuario', component: AccionesParaElUsuario}
];

export default routes;
