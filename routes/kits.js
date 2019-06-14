var express = require('express');
var router = express.Router();
var db = require('./../mysql/mysql');
var base = require('./../js/base');
var dao = require('./../dao/kits_dao');

/* GET home page. */
router.get('/list', function (req, res, next) {
    // const params = base.params(req);
    const sql = dao.selectList();
    db.query(sql, (err, rows) => {
        if (err) {
            next(err);
        } else {
            res.render('kits/list', {title: '生存锦囊', rows: rows, count: rows.length});
        }
    })
});

router.get('/info', (req, res, next) => {
    const params = base.params(req);
    const sql = dao.listId(params.id);
    // const sql1 = dao.infoId(params.id);
    db.query(`${sql}`, (err, rows) => {
        if (err) {
            next(err);
        } else {
            var data = {
                id: params.id,
                title: "",
                obj: []
            }
            // console.log(rows)
            if (rows[1] != null) {
                for (let i = 0; i < rows[1].length; i++) {
                    data.obj.push({
                        title: rows[1][i].rsc_title,
                        content: rows[1][i].rsc_content
                    })
                }
            }
            if (rows[0].rs_content != null) {
                data.obj.unshift({
                    title: null,
                    content: rows[0].rs_content
                })
            }
            data.title = rows[0].rs_title;
            // console.log(data)
            res.render('kits/info', {rows: data, tit: params.tit, num: params.num});
        }
    })
})

router.get('/urgent', (req, res, next) => {
    const sql = dao.urgentSel();
    db.query(sql, (err, rows) => {
        if (err) {
            next(err);
        } else {
            var obj = [];
            for (let i = 0; i < rows.length; i++) {
                obj[i] = {};
                obj[i].obj = [];
                obj[i].name = rows[i].ru_name;
            }
            var list = {};
            obj = obj.reduce((cur, next) => {
                list[next.name] ? "" : list[next.name] = true && cur.push(next);
                return cur;
            }, []);

            for (let i in obj) {
                for (let j = 0; j < rows.length; j++) {
                    if (obj[i].name === rows[j].ru_name) {
                        obj[i].obj.push({
                            "title": rows[j].rup_title,
                            "phone": rows[j].rup_phone,
                            "name": rows[j].ru_name
                        })
                    }
                }
            }
            res.render('urgent/index', {rows: obj});
        }
    })
})

module.exports = router;
