const sql = require('mssql');

const config = {
    user: 'SA',
    password: 'SQL.123456',
    server: 'localhost', 
    database: 'Beauvoir',
    options: {
        encrypt: true, 
        trustServerCertificate: true 
    }
};

async function connectToDatabase() {
    try {
      
        let pool = await sql.connect(config);
        console.log("Connected to the database!");

        let result = await pool.request().query('SELECT * FROM korisnici');
        console.log(result);

    
        sql.close();
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

connectToDatabase();