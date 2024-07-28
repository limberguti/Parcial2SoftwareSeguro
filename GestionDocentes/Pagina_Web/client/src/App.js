import { createBrowserRouter, RouterProvider} from "react-router-dom";

import "./style.scss";
import LoginMysql from "./pages/LoginMysql";
import HomeC from "./pages/HomeC";

import GestionPersonal from "./pages/GestionPersonal";

import SearchPersonal from "./pages/SearchPersonal";
import AddPersonal from "./pages/AddPersonal";
import UpdatePersonal from "./pages/UpdatePersonal";


import GestionReq from "./pages/GestionReq";
import AddReq from "./pages/AddReq";
import UpdateReq from "./pages/UpdateReq";
import SearchReq from "./pages/SearchReq";

import GestionTiempo from "./pages/GestionTiempo";
import AddTiempo from "./pages/AddTiempo";
import UpdateTiempo from "./pages/UpdateTiempo";
import SearchTiempo from "./pages/SearchTiempo";

import GestionCargo from "./pages/GestionCargo";
import AddCargo from "./pages/AddCargo";
import UpdateCargo from "./pages/UpdateCargo";
import SearchCargo from "./pages/SearchCargo";

import GestionContratos from "./pages/GestionContratos";
import AddContratos from "./pages/AddContratos";
import UpdateContrato from "./pages/UpdateContrato";
import SearchContrato from "./pages/SearchContrato";

const Layout = () => {
  return (
    <>
    
    <LoginMysql></LoginMysql>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    
  },
  {
    path: "/LoginMysql",
    element: <LoginMysql />,
  },
  {
    path: "/HomeC",
    element: <HomeC />,
  },
  //Rutas del Personal
  {
    path: "/GestionPersonal",
    element: <GestionPersonal />,
  },
  {
    path: "/SearchPersonal",
    element: <SearchPersonal />,
  },
  {
    path: "/Addpersonal",
    element: <AddPersonal />,
  },
  {
    path: "/UpdatePersonal",
    element: <UpdatePersonal />,
  },
  //Rutas del Requerimiento
  {
    path: "/GestionReq",
    element: <GestionReq />,
  },
  {
    path: "/AddReq",
    element: <AddReq />,
  },
  {
    path: "/UpdateReq",
    element: <UpdateReq />,
  },
  {
    path: "/SearchReq",
    element: <SearchReq />,
  },
  //Rutas del Tiempo
  {
    path: "/GestionTiempo",
    element: <GestionTiempo />,
  },
  {
    path: "/AddTiempo",
    element: <AddTiempo />,
  },
  {
    path: "/UpdateTiempo",
    element: <UpdateTiempo />,
  },
  {
    path: "/SearchTiempo",
    element: <SearchTiempo />,
  },
  //Rutas de Cargos
  {
    path: "/GestionCargo",
    element: <GestionCargo />,
  },
  {
    path: "/AddCargo",
    element: <AddCargo />,
  },
  {
    path: "/UpdateCargo",
    element: <UpdateCargo />,
  },
  {
    path: "/SearchCargo",
    element: <SearchCargo />,
  },
  //Rutas Contratos
  {
    path: "/GestionContratos",
    element: <GestionContratos />,
  },
  {
    path: "/AddContratos",
    element: <AddContratos />,
  },
  {
    path: "/UpdateContrato",
    element: <UpdateContrato />,
  },
  {
    path: "/SearchContrato",
    element: <SearchContrato />,
  },
]);

function App() {
  return (
    
    <div className="app">
      <div className="container-fluid">
        <RouterProvider router={router} />
      </div>
      
    </div>
    
  );
}

export default App;
