import './login.css';
import IconButton from '../components/iconbutton/IconButton.js';
import Input from '../components/input/Input.js';
import { useState, useEffect } from 'react';
import {login} from '../libs/auth.js';
import { useNavigate  } from "react-router-dom";
import useUser from '../hooks/use-user.js';

function Login(){
    const { user, mutate, loggedOut } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (user && !loggedOut) {
            navigate("/main");
        }
    }, [user, loggedOut]);
    
    const [stateUsuario, setStateUsuario] = useState("");
    const [stateClave, setStateClave] = useState("");
    const [stateError, setStateError] = useState("");

    
    const onChangeUsuario = (evt) => {
        evt.preventDefault();
        setStateUsuario(evt.target.value);
    }
    
    const onChangeClave = (evt) => {
        evt.preventDefault();
        setStateClave(evt.target.value);
    }
    
    const handleLogin = async() => {
        let authdata = await login(stateUsuario, stateClave);
        if(authdata.msg === "ok"){
            localStorage.setItem("token", authdata.data.token);
            mutate("/getCurrentUserData");
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