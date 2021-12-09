function capitalString(cadena){
    return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}

module.exports = {capitalString}