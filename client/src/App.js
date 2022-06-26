import './App.css';
/*import IconButton from './components/iconbutton/IconButton.js';
import Input from './components/input/Input.js';
import {isNumeric, isNotDot, isLetter, isValidEmail} from './utilities/utilities.js';
import verificarCedula from './utilities/validarCedula';

import { useState } from 'react';*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './layouts/login.js';
import Inicio from './layouts/inicio.js';
import Main from './layouts/main.js';


function App() {
  /*const [stateCedula, setStateCedula] = useState("");
  const [stateCedulaError, setStateCedulaError] = useState("");
  
  const [stateNombre, setStateNombre] = useState("");
  const [stateNombreError, setStateNombreError] = useState("");

  const [stateEmail, setStateEmail] = useState("");
  const [stateEmailError, setStateEmailError] = useState("");

  const validarCedula = () => {
    let validacion = verificarCedula(stateCedula);
    if(!validacion.status){
      setStateCedulaError(validacion.msg);
    }else{
      setStateCedulaError("");
    }
  };

  const onChangeNombre = (evt) => {
    evt.preventDefault();
    if(isLetter(evt.target.value))
      setStateNombre(evt.target.value);
  }

  const onBlurNombre = () => {
    if(stateNombre === ""){
      setStateNombreError("Este campo no puede quedar vacío");
    }else{
      setStateNombreError("");
    }
  }

  const onBlurCedula = () => {
    validarCedula();
  }

  const onChangeCedula = (evt) => {
    evt.preventDefault();
    if (isNumeric(evt.target.value) && isNotDot(evt.target.value))
      setStateCedula(evt.target.value);
  }

  const onChangeEmail = (evt) =>{
    evt.preventDefault();
    setStateEmail(evt.target.value);
  }
  const onBlurEmail = () => {
    if(!isValidEmail(stateEmail)){
      setStateEmailError("Debe colocar un correo valido");
    }else{
      setStateEmailError("");
    }
  }*/
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </Router>
  );
}

/*<div className="App">
      <header className="AppHeader">
        <h1>This is the h1 header</h1>
        <h2>This is the h2 header</h2>
        <h3>This is the h3 header</h3>
        <h4>This is the h4 header</h4>
        <h5>This is the h5 header</h5>
      </header>
      <p>lorem ipsum dolor sit amet, consectetur adip <i className="fa fa-car"></i></p>
      <IconButton 
        id="uno"
        onClick={(evt)=>{evt.preventDefault();console.log("it works");}}
        name="Enviar Carro"
        icon="fa fa-car"
        type="IconButton"
      />
      <IconButton 
        id="dos"
        onClick={(evt)=>{evt.preventDefault();console.log("it works");}}
        name="Enviar Carro"
        icon="fa fa-car"
        type="IconButtonAlter"
      />
      <Input 
        type="text"
        name="Nombre"
        id="Nombre"
        value={stateNombre}
        onChange={onChangeNombre}
        onBlur={onBlurNombre}
        error={stateNombreError}
      />
      <Input 
        type="text"
        name="Correo"
        id="Correo"
        value={stateEmail}
        onChange={onChangeEmail}
        onBlur={onBlurEmail}
        error={stateEmailError}
      />
      <Input 
        type="text"
        name="Cédula"
        id="Cedula"
        maxLength="10"
        value={stateCedula}
        onChange={onChangeCedula}
        onBlur={onBlurCedula}
        error={stateCedulaError}
      />
  </div>*/
export default App;
