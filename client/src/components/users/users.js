import './users.css';
import UseUsers from '../../data/use-users';
import { useEffect, useState } from 'react';
import Table from '../table/table';

const Users=()=>{
    const { users, noDataUsers, loadingUsers, mutateUsers } = UseUsers();

    const[usersState, setUsersState] = useState([]);

    /*const userList=()=>usersState.map((user,i)=>{
        return <p key={`userlist${i}`}>{user.name}</p>
    });*/

    useEffect(() => {
        if (users && !noDataUsers) {
            setUsersState(users);
        }
    }, [users, noDataUsers]);

    const tableHeader = ["Cédula", "Usuario", "Nombres", "Apellidos", "Correo", "Fecha Nacimiento", "N° Teléfono", "Dirección", "Role", "Estado"];
    const tableTemplate = ["dni", "username", "name", "lastname", "mail", "birth", "phone", "address", "isAdmin", "needUpdate"];
    return(
        !loadingUsers?
        <div className="users">
            <div className="usersCard">
                <h1 className="usersTittle">Listado de Usuarios</h1>
                <Table
                    header={tableHeader}
                    template={tableTemplate}
                    data={usersState}
                />
            </div>
        </div>
        :<></>
    );
}

export default Users;