module.exports = {
    params(req) {
        if(JSON.stringify(req.body) == '{}') {
            return req.query;
        }else {
            return req.body;
        }
    },
}