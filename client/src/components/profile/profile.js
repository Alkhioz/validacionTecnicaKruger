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
            setStateVacunado(Object.keys(profile.vaccine).length > 0?2:1);
            setStateDosis(Object.keys(profile.vaccine).length > 0?profile.vaccine.dose:"");
            if(profile.dateOfBirth === "" || profile.address === "" || profile.phone === "")
                setStateMissingData("Debe terminar de llenar sus datos");
        }
    }, [profile, noData]);

    const { vaccine, noDataVaccine, loadingVaccine } = useVaccine();

    useEffect(() => {
        if (vaccine && !noDataVaccine) {
            setStateVaccines([{
                id: 0,
                body: "Select vaccine"
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
            setStateNombreError("This field cannot be empty");
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
            setStateApellidoError("This field cannot be empty");
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
            setstateTelefonoError("This field cannot be empty");
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
            setstateDireccionError("This field cannot be empty");
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
            setStateVacunaError("You must select a vaccine");
        }else{
            setStateVacunaError("");
        }
    }
    /*Dosis*/
    const [stateDosis, setStateDosis] = useState("");
    const [stateDosisError, setStateDosisError] = useState("");

    const onChangeDosis = (evt) => {
        evt.preventDefault();
        if (isNumeric(evt.target.value) && isNotDot(evt.target.value))
            setStateDosis(evt.target.value);
    }
    /*isVaccindated*/
    const [stateVacunado, setStateVacunado] = useState(1);
    
    const onChangeVacunado = (evt) => {
        evt.preventDefault();
        setStateVacunado(evt.target.value);
    }

    const onBlurDosis = () => {
        if(stateDosis === ""){
            setStateDosisError("This field cannot be empty");
        }else{
            if(stateDosis<1){
                setStateDosisError("Dose must be greater than 0");
            }else{
                setStateDosisError("");
            }
        }
    }

    /*MissingData*/
    const [stateMissingData, setStateMissingData] = useState("");
    
    const handleUpdateData=async()=>{
        if(parseInt(stateVacunado)===1){
            setStateDosisError("");
            setStateFechaVacunacionError("");
            setStateVacunaError("");
            setStateDosis("");
            setStateFechaVacunacion("");
            setStateVacuna(0);
        }
        if(stateCedula === "" || stateNombre === "" || stateApellido === "" || stateEmail === "" || stateFecha === "" || stateDireccion === "" || stateTelefono === "" || (parseInt(stateVacunado)===2 && (stateDosis === "" ||stateFechaVacunacion === "" || parseInt(stateVacuna) === 0))){
            if(stateCedula === "")
                setStateCedulaError("You must fill in this field");
            if(stateNombre === "")
                setStateNombreError("You must fill in this field");
            if(stateApellido === "")
                setStateApellidoError("You must fill in this field");
            if(stateEmail === "")
                setStateEmailError("You must fill in this field");
            if(stateFecha === "")
                setStateFechaError("You must fill in this field");
            if(stateDireccion === "")
                setstateDireccionError("You must fill in this field");
            if(stateTelefono === "")
                setstateTelefonoError("You must fill in this field");
            if(parseInt(stateVacunado)===2){
                if(stateDosis === "")
                    setStateDosisError("You must fill in this field");
                if(stateFechaVacunacion === "")
                    setStateFechaVacunacionError("You must enter the vaccination date");
                if(parseInt(stateVacuna) === 0)
                    setStateVacunaError("You must select a vaccine");
            }
            return false;
        }
        if(stateCedulaError !== "" || stateNombreError !== "" || stateApellidoError !== "" || stateEmailError !== "" || stateFechaError !== "" || stateDireccionError !== "" || stateTelefonoError !== "" || stateFechaVacunacionError !== "" || stateVacunaError !== ""  || stateDosisError !== "")
            return false;
        
        let vaccine=parseInt(stateVacunado)===1?{}:{
            type: stateVacuna,
            date: stateFechaVacunacion,
            dose: stateDosis
        };
        let data = {
            dni: stateCedula,
            name: stateNombre,
            lastname: stateApellido,
            email: stateEmail,
            dateOfBirth: stateFecha,
            address: stateDireccion,
            phone: stateTelefono,
            vaccine
        };
        const actualizarDatos = await clienteAxios.patch(`/user/${profile.id}`,data);
        if(actualizarDatos.status === 200){
            Swal.fire({
                title: 'Registered information',
                text: 'User data has been updated',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });
        }else{
            Swal.fire({
                title: 'No se pudo registrar los datos',
                text: 'Failed to register the data, please try again in a few minutes',
                icon: 'info',
                timer: 3000,
                showConfirmButton: false
            });
        }
    }

    return(
            (!loadingVaccine&&!loading)?<div className="profile">
            <div className="profileCard">
                <h1 className="profileTittle">User Profile</h1>
                {stateMissingData!==""&&<p className="profileMissingData">{stateMissingData}</p>}
                <div className="profileUserData">
                    <Input 
                        type="text"
                        name="ID"
                        id="Cedula"
                        maxLength="10"
                        value={stateCedula}
                        onChange={onChangeCedula}
                        onBlur={onBlurCedula}
                        error={stateCedulaError}
                    />
                    <Input 
                        type="text"
                        name="First name"
                        id="nombre"
                        value={stateNombre}
                        onChange={onChangeNombre}
                        onBlur={onBlurNombre}
                        error={stateNombreError}
                    />
                    <Input 
                        type="text"
                        name="Last name"
                        id="apellido"
                        value={stateApellido}
                        onChange={onChangeApellido}
                        onBlur={onBlurApellido}
                        error={stateApellidoError}
                    />
                    <Input 
                        type="text"
                        name="Email"
                        id="Correo"
                        value={stateEmail}
                        onChange={onChangeEmail}
                        onBlur={onBlurEmail}
                        error={stateEmailError}
                    />
                    <Input 
                        type="date"
                        name="Birth date"
                        id="fecha"
                        value={stateFecha}
                        onChange={onChangeFecha}
                        onBlur={onBlurFecha}
                        error={stateFechaError}
                    />
                    <Input 
                        type="text"
                        name="Phone number"
                        id="telefono"
                        maxLength="10"
                        value={stateTelefono}
                        onChange={onChangeTelefono}
                        onBlur={onBlurTelefono}
                        error={stateTelefonoError}
                    />
                    <Input 
                        type="text"
                        name="Address"
                        id="direccion"
                        value={stateDireccion}
                        onChange={onChangeDireccion}
                        onBlur={onBlurDireccion}
                        error={stateDireccionError}
                    />
                    <Select 
                        options={[{id: 1,body: "No"},{id: 2,body: "Yes"}]}
                        name={"Are you vaccinated?"}
                        id="vacuna"
                        value={stateVacunado}
                        onChange={onChangeVacunado}
                    />
                    {parseInt(stateVacunado)===2&&<><Input 
                        type="text"
                        name="Doses"
                        id="dose"
                        value={stateDosis}
                        onChange={onChangeDosis}
                        onBlur={onBlurDosis}
                        error={stateDosisError}
                    />
                    <Input 
                        type="date"
                        name="Vaccination Date"
                        id="fechavaccine"
                        value={stateFechaVacunacion}
                        onChange={onChangeFechaVacunacion}
                        onBlur={onBlurFechaVacunacion}
                        error={stateFechaVacunacionError}
                    />
                    <Select 
                        options={stateVaccines}
                        name={"Vaccine"}
                        id="vacuna"
                        value={stateVacuna}
                        onChange={onChangeVacuna}
                        error={stateVacunaError}
                        onBlur={onBlurVacuna}
                    /></>}
                </div>
                <div className="profileAction">
                    <IconButton 
                        id="updateUserInfo"
                        onClick={handleUpdateData}
                        name="Update data"
                        icon="fa fa-pencil"
                        type="IconButton"
                    />
                </div>
            </div>
        </div>:<></>
    );
} 
export default Profile;