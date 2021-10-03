const express = require('express');
const router = express.Router();

const movies = [
  {
    id: Date.now(),
    nome: "Harry Potter teste1",
    imagem: "https://cromasolutions.com.br/wp-content/uploads/2019/02/4-1.png",
    genero: "Fantasia teste1",
    nota: "8",
    checked: false
  },
  {
    id: Date.now(),
    nome: "Harry Potter teste2",
    imagem: "https://cromasolutions.com.br/wp-content/uploads/2019/02/4-1.png",
    genero: "Fantasia teste2",
    nota: "8",
    checked: false
  },
  {
    id: Date.now(),
    nome: "Harry Potter teste3",
    imagem: "https://cromasolutions.com.br/wp-content/uploads/2019/02/4-1.png",
    genero: "Fantasia teste3",
    nota: "8",
    checked: false
  },
]

router.get('/', (req, res) => {
  res.send(movies)
});

router.get('/:id', (req, res) => {
  const idMovieGet = req.params.id;
  //console.log(idMovieGet);
  const index = movies.findIndex(movie => movie.id == idMovieGet);
  //console.log(index);
  const movie = movies[index];
  //console.log(movie);
  res.send(movie);
});

router.post('/add', (req, res) => {
  const movie = req.body;
  movie.id = Date.now();
  movie.checked = false;
  movies.push(movie);
  res.send(movie);
});

router.put('/:id', (req, res) => {
  const idMoviePut = req.params.id;
  //console.log(idMoviePut);
  const moviePut = req.body;
  //console.log(moviePut);
  const index = movies.findIndex(movie => movie.id == idMoviePut);
  //console.log(index)

  movies[index] = {
    id: movies[index].id,
    checked: movies[index].checked,
    ...moviePut
  }

  //console.log(movies[index].id);
  //console.log(movies[index].checked);

  res.send(movies[index]);
});

router.delete('/:id', (req, res) => {
  const idMovieDelete = req.params.id;
  const index = movies.findIndex(movie => movie.id == idMovieDelete);
  movies.splice(index, 1);
  res.send(movies)
});

module.exports = router;