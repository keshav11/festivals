var Twit = require('twit');
var twitter = new Twit({
    consumer_key:         'consumer_key',
    consumer_secret:      'consumer_secret',
    access_token:         'access_token',
    access_token_secret:  'access_token_secret'
});

var schedule = require('node-schedule');
require('date-utils');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
// public folder
app.use(express.static(__dirname + '/public'));

// views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.send("Hello");
});

var festivals2015 = [

  {
    date: new Date('11-11-2015') ,
    name: 'Diwali',
    wiki: 'https://en.wikipedia.org/wiki/Diwali'
  },

  {
    date: new Date('12-25-2015') ,
    name: 'Christmas',
    wiki: 'https://en.wikipedia.org/wiki/Christmas'
  }

];

festivals2015.forEach(function (elem)
{

  if(Date.compare(elem.date, Date.today()) > 0)
  {
    console.log(Date.compare(elem.date, Date.today()));
    var j = schedule.scheduleJob(elem.date, function(){

          T.post('statuses/update',
            {
              status: 'Happy ' + elem.name + '!\n\n' + elem.wiki

            },

            function(err, data, response) {
                          console.log(data)
            });
      }

)}});

app.listen(app.get('port'), function() {
  console.log('App is running', app.get('port'));
});
