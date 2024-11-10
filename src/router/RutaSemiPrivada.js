import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { EstadoContexto } from "../context/EstadoGeneral";

const RutaSemiPrivada = ({ component: Component, layout: Layout, ...rest }) => {
    const { usuario } = useContext(EstadoContexto);
    const existeUsuario = Object.keys(usuario).length > 0 && usuario.Rol === "Cliente";

    return existeUsuario ? (
        <Route {...rest} element={<Layout><Component /></Layout>} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default RutaSemiPrivada;
