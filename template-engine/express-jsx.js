const fs = require('fs');

function getKeysFromOptions(options) {
    const { settings, _locals, ...objectKeys } = options;
    return Object.keys(objectKeys);
}

function getRenderedData(data, options) {
    const keys = getKeysFromOptions(options);
    let contentString = data.toString();

    for (const key of keys) {
        contentString = contentString.replace(
            new RegExp(`\{${key}\}`, "gi"),
            options[key]);
    }

    return contentString;
}

function expressJsx(filePath, options, callback) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            return callback(err, null);
        }

        const rendered = getRenderedData(data, options);

        return callback(null, rendered);
    });
}

module.exports = expressJsx;