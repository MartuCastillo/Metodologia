import React, { useState, useContext } from "react";
import "./Menu.css";
import { Link, useNavigate } from "react-router-dom";
import CalcularPantalla from "../../util/CalcularPantalla";
import { EstadoContexto } from "../../context/EstadoGeneral"; // Esta importación está bien
import { apiCategoria } from "./apiCategoria"; // Cambia esta línea

export default function Menu() {
    const navigate = useNavigate();
    const { productos, usuario, cambiarEstadoSidebar } = useContext(EstadoContexto);
    const existeUsuario = Object.keys(usuario).length;

    const [formBusqueda, setFormBusqueda] = useState("");
    const { ancho } = CalcularPantalla();
    const [dataCategoria] = useState(apiCategoria);

    const cambiarDatosBusqueda = (e) => {
        setFormBusqueda(e.target.value);
    };

    const [botonCategoria, setBotonCategoria] = useState(false);
    const [botonHamburguesa, setBotonHamburguesa] = useState(false);
    const [botonPerfil, setBotonPerfil] = useState(true);
    const [botonSubCategoria, setBotonSubCategoria] = useState(false);

    const cambiarBotonHamburguesa = () => {
        setBotonCategoria(false);
        setBotonSubCategoria(false);
        setBotonHamburguesa(!botonHamburguesa);
        cambiarEstadoSidebar(true);
    };

    const cambiarEstadoBotonPerfil = () => {
        setBotonPerfil(!botonPerfil);
        cambiarEstadoSidebar(true);
    };

    const estadoBotonCerrar = () => {
        setBotonHamburguesa(false);
        setBotonCategoria(false);
        setBotonSubCategoria(false);
    };

    const [tipoCategoria, setTipoCategoria] = useState({
        menuCategoria: "maletines",
    });

    const activarCategoria = (e) => {
        setTipoCategoria({
            ...tipoCategoria,
            menuCategoria: e.target.dataset.categoria,
        });
    };

    const buscarProducto = (e) => {
        navigate(`/busqueda?producto=${formBusqueda}`);
        setFormBusqueda("");
    };

    return (
        <nav className="grid-menu-principal">
            <div className="grid-menu-logo">
                <div className="contenedor-menu-boton">
                    {ancho <= 800 ? (
                        <>
                            <img
                                src="../public/Menu/menu-hamb.png"
                                alt="logo"
                                onClick={cambiarBotonHamburguesa}
                            />
                            <span>Menú</span>
                        </>
                    ) : null}
                </div>

                <div className="contenedor-menu-logo">
                    <Link to="/">
                        <img src={ancho <= 500 ? "/iconoLogan.png" : "/logoLogan.png"} alt="logo" />
                    </Link>
                </div>
            </div>

            <div className="grid-menu-buscador">
                <div className="formulario-buscar">
                    <input
                        onChange={cambiarDatosBusqueda}
                        placeholder="Buscar productos"
                        size="15"
                        type="text"
                        value={formBusqueda}
                    />
                    <button
                        disabled={!formBusqueda}
                        className="btn"
                        onClick={buscarProducto}
                    >
                        <img
                            src={
                                !formBusqueda
                                    ? "/icons/menu/buscar.png"
                                    : "/icons/menu/buscar.png"
                            }
                            alt="logo"
                        />
                    </button>
                </div>
            </div>

            <div
                className={
                    botonHamburguesa && ancho <= 1000
                        ? "grid-menu-links grid-menu-links-activo"
                        : "grid-menu-links"
                }
            >
                <div
                    className="contenedor-menu-hamburguesa"
                    onClick={() => setBotonHamburguesa(!botonCategoria)}
                >
                    <img src="/icons/Menu/menu-hamb.png" alt="logo" />
                    <span>Categorías</span>
                </div>

                <div className="contenedor-menu-links">
                    {ancho <= 800 && (
                        <>
                            <p onClick={() => setBotonCategoria(!botonCategoria)}>Categorías</p>
                            {existeUsuario ? (
                                usuario.Rol === "administrador" ? (
                                    <Link to="/administrador/reportes">Perfil</Link>
                                ) : (
                                    <p onClick={cambiarEstadoBotonPerfil}>Perfil</p>
                                )
                            ) : null}
                            <hr />
                            {!existeUsuario && (
                                <>
                                    <Link to="/registrar">Registrar</Link>
                                    <Link to="/ingresar">Ingresar</Link>
                                    <hr />
                                </>
                            )}
                            <Link to="/nosotros">Nosotros</Link>
                            <Link to="/contacto">Contacto</Link>
                        </>
                    )}
                </div>
            </div>

            <div className="grid-menu-iconos">
                {existeUsuario ? (
                    usuario.Rol === "administrador" ? (
                        <Link to="/administrador/reportes" className="icono-perfiles">
                            <img src="/icons/Menu/usuario.png" alt="logo" />
                        </Link>
                    ) : (
                        <Link to="/cliente/perfil" className="icono-perfiles">
                            <img src="/icons/Menu/usuario.png" alt="logo" />
                        </Link>
                    )
                ) : (
                    <Link to="/registrar" className="icono-perfiles">
                        <img src="/icons/Menu/acceder.png" alt="logo" />
                    </Link>
                )}
                <Link to="/checkout">
                    <img src="/icons/Menu/carrito.svg" alt="logo" />
                    <span>
                        <p>{productos.length}</p>
                    </span>
                </Link>
            </div>

            {botonCategoria && (
                <div className="contenedor-categorias-secundario">
                    <div
                        className={
                            botonCategoria && ancho <= 1600
                                ? "grid-categorias-menu grid-categorias-menu-activo"
                                : "grid-categorias-menu"
                        }
                    >
                        <div className="controles-menu">
                            <button onClick={() => setBotonCategoria(!botonCategoria)}>
                                Regresar
                            </button>
                        </div>
                        {dataCategoria.map((categoria) => (
                            <p
                                key={categoria.id}
                                data-categoria={categoria.urlCategoria}
                                onClick={() => setBotonSubCategoria(!botonSubCategoria)}
                                style={
                                    categoria.urlCategoria === tipoCategoria.menuCategoria
                                        ? { fontWeight: "bold", color: "red" }
                                        : { fontWeight: "normal" }
                                }
                            >
                                {categoria.nombreCategoria}
                            </p>
                        ))}
                    </div>

                    <div
                        className={
                            botonSubCategoria && ancho <= 1000
                                ? "contenedor-subcategorias contenedor-subcategorias-activo"
                                : "contenedor-subcategorias"
                        }
                    >
                        <div className="controles-menu">
                            <button onClick={() => setBotonSubCategoria(!botonSubCategoria)}>
                                Regresar
                            </button>
                            <button onClick={estadoBotonCerrar}>Cerrar</button>
                        </div>
                        {dataCategoria.map((categoria, index) => (
                            <div
                                key={categoria.id}
                                data-categoria={categoria.urlCategoria}
                                className={
                                    categoria.urlCategoria === tipoCategoria.menuCategoria
                                        ? "grid-subcategorias-menu grid-subcategorias-menu-activo"
                                        : "grid-subcategorias-menu"
                                }
                            >
                                <div className="contenedor-subcategorias-menu">
                                    <h3 className="subtitulo">{categoria.nombreCategoria}</h3>
                                    {dataCategoria[index].subCategorias.map((subcategoria) => (
                                        <Link
                                            key={subcategoria.idSubCategoria}
                                            to={`/producto/${subcategoria.urlSubCategoria}`}
                                        >
                                            {subcategoria.nombreSubCategoria}
                                        </Link>
                                    ))}
                                </div>

                                <div className="contenedor-subcategorias-imagen">
                                    <Link to={`/producto/${categoria.urlCategoria}`}>
                                        <img src={categoria.urlBanner} alt="banner" />
                                    </Link>
                                </div>

                                <div className="contenedor-subcategorias-galeria">
                                    {dataCategoria[index].galeriaImagenes.map((galeria) => (
                                        <Link
                                            key={galeria.idGaleria}
                                            to={`/producto/${galeria.urlGaleria}`}
                                        >
                                            <img src={galeria.imagenGaleria} alt="galeria" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
