const {Schema, model} = require('mongoose');
const { DateTime } = require('luxon');
const {generateFolio, transactionCart} = require('../../utils/utils');

const CartSchema = new Schema({
    folio:{
        type:String,
        required:true,
        default: generateFolio
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    list:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],
    transaction:{
        type:String,
        required: true
    }
},{ timestamps: { createdAt: 'created_at' } });

CartSchema.virtual('dateSold').get(function(){
    let date_string = '';
    date_string = DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    return date_string;
});


module.exports = model('Cart', CartSchema);