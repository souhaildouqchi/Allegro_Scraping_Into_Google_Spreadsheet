# Allegro_Scraping_Into_Google_Spread_Sheet
 A project that scrapes the Allegro website for car details using nodejs and stores the data in csv file that get imported into a Google spreadsheet using the google spreadsheet API and Node it also stores the extracted data into a mongodb DataBase and exposes endpoints using nodesjs and Express to be used in a front end application.

# Allegro Scraping



Allegro Scraping to provied endpoints to scraped data in json or csv fromat by accessing the links : 
    - localhost:5004/scraping/
  - localhost:5004/scraping/allegro
  - localhost:5004/scraping/allegrocsv
  

# Scraper.js Explained :
While trying to scrape the data from the allegro pages i noticied that convenient thing about these pages, is that you can return the data in JSON instead of html by just setting the media type to application/json eg setting the Accept header so by using parsing json when can get the neceesary data from the website pages.

Scraper.js is made using only json and is a standalone file that can used to get the data from allegro website on any other porject (i included an other file in python by the name script that does the same thing and returns data in csv format )
### Back End : Using Nodejs Express Mongoose
### Models : Allegro.js

Using mongoose i created a schema model for the allegro data in order to store the data extracted using the scraper.js file the model fields are : 

* [endingAt] - is the date 
* [model] - is the car model 
* [Rok_produkcji] - is the year the car was made 
* [Przebieg] - is the migeagle of the car 
* [price] - is obviously the price of the car
* [phone_number] - is the phone number 
* [region] - is the region of the car
* [Numer_VIN] - is the vin number if it exists (if i doesnt scraper.js handles missing data by putting "" instead of null)
* [link] - is the link of the car offer

the model is then exported to the routes ( api.js) file

### Routers : API.js

on the api.js file that handles routes we have 4 middlewares : 
    - / : first middleware that handles all requests comming from /scraping and sends them a message response like this : " Use /scraping/allegro or /scraping/allegrocsv to get the json or csv data"
    - /:allegro : second middleware handles all requests comming from /scraping/allegro and in the same time gets the data extracted from the scraper.js file and displays it in json format - /:allegrocsv : second middleware handles all requests comming from /scraping/allegro and in the same time gets the data extracted from the scraper.js file in json format convert it and  displays it in csv format
    - /allegro : the last middleware is a post request middlleware uses the extracted data from the scraper.js file and stores it on a mongodb data base following the model made on the models folder.
### Server.js

Used to connect to the data on "mongodb://localhost:27017/scraping" and expose a port "5004" in my case (can be changed) to listen to the comming requests


### Installation :  
To start get access the endpoints first we have to install a few dependencies : 
    - "axios": "^0.19.2",
    - "body-parser": "^1.19.0",
    - "express": "^4.17.1",
    - "jsonexport": "^3.0.0",
    - "mongoose": "^5.9.17",
    - "nodemon": "^2.0.4"
all of these dependencies are inside the package.json file so only use the command : "npm install" to get going.
note : the scraper.js file is a standalone file that can used without any extra packages just run "node scraper.js" and watch the magic happend !

