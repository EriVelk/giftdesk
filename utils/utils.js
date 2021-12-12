function capitalString(cadena){
    return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}

function generateFolio(){
    let idI = '';
    let temp = JSON.stringify(this._id);
    idI = temp.substring(6,18) + '-Cart';
    return idI;
}

function transactionCart(){
    let idI = '';
    let temp = JSON.stringify(this._id);
    idI = temp.substring(1,20) + '-Transaction';
    return idI;
}

module.exports = {capitalString, generateFolio, transactionCart}