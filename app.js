import express from "express";
import fs from "fs";

const app = express();

app
  .get("/", (req, res) => {
    res.send("Hello angular devs");
  })
  .get("/user/users", getUsers)
  .get("/user/userSingle/:userId", getSingleUser);

app.listen(3000, () => {
  console.log("Listening at: http://localhost:3000");
});

function getUsers(req, res) {
  fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
    // console.log(results);
    let userList = JSON.parse(results);
    res.send(userList);
  });
}

function getSingleUser(req, res) {
  fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
    let userId = +req.params.userId;
    // console.log(results);
    let userList = JSON.parse(results);
    let singleUser = userList.filter((user) => {
      return user.userId === userId;
    })[0];
    res.send(singleUser);
  });
}
