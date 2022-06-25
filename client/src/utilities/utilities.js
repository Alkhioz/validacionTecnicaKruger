var reg_name_lastname = /^[A-zÀ-ú ]*$/;
var reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const isNumeric = (value) => !isNaN(value);
const isNotDot = (value) => !value.includes('.');
const isLetter = (value) => reg_name_lastname.test(value);
const isValidEmail = (value) => reg_email.test(value);

export {isNumeric, isNotDot, isLetter, isValidEmail};