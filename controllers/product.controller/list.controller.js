const List = require('../../models/products.model/List');
const Product = require('../../models/products.model/Product');
const LocalStorage = require('node-localstorage').LocalStorage;
const Cart = require('../../models/products.model/Cart');

const controllerList = {};

controllerList.listGet = async (req, res) => {
    const userId = req.user._id;
    const data = await List.findOne({ idinvitacion: req.user.idInvitacion, status:true }).populate('list');
    res.render('events/list', {
        title: 'My list',
        data
    });
}

controllerList.listConfirmGet = async(req, res) =>{
    const userId = req.user._id;
    const data = await List.findOne({user:{_id:userId}}).populate('list').populate('user');
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
    res.redirect('/product/list');
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

module.exports = controllerList;