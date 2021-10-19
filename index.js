var express = require('express');
const cors = require('cors');

var app     = express();
app.use(cors());
app.options('*', cors());
app.use(express.static('public'));
app.get('/', function(req, res){
   res.send('Hello World');
});
app.listen(3000,function(){
   console.log('Running on port 3000');
});

var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'contacts'
});

// used to serve static files from public directory
// app.use(express.static('public'));

app.get('/add', function(req, res){

   var query = 'INSERT INTO contacts VALUES (?, ?, ?, ?, ?, ?)';
   connection.query(
      query, [req.query.firstName, req.query.lastName, req.query.phoneNumber, req.query.email, req.query.university, req.query.major],
   function(err, results, fields) {
      console.log(results);
      res.send(results);
   }

   );
});


app.get('/random', function(req, res){
   var query = 'INSERT INTO contacts VALUES (?, ?, ?, ?, ?, ?)';
   connection.query(
      query, ['cam', 'harvard', '32873283', 'ccarag@mba2022.hbs.edu', 'Harvard', 'Math'],
      function (err, results, fields) {
         console.log(results)
         res.send(results);

      }

      );
});

app.get('/read', function(req, res){
   connection.query(
      'SELECT * FROM `contacts`',
      function(err, results, fields){
         console.log(results);
         res.send(results);

      }

      );
});


// test with curl 'http://localhost:3000/add?firstName=peter'
