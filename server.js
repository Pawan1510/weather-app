var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

const port = process.env.PORT || 8000;
var app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended : true}));

city = 'Ambala';

url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=271d1234d3f497eed5b1d80a07b3fcd1`;

app.get('/', function(req,res) {

  request(url,function(error, reponse, body){
    weather_json = JSON.parse(body);


    var weather = {
      city : city,
      temperature : Math.round(weather_json.main.temp-2),
      description : weather_json.weather[0].description,
      icon : weather_json.weather[0].icon
    };

    var weather_data = {weather : weather};

    res.render('weather',weather_data);
  });
});

app.post('/', function name(req,res) {

  city =  req.body.city_name;
  url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=271d1234d3f497eed5b1d80a07b3fcd1`;
  res.redirect('/');
  res.render('weather',city,url);
});

//current city
//http://api.openweathermap.org/data/2.5/weather?q=ambala&APPID=271d1234d3f497eed5b1d80a07b3fcd1&units=metric
app.listen(port);
