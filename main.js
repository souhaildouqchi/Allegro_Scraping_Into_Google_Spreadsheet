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
// data == datalocal
// data1 == datacloud
async function gsrun(cl) {
  try {
    const gsapi = google.sheets({ version: "v4", auth: cl });
    const wb = new Excel.Workbook();
    let excelFile = await wb.xlsx.readFile("./allegro.xlsx");
    let ws = excelFile.getWorksheet("Sheet1"); // the name of the worksheet
    let datalocal = ws.getSheetValues();
    // to get data from the spreed sheet
    const opt = {
      spreadsheetId: "1FtYYqSQ5Xf-EByW8xeQcqnt4WFq9MgnnbtJjOlJDJV0",
      range: "allegro_all",
    };
    let datacloud = await gsapi.spreadsheets.values.get(opt);
    valuesImport = datacloud.data.values || [];
    length = valuesImport.length > 0 ? valuesImport.length : 0;

    /* to insert things in the spreed sheet */
    if (length > 0) {
      datalocal.shift();
      datalocal.shift();
    }

    const updateOptions = {
      spreadsheetId: "1FtYYqSQ5Xf-EByW8xeQcqnt4WFq9MgnnbtJjOlJDJV0",
      range: `allegro_all!A${length + 1}`,
      valueInputOption: "USER_ENTERED",
      resource: { values: datalocal },
    };

    let res = await gsapi.spreadsheets.values.update(updateOptions);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
gsrun(client);
