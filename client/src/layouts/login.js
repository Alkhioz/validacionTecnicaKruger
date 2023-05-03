import './login.css';
import IconButton from '../components/iconbutton/IconButton';
import Input from '../components/input/Input';
import { useState, useEffect } from 'react';
import {login} from '../libs/auth';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user';
import Loading from './loading';
import { useSWRConfig } from 'swr';

function Login(){
    const { user, loggedOut, loading } = useUser();

    const { mutate } = useSWRConfig();
    const navigate = useNavigate();
    useEffect(() => {
        if (user && !loggedOut) {
            navigate("/");
        }
    }, [user, loggedOut, loading]);
    
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
    
    const handleLogin = async(evt) => {
        evt.preventDefault();
        let authdata = await login(stateUsuario, stateClave);
        if(authdata.msg === "ok"){
            localStorage.setItem("token", authdata.data.token);
            mutate("/getCurrentUserData");
        }else{
            setStateError(authdata.data.description);
        }
    }
    
    return(
        loading?<Loading/>:
        <div className="loginLayout">
            <div className="loginCard">
                <h1 className="loginTitle">Login IVK</h1>
                <h2 className="loginSubtitulo">Employee Vaccination Inventory</h2>
                <form onSubmit={handleLogin}>
                    <Input 
                        type="text"
                        name="User"
                        id="usuario"
                        value={stateUsuario}invalid user or password
                        onChange={onChangeUsuario}
                    />
                    <Input 
                        type="password"
                        name="Password"
                        id="contraseña"
                        value={stateClave}
                        onChange={onChangeClave}
                    />
                    <IconButton 
                        id="login"
                        name="Login"
                        icon="fa fa-sign-in"
                        type="IconButton"
                    />
                    {stateError!==""&&<p className="LoginError">{stateError}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;