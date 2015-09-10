var fs = require('fs'),
    path = require('path'),
    BASE_PATH = path.dirname(require.main.filename);


//这个file为系统file，第二个file为我们自己的file
function saveFile(file, componentFile) {
    return new Promise(function(resolve, reject) {
        var now = new Date();
        var resolvePath = path.join('public/upload', componentFile.componentID);
        var destPath = path.join(BASE_PATH, resolvePath);
        var destFilePath = path.join(destPath, file.name);
        try {
            //同步改为异步
            //我感觉项目里面不能出现同步代码
            exists(destPath)
                .then(mkdir)
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

function exists(path) {
    return new Promise(function(resolve, reject) {
        fs.exists(path, function(isExists) {
            resolve({
                path : path,
                isExists : isExists
            });
        })
    });
}

function mkdir(obj) {
    return new Promise(function(resolve, reject) {
        if(!obj.isExists) {
            fs.mkdir(obj.path, function(err) {
            //fs.mkdir('/Users/hacke2/work/1123', function(err) {
                if(err)  {
                    //因为是异步，所以上传两个文件判断改目录是否存在的时候
                    //第一次判断都会判断成不存在，从而重复创建，报错
                    //忽略这个错误
                    if(err.code === 'EEXIST') {
                        console.debug('已经创建了该目录');
                    }else {
                        reject(err);
                    }
                }
            })
        }
        resolve();
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