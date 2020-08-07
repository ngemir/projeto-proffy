//Dados 
const proffys = [
    { 
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatapp: "899875482", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20,00", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    },
    { 
        name: "Mayk Brito", 
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatapp: "899875482", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Matemática", 
        cost: "20,00", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    },
    { 
        name: "Emir Takayama", 
        avatar: "https://avatars3.githubusercontent.com/u/32247042?s=460&u=ce5e28884fff496f03e5f00e1da1bfd7fc46a72f&v=4",
        whatapp: "899875482", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Física", 
        cost: "20,00", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    }
];

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

const title = "Hi friend";

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1;
    return subjects[position];
}

//Funcionalidades
//Funções para enviar html
function pageLanding(req, res) {
    //Usando node → return res.sendFile(__dirname + "/views/index.html");
    return res.render("index.html"); //usando nunjucks
}

function pageStudy(req, res) {
    // return res.sendFile(__dirname + "/views/study.html"); ← Antigo
    
    const filters = req.query;
    return res.render("study.html", {proffys, filters, subjects, weekdays /*title ---- Ative caso queira ver nunjucks mandando no study*/});
}

function pageGiveClasses(req, res) {
    // return res.sendFile(__dirname + "/views/give-classes.html");

    //adiciona dados ao lista de proffys
    const data = req.query;
    
    //Pega a chave dos dados e transforma em array e verifica o tamanho comparando com acima de 0
    //Se for verdade tem algo
    const isNotEmpty = Object.keys(data).length > 0;

    if (isNotEmpty) {

        data.subject = getSubject(data.subject);

        //adicionar dados na lista de proffys
        proffys.push(data);

        return res.redirect("/study");
    }



    return res.render("give-classes.html",{subjects, weekdays});
}


//Servidor
// Configuração das dependencias
const express = require('express');
const server = express();

//Configurar nunjucks
//Com nunjuck possibilita o envio do objeto proffys (objeto JSON)
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.use(express.static("public"))  //Aqui altera a pasta raiz para pasta public

.get("/", pageLanding)  //Pega o link(rotas) e executa função
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)

.listen(5500);//escuta a porta 5500 o localhost