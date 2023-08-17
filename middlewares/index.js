const validateField  = require('./validate-field');
const validateJWT  = require('./validate-jwt');
const isAdminRole  = require('./validate-role');


module.exports = {
    ...validateField,
    ...validateJWT,
    ...isAdminRole
}