function getAllCategories() {
    return new Promise(function(resolve, reject) {
        resolve([{
            id: "aniList1",
            category: "分类1",
            example: ["样例1", "样例2", "样例3", "样例4"]
        }, {
            id: "aniList2",
            category: "分类2",
            example: ["样例1", "样例2", "样例3", "样例4"]
        }, {
            id: "aniList3",
            category: "分类3",
            example: ["样例1", "样例2", "样例3", "样例4"]
        }, {
            id: "aniList4",
            category: "分类4",
            example: ["样例1", "样例2", "样例3", "样例4"]
        }]);
    });
}

module.exports = {
    getAllCategories : getAllCategories
};