const express = require("express");
const https = require("https");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=agadir&appid=1f95397b97e4301a8dd1242c04a2bb01&units=metric&lang=fr";

  const request = https.get(url, (response) => {
    response.on("data", (d) => {
      const data = JSON.parse(d);
      const meteo = {
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
      };
      res.json(meteo);
    });
  });

  request.on("error", (err) => res.send(err));
  request.end();
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
