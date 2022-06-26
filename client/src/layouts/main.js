import './main.css';
import {logout} from '../libs/auth';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user';
import {useEffect, useState} from 'react';
import Loading from './loading';
import MainNavigation from '../components/mainnavigation/mainnavigation';
import Profile from '../components/profile/profile';

function Inicio(){
    const {user, mutateUser, loggedOut, loading } = useUser();
    const [navState, setNavState] = useState(0);
    const [isAdminState, setIsAdminState] = useState(false);
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
        if(user&&!loggedOut)
            setIsAdminState(user.isAdmin);

    }, [user, loggedOut]);

    const handleLogout = (evt) => {
        evt.preventDefault();
        logout();
        mutateUser("/getCurrentUserData");
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
                {isAdminState?
                <>
                    {parseInt(navState)===2&&<Profile user={user} />}
                </>:
                <Profile user={user} />}
                
        </div>
    );
}

export default Inicio;