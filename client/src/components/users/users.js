import './users.css';
import UseUsers from '../../data/use-users';
import { useEffect, useState } from 'react';
import Table from '../table/table';

const Users=()=>{
    const { users, noDataUsers, loadingUsers, mutateUsers } = UseUsers();

    const[usersState, setUsersState] = useState([]);

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

    return(
        !loadingUsers?
        <div className="users">
            <div className="usersCard">
                <h1 className="usersTittle">Listado de Usuarios</h1>
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