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

const form = async (evento) => {
  evento.preventDefault();

  const inputNome = document.querySelector('#nome');
  const inputGenero = document.querySelector('#genero');
  const inputImagem = document.querySelector('#imagem');
  const inputNota = document.querySelector('#nota');

  const movie = {
    nome: inputNome.value,
    genero: inputGenero.value,
    imagem: inputImagem.value,
    nota: inputNota.value,  
  }

  const request = new Request(`${url}/add`, {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });

  const response = await fetch(request);
  const result = await response.json();
  if(result) {
    getMovies();
    inputNome.value = '';
    inputGenero.value = '';
    inputImagem.value = '';
    inputNota.value = '';
    inputNome.focus();
  }
  
}

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
      <button class="delete-icon"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
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