const {Schema, model} = require('mongoose');

const ListSchema = new Schema({
    idinvitacion:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    list:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }]
});

module.exports = model('List', ListSchema);