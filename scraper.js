const axios = require("axios");
const ObjectsToCsv = require("objects-to-csv");

async function process() {
  try {
    let response = await axios.get(
      "https://allegro.pl/kategoria/samochody-osobowe-4029",
      {
        query: {
          bmatch: "baseline-al-product-cl-eyesa2-engag-dict45-aut-1-3-0605",
          order: "dd",
        },
        responseType: "json",
      }
    );
    let promoted = response.data["pagination bottom"].collection.items.promoted;
    //console.log(promoted);
    list = [];

    for (var i = 0; i < promoted.length; i++) {
      let item = {
        model: promoted[i].name,
        url: promoted[i].url,
        price: promoted[i].sellingMode.advertisement.price.amount,
      };
      let params = promoted[i].parameters;
      for (var j = 0; j < params.length; j++) {
        item[params[j].name] = params[j].values[0];
      }
      list.push(item); // list has values from the first page only
    }
    //console.log(list);
    //return list;
    entires = [];
    for (var i = 0; i < list.length; i++) {
      console.log("fetching : " + list[i].url);

      response = await axios.get(list[i].url, {
        responseType: "json",
      });
      let entryData = response.data;
      //console.log(entryData);
      let contact = entryData.summary.offer.contact;
      let entry = {
        ...list[i],
        phone_number: contact.phones.length > 0 ? contact.phones[0].number : "",
        region: entryData.summary.offer.delivery.summary[0].value.text,
        startingAt: entryData.summary.offer.publication.startingAt || "",
        endingAt: entryData.summary.offer.publication.endingAt,
        date: new Date().toLocaleDateString(),
      };

      let parameters =
        entryData.summary.offer.parametersGroups.groups[0].parameters;
      for (var j = 0; j < parameters.length; j++) {
        entry[parameters[j].name] = parameters[j].values[0].valueLabel;
      }
      entires.push(entry);
      (async () => {
        const csv = new ObjectsToCsv(entires);

        // Save to file:
        await csv.toDisk("./allegro.csv");

        // Return the CSV file as string:
        //console.log(await csv.toString());
      })();
    }

    return entires;
  } catch (err) {
    console.error(err);
  }
}
process();
module.exports = {
  process,
};
