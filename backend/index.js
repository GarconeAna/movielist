const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const movie = require('./routes/movies-routes');
app.use('/movies', movie);

const port = 3000;

app.listen(port, () => {
  console.info(`Servidor rodando na porta ${port}`);
});
