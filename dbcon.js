var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_johnstke',
  password        : '2513',
  database        : 'cs340_johnstke'
});

module.exports.pool = pool;
