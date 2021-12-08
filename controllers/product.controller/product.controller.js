const controllerProduct = {};

controllerProduct.listProductsGet = (req, res) => {
    res.render('products/listproducts',{
        title: 'List Product'
    })
}

controllerProduct.createProductGet = (req, res) => {
    res.render('products/formproducts',{
        title: 'Create Products'
    })
}

module.exports = controllerProduct;