"use strict";

var fs = require("fs");
var path = require("path");
var petsPath = path.join(__dirname, "../pets.json");

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];

if (cmd === "read" && index === undefined) {
  console.log(cmd);
  fs.readFile(petsPath, "utf8", function (err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    console.log(pets);
    console.log(cmd.length);
  });
}
else if (cmd === "read" && Number(index) >= 0) {
  console.log("in the else if");
  fs.readFile(petsPath, "utf8", function (err, data) {
    if (err) {
      throw err;
    }
    else {
      var pets = JSON.parse(data);
      if (Number(index) > pets.length-1 || Number(index) < 0) {
        console.log("in the if for the console.error");
        console.error(`Usage: ${node} ${file} ${cmd} PET`);
        process.exit(1);
      }
      else {
        console.log(pets[Number(index)]);
      }
    }
  });
}
else if (cmd === "create") {
  fs.readFile(petsPath, "utf8", function (readErr, data) {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    let age = process.argv[3];
    let kind = process.argv[4];
    let name = process.argv[5];

    if (!age || !kind || !name) {
      console.log("in the if not age");
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
    var pet = {};
    pet.age = age;
    pet.kind = kind;
    pet.name = name;
    pets.push(pet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function (writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  });
}
else if (cmd === "update") {
  fs.readFile(petsPath, "utf8", function (readErr, data) {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    let index = process.argv[3];
    let age = process.argv[4];
    let kind = process.argv[5];
    let name = process.argv[6];


    if (!index || !age || !kind || !name) {
      console.log("in the if not for update");
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    var pet = {};
    pet.age = age;
    pet.kind = kind;
    pet.name = name;
    pets.splice(index, 1, pet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function (writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  });
}
else if (cmd === "destroy") {
  fs.readFile(petsPath, "utf8", function (readErr, data) {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    let index = process.argv[3];


    if (!index) {
      console.log("in the if not for destroy");
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
    console.log(pets[Number(index)]);
    pets.splice(index, 1);
    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function (writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}

else {
  console.log("in the else statement");
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
