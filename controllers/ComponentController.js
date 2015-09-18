var FileHelper = require('../helpers/FileHelper'),
    AppUtils = require('../helpers/AppUtils'),
    CategoryDAL = require('../dal/CategoryDAL'),
    ComponentFileDAL = require('../dal/ComponentFileDAL'),
    ComponentDAL = require('../dal/ComponentDAL'),
    ComponentHistoryDAL = require('../dal/ComponentHistoryDAL'),
    ProductLineDAL = require('../dal/ProductLineDAL'),
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
    return Promise.all([
            ComponentDAL.createComponent(component),
            ComponentHistoryDAL.createComponentHistory(componentHistory),
            saveFile({
                files : files,
                componentID : component.componentID
            })
        ]);

}

//更新组件、组件项
function editComponent(data, files) {
    //组件
    var componentID = data.componentID;

    //获取组件历史版本，如果html,css,js有变化新增历史版本
    var postStr = data.html + data.js + data.css;
    var componentHistoryID = data.componentHistoryID;
    //根据组件历史ID查询HTML,css,js
    return ComponentHistoryDAL.getComponentHistoryByID(componentHistoryID)
        .then(function (component) {
            //判断前台是否有修改，若有修改则保持另外一份
            var strArr = [component[0].html, component[0].js, component[0].css];
            if(strArr.join('') !== postStr) {
                //历史版本
                var newComponentHistory = new ComponentHistory(componentID, data.html, data.js, data.css, 'userid', data.updateConent);
                return ComponentHistoryDAL.createComponentHistory(newComponentHistory);
            }
        }).then(function() {
            //同时更新组件表的一些属性
            return ComponentDAL.updateComponent(componentID, {
                name : data.name,
                categoryID : data.categoryID,
                userID : 'userid',
                remarks : data.remarks
            });
        }).then(function() {
            //最后保存文件
            return saveFile({
                files : files,
                componentID : componentID
            });
        });
}


//保存文件到数据库
function saveFileToDB(componentFile) {
    return ComponentFileDAL.saveFiles([componentFile]);
}


function saveFile(data) {
    return new Promise(function(resolve, reject) {
        var file = data.files.file;
        if(file) {
            !file.length && (file = [file]);
            var promiseArr = [];
            for(var i = 0; i <  file.length; i++) {
                var item = file[i];
                if(!item.size) continue;
                var componentFile = new ComponentFile(data.componentID, item.name, '', item.size);
                promiseArr.push(FileHelper.saveFile(item, componentFile).then(saveFileToDB));
            }
            Promise.all(promiseArr).then(function() {
                console.log('上传完毕');
                resolve(data.componentID);
            });
        }else {
            //没有传送文件继续往下执行
            resolve(data.componentID);
        }

    });
}

var ComponentController = {
    renderIndexPage: function(req, res) {
        //读取cookie获取产品线ID
        var productLineID = '1441da10-4c9b-11e5-aacc-6dd6b9b16484';
        Promise.all([
            CategoryDAL.getAllCategoryByProductLineID(productLineID)
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
            CategoryDAL.getComponentsByProductLineID(productLineID),
            CategoryDAL.getAllCategoryByProductLineID(productLineID),
            ProductLineDAL.getAllProductLine()
        ]).then(function(result) {
            res.render(AppUtils.getViewPath('component/create.ejs'), {
                components: result[0],
                categories: result[1],
                productLine : result[2]
            });
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    renderEditPage: function(req, res) {
        //获取到前台传来的组件ID
        var componentID = req.params.componentID;
        //读取cookie获取产品线ID
        var productLineID = '1441da10-4c9b-11e5-aacc-6dd6b9b16484';
        Promise.all([
            ComponentHistoryDAL.getComponentHistoryByComponentID(componentID),
            CategoryDAL.getComponentsByProductLineID(productLineID),
            CategoryDAL.getAllCategoryByProductLineID(productLineID),
            ComponentFileDAL.getFilesByComponentID(componentID),
            ComponentHistoryDAL.getAllComponentHistoryByComponentID(componentID),
            ProductLineDAL.getAllProductLine()
        ]).then(function(result) {
            res.render(AppUtils.getViewPath('component/edit.ejs'), {
                component: result[0],
                components: result[1],
                category : result[2],
                files : result[3],
                componentHistory : result[4],
                productLines : result[5]
            });
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    create: function(req, res) {
        var data = req.body,
            files = req.files;
        //当组件存储完成、文件上传完成，才响应
        createComponent(data, files).then(function(result) {
            console.log(data)
            //渲染页面
            res.redirect('/component/edit/' + result[2])
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
            res.redirect('/component/edit/' + data);
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








