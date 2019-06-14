module.exports = {
    /**
     * 
     * @param {前台传参} obj 
     */
    callback(obj) {
        let page = obj.page || 1,
            rows = obj.rows || 10;
        if(rows<1) {
            rows = 1
        }else if(rows>1000) {
            rows = 1000;
        }
        if(page>0) {
            page = (page - 1) * rows;
        }else {
            page = 0
        }
        return `${page},${rows}`;
    }
}