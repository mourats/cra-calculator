const fs = require("fs");
const csv = require("csv-parser");
const dataPath = "./data/";

const readCsvFileAndGo = (file, callback) => {
  var data = [];
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", row => {
      data.push(row);
    })
    .on("end", () => {
      console.log(`CSV file ${file} successfully processed`);
      callback(data);
    });
};

const processFunction = data => {
  let soma = 0.0;
  let media = 0.0;
  let creditos = 0.0;
  data.forEach(elem => {
    const nota = elem["Média"].replace(',', '.');
    const credito = elem["Créditos"];
    if(!isNaN(nota)){
        creditos += Number(credito);
        soma += (nota * credito);
    }
  });
  media = soma / creditos;
  console.log(media);
};

//Start
readCsvFileAndGo(dataPath + "historico-cra.csv", processFunction);
