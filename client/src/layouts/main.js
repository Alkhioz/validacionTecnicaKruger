import './main.css';
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

    const handleLogout = (evt) => {
        evt.preventDefault();
        logout();
        mutate("/getCurrentUserData");
    }
    return(
        loading?<Loading/>:
        <div className="mainLayout">
                <nav className="mainNav">
                    <h1 className="mainLogo noSelect">IVK</h1>
                    <div className="mainControl">

                    </div>
                    <div className="mainUser">
                        <p><b>Welcome </b>{user.name} <a className="mainLogout" href="/login" onClick={handleLogout}>logout</a></p>
                    </div>
                    <div className="mainResponsive">
                        <button className="mainBarButton"><i className="fa fa-bars"></i></button>
                    </div>
                </nav>
                
        </div>
    );
}

export default Inicio;