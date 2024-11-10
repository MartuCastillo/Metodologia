import React from "react";
import Menu from "../../components/Menu/Menu";
//import { SidebarCliente } from "../../components/Sidebars"; // Asegúrate de que el nombre del archivo sea `Sidebars`
//import { EstadoContexto } from "../../context/EstadoGeneral";
//import CalcularPantalla from "../../util/CalcularPantalla";

const LayoutGeneral = (props) => {
    //const { ancho } = CalcularPantalla();
    //const { usuario } = useContext(EstadoContexto);
    //const existeUsuario = Object.keys(usuario).length > 0;
    const { children } = props;

    return (
        <>
            <Menu />
            {/* {existeUsuario && ancho >= 800 && usuario.Rol !== "administrador" && (
              <SidebarCliente />
            )} */}
            <section>
                <div>{children}</div>
            </section>
        </>
    );
}

export default LayoutGeneral;
