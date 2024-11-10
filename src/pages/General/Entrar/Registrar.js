import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarClienteAuth } from "../../../controllers/Sesion";
import "./Registrar.css";

const initFormRegistrar = {
  nombres: "",
  apellidos: "",
  correo: "",
  contrasena: "",
};

const Registrar = () => {
  const [formRegistrar, setFormRegistrar] = useState(initFormRegistrar);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setFormRegistrar({
      ...formRegistrar,
      [name]: value,
    });
  };

  const registrar = (e) => {
    e.preventDefault();
    setLoading(true);
    registrarClienteAuth(formRegistrar).then((res) => {
      setLoading(false);
      if (res === "Correcto") {
        console.log(
          "Registrado Correctamente, verifique su correo para validar."
        );
        navigate("/gracias-por-registrarte");
      } else if (res === "Repetido") {
        console.log("El correo ya se encuentra registrado");
        navigate("/ingresar");
      } else {
        console.log("Error al registrar");
        setFormRegistrar(initFormRegistrar);
      }
    });
  };

  return (
    <div className="grid-registro">
      <div className="grid-registro-imagen">
        <img src="ruta-a-tu-imagen" alt="Imagen de registro" />

        <div className="contenedor-registro-imagen">
          <h2>Registrar</h2>
          <p>Mi cuenta Google o Facebook</p>
          <button className="grid-registro-facebook">Facebook</button>
          <button className="grid-registro-google">Google</button>

          <form onSubmit={registrar}>
            <input
              type="text"
              required
              name="nombres"
              placeholder="Nombres"
              value={formRegistrar.nombres}
              onChange={cambiarDatos}
            />
            <input
              type="text"
              required
              name="apellidos"
              placeholder="Apellidos"
              value={formRegistrar.apellidos}
              onChange={cambiarDatos}
            />
            <input
              type="email"
              required
              name="correo"
              placeholder="Correo"
              value={formRegistrar.correo}
              onChange={cambiarDatos}
            />
            <input
              type="password"
              required
              name="contrasena"
              placeholder="Contraseña"
              value={formRegistrar.contrasena}
              onChange={cambiarDatos}
            />
            <p>
              Al registrarse, usted autoriza recibir comunicaciones
              promocionales.
            </p>
            <p>
              Al registrarse, usted acepta los términos y condiciones{" "}
              <Link to="/terminos-y-condiciones">Términos y Condiciones</Link> y
              las{" "}
              <Link to="/politicas-de-privacidad">Políticas de Privacidad</Link>
            </p>

            <input
              type="submit"
              value={loading ? "Cargando..." : "Registrar"}
              disabled={loading}
            />
          </form>
          <p>
            ¿Ya tienes cuenta? <Link to="/ingresar">Ingresar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registrar;
