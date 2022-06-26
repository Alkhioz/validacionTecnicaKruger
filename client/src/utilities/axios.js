import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://localhost:8080/',
});

clienteAxios.interceptors.response.use(function (response) {
     if(response.data.msg === "err"){
        if(response.data.data.description.includes('invalid token')){
            if("token"  in localStorage){
                localStorage.removeItem("token");
                window.location.reload();
            }
        }
    }
    return response;
  }, function (error) {
    Promise.reject(error)
});

const setAuthToken = token => {
    if(token) {
        clienteAxios.defaults.headers.common['access-token'] = token;
    } else {
        delete clienteAxios.defaults.headers.common['access-token'];
    }
}

export {clienteAxios, setAuthToken};