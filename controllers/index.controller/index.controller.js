const controllerIndex = {};

controllerIndex.indexControllerGet = (req, res) =>{
    res.render('index/index', {
        title: 'GIFTTABLES'
    })
}

module.exports = controllerIndex;