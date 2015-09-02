var path = require('path');

function getViewPath(name) {
    return path.join(path.dirname(require.main.filename), 'views', name);
}

module.exports = {
    getViewPath: getViewPath
};