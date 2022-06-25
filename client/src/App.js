import './App.css';
import IconButton from './components/iconbutton/IconButton.js';
import Input from './components/input/Input.js';
import {isNumeric, isNotDot} from './utilities/utilities.js'

import { useState } from 'react';

function App() {
  const [stateCedula, setStateCedula] = useState("");

  const onChangeCedula = (evt) => {
    evt.preventDefault();
    if (isNumeric(evt.target.value) && isNotDot(evt.target.value))
      setStateCedula(evt.target.value);
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
        value={stateCedula}
        onChange={onChangeCedula}
      />
    </div>
  );
}

export default App;
