import './main.css';
import {logout} from '../libs/auth';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user';
import {useEffect, useState} from 'react';
import Loading from './loading';
import MainNavigation from '../components/mainnavigation/mainnavigation';
import Profile from '../components/profile/profile';

function Inicio(){

    const { user, mutate, loggedOut, loading } = useUser();
    const [navState, setNavState] = useState(0);
    const [showMobileNavState, setShowMobileNavState] = useState(false);

    const adminMenuItems = [{name:"Dashboard", icon: "fa fa-pie-chart"}, {name:"Usuarios", icon: "fa fa-users"}, {name:"Editar Perfil", icon: "fa fa-cogs"}];
    
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
                <MainNavigation
                    show={showMobileNavState}
                    handleShow={handleShowMobileMenu}
                    name={user.name}
                    showProtected={!loggedOut&&user.isAdmin}
                    handleLogout={handleLogout}
                    selected={parseInt(navState)}
                    changeNav={handleChangeNav}
                    menuItems={adminMenuItems}
                />
                <Profile
                    user={user}
                />
        </div>
    );
}

export default Inicio;