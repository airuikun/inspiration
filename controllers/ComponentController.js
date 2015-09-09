var FileHelper = require('../helpers/FileHelper'),
    AppUtils = require('../helpers/AppUtils'),
    CategoryDAL = require('../dal/CategoryDAL'),
    ComponentFileDAL = require('../dal/ComponentFileDAL'),
    ComponentDAL = require('../dal/ComponentDAL'),
    ComponentHistoryDAL = require('../dal/ComponentHistoryDAL'),
    Component = require('../models/Component'),
    ComponentFile = require('../models/ComponentFile'),
    ComponentHistory = require('../models/ComponentHistory');

//创建组件、组件项
function createComponent(data, files) {
    //组件
    var component = new Component(data.name, data.categoryID, 'userid', data.remarks); //用户ID后期通过session给值
    //历史版本
    var componentHistory = new ComponentHistory(component.componentID, data.html, data.js, data.css, 'userid', data.updata); //用户ID后期通过session给值

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
    var component = new Component(data.name, data.categoryID, 'userid', data.remarks); //模拟
    component.setParameters(data);
    //历史版本
    var componentHistory = new ComponentHistory(component.componentID, data.html, data.js, data.css, 'userid', data.updateConent); //用户ID后期通过session给值

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
        var promiseArr = [ComponentDAL.createComponent(data.component), ComponentHistoryDAL.createComponentHistory(data.componentHistory)];
        Promise.all(promiseArr).then(function() {
            resolve(data);
        });

    });
}

//保存文件到数据库
function saveFileToDB(componentFile) {
    return  ComponentFileDAL.saveFiles([componentFile]);
}


function saveFile(data) {
    return new Promise(function(resolve, reject) {
        var file = data.files.file;
        if(file) {
            !file.length && (file = [file]);
            var promiseArr = [];
            for(var i = 0; i <  file.length; i++) {
                var item = file[i],
                    componentFile = new ComponentFile(data.component.componentID, item.name, '', item.size);
                    promiseArr.push(FileHelper.saveFile(item, componentFile).then(saveFileToDB));
            }
            Promise.all(promiseArr).then(function(data) {
                console.log('上传完毕');
                resolve(data);
            });
        }else {
            //没有传送文件继续往下执行
            resolve(data);
        }

    });
}

var ComponentController = {
    renderIndexPage: function(req, res) {
        Promise.all([
            CategoryDAL.getAllCategories()
        ]).then(function(result) {
            res.render(AppUtils.getViewPath('component/index.ejs'), {
                categories: result[0]
            });
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    renderCreationPage: function(req, res) {
        //读取cookie获取产品线ID
        var productLineID = '1441da10-4c9b-11e5-aacc-6dd6b9b16484';
        Promise.all([
            CategoryDAL.queryCategoriesByProductLineID(productLineID)
        ]).then(function(result) {
            console.log(result);
            res.render(AppUtils.getViewPath('component/create.ejs'), {
                categories: result[0]
            });
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    renderEditPage: function(req, res) {
        //获取到前台传来的组件ID
        var componentID = '567ee0e3-a893-4d9f-ac57-960a57d438c9';
        Promise.all([
            ComponentHistoryDAL.getComponentHistoryByComponentID(componentID)
        ]).then(function(result) {
            res.render(AppUtils.getViewPath('component/edit.ejs'), {
                categories: result[0]
            });
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    create: function(req, res) {
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

    edit: function (req, res) {
        var data = req.body,
            files = req.files;
        //当组件存储完成、文件上传完成，才响应
        editComponent(data, files).then(function(data) {
            //渲染页面
            //res.render('index', data.componentHistory.componentHistoryID);
            res.send(JSON.stringify(data));
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    deleteFile : function (req, res) {
        var componentFileID = req.params.componentFileID;
        ComponentFileDAL.deleteFileByID(componentFileID).then(function() {
            res.send({
                status : 1
            });
        }).catch(function() {
            res.send({
                status : 0
            });
        });
    }
};

module.exports = ComponentController;








