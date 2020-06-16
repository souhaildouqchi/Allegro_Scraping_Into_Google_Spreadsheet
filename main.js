var { google } = require("googleapis");
const keys = require("./keys.json");
const Excel = require("exceljs");
const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected");
  }
});

async function gsrun(cl) {
  try {
    const gsapi = google.sheets({ version: "v4", auth: cl });
    const wb = new Excel.Workbook();
    let excelFile = await wb.xlsx.readFile("./allegro.xlsx");
    let ws = excelFile.getWorksheet("Sheet1"); // the name of the worksheet
    let data = ws.getSheetValues();

    /* data = data.map(function (r) {
      // so we dont get the first empty row and the other rows we dont want
      return [
        r[1],
        r[2],
        r[7],
        r[8],
        r[9],
        r[10],
        r[12],
        r[13],
        r[14],
        r[16],
        r[17],
        r[18],
        r[19],
      ]; // add more rows to get more data 
    }); */
    data.shift();
    /* to insert things in the spreed sheet */

    const updateOptions = {
      spreadsheetId: "1FtYYqSQ5Xf-EByW8xeQcqnt4WFq9MgnnbtJjOlJDJV0",
      range: "allegro!A1",
      valueInputOption: "USER_ENTERED",
      resource: { values: data },
    };
    let res = await gsapi.spreadsheets.values.update(updateOptions);
    console.log(res);
    // to get data from the spreed sheet
    /*   const opt = {
      spreadsheetId: "1FtYYqSQ5Xf-EByW8xeQcqnt4WFq9MgnnbtJjOlJDJV0",
      range: "A1:B5",
    };
    let data = await gsapi.spreadsheets.values.get(opt);
    console.log(data.data.values); */
  } catch (err) {
    console.error(err);
  }
}
gsrun(client);
