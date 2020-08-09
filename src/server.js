
//Servidor
// Configuração das dependencias
const express = require('express');
const server = express();

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages');

//Configurar nunjucks
//Com nunjuck possibilita o envio do objeto proffys (objeto JSON)
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//Inicio da configuração do servidor
server
//receber os dados do req.body
.use(express.urlencoded({ extended: true}))

.use(express.static("public"))  //Aqui altera a pasta raiz para pasta public

.get("/", pageLanding)  //Pega o link(rotas) e executa função
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

.listen(5500);//escuta a porta 5500 o localhost