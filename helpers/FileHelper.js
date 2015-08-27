var fs = require('fs'),
    path = require('path'),
    filePath = require('../config/config').filePath;


//这个file为
function saveFile(file, componentFile) {
    return new Promise(function(resolve, reject) {
        var destPath = path.join(filePath,componentFile.componentID);

        var destFilePath = path.join(destPath, file.name + new Date().getTime() + path.extname(file.path))
        try {
            if(!fs.existsSync(destPath)) fs.mkdirSync(destPath);;
            var readStream = fs.createReadStream(file.path);
            var writeStream = fs.createWriteStream(destFilePath);
            readStream.pipe(writeStream);
            readStream.on('end', function () {
                componentFile.path = destFilePath;
                resolve(componentFile);
            });
            readStream.on('error', function (e) {
                reject(e)
            });
        }catch (e) {
            console.error(e);
        }

    });
}


module.exports = {
    saveFile : saveFile
};