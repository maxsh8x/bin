const request = require('request');

const redis = require('./redis');
const { getConfig } = require('./utils');

const config = getConfig();

function getData(APIKey, city) {
  request({
    url: 'https://api.apixu.com/v1/forecast.json',
    json: true,
    qs: {
      key: APIKey,
      q: city,
      days: 7,
    },
  },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = body.forecast.forecastday;
        data.forEach((item) => {
          redis.hmset(`WEATHER:${item.date_epoch}:${city.toUpperCase()}`, {
            maxTemp: item.day.maxtemp_c,
            minTemp: item.day.mintemp_c,
            icon: item.day.condition.icon,
          });
        });
      }
    });
}

function runTasks(interval) {
  const run = () => {
    config.cities.forEach((city) => {
      getData(config.APIKey, city);
    });
  };
  run();
  setInterval(run, interval);
}

module.exports = runTasks;
