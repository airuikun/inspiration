var path = require('path');

function getViewPath(relPath) {
    return path.join(path.dirname(require.main.filename), 'views', relPath);
}

module.exports = {
    getViewPath: getViewPath
};