import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import {
  ingresarClienteAuth,
  traerUnCliente,
  ingresarConFacebook,
} from "../../../controllers/Sesion";

/* ESTADO INICIAL FORMULARIO INGRESAR */
const initFormIngresar = {
  correo: "",
  contrasena: "",
};

const Ingresar = () => {
  const { iniciarSesion } = useContext(EstadoContexto);
  const [formIngresar, setFormIngresar] = useState(initFormIngresar);
  const [usuarioVerificado, setUsuarioVerificado] = useState();
  const history = useHistory();

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormIngresar({
      ...formIngresar,
      [name]: value,
    });
  };

  useEffect(() => {
    if (usuarioVerificado) {
      (async () => {
        const usuarioDB = await traerUnCliente(usuarioVerificado);
        iniciarSesion(usuarioDB);
        history.push("/cliente/perfil");
      })();
    }
  }, [usuarioVerificado, iniciarSesion, history]);

  const ingresar = (e) => {
    e.preventDefault();
    ingresarClienteAuth(formIngresar).then((res) => {
      if (res.idUsuario) {
        setUsuarioVerificado(res);
      } else if (res === "noVerificado") {
        console.log("Primero verifica tu correo");
      } else if (res === "contraseñaIncorrecta") {
        console.log("Contraseña incorrecta");
      } else {
        console.log("Hay un error");
      }
    });
  };

  const ingresarFacebook = (e) => {
    e.preventDefault();
    ingresarConFacebook(formIngresar).then((res) => {
      if (res.idUsuario) {
        setUsuarioVerificado(res);
      } else if (res === "noAccess") {
        console.log("No tienes acceso con Facebook");
      } else if (res === "existe") {
        console.log("Ingresa con tu correo y contraseña");
      } else {
        console.log("Hay un error");
      }
    });
  };

  return (
    <>
      <div className="grid-registro">
        <div className="grid-registro-imagen">
          <img src="/images/sesion/imageningresar.jpg" alt="imagen" />
          <div className="contenedor-registro-imagen">
            <h2>Las mochilas las tiene Logan</h2>
            <h3>Angie, Hugo y Paloma</h3>
            <p>Esto es guerra</p>
          </div>
        </div>
        <div className="grid-registro-formulario">
          <h2>Ingresar</h2>
          <p>A mi cuenta con Google o Facebook</p>
          <button className="grid-registro-facebook" onClick={ingresarFacebook}>
            Facebook
          </button>
          <button className="grid-registro-google">Google</button>
          <form onSubmit={ingresar}>
            <input
              type="text"
              required
              name="correo"
              placeholder="Correo"
              value={formIngresar.correo}
              onChange={cambiarDatos}
            />
            <input
              type="password"
              required
              name="contrasena"
              placeholder="Contraseña"
              value={formIngresar.contrasena}
              onChange={cambiarDatos}
            />
            <button type="submit">Ingresar</button>
          </form>
          <p>
            ¿No tienes cuenta? <Link to="/registrar">Regístrate</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Ingresar;
