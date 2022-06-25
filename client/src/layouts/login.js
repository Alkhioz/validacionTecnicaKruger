import './login.css';
import IconButton from '../components/iconbutton/IconButton.js';
import Input from '../components/input/Input.js';
import { useState } from 'react';

function Login(){
    const [stateUsuario, setStateUsuario] = useState("");
    const onChangeUsuario = (evt) => {
        evt.preventDefault();
        setStateUsuario(evt.target.value);
    }
    const [stateClave, setStateClave] = useState("");
    const onChangeClave = (evt) => {
        evt.preventDefault();
        setStateClave(evt.target.value);
    }
    return(
        <div className="loginLayout">
            <div className="loginCard">
                <h1 className="loginTitle">Login IVK</h1>
                <Input 
                    type="text"
                    name="Usuario"
                    id="usuario"
                    value={stateUsuario}
                    onChange={onChangeUsuario}
                />
                <Input 
                    type="password"
                    name="Contraseña"
                    id="contraseña"
                    value={stateClave}
                    onChange={onChangeClave}
                />
                <IconButton 
                    id="login"
                    onClick={(evt)=>{evt.preventDefault();console.log("it works");}}
                    name="Iniciar sesión"
                    icon="fa fa-sign-in"
                    type="IconButton"
                />
            </div>
        </div>
    );
}

export default Login;