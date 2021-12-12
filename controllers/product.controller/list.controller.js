const List = require('../../models/products.model/List');
const Product = require('../../models/products.model/Product');
const LocalStorage = require('node-localstorage').LocalStorage;

const controllerList = {};

controllerList.listGet = async (req, res) => {
    userId = req.user._id;
    const data = await List.findOne({ user: { _id: userId }},{list:1, _id:0});
    //const list = await List.findOne({ idinvitacion: req.user.idInvitacion });
    console.log(data);
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

module.exports = controllerList;