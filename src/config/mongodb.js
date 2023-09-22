const mongoose = require('mongoose');
/**
 * MongoDB Connection
 */

await mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        //don't show the log when it is test
        if (process.env.NODE_ENV !== 'development') {
            console.log('Connected to %s', MONGODB_URL);
        }
    })
    .catch(err => {
        console.error('App starting error:', err.message);
        // process.exit(1);
    });