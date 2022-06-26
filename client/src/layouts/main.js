import './main.css';
import {logout} from '../libs/auth.js';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user.js';
import {useEffect, useState} from 'react';
import Loading from './loading.js';
import IconButton from '../components/iconbutton/IconButton.js';

function Inicio(){

    const { user, mutate, loggedOut, loading } = useUser();
    const [navState, setNavState] = useState(0);
    const [showMobileNavState, setShowMobileNavState] = useState(false);
    
    const handleChangeNav = (evt) => {
        evt.preventDefault();
        setNavState(evt.target.value);
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

    const handleShowMobileMenu=(evt)=> {
        evt.preventDefault();
        setShowMobileNavState(!showMobileNavState);
    }

    const makeMobileMenu=()=>{
        return(
            <div className="mainMobileMenu" style={{display: showMobileNavState?"block":"none"}}>
                <div className="mainMobileMenuCardHeader">
                        <button className="mainMobileMenuCardHeaderButton" onClick={handleShowMobileMenu}><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>
                <div className="mainMobileMenuCard">
                    <p><b>Bienvenido </b>{user.name}</p>
                    {(!loggedOut&&user.isAdmin)&&<p>admin</p>}
                    <IconButton 
                        id="logout_mobile"
                        name="Salir"
                        icon="fa fa-sign-out"
                        type="IconButtonAlter"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        );
    }
    
    const makeAdminMenu=()=>{
        return(
            <div className="mainAdminMenu">
                <button className={parseInt(navState)===0?"mainAdminMenuItem mainAdminMenuItemSelected":"mainAdminMenuItem"} onClick={handleChangeNav} value="0">Dashboard<i className="fa fa-pie-chart" aria-hidden="true"></i></button>
                <button className={parseInt(navState)===1?"mainAdminMenuItem mainAdminMenuItemSelected":"mainAdminMenuItem"} onClick={handleChangeNav} value="1">Usuarios<i className="fa fa-users" aria-hidden="true"></i></button>
            </div>
        );
    }
    return(
        loading?<Loading/>:
        <div className="mainLayout">
                {makeMobileMenu()}
                <nav className="mainNav">
                    <h1 className="mainLogo noSelect">IVK</h1>
                    <div className="mainControl">
                        {(!loggedOut&&user.isAdmin)&&makeAdminMenu()}
                    </div>
                    <div className="mainUser">
                        <p><b>Bienvenido </b>{user.name} <a className="mainLogout" href="/login" onClick={handleLogout}>Salir</a></p>
                    </div>
                    <div className="mainResponsive">
                        <button onClick={handleShowMobileMenu} className="mainBarButton"><i className="fa fa-bars"></i></button>
                    </div>
                </nav>
        </div>
    );
}

export default Inicio;