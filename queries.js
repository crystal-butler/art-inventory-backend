const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'artdb_user',
    host: 'localhost',
    database: 'artdb_api',
    password: 'password',
    port: 5432
});

const getArt = (request, response) => {
    pool.query('SELECT * FROM art ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

module.exports = {
    getArt
};
