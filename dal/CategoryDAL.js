function getAllCategories() {
    return new Promise(function(resolve, reject) {
        resolve([{
            id: "aniList1",
            category: "分类1",
            // example: ["样例1", "样例2", "样例3", "样例4"]
            example: [{
                id: "exampleId11",
                name: "example1"
            }, {
                id: "exampleId21",
                name: "example2"
            }, {
                id: "exampleId31",
                name: "example3"
            }, {
                id: "exampleId41",
                name: "example4"
            }]
        }, {
            id: "aniList2",
            category: "分类2",
             example: [{
                id: "exampleId12",
                name: "example1"
            }, {
                id: "exampleId22",
                name: "example2"
            }, {
                id: "exampleId32",
                name: "example3"
            }, {
                id: "exampleId42",
                name: "example4"
            }]
        }, {
            id: "aniList3",
            category: "分类3",
             example: [{
                id: "exampleId13",
                name: "example1"
            }, {
                id: "exampleId23",
                name: "example2"
            }, {
                id: "exampleId33",
                name: "example3"
            }, {
                id: "exampleId43",
                name: "example4"
            }]
        }, {
            id: "aniList4",
            category: "分类4",
             example: [{
                id: "exampleId14",
                name: "example1"
            }, {
                id: "exampleId24",
                name: "example2"
            }, {
                id: "exampleId34",
                name: "example3"
            }, {
                id: "exampleId44",
                name: "example4"
            }]
        }]);
    });
}

module.exports = {
    getAllCategories : getAllCategories
};