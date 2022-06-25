import { clienteAxios } from "../utilities/axios";

const login = async (username, password) => {
    let authdata = await clienteAxios.post('login', {username, password});
    console.log(authdata);
}

const logout = () => {
    localStorage.removeItem("token")
}

export {login, logout}