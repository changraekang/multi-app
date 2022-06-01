const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit:10,
    host: 'myapp',
    user: 'root',
    password: 'kang',
    database: 'myapp'
});

exports.pool = pool;