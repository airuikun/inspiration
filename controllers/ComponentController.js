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
    var component = new Component(data.name, data.categoryID, 'userid', data.remarks, data.productLineID); //用户ID后期通过session给值
    //历史版本
    var componentHistory = new ComponentHistory(component.componentID, data.html, data.js, data.css, 'userid'); //用户ID后期通过session给值

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
                var newComponentHistory = new ComponentHistory(componentID, data.html, data.js, data.css);
                return ComponentHistoryDAL.createComponentHistory(newComponentHistory);
            }
        }).then(function() {
            //同时更新组件表的一些属性
            return ComponentDAL.updateComponent(componentID, {
                name : data.name,
                categoryID : data.categoryID,
                userID : 'userid',
                remarks : data.remarks,
                modifyTime : new Date()
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
        var productLineID = req.cookies.productLineID;
        Promise.all([
            CategoryDAL.getComponentsByProductLineID(productLineID),
            ProductLineDAL.getAllProductLine()
        ]).then(function(result) {
            res.render(AppUtils.getViewPath('component/index.ejs'), {
                categories: result[0],
                productLines : result[1]
            });
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    renderCreationPage: function(req, res) {
        var productLineID = req.cookies.productLineID;
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
        var productLineID = req.cookies.productLineID;
        var getHistory;
        //获取到前台传来的组件ID
        var componentID = req.params.componentID;
        var componentHistoryID = req.params.componentHistoryID;

        if(componentHistoryID) {
            getHistory = ComponentHistoryDAL.getComponentHistoryByComponentHistoryID(componentHistoryID);
        }else {
            getHistory = ComponentHistoryDAL.getComponentHistoryByComponentID(componentID);
        }
        Promise.all([
            getHistory,
            CategoryDAL.getComponentsByProductLineID(productLineID),
            CategoryDAL.getAllCategoryByProductLineID(productLineID),
            ComponentFileDAL.getFilesByComponentID(componentID),
            ComponentHistoryDAL.getAllComponentHistoryByComponentID(componentID),
            ProductLineDAL.getAllProductLine()
        ]).then(function(result) {
            var component = result[0][0];
            if(component) {
                //转义html，应为里面有可能有<script>标签
                component.html = encodeURIComponent(component.html);
                res.render(AppUtils.getViewPath('component/edit.ejs'), {
                    component: result[0],
                    components: result[1],
                    category : result[2],
                    files : result[3],
                    componentHistory : result[4],
                    productLines : result[5]
                });
            } else {
                //这种情况为数据库删除了历史版本，但是组件没有删除
                res.render(AppUtils.getViewPath('component/error.ejs'), {
                    status : 302,
                    text : '当前组件已失效'
                });
            }
        }).catch(function(e) {
            res.redirect('error');
        });
    },

    create: function(req, res) {
        var data = req.body,
            files = req.files;
        data.productLineID = req.cookies.productLineID;
        if(data.name) {
            //当组件存储完成、文件上传完成，才响应
            createComponent(data, files).then(function(result) {
                //渲染页面
                res.redirect('/component/edit/' + result[2]);
            }).catch(function(e) {
                console.error(e);
                res.redirect('error');
            });
        }else {
            res.redirect('error');
        }
    },

    edit: function (req, res) {
        var data = req.body,
            files = req.files;
        if(data.name) {
            //当组件存储完成、文件上传完成，才响应
            editComponent(data, files).then(function (data) {
                //渲染页面
                res.redirect('/component/edit/' + data);
            }).catch(function (e) {
                res.redirect('error');
            });
        }else {
            res.redirect('error');
        }
    },

    deleteFile : function (req, res) {
        var componentFileID = req.params.componentFileID;
        if(componentFileID) {
            ComponentFileDAL.deleteFileByID(componentFileID).then(function() {
                res.send({
                    status : 1
                });
            }).catch(function() {
                res.send({
                    status : 0
                });
            });
        }else {
            res.send({
                status : 0
            });
        }

    }
};

module.exports = ComponentController;








