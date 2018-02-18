const express = require('express')
const parser = require('body-parser')
const mysql = require('mysql')

const app = express()

app.use(express.static(__dirname))
app.use(parser.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'tasks',
})

db.query(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER AUTO_INCREMENT,
  description VARCHAR(280) NULL DEFAULT NULL,
  PRIMARY KEY(id)
);`)

app.get('/tasks', (req, res) => {
  db.query(`SELECT * FROM tasks;`, function(err, data) {
    res.send(data)
  })
})

app.post('/tasks', (req, res) => {
  db.query(
    `INSERT INTO tasks (description) VALUES (?);`,
    [req.body.description],
    function(err, data) {
      res.status(201).send()
    }
  )
})

app.listen(8080)
console.log('Listening @ localhost:8080')