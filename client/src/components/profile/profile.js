import './profile.css';
import useProfile from '../../data/use-profile';
import useVaccine from '../../data/use-vaccine';
import { useEffect, useState } from 'react';
import Input from '../input/Input';
import IconButton from '../iconbutton/IconButton';
import Select from '../select/select';
import {isNumeric, isNotDot, isLetter, isValidEmail} from '../../utilities/utilities';
import verificarCedula from '../../utilities/validarCedula';
import clienteAxios from "../../utilities/axios";
import Swal from "sweetalert2";

const Profile=(props)=>{
    
    const { profile, noData, loading } = useProfile(props.user.id);

    useEffect(() => {
        if (profile && !noData) {
            setStateCedula(profile.dni);
            setStateNombre(profile.name);
            setStateApellido(profile.lastname);
            setStateEmail(profile.email);
            setStateFecha(profile.dateOfBirth);
            setstateTelefono(profile.phone);
            setstateDireccion(profile.address);
            setStateVacuna(Object.keys(profile.vaccine).length > 0?profile.vaccine.type:0);
            setStateFechaVacunacion(Object.keys(profile.vaccine).length > 0?profile.vaccine.date:"");
            if(profile.dateOfBirth === "" || profile.address === "" || profile.phone === "")
                setStateMissingData("Debe terminar de llenar sus datos");
        }
    }, [profile, noData]);

    const { vaccine, noDataVaccine, loadingVaccine } = useVaccine();

    useEffect(() => {
        if (vaccine && !noDataVaccine) {
            setStateVaccines([{
                id: 0,
                body: "Seleccione la vacuna"
              },
              ...vaccine]);
        }
    }, [vaccine, noDataVaccine]);

    const [stateVaccines, setStateVaccines] = useState([]);

    /*Cedula*/
    const [stateCedula, setStateCedula] = useState("");
    const [stateCedulaError, setStateCedulaError] = useState("");

    const validarCedula = () => {
        let validacion = verificarCedula(stateCedula);
        if(!validacion.status){
            setStateCedulaError(validacion.msg);
        }else{
            setStateCedulaError("");
        }
    };
    const onChangeCedula = (evt) => {
        evt.preventDefault();
        if (isNumeric(evt.target.value) && isNotDot(evt.target.value))
            setStateCedula(evt.target.value);
    }
    const onBlurCedula = () => {
        validarCedula();
    }
    /*Nombre*/
    const [stateNombre, setStateNombre] = useState("");
    const [stateNombreError, setStateNombreError] = useState("");

    const onChangeNombre = (evt) => {
        evt.preventDefault();
        if(isLetter(evt.target.value))
            setStateNombre(evt.target.value);
    }

    const onBlurNombre = () => {
        if(stateNombre === ""){
            setStateNombreError("Este campo no puede quedar vacío");
        }else{
            setStateNombreError("");
        }
    }
    /*Apellido*/
    const [stateApellido, setStateApellido] = useState("");
    const [stateApellidoError, setStateApellidoError] = useState("");

    const onChangeApellido = (evt) => {
        evt.preventDefault();
        if(isLetter(evt.target.value))
            setStateApellido(evt.target.value);
    }

    const onBlurApellido = () => {
        if(stateApellido === ""){
            setStateApellidoError("Este campo no puede quedar vacío");
        }else{
            setStateApellidoError("");
        }
    }
    /*Email*/
    const [stateEmail, setStateEmail] = useState("");
    const [stateEmailError, setStateEmailError] = useState("");

    const onChangeEmail = (evt) =>{
        evt.preventDefault();
        setStateEmail(evt.target.value);
    }
    const onBlurEmail = () => {
        if(!isValidEmail(stateEmail)){
            setStateEmailError("Debe colocar un correo valido");
        }else{
            setStateEmailError("");
        }
    }
    /*Numero telefono*/
    const [stateTelefono, setstateTelefono] = useState("");
    const [stateTelefonoError, setstateTelefonoError] = useState("");

    const onChangeTelefono = (evt) => {
        evt.preventDefault();
        if (isNumeric(evt.target.value) && isNotDot(evt.target.value))
            setstateTelefono(evt.target.value);
    }

    const onBlurTelefono = () => {
        if(stateTelefono === ""){
            setstateTelefonoError("Este campo no puede quedar vacío");
        }else{
            if(stateTelefono.length<10){
                setstateTelefonoError("El número de teléfono debe tener 10 digitos");
            }else{
                setstateTelefonoError("");
            }
        }
    }
    /*Fecha nacimiento*/
    const [stateFecha, setStateFecha] = useState("");
    const [stateFechaError, setStateFechaError] = useState("");

    const onChangeFecha = (evt) => {
        evt.preventDefault();
        setStateFecha(evt.target.value);
    }

    const  onBlurFecha = () => {
        if(stateFecha === ""){
            setStateFechaError("Seleccione una fecha valida");
        }else{
            setStateFechaError("");
        }
    }
    /*Direccion*/
    const [stateDireccion, setstateDireccion] = useState("");
    const [stateDireccionError, setstateDireccionError] = useState("");

    const onChangeDireccion = (evt) => {
        evt.preventDefault();
        setstateDireccion(evt.target.value);
    }

    const  onBlurDireccion= () => {
        if(stateDireccion === ""){
            setstateDireccionError("Este campo no puede quedar vacío");
        }else{
            setstateDireccionError("");
        }
    }
    /*Fecha vacunacion*/
    const [stateFechaVacunacion, setStateFechaVacunacion] = useState("");
    const [stateFechaVacunacionError, setStateFechaVacunacionError] = useState("");

    const onChangeFechaVacunacion = (evt) => {
        evt.preventDefault();
        setStateFechaVacunacion(evt.target.value);
    }

    const  onBlurFechaVacunacion = () => {
        if(stateFechaVacunacion === ""){
            setStateFechaVacunacionError("Seleccione una fecha valida");
        }else{
            setStateFechaVacunacionError("");
        }
    }
    /*Vaccine*/
    const [stateVacuna, setStateVacuna] = useState(0);
    const [stateVacunaError, setStateVacunaError] = useState("");
    
    const onChangeVacuna = (evt) => {
        evt.preventDefault();
        setStateVacuna(evt.target.value);
    }
    const  onBlurVacuna = () => {
        if(parseInt(stateVacuna) === 0){
            setStateVacunaError("Debe seleccionar una vacuna");
        }else{
            setStateVacunaError("");
        }
    }
    /*MissingData*/
    const [stateMissingData, setStateMissingData] = useState("");
    
    const handleUpdateData=async()=>{
        if(stateCedula === "" || stateNombre === "" || stateApellido === "" || stateEmail === "" || stateFecha === "" || stateDireccion === "" || stateTelefono === "" || stateFechaVacunacion === ""){
            if(stateCedula === "")
                setStateCedulaError("Debe rellenar este campo");
            if(stateNombre === "")
                setStateNombreError("Debe rellenar este campo");
            if(stateApellido === "")
                setStateApellidoError("Debe rellenar este campo");
            if(stateEmail === "")
                setStateEmailError("Debe rellenar este campo");
            if(stateFecha === "")
                setStateFechaError("Debe rellenar este campo");
            if(stateDireccion === "")
                setstateDireccionError("Debe rellenar este campo");
            if(stateTelefono === "")
                setstateTelefonoError("Debe rellenar este campo");
            if(stateFechaVacunacion === "")
                setStateFechaVacunacionError("Debe colocar la fecha de vacunación");
            if(parseInt(stateVacuna) === 0)
                setStateVacunaError("Debe seleccionar una vacuna");
            return false;
        }
        let data = {
            dni: stateCedula,
            name: stateNombre,
            lastname: stateApellido,
            email: stateEmail,
            dateOfBirth: stateFecha,
            address: stateDireccion,
            phone: stateTelefono,
            vaccine: {
              type: stateVacuna,
              date: stateFechaVacunacion
            }
        };
        const actualizarDatos = await clienteAxios.patch(`/user/${profile.id}`,data);
        if(actualizarDatos.status === 200){
            Swal.fire({
                title: 'Información registrada',
                text: 'Se actualizaron los datos del usuario',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });
        }else{
            Swal.fire({
                title: 'No se pudo registrar los datos',
                text: 'No se pudo registrar los datos, por favor intente en unos minutos',
                icon: 'info',
                timer: 3000,
                showConfirmButton: false
            });
        }
    }

    return(
            (!loadingVaccine&&!loading)?<div className="profile">
            <div className="profileCard">
                <h1 className="profileTittle">Datos de Usuario</h1>
                {stateMissingData!==""&&<p className="profileMissingData">{stateMissingData}</p>}
                <div className="profileUserData">
                    <Input 
                        type="text"
                        name="Cédula"
                        id="Cedula"
                        maxLength="10"
                        value={stateCedula}
                        onChange={onChangeCedula}
                        onBlur={onBlurCedula}
                        error={stateCedulaError}
                    />
                    <Input 
                        type="text"
                        name="Nombre"
                        id="nombre"
                        value={stateNombre}
                        onChange={onChangeNombre}
                        onBlur={onBlurNombre}
                        error={stateNombreError}
                    />
                    <Input 
                        type="text"
                        name="Apellido"
                        id="apellido"
                        value={stateApellido}
                        onChange={onChangeApellido}
                        onBlur={onBlurApellido}
                        error={stateApellidoError}
                    />
                    <Input 
                        type="text"
                        name="Correo"
                        id="Correo"
                        value={stateEmail}
                        onChange={onChangeEmail}
                        onBlur={onBlurEmail}
                        error={stateEmailError}
                    />
                    <Input 
                        type="date"
                        name="Fecha Nacimiento"
                        id="fecha"
                        value={stateFecha}
                        onChange={onChangeFecha}
                        onBlur={onBlurFecha}
                        error={stateFechaError}
                    />
                    <Input 
                        type="text"
                        name="número de teléfono"
                        id="telefono"
                        maxLength="10"
                        value={stateTelefono}
                        onChange={onChangeTelefono}
                        onBlur={onBlurTelefono}
                        error={stateTelefonoError}
                    />
                    <Input 
                        type="text"
                        name="Dirección"
                        id="direccion"
                        value={stateDireccion}
                        onChange={onChangeDireccion}
                        onBlur={onBlurDireccion}
                        error={stateDireccionError}
                    />
                    <Input 
                        type="date"
                        name="Fecha Vacunación"
                        id="fechavaccine"
                        value={stateFechaVacunacion}
                        onChange={onChangeFechaVacunacion}
                        onBlur={onBlurFechaVacunacion}
                        error={stateFechaVacunacionError}
                    />
                    <Select 
                        options={stateVaccines}
                        name={"Vacuna"}
                        id="vacuna"
                        value={stateVacuna}
                        onChange={onChangeVacuna}
                        error={stateVacunaError}
                        onBlur={onBlurVacuna}
                    />
                </div>
                <div className="profileAction">
                    <IconButton 
                        id="updateUserInfo"
                        onClick={handleUpdateData}
                        name="Actualizar Datos"
                        icon="fa fa-pencil"
                        type="IconButton"
                    />
                </div>
            </div>
        </div>:<></>
    );
} 
export default Profile;