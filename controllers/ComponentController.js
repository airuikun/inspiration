var Component = require('../models/Component'),
    ComponentFile = require('../models/ComponentFile'),
    FileHelper = require('../helpers/FileHelper'),
    ComponentHistory = require('../models/ComponentHistory');


var ComponentController = {
    create : function(req, res) {
        var data = req.body,
            files = req.files;
        //当组件存储完成、文件上传完成，才响应
        createComponent(data, files).then(function(data) {
            //渲染页面
            //res.render('index', data.componentHistory.componentHistoryID);
            res.send(JSON.stringify(data));
        }).catch(function(e) {
            console.error(e);
            res.redirect('error');
        });
    },

    edit : function (req, res) {
        var data = req.body,
            files = req.files;
        //当组件存储完成、文件上传完成，才响应
        editComponent(data, files).then(function(data) {
            //渲染页面
            //res.render('index', data.componentHistory.componentHistoryID);
            res.send(JSON.stringify(data));
        }).catch(function(e) {
            console.error(e);
            res.redirect('error');
        });
    },
    //通过类型获取ID
    getComponentByCategoryID : function(req, res) {
        console.debug('categoryID', req.params.categoryID);

        //查询数据库
        var result = [];

        for(var i = 0; i < 5; i++) {
            result.push(new Component('组件' + i, req.params.categoryID, '用户' + i, '备注' + i));
        }
        res.send(JSON.stringify(result));
    }
};


//创建组件、组件项
function createComponent(data, files) {
    //组件
    var component = new Component(data.name, data.categoryID, 'userid', data.remarks); //用户ID后期通过session给值
    //历史版本
    var componentHistory = new ComponentHistory(component.componentID, data.html, data.js, data.css, 'userid', data.remarks); //用户ID后期通过session给值

    //首先保存到数据然，然后再保存到文件中
    return saveDB({
        component : component,
        componentHistory : componentHistory,
        files : files
    }).then(saveFile);
}

//更新组件、组件项
function editComponent(data, files) {
    //组件
    //var component = ComponentModel.getComponentByID(data.componentID) //从Model层获取数据
    var component = new Component(data.name, data.typeID, 'userid', data.remarks); //模拟
    component.setParameters(data);
    //历史版本
    var componentHistory = new ComponentHistory(component.componentID, data.html, data.js, data.css, 'userid', data.remarks); //用户ID后期通过session给值

    //首先保存到数据然，然后再保存到文件中
    return saveDB({
        component : component,
        componentHistory : componentHistory,
        files : files
    }).then(saveFile);
}


//模拟保存到数据库
function saveDB(data) {
    return new Promise(function(resolve, reject) {
        //模拟保存数据
        console.log('component ID 为' +data.component.componentID + '保存成功');
        resolve(data);
    });
}


//保存文件到数据库
function saveFileToDB(componentFile) {
    return new Promise(function(resolve, reject) {
        //模拟保存数据
        console.log(componentFile.componentFileID + ' 文件保存成功');
        resolve();
    });
}

function saveFile(data) {
    return new Promise(function(resolve, reject) {
        if(data.files.file) {
            !data.files.file.length && (data.files.file = [data.files.file]);
            var promiseArr = []
            for(var i = 0; i <  data.files.file.length; i++) {
                var file = data.files.file[i],
                    componentFile = new ComponentFile(data.component.componentID, file.name);
                    promiseArr.push(FileHelper.saveFile(file, componentFile).then(saveFileToDB));
            }
            Promise.all(promiseArr).then(function() {
                console.log('上传完毕');
                resolve();
            });
        }

    });
}


module.exports = ComponentController;








