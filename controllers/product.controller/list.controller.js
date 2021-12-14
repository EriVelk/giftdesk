const List = require('../../models/products.model/List');
const Product = require('../../models/products.model/Product');
const LocalStorage = require('node-localstorage').LocalStorage;
const Cart = require('../../models/products.model/Cart');
const {body, validationResult} = require('express-validator');

const controllerList = {};

controllerList.listGet = async (req, res) => {
    const data = await List.findOne({ idinvitacion: req.user.idInvitacion, status:true }).populate('list');
    res.render('events/list', {
        title: 'My list',
        data
    });
}

controllerList.listConfirmGet = async(req, res) =>{
    const data = await List.findOne({ idinvitacion: req.user.idInvitacion, status:true }).populate('list').populate('user');
    res.render('events/confirmlist', {
        title: 'Confirm List',
        data
    });
}

controllerList.listConfirmPost = async(req, res) =>{
    const list = await List.findOne({idinvitacion: req.user.idInvitacion, status:true});
    const idList = list._id;
    await List.updateOne({_id:idList, status:true},{status:false});
    res.redirect('/product/user/list');
}

controllerList.createListUser = async (req, res) => {
    const id = req.body.id;
    let localStorage = new LocalStorage('./scratch');
    localStorage.setItem('ids', id);
    let data = localStorage.getItem('ids');
    if (data != null) {
        const product = await Product.find({ _id: data });
        const existIdInvitation = await List.findOne({ idinvitacion: req.user.idInvitacion, status:true });
        if (existIdInvitation) {
            await List.updateOne({ idinvitacion: req.user.idInvitacion, status:true }, {
                $push: { list: product }
            });
        } else {
            const list = new List({
                idinvitacion: req.user.idInvitacion,
                user: req.user,
                list: product
            })
            list.save();
        }

    }
    res.redirect('/product/list');
}

controllerList.createCartUser = async(req, res) =>{
    const id = req.body.id;
    let localStorage = new LocalStorage('./scratch');
    localStorage.setItem('ids', id);
    let data = localStorage.getItem('ids');
    if (data != null) {
        const product = await Product.find({ _id: data });
        const existCart = await Cart.findOne({transaction:req.user.transactionCart, status:true});
        console.log(existCart);
        if (existCart) {
            await Cart.updateOne({ transaction: req.user.transactionCart, status:true}, {
                $push: { list: product }
            });
        } else {
            const cart = new Cart({
                transaction: req.user.transactionCart,
                adress: null,
                user: req.user,
                list: product
            })
            cart.save();
        }

    }
    res.redirect('/product/user/invitation');
}

controllerList.listCartUser = async(req, res) =>{
    const data = await Cart.findOne({transaction:req.user.transactionCart, status:true}).populate('list');
    res.render('events/list', {
        title: 'My Cart',
        data
    });
}

controllerList.endCartUserGet = async(req, res) => {
    const data = await Cart.findOne({transaction:req.user.transactionCart, status:true}).populate('list').populate('user');
    res.render('events/cart',{
        title: 'Confirm your details',
        data
    })
}

controllerList.endCartUserPost = async(req, res) =>{
    const cart = await Cart.findOne({transaction:req.user.transactionCart, status:true});
    const idCart = cart._id;
    await Cart.updateOne({_id:idCart, status:true},{status:false});
    res.redirect('/product/user/cart');
}

controllerList.findListGet = (req, res) =>{
    res.render('list/listinvitation',{
        title: 'Find List'
    });
}

controllerList.findListPost = [
    body('idinvitation', 'Folio Invitation not must be empty.').trim().isLength({ min: 3 }).escape().custom(async(idinvitation)=>{
        const data = await List.findOne({idinvitacion: idinvitation});
        if(!data){
            throw new Error('List dont exist.');
        }
    }),

    async(req, res) =>{
        const errors = validationResult(req);

        const {
            idinvitation
        } = req.body;

        if(!errors.isEmpty()){
            res.render('list/listinvitation',{
                title: 'Find List',
                idinvitation,
                errors: errors.array()
            });
        }else{
            let localStorage = new LocalStorage('./scratch');
            localStorage.setItem('idinvitation', idinvitation);
            const data = await List.findOne({idinvitacion: req.body.idinvitation, status:true}).populate('list').populate('user');
                res.render('list/listgift',{
                title:'List of '+data.user.fullname,
                data
            })            
        }
    }
]

module.exports = controllerList;