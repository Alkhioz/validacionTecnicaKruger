import './inicio.css';
import IconButton from '../components/iconbutton/IconButton';
import { useNavigate  } from "react-router-dom";

function Inicio(){
    const navigate = useNavigate();
    return(
        <div className="inicioLayout">
            <div className="inicioCard">
                <header className="inicioHeader">
                    <h1 className="inicioTitulo">IVK Kruger Corp</h1>
                    <h2 className="inicioSubtitulo">Inventario de vacunación de empleados</h2>
                </header>
                <main className="inicioMain">
                    <p className="inicioMainText">En su compromiso por mantener la salud de su personal y del público en general, Kurger Corp pone a disposición de sus empleados esta herramienta donde pueden actualizar el estado de su vacunación.</p>                    <div className="inicioAction">
                        <IconButton 
                            id="adddata"
                            onClick={()=>navigate("/login")}
                            name="Actualizar estado de vacunación"
                            icon="fa fa-paper-plane"
                            type="IconButtonAlter"
                        />  
                    </div>
                </main>
            </div>        
        </div>
    );
}

export default Inicio;