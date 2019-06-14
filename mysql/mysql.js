const mysql = require('mysql');
const config = require('../config/config');
//创建 mysql 连接池资源
const pool = mysql.createPool(config);


/**
 * 封装query之sql带不占位符func
 */
function query(sql, callback) {
    //建立链接
    pool.getConnection((err, conn) => {
        if (err) {
            callback(err, null, null);
        }
        conn.query(sql, (error, results) => {
            //释放连接池
            conn.release();
            if (error) {
                throw error;
            }
            //事件驱动回调
            callback(error, results);
        })
    })
}
/**
 * 封装query之sql带占位符func
 */
function queryArgs(sql, args, callback) {
    pool.getConnection((err, connection) => {
        if(err) {
            callback(err, null, null);
        }else {
            connection.query(sql, args, (err, rows) => {
                connection.release();
                if (err) {
                    throw err;
                }
                callback(err, rows);
            })
        }
    })
}

function doReturn (res, ret) {
    if(typeof ret === "undefined") {
        res.json ({
            success: "00000001",
            message: "error",
            obj: null
        })
    } else {
        res.json(ret)
    }
}

module.exports = {
    query,
    queryArgs,
    doReturn,
};