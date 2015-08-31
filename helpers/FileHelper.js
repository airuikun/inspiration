var fs = require('fs'),
    path = require('path'),
    BASE_PATH = path.dirname(require.main.filename);


//这个file为
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
                        componentFile.path = resolvePath;
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

//下载文件的方法：http://my.oschina.net/sundq/blog/189505
//下载文件直接放在资源文件下public/upload
/*
function downFile(req, res, file) {

    var mimetype = mime.lookup(file.path);

    encodedZH(req, res, file.fileName);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file.path);
    filestream.pipe(res);
}

//处理下载中文乱码
function encodedZH(req, res, filename) {
    var userAgent = (req.headers['user-agent']||'').toLowerCase();

    if(userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
        res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(filename));
    } else if(userAgent.indexOf('firefox') >= 0) {
        res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent(filename)+'"');
    } else {
        res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer(filename).toString('binary'));
    }
}
*/

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


module.exports = {
    saveFile : saveFile
};