const List = require('../../models/products.model/List');
const Product = require('../../models/products.model/Product');
const LocalStorage = require('node-localstorage').LocalStorage;
const Cart = require('../../models/products.model/Cart');

const controllerList = {};

controllerList.listGet = async (req, res) => {
    const userId = req.user._id;
    const data = await List.findOne({user:{_id:userId}}).populate('list');
    res.render('events/list', {
        title: 'My list',
        data
    });
}

controllerList.createListUser = async (req, res) => {
    const id = req.body.id;
    let localStorage = new LocalStorage('./scratch');
    localStorage.setItem('ids', id);
    let data = localStorage.getItem('ids');
    if (data != null) {
        const product = await Product.find({ _id: data });
        const existIdInvitation = await List.findOne({ idinvitacion: req.user.idInvitacion });
        if (existIdInvitation) {
            await List.updateOne({ idinvitacion: req.user.idInvitacion }, {
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
        const existCart = await Cart.findOne({transaction:req.user.transactionCart});
        console.log(existCart);
        if (existCart) {
            await Cart.updateOne({ transaction: req.user.transactionCart}, {
                $push: { list: product }
            });
        } else {
            const cart = new Cart({
                transaction: req.user.transactionCart,
                user: req.user,
                list: product
            })
            cart.save();
        }

    }
    res.redirect('/product/list');
}

module.exports = controllerList;