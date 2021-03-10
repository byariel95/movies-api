const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const moviesRoutes = require('./routes/movies.routes');
const { errorHandler, logErrors, wrapErrors} = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

app.get('/',(req, res)=>{
  res.send('hello api')
});

app.use(express.json());
app.use(cors());
app.use(helmet());

moviesRoutes(app);

app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

module.exports = app;