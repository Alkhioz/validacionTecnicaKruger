import './users.css';
import UseUsers from '../../data/use-users';
import { useEffect, useState } from 'react';
import Table from '../table/table';
import IconButton from '../iconbutton/IconButton';
import Modal from '../modal/modal';

const Users=()=>{
    const { users, noDataUsers, loadingUsers, mutateUsers } = UseUsers();

    const[usersState, setUsersState] = useState([]);
    const[shoModalState, setshoModalState] = useState(false);

    useEffect(() => {
        if (users && !noDataUsers) {
            setUsersState(users);
        }
    }, [users, noDataUsers]);

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

    const handleChangeModal=()=>{
        setshoModalState(!shoModalState);
    }

    const CustomModal=()=>{
        return(
            <Modal show={shoModalState}>
                <div className="userModalAction">
                    <IconButton
                        id="aceptar"
                        onClick={handleChangeModal}
                        name="Guardar"
                        icon="fa fa-plus-circle"
                        type="IconButton"
                    />
                    <IconButton
                        id="cancel"
                        onClick={handleChangeModal}
                        name="Cancelar"
                        icon="fa fa-times-circle"
                        type="IconButtonAlter"
                    />
                </div>
            </Modal>
        );
    }

    return(
        !loadingUsers?
        <div className="users">
            <CustomModal/>
            <div className="usersCard">
                <h1 className="usersTittle">Listado de Usuarios</h1>
                <div className="usersAction">
                    <IconButton
                        id="adduser"
                        onClick={handleChangeModal}
                        name="Agregar"
                        icon="fa fa-plus"
                        type="IconButtonAlter"
                    />
                </div>
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