const utils = require('../lib/utils');
const redis = require('../lib/redis');
const middlewares = require('../lib/middlewares');

module.exports = function routes(app) {
  app.get('/widget', middlewares.Auth, middlewares.asyncWrapper(async (req, res) => {
    const widgets = await redis.smembers(`USER:${req.user._id}:WIDGETS`);
    const transaction = redis.multi();
    widgets.forEach((widgetID) => {
      transaction.hgetall(`WIDGET:${widgetID}`);
    });
    const transactionResp = await transaction.exec();
    const data = transactionResp.map(([err, result], i) =>
      Object.assign(result, { id: widgets[i] }),
    );
    res.json({ data });
  }));

  app.get('/widget/:widgetID', middlewares.asyncWrapper(async (req, res) => {
    const meta = await redis.hgetall(`WIDGET:${req.params.widgetID}`);
    const dates = [];
    const transaction = redis.multi();
    const days = parseInt(meta.days, 10);
    for (let i = 0; i < days; i = +1) {
      const date = utils.getDate(i);
      dates.push(date);
      transaction.hgetall(`WEATHER:${date}:${meta.city.toUpperCase()}`);
    }
    const transactionResp = await transaction.exec();
    const forecast = transactionResp.map(([err, result], i) =>
      Object.assign(result, { date: dates[i] }),
    );
    const data = { forecast, meta };
    res.json({ data });
  }));

  app.post('/widget', middlewares.Auth, middlewares.asyncWrapper(async (req, res) => {
    const { city, days, orientation } = req.body;
    const data = { city, orientation, days };
    const widgetID = await redis.incr('widgetID');
    await redis.hmset(`WIDGET:${widgetID}`, data);
    await redis.sadd(`USER:${req.user._id}:WIDGETS`, widgetID);
    res.send();
  }));
};
