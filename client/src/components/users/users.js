import './users.css';
import UseUsers from '../../data/use-users';
import useVaccine from '../../data/use-vaccine';
import { useState, useEffect } from 'react';
import Table from '../table/table';
import IconButton from '../iconbutton/IconButton';
import Input from '../input/Input';
import Select from '../select/select';
import {isNumeric, isNotDot, isLetter, isValidEmail} from '../../utilities/utilities';
import verificarCedula from '../../utilities/validarCedula';
import generatePassword from '../../utilities/generatePassword';
import clienteAxios from "../../utilities/axios";
import Swal from "sweetalert2";
import { useSWRConfig } from 'swr';

const Users=()=>{
    const { users, loadingUsers } = UseUsers();

    const [listaUsuariosState, setListaUsuariosState] = useState([]);
    const [listaVaccineState, setlistaVaccineState] = useState([]);
    const { vaccine, loadingVaccine } = useVaccine();

    useEffect(() => {
        if(!loadingUsers){
            setListaUsuariosState(users);
        }
    }, [users, loadingUsers]);

    useEffect(() => {
        if(!loadingVaccine){
            setlistaVaccineState(vaccine);
        }
    }, [vaccine, loadingVaccine]);

    const { mutate } = useSWRConfig();

    const handleEliminarUsuario=(evt)=>{
        evt.preventDefault();
        Swal.fire({
            title: '¿Quiere eliminar a este usuario?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then(async(result) => {
            if (result.isConfirmed) {
               const response= await clienteAxios.delete(`/user/${evt.target.value}`);
               if(response.status===200){
                Swal.fire({
                    title: 'Data was successfully recorded',
                    text: 'Se eliminó el usuario',
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                });

                mutate("/getUsers", users.filter(user=>parseInt(user.id)!==parseInt(evt.target.value)), false);
            }else{
                Swal.fire({
                    title: 'Failed to record data',
                    text: 'Failed to register the data, please try again in a few minutes',
                    icon: 'info',
                    timer: 3000,
                    showConfirmButton: false
                });
            }
            }
        })
    }

    const handleActualizarUsuario=(evt)=>{
        evt.preventDefault();
        setStateId(evt.target.value);
        let usuario=users.find(user=>parseInt(user.id)===parseInt(evt.target.value));
        setStateCedula(usuario.dni);
        setStateNombre(usuario.name);
        setStateApellido(usuario.lastname);
        setStateEmail(usuario.mail);
        setStateCedulaError("");
        setStateNombreError("");
        setStateApellidoError("");
        setStateEmailError("");
    }

    const handleCancelar= () =>{
        setStateId(0);
        setStateCedula("");
        setStateNombre("");
        setStateApellido("");
        setStateEmail("");
        setStateCedulaError("");
        setStateNombreError("");
        setStateApellidoError("");
        setStateEmailError("");
    }

    const template = [
        {
            name:"",
            id:"id",
            render: (val)=> {
                return <div className="TableOptions">
                    <button value={val} className="TableOptionEditar" onClick={handleActualizarUsuario}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button value={val} className="TableOptionEliminar" onClick={handleEliminarUsuario}><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>;
            },
        },
        {
            name:"ID",
            id:"dni"
        },{
            name:"Username",
            id:"username"
        },{
            name:"First name",
            id:"name"
        },{
            name:"Last name",
            id:"lastname"
        },{
            name:"Email",
            id:"mail"
        },{
            name:"Birth date",
            id:"birth"
        },{
            name:"Phone number",
            id:"phone"
        },{
            name:"Address",
            id:"address"
        },{
            name:"Role",
            id:"isAdmin",
            render: (val)=> val?"Administrator":"Employee"
        },{
            name:"Status",
            id:"needUpdate",
            render: (val)=> !val?"Complete data":"Incomplete data"
        },{
            name:"Vaccine",
            id:"vaccination",
            render: (val)=> val.status?<>
                <p style={{color:"green"}}>Vaccinated</p>
                <small>{val.name} ({val.dose}) {val.date}</small>
            </>:<p style={{color:"orange"}}>Not vaccinated</p>
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
            setStateEmailError("You must enter a valid email");
        }else{
            setStateEmailError("");
        }
    }
    /*ID*/
    const [stateId, setStateId]=useState(0);

    const handleUser=async()=>{
        if(stateCedula === "" || stateNombre === "" || stateApellido === "" || stateEmail === ""){
            if(stateCedula === "")
                setStateCedulaError("You must fill in this field");
            if(stateNombre === "")
                setStateNombreError("You must fill in this field");
            if(stateApellido === "")
                setStateApellidoError("You must fill in this field");
            if(stateEmail === "")
                setStateEmailError("You must fill in this field");
            return false;
        }
        if(stateCedulaError !== "" || stateNombreError !== "" || stateApellidoError !== "" || stateEmailError !== "")
            return false;
        if(stateId>0){
            let username=stateNombre.split(' ')[0];
            username=username.substring(0, username.length<3?username.length:3) + stateApellido.split(' ')[0] + stateCedula.substring(6,10);
            username=username.toLowerCase();
            let datos={
                "dni": stateCedula,
                "name": stateNombre,
                "lastname": stateApellido,
                "email": stateEmail,
                "username": username,
            };
            const response = await clienteAxios.patch(`/user/${stateId}/`, datos);
            if(response.status===200){
                mutate("/getUsers", [...users.map(user=>{
                    if(parseInt(stateId)===user.id){
                        user.name=stateNombre;
                        user.lastname=stateApellido;
                        user.mail=stateEmail;
                        user.dni=stateCedula;
                        user.username=username;
                    }
                    return user;
                })], false);
                Swal.fire({
                    title: 'Data was successfully recorded',
                    text: 'New user was created',
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                });
                setStateId(0);
                setStateCedula("");
                setStateNombre("");
                setStateApellido("");
                setStateEmail("");
            }else{
                Swal.fire({
                    title: 'Failed to record data',
                    text: 'Failed to register the data, please try again in a few minutes',
                    icon: 'info',
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        }else{
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
            const response = await clienteAxios.post('/user', datos);
            if(response.status===201){
                setStateClave(`USUARIO: ${response.data.username} CLAVE: ${password}`);
                mutate("/getUsers", [...users,{
                        "id": response.data.id,
                        "name": response.data.name,
                        "lastname": response.data.lastname,
                        "dni": response.data.dni,
                        "mail": response.data.email,
                        "username": response.data.username,
                        "address": "",
                        "phone": "",
                        "birth": "",
                        "isAdmin": false,
                        "needUpdate": true,
                        "vaccination": {
                            "status": false
                        }
                    }], false);
                Swal.fire({
                    title: 'Data was successfully recorded',
                    text: 'New user was created',
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                });
                setStateId(0);
                setStateCedula("");
                setStateNombre("");
                setStateApellido("");
                setStateEmail("");
            }else{
                Swal.fire({
                    title: 'Failed to record data',
                    text: 'Failed to register the data, please try again in a few minutes',
                    icon: 'info',
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        }
    }

    const [stateVacunadoFiltro, setStateVacunadoFiltro]= useState(0);
    const onChangeVacunadoFlitro=(evt)=>{
        evt.preventDefault();
        setStateVacunadoFiltro(evt.target.value);
        if(evt.target.value<2){
            setStateVacuna(0);
            setstateFechaInicio("");
            setstateFechaFin("");
        }
    }

    const [stateVacuna, setStateVacuna]= useState(0);
    const onChangeVacuna=(evt)=>{
        evt.preventDefault();
        setStateVacuna(evt.target.value);
    }
        
    const [stateFechaInicio, setstateFechaInicio] = useState("");
    const onChangeFechaInicio = (evt) => {
        evt.preventDefault();
        setstateFechaInicio(evt.target.value);
    }
        
    const [stateFechaFin, setstateFechaFin] = useState("");
    const onChangeFechaFin = (evt) => {
        evt.preventDefault();
        setstateFechaFin(evt.target.value);
    }

    const handleFiltro=()=>{
        if(parseInt(stateVacunadoFiltro)===0){
            return false;
        }else if(parseInt(stateVacunadoFiltro)===1){
            setListaUsuariosState([...users.filter(user=>!user.vaccination.status)]);
        }else if(parseInt(stateVacunadoFiltro)===2){
            let lista=[...users.filter(user=>user.vaccination.status)];
            if(stateVacuna>0)
                lista=lista.filter(user=>parseInt(user.vaccination.id)===parseInt(stateVacuna));
            if(stateFechaInicio!=="")
                lista=lista.filter(user=>user.vaccination.date>=stateFechaInicio);
            if(stateFechaFin!=="")
                lista=lista.filter(user=>user.vaccination.date<=stateFechaFin);
            setListaUsuariosState([...lista]);
        } 
        
    }
    const handleCancelarFiltro=()=>{
        setStateVacunadoFiltro(0);
        setStateVacuna(0);
        setstateFechaInicio("");
        setstateFechaFin("");
        setListaUsuariosState([...users]);
    }

    const [stateClave, setStateClave]=useState("");

    return(
        !loadingUsers?
        <div className="users">
            <div className="usersCard">
                <h1 className="usersTittle">User List</h1>
                <fieldset className="userField">
                    <legend>{stateId>0?"Update User":"Add User"}</legend>
                    <div className="addUser">
                        <Input 
                            type="text"
                            name="Id"
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
                        <div className="addUserActions">
                            <IconButton
                                id="aceptar"
                                onClick={handleUser}
                                name={stateId>0?"Edit":"Add"}
                                icon={stateId>0?"fa fa-edit":"fa fa-plus-circle"}
                                type="IconButton"
                            />
                            <IconButton
                                style={{display: stateId>0?"block":"none"}}
                                id="cancelar"
                                onClick={handleCancelar}
                                name="Cancel"
                                icon="fa fa-times-circle"
                                type="IconButtonAlter"
                            />
                        </div> 
                    </div>
                </fieldset>
                <fieldset className="userField">
                    <legend>Filter</legend>
                    <div className="addUser">
                        <Select
                            options={[{id: 0,body: "select"},{id: 1,body: "No"},{id: 2,body: "Yes"}]}
                            name={"Are you vaccinated?"}
                            id="vacuna"
                            value={stateVacunadoFiltro}
                            onChange={onChangeVacunadoFlitro}
                        />
                        <Select
                            options={[{id: 0,body: "select"},...listaVaccineState]}
                            name={"Vaccine type"}
                            id="vacuna"
                            value={stateVacuna}
                            onChange={onChangeVacuna}
                            style={{display: stateVacunadoFiltro>1?"block":"none"}}
                        />
                         <Input
                            type="date"
                            name="Start date"
                            id="fechavaccine"
                            value={stateFechaInicio}
                            onChange={onChangeFechaInicio}
                            style={{display: stateVacunadoFiltro>1?"block":"none"}}
                        />
                        <Input
                            type="date"
                            name="End date"
                            id="fechavaccinefin"
                            value={stateFechaFin}
                            onChange={onChangeFechaFin}
                            style={{display: stateVacunadoFiltro>1?"block":"none"}}
                        />
                        <div className="addUserActions">
                            <IconButton
                                id="Filter"
                                onClick={handleFiltro}
                                name="Filter"
                                icon="fa fa-search"
                                type="IconButton"
                            />
                            <IconButton
                                id="cancelar"
                                onClick={handleCancelarFiltro}
                                name="Cancel"
                                icon="fa fa-times-circle"
                                type="IconButtonAlter"
                            />
                        </div>
                    </div>
                </fieldset>
                {stateClave!==""&&<p className="credenciales">{stateClave}</p>}
                <Table
                    data={listaUsuariosState}
                    template={template}                
                />
            </div>
        </div>
        :<></>
    );
}

export default Users;