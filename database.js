const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGODB_URI).then(db => {
        console.log('Database is connect web')
}).catch(err => console.log('Error: [ ', err));