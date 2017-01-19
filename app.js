var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: "977f1f37-5bf7-4dc9-b41a-92ce718885a7",
    appPassword: "Mi6VpXJtoqYiCo7E7hG2F4u"
});

var bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.beginDialog('questions');
});

bot.dialog('questions', [
    function (session) {
        builder.Prompts.text(session, "Hola! Como te llamas?");
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hola " + results.response + "!, Cuantos años tienes de experiencia en Excel?"); 
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "En que necesitas ayuda?", ["Modificar celdas", "Graficas", "Formulas", "Tablas Pivote", "Otro Tema"]);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Listo " + session.userData.name + 
                     "! Ya registramos que tienes " + session.userData.coding + 
                     " años de experiencia y necesitas ayuda en " + session.userData.language + ".");
    }
]);
