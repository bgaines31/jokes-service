const express = require('express');
const app = express();
const { Joke, sequelize, Op } = require('./db');
// // const { Op } = require("sequelize");
// const sequelize = require('sequelize');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  // const jokes = [];
    const { tags, joke } = req.query
    const where = {}
    if(tags) where.tags =  { [Op.like]: `%${tags}%`};
    if (joke) where.joke =  { [Op.like]: `%${joke}%`};
  try {
    // TODO - filter the jokes by tags and content
    const jokes = await Joke.findAll({where});
  res.json(jokes)

  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
