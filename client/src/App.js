import './App.css';
import IconButton from './components/iconbutton/IconButton.js';
import Input from './components/input/Input.js';
import {isNumeric, isNotDot, isLetter} from './utilities/utilities.js'

import { useState } from 'react';

function App() {
  const [stateCedula, setStateCedula] = useState("");
  const [stateCedulaError, setStateCedulaError] = useState("");
  
  const [stateNombre, setStateNombre] = useState("");

  const validarCedula = () => {
    if(stateCedula.length < 10){
      setStateCedulaError("Debe colocar los 10 digitos de la cédula");
    }else{
      setStateCedulaError("");
    }
  };

  const onChangeCedula = (evt) => {
    evt.preventDefault();
    if (isNumeric(evt.target.value) && isNotDot(evt.target.value))
      setStateCedula(evt.target.value);
  }

  const onChangeNombre = (evt) => {
    evt.preventDefault();
    if(isLetter(evt.target.value))
      setStateNombre(evt.target.value);
  }

  const onBlurCedula = (evt) => {
    validarCedula();
  }
  return (
    <div className="App">
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
      />
      <Input 
        type="email"
        name="Correo"
        id="Correo"
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
    </div>
  );
}

export default App;
