var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    BASE_PATH = path.dirname(require.main.filename);


//这个file为系统file，第二个file为我们自己的file
function saveFile(file, componentFile) {
    return new Promise(function(resolve, reject) {
        var now = new Date();
        var resolvePath = path.join('public/upload', componentFile.componentID);
        var destPath = path.join(BASE_PATH, resolvePath);
        var destFilePath = path.join(destPath, file.name);
        try {
            mkdir(resolvePath)
                .then(function() {
                    var readStream = fs.createReadStream(file.path);
                    var writeStream = fs.createWriteStream(destFilePath);
                    readStream.pipe(writeStream);
                    readStream.on('end', function () {
                        componentFile.path = path.join(resolvePath, file.name);
                        resolve(componentFile);
                    });
                    readStream.on('error', function (e) {
                        reject(e)
                    });
                }).catch(function(e) {
                    console.error(e);
                });
        }catch (e) {
            console.error(e);
        }

    });
}

function mkdir(resolvePath) {
    return new Promise(function(resolve, reject) {
        mkdirp(resolvePath, function (err) {
            if (err) {
                console.error(err);
            }else {
                resolve();
            }
        });
    });
}

//删除文件或文件夹
function deleteFile(filePath) {
    return new Promise(function(resolve, reject) {
        fs.unlink(path.join(BASE_PATH,filePath), function(err) {
            if(err) {
                console.error('删除 ' + filePath + ' 出错',err);
                reject(err);
            }else {
                console.debug('删除 ' + filePath + ' 成功');
                resolve();
            }
        })
    });
}

module.exports = {
    saveFile : saveFile,
    deleteFile : deleteFile
};