const isNumeric = (value) => !isNaN(value);
const isNotDot = (value) => !value.includes('.');

export {isNumeric, isNotDot};