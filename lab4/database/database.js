const mysql = require('mysql')

// For connection to mysql server
function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "lab4",
        insecureAuth: true
    })
}

// To send query to mysql server and returning promise with result data
function query(query, args) {
    const con = getConnection()
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            if (err) return reject(err);
            con.query(query, args, function (err, result, fields) {
                if (err) return reject(err);
                return resolve(result)
            })
        })
    })
}

module.exports = {query}