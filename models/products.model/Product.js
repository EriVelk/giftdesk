const { Schema, model} = require('mongoose');
const { DateTime } = require('luxon');


const ProductSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required: true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:Boolean,
        required:true,
        default: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    category:[{
        type: Schema.Types.ObjectId,
        ref:'Category'
    }]
},{ timestamps: { createdAt: 'created_at' } });

ProductSchema.virtual('url').get(function(){
    return '/product/'+this._id;
});

ProductSchema.virtual('registration').get(function(){
    let register = '';
    register = DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATETIME_HUGE);
    return register;
});



module.exports = model('Product', ProductSchema);