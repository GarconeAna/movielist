// let array = [{
//   nome: 'form.nome',
//   imagem: 'fomr.imagem',
//   genero: 'form.genero',
//   nota: 'form.nota',
//   id: 123123123123123456,
//   checked: false
// }];

const url = 'http://localhost:3001/movies';
const movieItens = [];
let edit = false;
let idEdit = 0;

const list = document.querySelector('.js-movie-list');
const inputNome = document.querySelector('#nome');
const inputGenero = document.querySelector('#genero');
const inputImagem = document.querySelector('#imagem');
const inputNota = document.querySelector('#nota');
// const inputChecket = document.querySelector('#checket');

const getMovies = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

  const list = document.querySelector('.js-movie-list');
  // const divIcons = document.querySelector('.list-icon');

  data.map((movie) => {
    list.insertAdjacentHTML('beforeend', `
    <div class="list-itens" data-key=${movie._id}>
      <div class="list-icon">
        <button onclick="deleteMovie('${movie._id}')" class="icon"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        <button onclick="putMovie('${movie._id}')" class="icon"><i class="fa fa-pencil" aria-hidden="true"></i></button>
      </div>
      <h2>${movie.nome}</h2>
      <img src=${movie.imagem}>
      <div class="genero-nota">
        <p>${movie.genero}</p>
        <span>${movie.nota}</span>
      </div>
    </div>
  `)
  })

  // if(inputChecket.value === 'checket-true'){
  //   icon = `<i class="fa fa-eye" aria-hidden="true"></i>`
  //   divIcons.insertAdjacentHTML('beforeend', `
  //     <button class="icon">${icon}</button>
  //   `)
  // }
  // if(inputChecket.value === 'checket-false'){
  //   icon = `<i class="fa fa-eye-slash" aria-hidden="true"></i>`
  //   divIcons.insertAdjacentHTML('beforeend', `
  //     <button class="icon">${icon}</button>
  //   `)
  // }

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
    // checked: inputChecket.value, 
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
      edit = false;
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
  // inputChecket.value = movie.checked;
  inputNome.focus();

}

const deleteMovie = async (id) => {
  const req = new Request(`${url}/${id}`, {
    method: 'DELETE',
  })
  const res = await fetch(req);
  const data = await res.json();
  console.log(data.message);

  list.innerHTML = '';
  getMovies();
}