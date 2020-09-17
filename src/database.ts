import mongoose from 'mongoose';
import logger from "./libs/logger";

require('dotenv').config();

const uri = process.env.MONGODB_URI || '';

mongoose.connect(uri, {
    useNewUrlParser: true,
}).then( db => {
    console.log('db is connected');
}).catch( err => {
    logger.error(err.stack);
})
