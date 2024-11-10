import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  checkActionCode,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

const auth = getAuth();
const coleccion = "Clientes";

export const registrarCliente = async (formRegistrar, userId) => {
  try {
    await setDoc(doc(db, coleccion, userId), {
      Nombres: formRegistrar.nombres,
      Apellidos: formRegistrar.apellidos,
      Correo: formRegistrar.correo,
      Metodo: "correo",
      Confirmacion: false,
      Rol: "clientes",
    });
  } catch (e) {
    console.error("Error al ingresar cliente:", e);
  }
};

export const registrarClienteAuth = (formRegistrar) => {
  return createUserWithEmailAndPassword(
    auth,
    formRegistrar.correo,
    formRegistrar.contrasena
  )
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      return sendEmailVerification(userCredential.user).then(() => {
        registrarCliente(formRegistrar, userId);
        return "Correcto";
      });
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        return "Repetido";
      } else if (error.code === "auth/weak-password") {
        return "Contrasena";
      } else {
        return "Error desconocido";
      }
    });
};

export const verificarCuentaCorreo = (actionCode) => {
  return checkActionCode(auth, actionCode)
    .then((info) => info.data.email)
    .catch((error) => {
      if (error.code === "auth/invalid-action-code") {
        return "expirado";
      } else {
        return "Error";
      }
    });
};

export const ingresarClienteAuth = (formIngresar) => {
  return signInWithEmailAndPassword(
    auth,
    formIngresar.correo,
    formIngresar.contrasena
  )
    .then((userCredential) => {
      const correoVerificado = userCredential.user.emailVerified;
      const usuario = {
        idUsuario: userCredential.user.uid,
        token: userCredential.user.refreshToken,
      };
      if (correoVerificado) {
        return usuario;
      } else {
        return "noVerificado";
      }
    })
    .catch((error) => {
      if (error.code === "auth/wrong-password") {
        return "contrasenaIncorrecta";
      } else {
        return "Error";
      }
    });
};

export const clienteEditarToken = async (idUsuario, token) => {
  const clienteRef = doc(db, coleccion, idUsuario);
  await updateDoc(clienteRef, { idToken: token });
};

export const traerUnCliente = async (usuarioVerificado) => {
  const idUsuario = usuarioVerificado.idUsuario;
  const token = usuarioVerificado.token;
  const idTokenLs = localStorage.getItem("IdToken");

  const clienteRef = doc(db, coleccion, idUsuario);
  const docCliente = await getDoc(clienteRef);
  if (docCliente.exists()) {
    if (idTokenLs && idTokenLs === docCliente.data().idToken) {
      return {
        IdCliente: idUsuario,
        ...docCliente.data(),
      };
    } else {
      clienteEditarToken(idUsuario, token);
      return {
        Metodo: docCliente.data().Metodo,
        IdCliente: idUsuario,
        IdToken: token,
        Correo: docCliente.data().Correo,
        Nombres: docCliente.data().Nombres,
        Apellidos: docCliente.data().Apellidos,
        Genero: docCliente.data().Genero,
        FechaNacimiento: docCliente.data().FechaNacimiento,
        Celular: docCliente.data().Celular,
        FotoUrl: docCliente.data().FotoUrl,
        Confirmacion: docCliente.data().Confirmacion,
        Rol: docCliente.data().Rol,
      };
    }
  } else {
    console.log("No existe documento");
    return null;
  }
};
