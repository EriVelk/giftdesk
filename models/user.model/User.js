const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    flastname: {
        type: String,
        required: true
    },
    slastname:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{ timestamps: { createdAt: 'created_at' } });

UserSchema.virtual('fullname').get(function(){
    return this.flastename + ', ' + this.name; 
});

UserSchema.virtual('dateUser').get(function(){
    let date_string = '';
    date_string = DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
    return date_string;
});


UserSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);