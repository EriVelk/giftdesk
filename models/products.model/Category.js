const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:50
    },
    description:{
        type:String,
        required:true
    }
},{ timestamps: { createdAt: 'created_at' } });

CategorySchema.virtual('url').get(function(){
    return '/product/category/' + this._id;
});

CategorySchema.virtual('registration').get(function(){
    let register = '';
    register = DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATETIME_HUGE);
    return register;
});

module.exports = model('Category', CategorySchema);