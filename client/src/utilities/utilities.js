var reg_name_lastname = /^[A-zÀ-ú ]*$/;

const isNumeric = (value) => !isNaN(value);
const isNotDot = (value) => !value.includes('.');
const isLetter = (value) => reg_name_lastname.test(value);

export {isNumeric, isNotDot, isLetter};