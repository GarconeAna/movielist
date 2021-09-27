// let array = [{
//   nome: 'form.nome',
//   imagem: 'fomr.imagem',
//   genero: 'form.genero',
//   nota: 'form.nota',
//   id: 123123123123123456,
//   checked: false
// }];

const movieItens = [];

const addMovie = (nome, imagem, genero, nota) => {
  const movie = {
    nome: nome,
    imagem: imagem,
    genero: genero,
    nota: nota,
    id: Date.now(),
    checked: false
  }

  movieItens.push(movie);
  renderMovie(movie);
}

const form = document.querySelector('.form');
form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const inputNome = document.querySelector('#nome');
  const inputGenero = document.querySelector('#genero');
  const inputImagem = document.querySelector('#imagem');
  const inputNota = document.querySelector('#nota');

  const nome = inputNome.value;
  const genero = inputGenero.value;
  const imagem = inputImagem.value;
  const nota = inputNota.value;

  if (nome !== '' && genero !== '' && imagem !== '' && nota !== '') {
    addMovie(nome, imagem, genero, nota);
    inputNome.value = '';
    inputGenero.value = '';
    inputImagem.value = '';
    inputNota.value = '';
    inputNome.focus();
  }
});

const renderMovie = (movie) => {
  const list = document.querySelector('.js-movie-list');

  const listItens = document.createElement('div');
  listItens.setAttribute('class', 'list-itens');

  // const listNome = document.createElement('h2');
  // listNome.setAttribute('class', 'list-nome');

  // const listImg = document.createElement('img');
  // listImg.setAttribute('src', movie.imagem);

  // const listGenero = document.createElement('span');
  // listGenero.setAttribute('class', 'list-span');

  // const listNota = document.createElement('span');
  // listNota.setAttribute('class', 'list-span-nota');


  // listNome.innerHTML = movie.nome;
  // listGenero.innerHTML = movie.genero;
  // listNota.innerHTML = movie.nota;

  listItens.innerHTML = `
    <h2>${movie.nome}</h2>
    <img src=${movie.imagem}>
    <span>${movie.genero}</span>
    <span>${movie.nota}</span>
  `

  // listItens.append(listNome);
  // listItens.append(listImg);
  // listItens.append(listGenero);
  // listItens.append(listNota);
  list.append(listItens);

}