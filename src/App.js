import React from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import { EstadoProveedor } from './context/EstadoGeneral';
import Routes from './Routes';

function App() {
  return (
    <EstadoProveedor>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </EstadoProveedor>
  );
}

export default App;
