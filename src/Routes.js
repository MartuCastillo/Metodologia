import React from "react";
import { Routes, Route } from "react-router-dom";
import { RutaPublica, RutaSemiPrivada } from "./router";
import { LayoutGeneral } from "./layout/conLayout";
import  SinLayaout  from "./layout/sinLayout/sinLayout";

import {
  Pagina404,
  GeneralInicio,
  GeneralRegistrar,
  GeneralIngresar,
  GeneralGraciasPorRegistrate,
  GeneralRecuperarContrasena,
  GeneralVerificar,
} from "./pages";

const RoutesConfig = () => {
  return (
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route
        path="/"
        element={
          <RutaPublica component={GeneralInicio} layout={LayoutGeneral} />
        }
      />
      <Route
        path="/registrar"
        element={
          <RutaSemiPrivada
            component={GeneralRegistrar}
            layout={LayoutGeneral}
          />
        }
      />
      <Route
        path="/ingresar"
        element={
          <RutaSemiPrivada component={GeneralIngresar} layout={LayoutGeneral} />
        }
      />
      <Route
        path="/gracias-por-registrate"
        element={
          <RutaSemiPrivada
            component={GeneralGraciasPorRegistrate}
            layout={LayoutGeneral}
          />
        }
      />
      <Route
        path="/recuperar-contrasena"
        element={
          <RutaSemiPrivada
            component={GeneralRecuperarContrasena}
            layout={LayoutGeneral}
          />
        }
      />
      <Route
        path="/verificar"
        element={
          <RutaSemiPrivada
            component={GeneralVerificar}
            layout={LayoutGeneral}
          />
        }
      />
      {/* RUTA NO ENCONTRADA */}
      <Route
        path="/pagina-no-encontrada"
        element={<RutaPublica component={Pagina404} layout={SinLayaout} />}
      />
    </Routes>
  );
};

export default RoutesConfig;
