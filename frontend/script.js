// let array = [{
//   nome: 'form.nome',
//   imagem: 'fomr.imagem',
//   genero: 'form.genero',
//   nota: 'form.nota',
//   id: 123123123123123456,
//   checked: false
// }];

const url = 'http://localhost:3000/movies';
const movieItens = [];
let edit = false;
let idEdit = 0;

const list = document.querySelector('.js-movie-list');
const inputNome = document.querySelector('#nome');
const inputGenero = document.querySelector('#genero');
const inputImagem = document.querySelector('#imagem');
const inputNota = document.querySelector('#nota');

const getMovies = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

  const list = document.querySelector('.js-movie-list');

  data.map((movie) => {
    list.insertAdjacentHTML('beforeend', `
    <div class="list-itens" data-key=${movie.id}>
      <input id=${movie.id} type="checkbox"/>
      <label for=${movie.id} class="check"></label>
      <button onclick="deleteMovie(${movie.id})" class="delete-icon"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
      <button onclick="putMovie(${movie.id})" class="delete-icon"><i class="fa fa-pencil" aria-hidden="true"></i></button>
      <h2>${movie.nome}</h2>
      <img src=${movie.imagem}>
      <div class="genero-nota">
        <p>${movie.genero}</p>
        <span>${movie.nota}</span>
      </div>
    </div>
  `)
  }) 
}

getMovies();

const form = async (evento) => {
  evento.preventDefault();

  // const list = document.querySelector('.js-movie-list');
  // const inputNome = document.querySelector('#nome');
  // const inputGenero = document.querySelector('#genero');
  // const inputImagem = document.querySelector('#imagem');
  // const inputNota = document.querySelector('#nota');

  const movie = {
    nome: inputNome.value,
    genero: inputGenero.value,
    imagem: inputImagem.value,
    nota: inputNota.value,  
  }

  if(!edit) {
    const req = new Request(`${url}/add`, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  
    const res = await fetch(req);
    const result = await res.json();
    if(result) {
      getMovies();
    }    
  } else {
    const req = new Request(`${url}/${idEdit}`, {
      method: 'PUT',
      body: JSON.stringify(movie),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  
    const res = await fetch(req);
    const result = await res.json();
    if(result) {
      getMovies();
    }    
  }

  inputNome.value = '';
  inputGenero.value = '';
  inputImagem.value = '';
  inputNota.value = '';
  list.innerHTML = '';
  inputNome.focus();
  
}

const putMovie = async (id) => {
  edit = true;
  idEdit = id;
  const res = await fetch(`${url}/${id}`);
  const movie = await res.json(); 
  console.log(movie.nome);

  inputNome.value = movie.nome;
  inputGenero.value = movie.genero;
  inputImagem.value = movie.imagem;
  inputNota.value = movie.nota;

}

const deleteMovie = async (id) => {
  const list = document.querySelector('.js-movie-list');
  const req = new Request(`${url}/${id}`, {
    method: 'DELETE',
  })
  const res = await fetch(req);
  const data = await res.json();

  list.innerHTML = '';
  getMovies();
}