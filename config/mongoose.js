const mongoose = require('mongoose');
const config = require('./config');

module.exports = (app) => {
    mongoose.connect(config.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    const db = mongoose.connection;
    db.on('error', () => console.log('connection error:'));
    db.once('open', () => console.log('DB Connected!'));
}