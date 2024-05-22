const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('PRA')); // Folder s HTML, CSS, JS datotekama

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SQL.12345',
    database: 'Beauvoir'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

app.post('/submit', (req, res) => {
    let data = { name: req.body.name, email: req.body.email };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send('Data added to database');
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
