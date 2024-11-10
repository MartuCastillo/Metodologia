import React, { useReducer, createContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../db/firebase";
import { onSnapshot, doc } from "firebase/firestore";

const estadoInicial = {
  usuario: {},
  productos: [],
  sidebar: false,
};

if (localStorage.getItem("IdToken")) {
  const usuarioData = {
    Metodo: localStorage.getItem("Metodo"),
    IdCliente: localStorage.getItem("IdCliente"),
    IdToken: localStorage.getItem("IdToken"),
    Correo: localStorage.getItem("Correo"),
    Nombres: localStorage.getItem("Nombres"),
    Apellidos: localStorage.getItem("Apellidos"),
    Genero: localStorage.getItem("Genero"),
    FechaNacimiento: localStorage.getItem("FechaNacimiento"),
    Celular: localStorage.getItem("Celular"),
    FotoUrl: localStorage.getItem("FotoUrl"),
    Rol: localStorage.getItem("Rol"),
  };
  estadoInicial.usuario = usuarioData;
} else {
  estadoInicial.usuario = {};
}

const EstadoContexto = createContext({
  usuario: {},
  cerrarSesion: () => {},
  iniciarSesion: (usuarioData) => {},
  productos: [],
  sidebar: false,
  cambiarEstadoSidebar: (estado) => {},
});

function estadoReductor(state, action) {
  switch (action.type) {
    case "NUEVA_SESION":
      return {
        ...state,
        usuario: { ...action.payload },
      };
    case "CERRAR_SESION":
      return { ...state, usuario: {} };
    case "CAMBIAR_ESTADO_SIDEBAR":
      return { ...state, sidebar: action.sidebar };
    default:
      return state;
  }
}

function EstadoProveedor(props) {
  const [state, dispatch] = useReducer(estadoReductor, estadoInicial);

  useEffect(() => {
    if (localStorage.getItem("IdToken")) {
      const rolUsuario = localStorage.getItem("Rol");
      const clienteRef = doc(
        db,
        "Clientes",
        rolUsuario === "administrador" ? "Personales" : "Clientes",
        localStorage.getItem("IdCliente")
      );
      
      const unsubscribe = onSnapshot(clienteRef, (docSnapshot) => {
        if (docSnapshot.exists && localStorage.getItem("IdToken") === docSnapshot.data().IdToken) {
          const userData = {
            Nombres: docSnapshot.data().Nombres,
            Apellidos: docSnapshot.data().Apellidos,
            Genero: docSnapshot.data().Genero,
            FechaNacimiento: docSnapshot.data().FechaNacimiento,
            Celular: docSnapshot.data().Celular,
            FotoUrl: docSnapshot.data().FotoUrl,
          };
          dispatch({
            type: "NUEVA_SESION",
            payload: userData,
          });
          localStorage.setItem("Nombres", docSnapshot.data().Nombres);
          localStorage.setItem("Apellidos", docSnapshot.data().Apellidos);
          localStorage.setItem("Genero", docSnapshot.data().Genero);
          localStorage.setItem("FechaNacimiento", docSnapshot.data().FechaNacimiento);
          localStorage.setItem("Celular", docSnapshot.data().Celular);
          localStorage.setItem("FotoUrl", docSnapshot.data().FotoUrl);
        } else {
          console.log("No se encontró el usuario");
          cerrarSesion();
        }
      });

      return () => unsubscribe();
    }
  }, []);

  function iniciarSesion(usuarioData) {
    localStorage.setItem("Metodo", usuarioData.Metodo);
    localStorage.setItem("IdCliente", usuarioData.IdCliente);
    localStorage.setItem("IdToken", usuarioData.IdToken);
    localStorage.setItem("Correo", usuarioData.Correo);
    localStorage.setItem("Nombres", usuarioData.Nombres);
    localStorage.setItem("Apellidos", usuarioData.Apellidos);
    localStorage.setItem("Genero", usuarioData.Genero);
    localStorage.setItem("FechaNacimiento", usuarioData.FechaNacimiento);
    localStorage.setItem("Celular", usuarioData.Celular);
    localStorage.setItem("FotoUrl", usuarioData.FotoUrl);
    localStorage.setItem("Rol", usuarioData.Rol);

    dispatch({
      type: "NUEVA_SESION",
      payload: usuarioData,
    });
  }

  function cerrarSesion() {
    localStorage.removeItem("Metodo");
    localStorage.removeItem("IdCliente");
    localStorage.removeItem("IdToken");
    localStorage.removeItem("Correo");
    localStorage.removeItem("Nombres");
    localStorage.removeItem("Apellidos");
    localStorage.removeItem("Genero");
    localStorage.removeItem("FechaNacimiento");
    localStorage.removeItem("Celular");
    localStorage.removeItem("FotoUrl");
    localStorage.removeItem("Rol");

    signOut(auth)
      .then(() => {
        dispatch({
          type: "CERRAR_SESION",
        });
      })
      .catch((error) => {
        console.log("Error al cerrar sesión", error);
      });
  }

  function cambiarEstadoSidebar(estado) {
    dispatch({ type: "CAMBIAR_ESTADO_SIDEBAR", sidebar: estado });
  }

  return (
    <EstadoContexto.Provider
      value={{
        usuario: state.usuario,
        cerrarSesion,
        iniciarSesion,
        productos: state.productos,
        sidebar: state.sidebar,
        cambiarEstadoSidebar,
      }}
      {...props}
    />
  );
}

export { EstadoContexto, EstadoProveedor };
