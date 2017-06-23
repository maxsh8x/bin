function getDate(delta) {
  const date = new Date();
  date.setDate(date.getDate() + delta);
  const n = date.getTime();
  return (n - (n % 86400000)) / 1000;
}

function getConfig() {
  // eslint-disable-next-line
  return require(`../../config.${process.env.NODE_ENV}.json`);
}

module.exports = { getDate, getConfig };
