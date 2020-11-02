//zmienne, stałe
//TODO ustaw zależnośc łądowania strony od cookie w routingu dla adminan
//TODO działa ustawnianie funckji nie działą czytanie  == linijka 20 
var express = require("express")
var app = express()
const PORT = 3000;
// routing stuff 
var path = require("path")
app.use(express.static('static'))
//form stuff
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
let userDataArray = []
//logIn Stuff
var express = require('express')
var cookieParser = require('cookie-parser')

// routingi odpowiednich stron
app.get("/admin", function (req, res) { // dla admina z warunkiem na cookies
    console.log(req.cookies)
    if (req.cookies == undefined)
        res.sendFile(path.join(__dirname + "/static/pages/adminPage.html"))
    else
        res.sendFile(path.join(__dirname + "/static/pages/adminLoggedPage.html"))
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
// obsługa routingu który nie został podany zwraca error 404
app.get('*', function (req, res) {
    res.status(404).send('Przykro mi, wystąpił błąd :(((    ');
});
//obsługa pobierania formularzy 

// dla formularza obsługi danych użytkownika 
app.post("/RegisterFromula", function (req, res) {
    console.log(req.body)
    if (userDataArray.findIndex(array => array.login === req.body.login) == "-1" && req.body.login != '' && req.body.password != '') {  // kontroluje brak powtórzenia loginu wymagane pole hasła i loginu nie jest puste  jeśli jakiś super user nie pochwali się jakim jest hakerem i nie usunie w konsoli input required
        userDataArray.push(req.body)
        res.sendFile(path.join(__dirname + "/static/pages/registerPage.html"))
    } else
        res.send("<h1>Podane dane zostały wykorzystane lub podane dane były błędne</h1><a href='main'>przejdź na stronę główną</a>")
    console.log(userDataArray)
})
//logIn formula
app.post('/LoginFormula', function (req, res) {
    console.log(req.body)
    let searchiedindex = userDataArray.findIndex(array => array.login === req.body.login)
    if (searchiedindex != '-1') { // oznaczenie to oznacza że został znaleziowny w tablicy / bazie danych 
        res
            .cookie("LogData", "User is logged" + req.body.login, { httpOnly: true })
            .send()
        console.log("ładowanie lepszego widoku")
    } else {
        res.send("<h1>Dane logowania niepoprawne </h1><a href='main'>przejdź na stronę główną</a>")
    }
})




//nasłuch na określonym porcie
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})