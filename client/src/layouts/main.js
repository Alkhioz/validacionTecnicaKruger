import './main.css';
import {logout} from '../libs/auth.js';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user.js';
import {useEffect, useState} from 'react';
import Loading from './loading.js';
import SideMenu from '../components/sidemenu/sidemenu.js';
import NavBar from '../components/navbar/navbar.js';

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
                <NavBar
                    handleShow={handleShowMobileMenu}
                    name={user.name}
                    showProtected={!loggedOut&&user.isAdmin}
                    handleLogout={handleLogout}
                    selected={parseInt(navState)}
                    changeNav={handleChangeNav}
                    menuItems={adminMenuItems}
                />
        </div>
    );
}

export default Inicio;