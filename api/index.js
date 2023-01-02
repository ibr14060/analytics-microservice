//
//const dbo = require("../db/conn");
//const app = express();

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = 5000;
app.use(cors());
app.use(express.json());
//app.use(require("../api"));
// get driver connection
const dbo = require("../db/conn");
const recordRoutes =express.Router();
app.use(recordRoutes);
app.listen(port, () => {
  // perform a database connection when server starts
  
  console.log(`Server is running on port: ${port}`);
});

  
// This section will help you get a list of all the records.
//deh el sa7
recordRoutes.route("/api/analytics").get(async function (req, res) {
  await dbo.connectToServer(function (err) {

    if (err) console.error(err);
let db_connect = dbo.getDb("worldcup22");
//let ticketss=[]
db_connect
  .collection("analytics")
  .find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  }); 
  });

});
// add match to database
recordRoutes.route("/api/analytics/add").post(async function(req,res){
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
    const match =req.body
    let db_connect = dbo.getDb("worldcup22");
    db_connect
    .collection("analytics")
    .insertOne(match)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      res.status(500).json({err:'could not adda new match'})
    })
    })
  


})

/*
//search by awayteam and hometeam
recordRoutes.route("/shop/:id").get(function(req, res) {
  let db_connect = dbo.getDb("worldcup22");
      db_connect
      .collection("Shop")
      .find({
        $or: [
          {
            "AwayTeam": req.params.id,
          },
          {
            "HomeTeam": req.params.id,
          }
        ],
      }).toArray((err,result)=>{
        if (err) throw err;
        res.json(result);
      });
});
// delete ticket by id
recordRoutes.route("/shop/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb("worldcup22");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Shop").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
recordRoutes.route("/shop/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      MatchNumber: req.body.MatchNumber,
      
    },
  };
  db_connect
    .collection("shop")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});
 // decrement the number of tickets
recordRoutes.route("/update/:matchNO/:cno/:capacity").patch(function (req, response) {
let decrement=Number(req.params.capacity)*-1
let db_connect = dbo.getDb("worldcup22");
let myquery = { "matchNumber": Number(req.params.matchNO),
"availability.category1.price":75 };
let newvalues = {
  $inc: {
"availability.category1.count":decrement
  },
};
if (Number(req.params.cno)==1){
  myquery = { "matchNumber": Number(req.params.matchNO),
"availability.category1.price":75 };
newvalues = {
  $inc: {
"availability.category1.count":decrement
  },
};
}
else if(Number(req.params.cno)==2){
  myquery = { "matchNumber": Number(req.params.matchNO),
"availability.category2.price":125 };
newvalues = {
  $inc: {
"availability.category2.count":decrement
  },
};
}
else {
  myquery = { "matchNumber": Number(req.params.matchNO),
"availability.category3.price":195 };
newvalues = {
  $inc: {
"availability.category3.count":-1
  },
};
}
//console.log(Number(myquery._id.availability.category1.count))

db_connect
  .collection("shopMasterlist")
  .updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated for reservation");
    response.json(res);
  });
});
 /*
recordRoutes.route("/update/:id/:cno/:capacity").patch(function (req, response) {
let decrement=Number(req.params.capacity)*-1
let db_connect = dbo.getDb("worldcup22");
let myquery = { "_id": ObjectId(req.params.id),
"availability.category1.price":75 };
let newvalues = {
  $inc: {
"availability.category1.count":decrement
  },
};
if (Number(req.params.cno)==1){
  myquery = { "_id": ObjectId(req.params.id),
"availability.category1.price":75 };
newvalues = {
  $inc: { "availability.category1.count":decrement
  },
};
}
else if(Number(req.params.cno)==2){
  myquery = { "_id": ObjectId(req.params.id),
"availability.category2.price":125 };
newvalues = {
  $inc: {
"availability.category2.count":decrement
  },
};
}
else {
  myquery = { "_id": ObjectId(req.params.id),
"availability.category3.price":195 };
newvalues = {
  $inc: {
"availability.category3.count":-1
  },
};
}
//console.log(Number(myquery._id.availability.category1.count))

db_connect
.collection("shopMasterlist")
.updateOne(myquery, newvalues, function (err, res) {
if (err) throw err;
console.log("1 document updated for reservation");
response.json(res);
});
});

// increment the number of tickets
recordRoutes.route("/cancel/:matchNO/:cno/:capacity").patch(function (req, response) {
let increment=Number(req.params.capacity)
let db_connect = dbo.getDb("worldcup22");
let myquery = { "matchNumber": Number(req.params.matchNO),
"availability.category1.price":75 };
let newvalues = {
$inc: {
  "availability.category1.count":increment
},
};
if (Number(req.params.cno)==1){
myquery = { "matchNumber": Number(req.params.matchNO),
"availability.category1.price":75 };
newvalues = {
$inc: {
  "availability.category1.count":increment
  },
};
}
else if(Number(req.params.cno)==2){
  myquery = { "matchNumber": Number(req.params.matchNO),
"availability.category2.price":125 };
newvalues = {
  $inc: {
  "availability.category2.count":increment
},
};
}
else {
myquery = { "matchNumber": Number(req.params.matchNO),
"availability.category3.price":195 };
newvalues = {
$inc: {
  "availability.category3.count":increment
},
};
}
//console.log(Number(myquery._id.availability.category1.count))

db_connect
  .collection("shopMasterlist")
  .updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated for reservation");
    response.json(res);
  });
});
/*
recordRoutes.route("/cancel/:id/:cno/:capacity").patch(function (req, response) {
  let increment=Number(req.params.capacity)
let db_connect = dbo.getDb("worldcup22");
let myquery = { "_id": ObjectId(req.params.id),
"availability.category1.price":75 };
let newvalues = {
  $inc: {
"availability.category1.count":increment
  },
};
if (Number(req.params.cno)==1){
  myquery = { "_id": ObjectId(req.params.id),
"availability.category1.price":75 };
newvalues = {
  $inc: {
"availability.category1.count":increment
  },
};
}
else if(Number(req.params.cno)==2){
  myquery = { "_id": ObjectId(req.params.id),
"availability.category2.price":125 };
newvalues = {
  $inc: {
"availability.category2.count":increment
  },
};
}
else {
  myquery = { "_id": ObjectId(req.params.id),
"availability.category3.price":195 };
newvalues = {
  $inc: {
"availability.category3.count":increment
  },
};
}
//console.log(Number(myquery._id.availability.category1.count))

db_connect
.collection("shopMasterlist")
.updateOne(myquery, newvalues, function (err, res) {
if (err) throw err;
console.log("1 document updated for reservation");
response.json(res);
});
});
*/
/*
recordRoutes.route("/shop/delete/:id").get(function(req, res) {
  let db_connect = dbo.getDb("worldcup22");
      db_connect
      .collection("Shop")
      .find({
        $or: [
          {
            "AwayTeam": req.params.id,
          },
          {
            "HomeTeam": req.params.id,
          }
        ],
      }).toArray((err,result)=>{
        if (err) throw err;
        res.json(result);
      });
});


// This section will help you get a single record by id
recordRoutes.route("/shop/:id").get(function (req, res) {
let db_connect = dbo.getDb("worldcup22");
let myquery = { _id: ObjectId(req.params.id) };
db_connect
  .collection("Shop")
  .findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route("/shop/add").post(function (req, response) {
let db_connect = dbo.getDb();
let myobj = {
  name: req.body.name,
  position: req.body.position,
  level: req.body.level,
};
db_connect.collection("records").insertOne(myobj, function (err, res) {
  if (err) throw err;
  response.json(res);
});
});

This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
let db_connect = dbo.getDb();
let myquery = { _id: ObjectId(req.params.id) };
let newvalues = {
  $set: {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  },
};
db_connect
  .collection("records")
  .updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
    response.json(res);
  });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
let db_connect = dbo.getDb();
let myquery = { _id: ObjectId(req.params.id) };
db_connect.collection("records").deleteOne(myquery, function (err, obj) {
  if (err) throw err;
  console.log("1 document deleted");
  response.json(obj);
});
});
 */

module.exports = recordRoutes;