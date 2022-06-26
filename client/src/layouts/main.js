import './main.css';
import {logout} from '../libs/auth.js';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user.js';
import {useEffect, useState} from 'react';
import Loading from './loading.js';

function Inicio(){

    const { user, mutate, loggedOut, loading } = useUser();
    const [navState, setNavState] = useState(0);
    
    const handleChangeNav = (evt) => {
        evt.preventDefault();
        setNavState(evt.target.value);
        console.log(evt.target.value);
    }

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
    const makeAdminMenu=()=>{
        return(
            <div className="mainAdminMenu">
                <button className="mainAdminMenuItem" onClick={handleChangeNav} value="0">Dashboard<i className="fa fa-pie-chart" aria-hidden="true"></i></button>
                <button className="mainAdminMenuItem" onClick={handleChangeNav} value="1">Usuarios<i className="fa fa-users" aria-hidden="true"></i></button>
            </div>
        );
    }
    return(
        loading?<Loading/>:
        <div className="mainLayout">
                <nav className="mainNav">
                    <h1 className="mainLogo noSelect">IVK</h1>
                    <div className="mainControl">
                        {(!loggedOut&&user.isAdmin)&&makeAdminMenu()}
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