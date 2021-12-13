const Category = require('../../models/products.model/Category');
const {body, validationResult} = require('express-validator');
const Product = require('../../models/products.model/Product');
const { capitalString } = require('../../utils/utils');

const controllerProduct = {};

controllerProduct.listProductsGet = async(req, res) => {
    const products = await Product.find();
    res.render('products/listproducts',{
        title: 'List Product',
        products
    })
}

controllerProduct.createProductGet = async(req, res) => {
    const categories = await Category.find();
    res.render('products/formproducts',{
        title: 'Create Products',
        categories
    })
}

controllerProduct.createProductPost = [
    (req, res, next) => {
        if(!(req.body.category instanceof Array)){
            if(typeof req.body.category === 'undefined'){
                req.body.category = [];
            }else{
                req.body.category = new Array(req.body.category);
            }
        }
        next();
    },

    //Validate fields.
    body('name', 'Name must not be empty.').trim().isLength({min:3}).escape(),
    body('description', 'Description must not be empty.').trim().isLength({min:3}).escape(),
    body('price', 'Price must not be empty.').trim().escape(),
    body('quantity', 'Quantity must not be empty.').trim().escape(),
    body('category.*').escape(),

    async(req,res,next)=>{
        const errors = validationResult(req);

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            img: req.body.img,
            user: req.user
        });

        console.log(product);

        if(!errors.isEmpty()){
            const categories = await Category.find();
            for (let i = 0; i < categories.length; i++) {
                if (product.category.indexOf(categories[i]._id) > -1) {
                    categories[i].checked = 'true';
                }
            }
            res.render('products/formproducts',{
                title: 'Create Products',
                categories,
                errors: errors.array()
            })
        }else{
            product.name = capitalString(product.name);
            product.save(err =>{
                if(err){
                    return next(err);
                }
                res.redirect('/product/list');
            });
        }
    }

]

controllerProduct.productDetailGet = async(req, res, next) => {
    const product = await Product.findById(req.params.id).populate('category').populate('user');
    res.render('products/product', {
        title: product.name,
        product
    })
}

module.exports = controllerProduct;