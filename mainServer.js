//zmienne, stałe
var express = require("express")
var app = express()
const PORT = 5500;
// routing stuff 
var path = require("path")
app.use(express.static('static'))
//form stuff
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
// let userDataArray = []
let userDataArray = [
    {
        login: 'Maciek',
        password: '123',
        ageSelect: '17',
        uczen: 'on',
        plec: 'on'
    },
    {
        login: '123',
        password: '123',
        ageSelect: '16',
        uczen: 'on',
        plec: 'on'
    },
    {
        login: '12',
        password: '22',
        ageSelect: '3333',
        uczen: 'off',
        plec: 'on'
    },
    {
        login: 'bryndalski',
        password: '123',
        ageSelect: '19',
        uczen: 'on',
        plec: 'on'
    },
    {
        login: '4124124',
        password: '141241',
        ageSelect: '12',
        uczen: 'on',
        plec: 'on'
    },
    {
        login: 'Maciek',
        password: '123',
        ageSelect: '17',
        uczen: 'on',
        plec: 'on'
    },
    {
        login: '123',
        password: '123',
        ageSelect: '16',
        uczen: 'on',
        plec: 'on'
    },
    {
        login: '12',
        password: '22',
        ageSelect: '3333',
        uczen: 'off',
        plec: 'on'
    },
    {
        login: 'bryndalski',
        password: '123',
        ageSelect: '19',
        uczen: 'on',
        plec: 'on'
    },
    {
        login: '4124124',
        password: '141241',
        ageSelect: '12',
        uczen: 'on',
        plec: 'on'
    },
    {
        login: 'kubabryndal@gmail.com',
        password: '1231',
        ageSelect: '21',
        uczen: 'on',
        plec: 'on'
    }
]

//logIn Stuff
var express = require('express')
var cookieParser = require('cookie-parser');
const { S_IFBLK } = require("constants");
app.use(cookieParser())
//Admin stuff
const pageBasic = "<body style='background-color:black;width:100vw;height:100vh'><a href='/sort'>Sort</a><a href='gender'>gender</a><a href='show'>Show</a>"
// routingi odpowiednich stron
app.get("/admin", function (req, res) { // dla admina z warunkiem na cookies
    if (req.cookies.LogData == undefined)
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

//obsługa pobierania formularzy 
// dla formularza obsługi danych użytkownika 
app.post("/RegisterFromula", function (req, res) {
    if (userDataArray.findIndex(array => array.login === req.body.login) == "-1" && req.body.login != '' && req.body.password != '') {  // kontroluje brak powtórzenia loginu wymagane pole hasła i loginu nie jest puste  jeśli jakiś super user nie pochwali się jakim jest hakerem i nie usunie w konsoli input required
        userDataArray.push(req.body)
        res.sendFile(path.join(__dirname + "/static/pages/registerPage.html"))
    } else
        res.send("<h1>Podane dane zostały wykorzystane lub podane dane były błędne</h1><a href='main'>przejdź na stronę główną</a>")
    console.log(userDataArray)
})
//logIn formula
app.post('/LoginFormula', function (req, res) {
    let searchiedindex = userDataArray.findIndex(array => array.login === req.body.login)
    if (searchiedindex != '-1') { // oznaczenie to oznacza że został znaleziowny w tablicy / bazie danych 
        res
            .cookie("LogData", req.body.login, { httpOnly: true })
            .redirect('/admin');
    } else {
        res.send("<h1>Dane logowania niepoprawne </h1><a href='main'>przejdź na stronę główną</a>")
    }
})
//obsługa adminPanela
app.get("/logOut", function (req, res) { // dla maina bez nazwy 
    if (req.cookies.LogData == undefined)
        res.sendFile(path.join(__dirname + "/static/pages/errorPage.html"))
    console.log(res.cookie)
    res
        .clearCookie("LogData")
        .redirect('/main')
})

//obsługa podanych stringów na serwerze 
app.get('/show', function (req, res) {
    if (req.cookies.LogData != undefined) {
        let tempPage = pageBasic + "<table style='width:80vw;height:60vh ' >"
        for (i = 0; i < userDataArray.length; i++) {// tworzę stringa z tabelą
            tempPage += "<tr style='background-color:rgb(36, 36, 37);color:ghostwhite;border:solid 1px ghostwhite' ><th style='background-color:rgb(36, 36, 37);color:ghostwhite;border:solid 1px ghostwhite'>" + i + "</th><th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'>" + userDataArray[i].login + " - " + userDataArray[i].password + "</th>"
            if (userDataArray[i].uczen == "on")
                tempPage += "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'>Uczeń : <input type='checkbox' checked disabled></th>"
            else
                tempPage += "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'>Uczeń : <input type='checkbox' disabled></th>"
            tempPage += "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'> Wiek: " + userDataArray[i].ageSelect + "</th>" + "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'> płeć: " + userDataArray[i].plec + "</th></tr>"
        }
        tempPage += "</table></body>"
        res.send(tempPage)
    } else
        res.sendFile(path.join(__dirname + "/static/pages/errorPage.html"))
})
// obsługa routingu który nie został podany zwraca stronę, z stosowną informacją ( umieszczam na końcu coś w stulu switcha i opcja default)
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/errorPage.html"))
});

//nasłuch na określonym porcie
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})