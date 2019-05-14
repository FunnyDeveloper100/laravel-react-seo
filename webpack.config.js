var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'resources/assets/js');

var config = {
    entry: APP_DIR + '/app.js',
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    }
};

module.exports = config;
