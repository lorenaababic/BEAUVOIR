const sql = require('mssql');

const config = {
    user: 'SA',
    password: 'SQL.123456',
    server: 'localhost', // Može biti 'localhost\\instance' ili samo 'localhost'
    database: 'Beauvoir',
    options: {
        encrypt: true, // koristi enkripciju ukoliko je neophodno
        trustServerCertificate: true // koristi ovo ukoliko koristite self-signed sertifikate
    }
};

async function connectToDatabase() {
    try {
        // Povezivanje na bazu
        let pool = await sql.connect(config);
        console.log("Connected to the database!");

        // Primer jednostavnog upita
        let result = await pool.request().query('SELECT * FROM korisnici');
        console.log(result);

        // Zatvaranje konekcije
        sql.close();
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

connectToDatabase();