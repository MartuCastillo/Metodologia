import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const RutaPublica = ({ layout: Layout, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            element={
                <Layout>
                    <Component />
                </Layout>
            }
        />
    );
}

RutaPublica.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string,
}

export default RutaPublica;
