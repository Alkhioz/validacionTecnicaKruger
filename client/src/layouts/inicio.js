import './inicio.css';
import IconButton from '../components/iconbutton/IconButton.js';
import { Navigate } from "react-router-dom";
import {logout} from '../libs/auth.js';

function Inicio(){
        
    if(localStorage.getItem("token") === null){
        return <Navigate to="/login" replace />;
    }
    
    return(
        <div className="loginLayout">
                <IconButton 
                    id="logout"
                    onClick={logout}
                    name="Cerrar sesión"
                    icon="fa fa-sign-in"
                    type="IconButton"
                />
        </div>
    );
}

export default Inicio;