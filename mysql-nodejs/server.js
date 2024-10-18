const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
//MYSQL Connection
//For Connect DB use : npm run dev
app.use(express.json()); //parse json => js obj

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "database",
  port: "3306",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const ID = req.body.ID;
  const Password = req.body.Password;
  const Name = req.body.Name;
  const Email = req.body.Email;

  const sqlInsert =
    "INSERT INTO Model (ID,Email,Name,Password) VALUES (?,?,?,?)";
  db.query(sqlInsert, [ID, Email, Name, Password], (err, results) => {
    console.log(err);
  });
});

app.get("/api/select", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  console.log("email : " + email);
  console.log("password : " + password);
  const sqlStatement = "select ID from Model where Email = ? and Password = ?";
  db.query(sqlStatement, [email, password], (err, result) => {
    console.log(result.length);
    if (result.length != 0) return res.send(true);
    res.send(false);
  });
});

app.get("/api/selectImg", (req, res) => {
  const target = req.query.target;
  console.log("ImageID: " + target);
  const sqlStatement = "select ImageData from Image where ImageID = ?";
  db.query(sqlStatement, [target], (err, result) => {
    console.log(result.length);
    if (result.length != 0) return res.send(result);
    res.send("fail to get image");
  });
});

app.get("/api/choose", (req, res) => {
  const email = req.query.email;
  console.log("email : " + email);

  const sqlStatement = "SELECT ID FROM Model WHERE Email = ?";
  db.query(sqlStatement, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send(false); // Respond with false on error
    }
    console.log("Number of results:", result.length);
    // Check if any results were returned
    if (result.length > 0) {
      return res.send({ exists: true });
    } else {
      res.send({ exists: false });
    }
  });
});

/* app.put("/api/update",(req,res)=>{
    const Email = req.body.Email
    const Password = req.body.Password


    const sql_update = "UPDATE Model SET Email = ?,Password = ?,F_name = ?,L_name = ?,Card_ID = ? , Birth_date = ? WHERE Username = ?"

    db.query(sql_update,[Username, Password, F_name, L_name, Card_ID, Birth_date,UseForWhere], (err, results)=>{
        res.send(results);
    })
    
})
 */

app.listen(3000, () => console.log("Server is running on port 3000"));
