import { clienteAxios } from "../utilities/axios";

const login = async (username, password) => {
    try {
        let authdata = await clienteAxios.post('login', {username, password});
        return authdata.data;
    } catch (error) {
        console.error(error);
    }
    
}

const logout = () => {
    localStorage.removeItem("token")
}

export {login, logout}