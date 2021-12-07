const controllerIndex = {};

controllerIndex.indexControllerGet = (req, res) =>{
    res.render('index/index', {
        title: 'GIFTDESK'
    })
}

module.exports = controllerIndex;