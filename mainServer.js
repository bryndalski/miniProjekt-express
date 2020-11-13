//zmienne, stałe
var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
// routing stuff 
var path = require("path")
app.use(express.static('static'))
//form stuff
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: true
}));
// let userDataArray = [] // pusta tablica
let userDataArray = [{
        id: 1,
        login: 'Monika',
        password: 'monika123',
        ageSelect: '17',
        uczen: 'on',
        plec: 'k'
    },
    {
        id: 2,
        login: 'Janek',
        password: 'janek123',
        ageSelect: '16',
        uczen: 'on',
        plec: 'm'
    },
    {
        id: 3,
        login: 'Kasia',
        password: 'kasia123',
        ageSelect: '33',
        uczen: 'off',
        plec: 'k'
    },
    {
        id: 4,
        login: 'Ola',
        password: 'ola123',
        ageSelect: '19',
        uczen: 'on',
        plec: 'k'
    },
    {
        id: 5,
        login: 'Adam',
        password: 'adam123',
        ageSelect: '12',
        uczen: 'on',
        plec: 'm'
    },
    {
        id: 6,
        login: 'Maciek',
        password: 'maciek123',
        ageSelect: '17',
        uczen: 'on',
        plec: 'm'
    },
    {
        id: 7,
        login: 'Marysia',
        password: 'marysia123',
        ageSelect: '17',
        uczen: 'off',
        plec: 'k'
    }
] // używana do testów i sprawdzania zostawiam, może się przydać :)
//logIn Stuff
let logged = false
//Admin stuff
const pageBasic = "<body style='background-color:black;width:100vw;height:100vh'><a style='color:white;margin:10px;font-size:large;' href='/sort'>Sort</a><a  style='color:white;margin:10px;font-size:large;' href='gender'>gender</a><a  style='color:white;margin:10px;font-size:large;'href='show'>Show</a>"
sortigPossibility = true
// routingi odpowiednich stron
app.get("/admin", function (req, res) { // dla admina 
    if (logged)
        res.sendFile(path.join(__dirname + "/static/pages/adminLoggedPage.html"))
    else
        res.sendFile(path.join(__dirname + "/static/pages/adminPage.html"))
})
app.get("/login", function (req, res) { // dla logina
    res.sendFile(path.join(__dirname + "/static/pages/loginPage.html"))
})
app.get("/register", function (req, res) { // dla rejestracji
    res.sendFile(path.join(__dirname + "/static/pages/registerPage.html"))
})
app.get("/", function (req, res) { // dla maina bez nazwy 
    res.sendFile(path.join(__dirname + "/static/pages/mainPage.html"))
})
//obsługa pobierania formularzy 
// dla formularza obsługi danych użytkownika 
app.post("/RegisterFromula", function (req, res) {
    if (userDataArray.findIndex(array => array.login === req.body.login) == "-1" && req.body.login != '' && req.body.password != '' && req.body.plec != undefined && req.body.ageSelect != undefined && req.body.ageSelect >= 10 && req.body.ageSelect <= 100) { // kontroluje brak powtórzenia loginu wymagane pole hasła i loginu nie jest puste  jeśli jakiś super user nie pochwali się jakim jest hakerem i nie usunie w konsoli input requXired albo nie zacznie się bawić VAlue w inpucie i ustaiwać np 124123123123 :)
        userDataArray.push(req.body)
        userDataArray[userDataArray.length - 1].id = userDataArray.length
        res.send("<h1>Witaj " + req.body.login + ", Rejestracja zakończona sukcesem </h1><a href='/'>przejdź na stronę główną</a>")
    } else
        res.send("<h1>Podane dane zostały wykorzystane lub podane dane były błędne</h1><a href='/'>przejdź na stronę główną</a>")
})
//logIn formula
app.post('/LoginFormula', function (req, res) {
    let searchiedindex = userDataArray.findIndex(array => array.login === req.body.login)
    if (searchiedindex != '-1' && req.body.password === userDataArray[searchiedindex].password) { // oznaczenie to oznacza że został znaleziowny w tablicy / bazie danych 
        logged = true;
        res.redirect('/admin');
    } else {
        res.send("<h1>Dane logowania niepoprawne </h1><a href='/'>przejdź na stronę główną</a>")
    }
})
//obsługa adminPanela
app.get("/logOut", function (req, res) { // dla maina bez nazwy 
    if (!logged)
        res.sendFile(path.join(__dirname + "/static/pages/errorPage.html"))
    logged = false;
    res.redirect('/')
})
//obsługa podanych stringów na serwerze
// funkcja tworząca pojedynczy rząd w tabeli  
function arrayRowMaker(tablica, i) {
    let maintainRow = ''
    maintainRow += "<tr style='background-color:rgb(36, 36, 37);color:ghostwhite;border:solid 1px ghostwhite' ><th style='background-color:rgb(36, 36, 37);color:ghostwhite;border:solid 1px ghostwhite'> id :  " + tablica[i].id + "</th><th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'> user:  " + tablica[i].login + " - " + tablica[i].password + "</th>"
    if (tablica[i].uczen == "on")
        maintainRow += "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'>Uczeń : <input type='checkbox' checked disabled></th>"
    else
        maintainRow += "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'>Uczeń : <input type='checkbox' disabled></th>"
    maintainRow += "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'> Wiek: " + tablica[i].ageSelect + "</th>" + "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'> płeć: " + tablica[i].plec + "</th></tr>"
    return maintainRow
}
// funckja for gender
function genderArrayRowMaker(tablica, i) {
    let maintainRow = ''
    maintainRow += "<tr style='background-color:rgb(36, 36, 37);color:ghostwhite;border:solid 1px ghostwhite' ><th style='background-color:rgb(36, 36, 37);color:ghostwhite;border:solid 1px ghostwhite'> id: " + tablica[i].id + "</th>"
    maintainRow += "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'> płeć: " + tablica[i].plec + "</th></tr>"
    return maintainRow
}
// funckcja for sortowanie 
function arrayRowMakerForSort(tablica, i) {
    let maintainRow = ''
    maintainRow += "<tr style='background-color:rgb(36, 36, 37);color:ghostwhite;border:solid 1px ghostwhite' ><th style='background-color:rgb(36, 36, 37);color:ghostwhite;border:solid 1px ghostwhite'> id :  " + tablica[i].id + "</th><th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'> user:  " + tablica[i].login + " - " + tablica[i].password + "</th>"
    maintainRow += "<th style='background-color:rgb(36, 36, 37);color:ghostwhite; border:solid 1px ghostwhite'> Wiek: " + tablica[i].ageSelect + "</th></tr>"
    return maintainRow
}
// obsługa show
app.get('/show', function (req, res) {
    if (logged) {
        userDataArray = userDataArray.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        });;
        let tempPage = pageBasic + "<table style='width:80vw;height:60vh ' >"
        for (i = 0; i < userDataArray.length; i++) { // tworzę stringa z tabelą
            tempPage += arrayRowMaker(userDataArray, i)
        }
        tempPage += "</table></body>"
        res.send(tempPage)
    } else
        res.sendFile(path.join(__dirname + "/static/pages/adminPage.html"))
})
//obsługa gender
app.get('/gender', function (req, res) {
    if (logged) {
        let tempPage = pageBasic + "<table style='margin:0 auto;width:80vw;height:30vh ' >"
        let manTable = "<table style='margin:0 auto;width:80vw;height:30vh;margin-top:10px;' >"
        for (i = 0; i < userDataArray.length; i++) { // tworzę stringa z tabelą
            if (userDataArray[i].plec == "m")
                manTable += genderArrayRowMaker(userDataArray, i)
            else
                tempPage += genderArrayRowMaker(userDataArray, i)
        }
        tempPage += "</table>" + manTable + "</table></body>"
        res.send(tempPage)
    } else
        res.sendFile(path.join(__dirname + "/static/pages/adminPage.html"))
})

//obsługa sort jako strony i formularza 
app.get('/sort', function (req, res) {
    if (logged) {
        let mustliUserDate = userDataArray;
        mustliUserDate = mustliUserDate.sort(function (a, b) {
            return parseFloat(a.ageSelect) - parseFloat(b.ageSelect);
        });;
        let tempPage = pageBasic
        if (sortigPossibility)
            tempPage += "<form  onchange='this.submit()'  method='POST' action='/sort'><input checked type='radio' name='type' id='r1'value='up' ><label style='color:white'for='#r1'>Rosnąco</label> <input type='radio' name='type' id='r2'value='dwn'><label style='color:white' for='#r2'>Malejąco</label></form><table style='margin:0 auto;width:80vw;height:30vh ' >"
        else {
            tempPage += "<form  onchange='this.submit()'  method='POST' action='/sort'><input type='radio' name='type' id='r1'value='up' ><label style='color:white'for='#r1'>Rosnąco</label> <input type='radio' checked name='type' id='r2'value='dwn'><label style='color:white' for='#r2'>Malejąco</label></form><table style='margin:0 auto;width:80vw;height:30vh ' >"
            mustliUserDate.reverse()
        }
        let manTable = "<table style='margin:0 auto;width:80vw;height:30vh;margin-top:10px;' >"
        for (i = 0; i < userDataArray.length; i++) { // tworzę stringa z tabelą
            if (sortigPossibility)
                manTable += arrayRowMakerForSort(mustliUserDate, i)
            else
                tempPage += arrayRowMakerForSort(mustliUserDate, i)
        }
        tempPage += "</table>" + manTable + "</table></body>"
        res.send(tempPage)
    } else
        res.sendFile(path.join(__dirname + "/static/pages/adminPage.html"))
})
app.post('/sort', function (req, res) {
    if (req.body.type == 'dwn')
        sortigPossibility = false
    else
        sortigPossibility = true
    res.redirect("/sort")
})
// obsługa routingu który nie został podany zwraca stronę, z stosowną informacją ( umieszczam na końcu coś w stulu switcha i opcja default)
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/errorPage.html"))
});
//nasłuch na określonym porcie
app.listen(PORT, function () {
    console.log("Start Serwera na porcie " + PORT)
})
