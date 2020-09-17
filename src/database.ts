import mongoose from 'mongoose';
import logger from "./libs/logger";

require('dotenv').config();

const uri = process.env.MONGODB_URI || '';

var connectWithRetry = function() {
    return mongoose.connect(uri, function(err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
            setTimeout(connectWithRetry, 1000);
        } else {
            console.log('db is connected');
        }
    });
};
connectWithRetry();