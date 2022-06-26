function addCart(number){
    if(!localStorage.getItem('myCart')){
        let ids = new Array(number);
        localStorage.setItem('myCart',JSON.stringify(ids));
    }else{
        let exist = JSON.parse(localStorage.getItem('myCart'));
        exist.push(number);
        localStorage.setItem('myCart',JSON.stringify(exist));
        console.log(exist);
    }
}