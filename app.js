const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Be sure to use all your local and remote modules

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs")


//Array for Starting list items
let items = ["Wake Up"];

// Array for WorkListItems
let workListItems = [];

//Global variable for getting current date
let today = new Date();
let options = {
  weekday: "long",
  month : "long",
  day: "numeric"
  }

let day = today.toLocaleDateString("en-NG", options);


app.get("/", function(req, res){

res.render("list", {listTitle:day, newListItems:items})

});

// Note that you can use different templates with the same post request
app.post("/", function (req, res) {
  let item = req.body.newItems;

  if (req.body.list == "WeekDay") {
    workListItems.push(item);
    res.redirect("/work")
  }
  else{
    items.push(item);
    res.redirect("/")
  
}
  
});

//Work Route

app.get("/work", function (req, res) {
  

  res.render("list", {listTitle:"WeekDay", newListItems:workListItems} )
})


app.listen(process.env.PORT||3000, function(){
  console.log("Server started on port 3000.");
});
