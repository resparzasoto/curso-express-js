const fs = require('fs');

function getRenderedData(data, options) {
    // TODO: Logic of rendering
}

function expressJsx(filePath, options, callback) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            callback(err);
        }

        const rendered = getRenderedData(data, options);

        return (null, rendered);
    });
}

module.exports = expressJsx;