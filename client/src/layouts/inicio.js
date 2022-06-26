import './inicio.css';
//import IconButton from '../components/iconbutton/IconButton.js';
import useUser from '../data/use-user.js';
import Loading from './loading.js';

function Inicio(){
    const { user, loggedOut, loading } = useUser();
    
    return(
        loading?<Loading/>:
        <div className="loginLayout">
                {(!loggedOut&&user)&&<p>{user.name}</p>}
        </div>
    );
}

export default Inicio;