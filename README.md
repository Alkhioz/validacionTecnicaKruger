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
Dirigirse a la carpeta api y ejecutar:  
`npm test`  
Hacer los mismo en la carpeta client:  
`npm tets`  
### Validaciones
Para validar que el número de cédula sea valido, se usa la siguiente función:  
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