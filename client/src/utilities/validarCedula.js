//https://medium.com/@bryansuarez/c%C3%B3mo-validar-c%C3%A9dula-y-ruc-en-ecuador-b62c5666186f#:~:text=El%20proceso%20para%20la%20validaci%C3%B3n,3%2C4%2C5).
//https://www.jybaro.com/blog/cedula-de-identidad-ecuatoriana/
const validarCedula = (cedula) => {
    //Check DNI length
    if(cedula.length!==10)
        return {
            status: false,
            msg: "La cédula debe tener 10 Digitos"
        };
    //Check Cod Provincia
    let codProvincia = cedula.substring(0,2);
    if((codProvincia < 1 || codProvincia > 24) && parseInt(codProvincia)!==30)
        return {
            status: false,
            msg: "La cédula no pertenece a una región valida"
        };
    //Check third digit
    /*let thirdDigit = cedula[2];
    if(thirdDigit < 0 || thirdDigit >5)
        return {
            status: false,
            msg: "Tercer digito no es valido"
        };*/
    //Taking the first 9 digits
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

export default validarCedula;