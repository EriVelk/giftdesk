const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:50
    },
    desciption:{
        type:String,
        required:true
    }
});

CategorySchema.virtual('url').get(function(){
    return '/product/category/' + this._id;
});

module.exports = model('Category', CategorySchema);