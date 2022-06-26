import './main.css';
import IconButton from '../components/iconbutton/IconButton.js';
import {logout} from '../libs/auth.js';
import { useNavigate  } from "react-router-dom";
import useUser from '../hooks/use-user.js';
import {useEffect} from 'react';

function Inicio(){

    const { user, mutate, loggedOut } = useUser();
    const navigate = useNavigate();
    console.log(user);
    console.log(loggedOut);
    useEffect(() => {
        if (loggedOut) {
            navigate("/login");
        }
    }, [user, loggedOut]);

    const handleLogout = () => {
        logout();
        mutate("/getCurrentUserData");
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