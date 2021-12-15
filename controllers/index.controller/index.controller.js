const controllerIndex = {};

controllerIndex.indexControllerGet = (req, res) =>{
    res.render('index/index', {
        title: 'GIFTTABLE'
    })
}

module.exports = controllerIndex;