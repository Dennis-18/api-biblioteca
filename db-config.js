const Pool = require('pg').Pool
const pool = new Pool({
    user: 'pmklygejipsiix',
    host: 'ec2-44-206-214-233.compute-1.amazonaws.com',
    database: 'dal0or9rj2od32',
    password: 'e8dd1a509e6f630fda0372372a0c6d3dfe3946170d8294dec95dea116545e5ce',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = {
    pool
}