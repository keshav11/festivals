var Twit = require('twit');
var schedule = require('node-schedule');

var twitter = new Twit({
    consumer_key:         'consumer_key',
    consumer_secret:      'consumer_secret',
    access_token:         'access_token',
    access_token_secret:  'access_token_secret'
});

var festivals2015 = [

  {
    date: new Date('11-11-2015') ,
    name: 'Diwali',
    wiki: 'https://en.wikipedia.org/wiki/Diwali'
  },

  {
    date: new Date('25-12-2015') ,
    name: 'Christmas',
    wiki: 'https://en.wikipedia.org/wiki/Christmas'
  }

];

festivals2015.forEach(function (elem)
{
    var j = schedule.scheduleJob(elem.date, function(){
          twitter.post('statuses/update',
            {
              status: 'Happy ' + elem.name + '!\n\n' + elem.wiki
            },
            function(err, data, response) {
                          console.log(data)
            });
      }
)});
