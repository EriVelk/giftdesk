const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dev_db_url = 'mongodb://localhost/giftdesk';

mongoose.connect(process.env.MONGODB_URI || dev_db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(db => console.log('Database is connect'))
    .catch(err => console.log('ERROR::::::[ ', err));