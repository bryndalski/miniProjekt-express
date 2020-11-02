//zmienne, stałe

var express = require("express")
var app = express()
const PORT = 3000;
// routing stuff 
var path = require("path")
app.use(express.static('static'))



// routingi odpowiednich stron

app.get("/admin", function (req, res) { // dla admina
    res.sendFile(path.join(__dirname + "/static/pages/adminPage.html"))
})
app.get("/login", function (req, res) { // dla logina
    res.sendFile(path.join(__dirname + "/static/pages/loginPage.html"))
})
app.get("/register", function (req, res) {  // dla rejestracji
    res.sendFile(path.join(__dirname + "/static/pages/registerPage.html"))
})
app.get("/main", function (req, res) { // dla maina
    res.sendFile(path.join(__dirname + "/static/pages/mainPage.html"))
})
app.get("/", function (req, res) { // dla maina bez nazwy 
    res.sendFile(path.join(__dirname + "/static/pages/mainPage.html"))
})
//nasłuch na określonym porcie
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})