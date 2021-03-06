const {body, validationResult} = require('express-validator');
const Category = require('../../models/products.model/Category');
const {capitalString} = require('../../utils/utils');

const controllerCategory = {};

//List category Get
controllerCategory.listCategoryGet = async(req, res, next) =>{
    await Category.find().sort([
        ['name', 'ascending']
    ]).exec(function(err, list_categories){
        if(err){
            return next(err);
        }
        res.render('products/category/categories',{
            title: 'Categories',
            categories_list: list_categories
        })
    })
}

//Detail Category Get
controllerCategory.detailCategoryGet = async(req, res) =>{
    const category = await Category.findById(req.params.id);
    res.render('products/category/category',{
        title: category.name,
        category
    })
}

//Create category form Get
controllerCategory.createCategoryGet = (req, res) => {
    res.render('products/category/formcategory',{
        title: 'Register Category'
    });
}

controllerCategory.createCategoryPost = [ 
    body('name', 'Name must not be empty.').trim().isLength({ min: 3 }).escape().custom(async(name)=>{
        name = capitalString(name);
        const nameC = await Category.findOne({name: name});
        if(nameC){
            throw new Error('Category exists.');
        }
    }),
    body('description', 'Description must not be empty.').trim().isLength({ min: 3 }).escape()
    
    ,async(req, res) => {
    
        const errors = validationResult(req);

        const{
            name,
            description
        } = req.body;

        if(!errors.isEmpty()){
            console.log(errors);
            res.render('products/category/formcategory',{
                title: 'Register Category',
                name,
                description,
                errors:errors.array()
            });
        }else{
            const newCategory = new Category({
                name,
                description
            });
            newCategory.name = capitalString(name);

            await newCategory.save();
            console.log(newCategory);
            res.redirect('list');
        }
}];

module.exports = controllerCategory;