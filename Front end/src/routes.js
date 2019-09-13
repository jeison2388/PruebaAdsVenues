import React from 'react';


const ListaUsuarios = React.lazy(() => import('./componentes/usuarios/ListaUsuarios'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/usuarios/listaUsuarios', name: 'Lista Usuarios', component: ListaUsuarios}
];

export default routes;
