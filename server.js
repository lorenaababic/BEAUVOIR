const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'sql012345',
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

     
        let result = await pool.request().query('SELECT * FROM Users');
        console.log(result);
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

connectToDatabase();


app.post('/submit-comment', async (req, res) => {
    const { userId, modelId, comment } = req.body;

    try {
        let pool = await sql.connect(config);

        const query = `
            INSERT INTO Comments (UserID, ModelID, Comment)
            VALUES (@userId, @modelId, @comment);
        `;

        await pool.request()
            .input('userId', sql.Int, userId)
            .input('modelId', sql.Int, modelId)
            .input('comment', sql.Text, comment)
            .query(query);

        res.status(200).send('Comment submitted successfully.');
    } catch (error) {
        console.error('Error submitting comment:', error);
        res.status(500).send('Error submitting comment.');
    }
});

app.get('/get-comments', async (req, res) => {
    const modelId = req.query.modelId;

    try {
        let pool = await sql.connect(config);

        const query = `
            SELECT c.Comment, u.FirstName, u.LastName
            FROM Comments c
            INNER JOIN Users u ON c.UserID = u.UserID
            WHERE c.ModelID = @modelId;
        `;

        const result = await pool.request()
            .input('modelId', sql.Int, modelId)
            .query(query);

        const comments = result.recordset;
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).send('Error getting comments.');
    }
});
