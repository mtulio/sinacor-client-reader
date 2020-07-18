const fs = require("fs");
const pdf = require('pdf-parse');
const XPSinacor = require('./XPSinacor');


let dataBuffer = fs.readFileSync(process.argv[2])
var resp = {}

try {
    fs.accessSync(process.argv[2], fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    console.error('no access to file!');
  }


pdf(dataBuffer).then(function(data) {
 
    let nota = new XPSinacor(data.text);
    let negotiations = nota.negotiations();
    
    resp["CPF"] = nota.clientCPF()
    resp["clearingTotal"] = nota.clearingTotal()
    resp["totalOrders"] = nota.totalOrders()
    //resp["clientId"] = nota.clientId()
    resp["negotiations"] = []
    resp["clearingTotal"] = nota.clearingTotal()

    negotiations.forEach(line => {
        resp["negotiations"].push(nota.negotiation(line))
        //console.log(nota.negotiation(line));
    });

    console.log(resp)
});