const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dev_db = 'mongodb://localhost/giftdesk';

mongoose.connect(process.env.MONGODB_URI || dev_db, {
    
}).then(db => {
    if(dev_db){
        console.log('Database is connect local')
    }else{
        console.log('Database is connect web')
    } 
}).catch(err => console.log('Error: [ ', err));