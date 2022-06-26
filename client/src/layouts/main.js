import './main.css';
import {logout} from '../libs/auth.js';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user.js';
import {useEffect, useState} from 'react';
import Loading from './loading.js';
import SideMenu from '../components/sidemenu/sidemenu.js';

function Inicio(){

    const { user, mutate, loggedOut, loading } = useUser();
    const [navState, setNavState] = useState(0);
    const [showMobileNavState, setShowMobileNavState] = useState(false);

    const adminMenuItems = [{name:"Dashboard", icon: "fa fa-pie-chart"}, {name:"Usuarios", icon: "fa fa-users"}];
    
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
        (!loggedOut&&user)&&<div className="mainLayout">
                <SideMenu
                    show={showMobileNavState}
                    handleShow={handleShowMobileMenu}
                    name={user.name}
                    showProtected={!loggedOut&&user.isAdmin}
                    handleLogout={handleLogout}
                    selected={parseInt(navState)}
                    changeNav={handleChangeNav}
                    menuItems={adminMenuItems}
                />
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