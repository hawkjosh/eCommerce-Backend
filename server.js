const express = require('express');
const sequelize = require('sequelize');
const routes = require('./routes');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// TODO: sync sequelize models to the database, then turn on the server
// Not sure about this...it is not working when I use commented out code below, but it works if I use original code provided??

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});