import './main.css';
import {logout} from '../libs/auth';
import { useNavigate  } from "react-router-dom";
import useUser from '../data/use-user';
import {useEffect, useState} from 'react';
import Loading from './loading';
import MainNavigation from '../components/mainnavigation/mainnavigation';
import Profile from '../components/profile/profile';
import Users from '../components/users/users';
import { useSWRConfig } from 'swr';

function Inicio(){
    const {user, loggedOut, loading } = useUser();
    const [navState, setNavState] = useState(0);
    const [isAdminState, setIsAdminState] = useState(false);
    const [showMobileNavState, setShowMobileNavState] = useState(false);

    const { mutate } = useSWRConfig();

    const adminMenuItems = [{name:"Users", icon: "fa fa-users"}, {name:"Edit Profile", icon: "fa fa-cogs"}];
    
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
                {isAdminState?
                <>
                    {parseInt(navState)===0&&<Users/>}
                    {parseInt(navState)===1&&<Profile user={user}/>}
                </>:
                <Profile user={user} />}
                
        </div>
    );
}

export default Inicio;