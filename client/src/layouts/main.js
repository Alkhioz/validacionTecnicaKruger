import './main.css';
import IconButton from '../components/iconbutton/IconButton.js';
import {logout} from '../libs/auth.js';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user.js';
import {useEffect} from 'react';
import Loading from './loading.js';

function Inicio(){

    const { user, mutate, loggedOut, loading } = useUser();
    const navigate = useNavigate();
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
        loading?<Loading/>:
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