"use strict";

var fs = require("fs");
var path = require("path");
var petsPath = path.join(__dirname, "../pets.json");

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.disable("x-powered-by");

app.get("/pets", function(req, res) {
  console.log("inside pets");
  fs.readFile(petsPath, "utf8", function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);
    if (id < 0 || id >= pets.length || isNaN(Number(id))) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(pets[id]);
  });
});

app.post('/pets/:age/:kind/:name', function (req, res) {
  fs.readFile(petsPath, "utf8", function (readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(petsJSON);
    console.log(pets);
    console.log("in");
    var pet = {};
    console.log(req.params.age);
    console.log(req.params.kind);
    console.log(req.params.name);
    var age = req.params.age;
    var kind = req.params.kind;
    var name = req.params.name;
    pet.name = name;
    pet.age = age;
    pet.kind = kind;
    if (!pet.name || !pet.age || !pet.kind) {
      console.log("in the if");
      return res.sendStatus(400);
    }
    console.log(name);
    console.log(age);
    console.log(kind);

    pets.push(pet);

    var newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(pet);
    });
  });
});

// app.post('/pets?:age=/\d+/i&:kind=/.*/i&:name=/.*/', function (req, res) {
//   fs.readFile(petsPath, "utf8", function (readErr, petsJSON) {
//     if (readErr) {
//       console.error(readErr.stack);
//       return res.sendStatus(500);
//     }
//     var pets = JSON.parse(petsJSON);
//     console.log(pets);
//     console.log("in");
//     var pet = {};
//     console.log(req.query.age);
//     console.log(req.query.kind);
//     console.log(req.query.name);
//     var age = req.query.age;
//     var kind = req.query.kind;
//     var name = req.query.name;
//     pet.name = name;
//     pet.age = age;
//     pet.kind = kind;
//     if (!pet.name || !pet.age || !pet.kind) {
//       console.log("in the if");
//       return res.sendStatus(400);
//     }
//     console.log(name);
//     console.log(age);
//     console.log(kind);
//
//     pets.push(pet);
//
//     var newPetsJSON = JSON.stringify(pets);
//
//     fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
//       if (writeErr) {
//         console.error(writeErr.stack);
//         return res.sendStatus(500);
//       }
//
//       res.set('Content-Type', 'text/plain');
//       res.send(pet);
//     });
//   });
// });



app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log("Listening on port", port, "and for project fs-pet-shop (Express)");
});
