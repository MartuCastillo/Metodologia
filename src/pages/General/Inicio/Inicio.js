import React, { useState, useEffect } from "react";
import {todosProductos } from "..//../../controllers/Inicio";
import ProductoSolo from "../../../components/ProductoSolo/ProductoSolo";
import Slider from "../../../components/Slider/Slider";
import "./Inicio.css";

const Inicio = () => {
    const [ productos, setProductos ] = useState([]);

    useEffect(() => {
        (async () => {
            const productos = await todosProductos();
            setProductos(productos);
        })();
    }, []);

    return (
        <>
            <Slider />
            <div className="contenedor-subtitulo">
                <h2>Todos los Productos</h2>
            </div>
            <div className="contenedor-equipo-lista">
                <div className="contenedor-card-centrar">
                    {productos?.length === 0 ? (
                        <></>
                    ) : (
                        productos.map(
                            (producto) =>
                                producto.Categoria === "Maletines" && (
                                    <ProductoSolo key={producto._idProducto} producto={producto} />
                                )
                    )    
                    )}
                </div>
            </div> 
        </>
    )                   
}
export default Inicio;