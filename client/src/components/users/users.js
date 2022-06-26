import './users.css';
import UseUsers from '../../data/use-users';
import { useEffect, useState } from 'react';

const Users=()=>{
    const { users, noDataUsers, loadingUsers, mutateUsers } = UseUsers();

    const[usersState, setUsersState] = useState([]);

    const userList=()=>usersState.map((user,i)=>{
        return <p key={`userlist${i}`}>{user.name}</p>
    });

    useEffect(() => {
        if (users && !noDataUsers) {
            setUsersState(users);
        }
    }, [users, noDataUsers]);

    return(
        !loadingUsers?userList():<></>
    );
}

export default Users;