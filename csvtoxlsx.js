const path = require("path");
const convertCsvToXlsx = require("@aternus/csv-to-xlsx");

let source = path.join(__dirname, "allegro.csv");
let destination = path.join(__dirname, "allegro.xlsx");

try {
  convertCsvToXlsx(source, destination);
} catch (e) {
  console.error(e.toString());
}
