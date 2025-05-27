const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors'); // Import the cors package


// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions));

const db = new sqlite3.Database('./courseReg.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the products database.');
});

app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

app.post('/admin', (req, res) => {
    const { name, pass } = req.body;
    console.log(req.body);
    if (name == "dd" && pass == "1234") {
        res.status(201).json({
            message: 'yes',
        });
    }
    else {
        res.status(201).json({
            message: 'no',
        });
    }
})
app.get('/courses', (req, res) => {
    db.all('SELECT * FROM courses', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.send(rows);
        }
    });
});

app.get('/students', (req, res) => {
    db.all('SELECT * FROM Students', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.send(rows);
        }
    });
});
app.get('/registrations', (req, res) => {
    db.all('SELECT Registrations.id, students.studentName, courses.title FROM Registrations INNER JOIN students ON students.id=Registrations.studentId INNER JOIN courses ON courses.id=Registrations.courseId'
        , (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.send(rows);
        }
    });
});


app.post('/addStudent', (req, res) => {
    const { name, id, email } = req.body;
    if (!name || !id) {
        res.status(400).send('Name and id are required');
    } else {
        const sql = 'INSERT INTO students(studentName, id, email) VALUES (?, ?, ?)';
        db.run(sql, [name, id, "test@gmail.com"], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
            } else {
                const id = this.lastID;
                res.status(201).send({ id, name, email, message: 'yes' });
            }
        });
    }
});

app.post('/addStudent', (req, res) => {
    const { name, id, email } = req.body;
    if (!name || !id) {
        res.status(400).send('Name and id are required');
    } else {
        const sql = 'INSERT INTO students(studentName, id, email) VALUES (?, ?, ?)';
        db.run(sql, [name, id, "test@gmail.com"], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
            } else {
                const id = this.lastID;
                res.status(201).send({ id, name, email, message: 'yes' });
            }
        });
    }
});

app.post('/register', (req, res) => {
    const { studentId, courseId } = req.body;
    console.log(req.body);

    if (!studentId || !courseId) {
        return res.status(400).send('error');
    }

    db.get('SELECT * FROM registrations WHERE studentId = ? and courseId = ?', [studentId, courseId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal server error');
        }

        if (row) {
            return res.status(201).send({ studentId, courseId, message: "only once" });
        } else {
            const sql = 'INSERT INTO registrations(id, studentId, courseId) VALUES (?, ?, ?)';
            //hardcoded the id here(sqlite error fetching LastID)
            db.run(sql, [289, studentId, courseId], function (err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Internal server error');
                } else {
                    const id = this.lastID;
                    return res.status(201).send({ id, studentId, courseId, message: "yes" });
                }
            });
        }
    });
});
