import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import {
    verificarCuentaCorreo,
    verificarCuentaContrasena,
} from "../../../controllers/Sesion";

const Verificar = () => {
    const [ confirmarCorreo, setConfirmarCorreo ] = useState("esperando");
    const [ correoCliente, setCorreoCliente] = useState("");
    const [ formContrasena, setFormContrasena] = useState("");
    const [ confirmarContrasena, setConfirmarContrasena ] = useState("esperando");

    const CambiarDatos = (e) => {
        const value = e.target.value;
        setFormContrasena(value);
    };

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    let codigoVerificacion = query.get("oobCode");
    let modoVerificacion = query.get("mode");

    useEffect(() => {
        if(codigoVerificacion !== null && modoVerificacion === "verifyEmail") {
            verificarCuentaCorreo(codigoVerificacion).then((res) => {
                if (res === "error"){
                    setConfirmarCorreo("Error");
                }else if (res === "expirado") {
                    setConfirmarCorreo("expirado");
                } else {
                    setConfirmarCorreo("Correcto");
                    setCorreoCliente(res);
                }
            });
        }
    }, [codigoVerificacion, modoVerificacion]);
    
    const actualizarContrasena = (e) => {
        e.preventDefault();
        verificarCuentaContrasena(codigoVerificacion, formContrasena).then(  (res) => {
            if (res === "cambiado") {
                setConfirmarContrasena("Cambiado");
            } else if (res === "no") {
                setConfirmarContrasena("no");
            } else {
                setConfirmarContrasena("Error");
            }
        });
    };
}