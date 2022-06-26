import './inicio.css';
import IconButton from '../components/iconbutton/IconButton.js';
import {logout} from '../libs/auth.js';

function Inicio(){
    
    const handleLogout = () => {
        logout();
    }
    return(
        <div className="loginLayout">
                <IconButton 
                    id="logout"
                    onClick={handleLogout}
                    name="Cerrar sesión"
                    icon="fa fa-sign-in"
                    type="IconButton"
                />
        </div>
    );
}

export default Inicio;