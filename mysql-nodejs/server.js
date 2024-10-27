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
    if (result.length != 0) return res.send(result);
    res.send("deny");
  });
});

app.get("/api/getProfile", (req, res) => {
  const currentUser = req.query.currentUser;
  const sqlStatement = "select * from Model WHERE ID = ?";
  db.query(sqlStatement, [currentUser], (err, result) => {
    console.log("get Profile");
    if (result.length != 0) return res.send(result);
    console.log(err);
  });
});

app.get("/api/selectImg", (req, res) => {
  const target = req.query.target;
  console.log("ImageID: " + target);
  const sqlStatement = "select ImageData from Image where ImageID = ?";
  db.query(sqlStatement, [target], (err, result) => {
    console.log(result.length);
    if (result.length != 0) {
      return res.send(result);
    } else {
      return res.send(null);
    }
  });
});

app.get("/api/getItem", (req, res) => {
  const ID = req.query.ID;

  const sqlStatement =
    "select ItemID, ItemName, Price, ImageData from Item where ID = ?";

  db.query(sqlStatement, [ID], (err, results) => {
    //console.log(results.data.length);
    //console.log("test");

    if (results.length != 0) {
      return res.send(results);
    } else {
      return res.send(JSON.parse("{}"));
    }
  });
});

app.post("/api/uploadImg", (req, res) => {
  const ImageID = req.body.ImageID;
  const ImageData = req.body.ImageData;
  const ID = req.body.ID;

  const sqlInsert = "INSERT INTO Image VALUES (?,?,?)";
  db.query(sqlInsert, [ImageID, ImageData, ID], (err, result) => {
    console.log(err);
    console.log("Image Added");
  });
});

app.post("/api/uploadItem", (req, res) => {
  const ItemID = req.body.ItemID;
  const ItemName = req.body.ItemName;
  const Price = req.body.Price;
  const ID = req.body.ID;
  const ImageData = req.body.ImageData;

  const sqlInsert = "INSERT INTO Item VALUES (?,?,?,?,?)";

  db.query(
    sqlInsert,
    [ItemID, ItemName, Price, ID, ImageData],
    (err, results) => {
      console.log(err);
      console.log("Item Added");
    }
  );
});

app.put("/api/updateImg", (req, res) => {
  const ImageData = req.body.ImageData;
  const ImageID = req.body.ImageID;

  const sqlUpdate = "UPDATE Image SET ImageData = ? WHERE ImageID = ?";

  db.query(sqlUpdate, [ImageData, ImageID], (err, results) => {
    console.log(err);
    console.log("Table Updated");
  });
});

app.put("/api/setStatus", (req, res) => {
  const ID = req.body.ID;

  const sqlUpdate = "UPDATE MODEL SET IsOpen = !IsOpen WHERE ID = ?";

  db.query(sqlUpdate, [ID], (err, results) => {
    console.log(err);
    console.log("Shop Open/Close");
  });
});

app.put("/api/updateShop", (req, res) => {
  const ID = req.body.ID;
  const shopName = req.body.shopName;

  const sqlUpdate = "UPDATE MODEL SET ShopName = ? WHERE ID = ?";

  db.query(sqlUpdate, [shopName, ID], (err, results) => {
    console.log(err);
    console.log("ShopName Updated");
  });
});

app.put("/api/deleteItem", (req, res) => {
  const ItemID = req.body.ItemID;

  const sqlStatement = "DELETE FROM Item WHERE ItemID = ?";

  db.query(sqlStatement, [ItemID], (err, results) => {
    console.log(err);
    console.log(results);
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
app.get("/api/checkOpen",(req,res)=>{
const IsOpen = req.query.IsOpen
const ID = req.query.ID
const sqlStatement = "SELECT * from Model Where IsOpen = 1 and ID != ID"
db.query(sqlStatement,[ID],(err,result)=>{
  if(err){
    console.error("Database error:", err);
    return res.status(500).send(false); // Respond with false on error
  }
  if (result.length != 0) {
    return res.send(result);
  } else {
    return res.send(null);
  }
})
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
