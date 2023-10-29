const config = require('./dbConfig');
const sql = require('mssql');


const getAllPercentStats = async (numberConsig, startDate, endDate) => {
    try {
        const pool = new sql.ConnectionPool(config)
        const connectionPool = pool.connect()
        await connectionPool
        const allPercentStats = await pool.request()
        .input('numConsig', sql.VarChar(50), numberConsig)
        .input('startDate', sql.VarChar(50), startDate)
        .input('endDate', sql.VarChar(50), endDate)
        .execute('dbo.ReportPercentValues')
        return allPercentStats.recordset
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAllPercentStats }