import './login.css';
import IconButton from '../components/iconbutton/IconButton.js';
import Input from '../components/input/Input.js';
import { useState } from 'react';
import {login} from '../libs/auth.js';

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
    const [stateError, setStateError] = useState("");
    const handleLogin = async() => {
        let authdata = await login(stateUsuario, stateClave);
        if(authdata.msg === "ok"){
            localStorage.setItem("token", authdata.data.token);
            setStateError("");
        }else{
            setStateError(authdata.data.description);
        }
    }
    return(
        <div className="loginLayout">
            <div className="loginCard">
                <h1 className="loginTitle">Login IVK</h1>
                <Input 
                    type="text"
                    name="Usuario"
                    id="usuario"
                    value={stateUsuario}invalid user or password
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
                    onClick={handleLogin}
                    name="Iniciar sesión"
                    icon="fa fa-sign-in"
                    type="IconButton"
                />
                {stateError!==""&&<p className="LoginError">{stateError}</p>}
            </div>
        </div>
    );
}

export default Login;