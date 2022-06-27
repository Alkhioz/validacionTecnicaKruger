# Validación Técnica Kruger Corp. Inventario de vacunación de empleados
Para poder acceder al sistema se cuanta con los siguientes usuarios:
## Usuarios

|USUARIO|CONTRASEÑA | ROL |  
|---|---|---|  
|admin |admin | Administrador|  
|alflituma6548 | Pass123. |Empleado|  
| antavila0944 | Pass123. |Empleado|  

### Instalación
Dirigirse a la carpeta api y ejecutar:  
`npm intall`  
Luego de que se instale hacer los mismo en la carpeta client:  
`npm install`  
### Ejecución
Dirigirse a la carpeta api y ejecutar:  
`npm start`  
Hacer los mismo en la carpeta client:  
`npm start`  
### Pruebas
Dirigirse a la carpeta client y ejecutar:  
`npm tets`  
### Validaciones
Para validar que el número de cédula sea correcto, se usa la siguiente función:  
```javascript
const validarCedula = (cedula) => {
    if(cedula.length!==10)
        return {
            status: false,
            msg: "La cédula debe tener 10 Digitos"
        };
    let codProvincia = cedula.substring(0,2);
    if((codProvincia < 1 || codProvincia > 24) && parseInt(codProvincia)!==30)
        return {
            status: false,
            msg: "La cédula no pertenece a una región valida"
        };
    let odds = [cedula[0], cedula[2], cedula[4], cedula[6], cedula[8]].map(odd => odd*2>9?odd*2-9:odd*2);
    let evens = [cedula[1], cedula[3], cedula[5], cedula[7]].map(even => parseInt(even));
    let remainder = [...odds, ...evens].reduce((partialSum, a) => partialSum + a, 0) % 10;
    let validationDigit = remainder === 0?0:10-remainder;
    
    if(parseInt(validationDigit) !== parseInt(cedula[9]))
        return {
            status: false,
            msg: "No coincide el dígito verificador"
        };
    return {
        status: true
    };
}
```  
Para realizar esa función tomé el algoritmo de las siguientes fuentes:  
[Estructura del Número de Cédula de Identidad](https://www.jybaro.com/blog/cedula-de-identidad-ecuatoriana/)  
[Cómo validar cédula y RUC en Ecuador](https://medium.com/@bryansuarez/c%C3%B3mo-validar-c%C3%A9dula-y-ruc-en-ecuador-b62c5666186f#:~:text=El%20proceso%20para%20la%20validaci%C3%B3n,3%2C4%2C5)  
### Autentificación
Para el proceso de autentificación se usó JWT y para facilitar el uso del token se agregua al axios con un interceptor.  
```javascript
const clienteAxios = axios.create({
    baseURL : 'http://localhost:8080/',
});

clienteAxios.interceptors.request.use(
    async config => {
        if (localStorage.getItem("token") !== null) {
            config.headers = {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
        }
        return config;
    },
error => {
    return Promise.reject(error);
});
```  
### Data fetch
Para obtener datos se usó el hook [SWR](https://swr.vercel.app/es-ES)  
```javascript
function useUser() {
  const fetcher = async (url) => await clienteAxios.get(url).then(res => res.data);

  const { data, error } = useSWR("/getCurrentUserData", fetcher);
  const loading = !data && !error;
  const loggedOut = error && error.response.status === 403;
  
  return {
    loading,
    loggedOut,
    user: data,
  };
}
```