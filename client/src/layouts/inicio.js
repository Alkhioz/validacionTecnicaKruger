import './inicio.css';
//import IconButton from '../components/iconbutton/IconButton.js';
import useUser from '../hooks/use-user.js';

function Inicio(){
    const { user, loggedOut } = useUser();
    
    return(
        <div className="loginLayout">
                {(!loggedOut&&user)&&<p>{user.name}</p>}
        </div>
    );
}

export default Inicio;