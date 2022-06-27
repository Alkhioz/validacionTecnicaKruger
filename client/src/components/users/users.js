import './users.css';
import UseUsers from '../../data/use-users';
import { useEffect, useState } from 'react';
import Table from '../table/table';
import IconButton from '../iconbutton/IconButton';
import Input from '../input/Input';
import {isNumeric, isNotDot, isLetter, isValidEmail} from '../../utilities/utilities';
import verificarCedula from '../../utilities/validarCedula';
import generatePassword from '../../utilities/generatePassword';
import clienteAxios from "../../utilities/axios";
import Swal from "sweetalert2";
import { useSWRConfig } from 'swr';

const Users=()=>{
    const { users, noDataUsers, loadingUsers } = UseUsers();

    const { mutate } = useSWRConfig();
    
    const[usersState, setUsersState] = useState([]);

    useEffect(() => {
        if (users && !noDataUsers) {
            setUsersState(users);
        }
    }, [users, noDataUsers, loadingUsers]);

    const template = [
        {
            name:"Cédula",
            id:"dni"
        },{
            name:"Usuario",
            id:"username"
        },{
            name:"Nombres",
            id:"name"
        },{
            name:"Apellidos",
            id:"lastname"
        },{
            name:"Correo",
            id:"mail"
        },{
            name:"Fecha Nacimiento",
            id:"birth"
        },{
            name:"N° Teléfono",
            id:"phone"
        },{
            name:"Dirección",
            id:"address"
        },{
            name:"Role",
            id:"isAdmin",
            render: (val)=> val?"Adminstrador":"Empleado"
        },{
            name:"Estado",
            id:"needUpdate",
            render: (val)=> val?"Datos Completos":"Datos Incompletos"
        }
    ];

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

    const handleUser=async()=>{
        if(stateCedula === "" || stateNombre === "" || stateApellido === "" || stateEmail === ""){
            if(stateCedula === "")
                setStateCedulaError("Debe rellenar este campo");
            if(stateNombre === "")
                setStateNombreError("Debe rellenar este campo");
            if(stateApellido === "")
                setStateApellidoError("Debe rellenar este campo");
            if(stateEmail === "")
                setStateEmailError("Debe rellenar este campo");
            return false;
        }
        let username=stateNombre.split(' ')[0];
        username=username.substring(0, username.length<3?username.length:3) + stateApellido.split(' ')[0] + stateCedula.substring(6,10);
        username=username.toLowerCase();
        let password = generatePassword(12);
        let datos={
            "dni": stateCedula,
            "name": stateNombre,
            "lastname": stateApellido,
            "username": username,
            "password": password,
            "email": stateEmail,
            "dateOfBirth": "",
            "address": "",
            "phone": "",
            "roleId": 2,
            "vaccine": {}
        };
        const response = await clienteAxios.post('/user', datos)
        if(response.status===201){
            Swal.fire({
                title: 'Información registrada',
                text: 'Se creó el nuevo usuario',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });
            mutate('/getUsers');
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
        !loadingUsers?
        <div className="users">
            <div className="usersCard">
                <h1 className="usersTittle">Listado de Usuarios</h1>
                <fieldset className="userField">
                    <legend>Agregar Usuario</legend>
                    <div className="addUser">
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
                        <div className="addUserActions">
                            <IconButton
                                id="aceptar"
                                onClick={handleUser}
                                name="Agregar"
                                icon="fa fa-plus-circle"
                                type="IconButton"
                            />
                        </div> 
                    </div>
                </fieldset>
                <Table
                    data={usersState}
                    template={template}                
                />
            </div>
        </div>
        :<></>
    );
}

export default Users;