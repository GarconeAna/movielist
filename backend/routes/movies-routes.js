// modelo do json para add (para o thunder ou formulario)
// {
//   "nome": "Round 6/Squid Game",
//   "imagem": "https://br.web.img3.acsta.net/c_310_420/pictures/21/09/14/18/49/5442347.jpg",
//   "genero": "Suspense",
//   "nota": "10"
// }
// {
//   "nome": "O bebê de Rosemary",
//   "imagem": "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/94/42/79/20328732.jpg",
//   "genero": "Terror",
//   "nota": "10"
// }
// {
//   "nome": "Star Wars: A Vingança dos Sith",
//   "imagem": "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/92/58/33/20207204.jpg",
//   "genero": "Ficção Científica",
//   "nota": "10"
// }




const express = require('express');
const router = express.Router();

const movies = [
  // {
  //   id: Date.now(),
  //   nome: "Harry Potter",
  //   imagem: "https://br.web.img3.acsta.net/medias/nmedia/18/95/59/60/20417256.jpg",
  //   genero: "Fantasia",
  //   nota: "8",
  //   checked: false
  // },
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