const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { secret } = require("./config");

/* JWT Token */
// const generateAccessToken = (nickname) => {
//   return jwt.sign(nickname, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "5c" });
// };

console.log("AS Server started");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "KittyAleks",
  database: "KYRYLOVA",
});

db.connect(err => {
  if (err) {
    console.log("MySQL error");
    throw err;
  }
  console.log("MySQL connected");
});
const app = express();

app.use("/cdn", express.static("files"));

const port = 80;

app.use(bodyParser.json());
app.use(morgan("dev"));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/signup', (req, res) => {
//   console.log('Sign Up')
//   if ( !(req.body.nickname && (typeof req.body.nickname === 'string') && req.body.nickname.length > 2) ) {
//     res.status(500).json({desc: 'Name is too short'});
//     return;
//   }
//   res.json({ token: 'xxx' })
// })

app.post("/signup", (req, res) => {
  const { nickname, email, password } = req.body;
  console.log('DDDsignup', res)

  let salt = bcrypt.genSaltSync(10);
  let hashPassword = bcrypt.hashSync(password, salt);

  const sql = "INSERT INTO signup_user (nickname, email, password) VALUES (?,?,?)";
  db.query(sql, [nickname, email, hashPassword], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      console.log("Error", err);
    }
  });
});

const tokenKey = '1a2b-3c4d-5e6f-7g8h'
console.log('WWWtokenKey', tokenKey)
app.post("/signin", (req, res) => {
  const { nickname, email, password } = req.body;

  // if(!email && !nickname) {
  //   res.status(400).json({message: `User ${nickname} is not found`})
  // }
  const sql = "SELECT * FROM signup_user";
  db.query(sql, [nickname, email, password], (err, result) => {

    const passResult = result.find(user => (user.email === email));
    try {
      if (bcrypt.compareSync(password, passResult.password)) {
        const accessToken = jwt.sign({ nickname}, tokenKey);
        // const accessToken = jwt.sign({ nickname}, process.env.ACCESS_SECRET_TOKEN);
        console.log('WWaccessToken',accessToken)
        res.status(200).json({ passResult, accessToken });
      } else {
        console.log("Not allowed");
        res.send("Not allowed");
      }
    } catch {
      res.status(500);
    }
  });
});

// categories_pastille
app.post("/pastille", (req, res) => {
  const sql = "SELECT * FROM pastille_categories";
  db.query(sql, (err, result) => {
    try {
      res.send(result);
    } catch {
      console.log(err);
    }
  });
});
app.post("/language", (req, res) => {
  const sql = "SELECT * FROM languages";
  db.query(sql, (err, result) => {
    console.log('EEEresult', result)
    try {
      res.send(result)
    } catch {
      console.log('Language ERROR', err);
    }
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
