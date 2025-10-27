const API_URL = 'http://backend_briyan:5000/api/books';

const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const authorNameEl = document.getElementById('author-name');

// 💡 Cargar libros al inicio
window.addEventListener('DOMContentLoaded', fetchBooks);
//Función para traer el nombre del alumno
fetch('http://backend_briyan:5000/api/books/Chanona')
  .then(res => res.text()) // o .json() según tu backend
  .then(name => {
    authorNameEl.textContent = `Autor: ${name}`;
  })
  .catch(err => console.error(err));
// Función para traer todos los libros
function fetchBooks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(books => {
      bookList.innerHTML = '';
      books.forEach(book => renderBook(book));
    })
    .catch(err => console.error(err));
}

// Función para renderizar un libro en la lista
function renderBook(book) {
  const li = document.createElement('li');
  li.dataset.id = book.id;
  li.innerHTML = `
    <span>${book.title} - ${book.description}</span>
    <div>
      <button class="edit">Editar</button>
      <button class="delete">Eliminar</button>
    </div>
  `;

  // Editar
  li.querySelector('.edit').addEventListener('click', () => editBook(book));

  // Eliminar
  li.querySelector('.delete').addEventListener('click', () => deleteBook(book.id));

  bookList.appendChild(li);
}

// Crear libro
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newBook = {
    title: titleInput.value,
    description: descriptionInput.value
  };

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook)
  })
  .then(res => res.json())
  .then(book => {
    renderBook(book.book); // usamos el objeto book del controlador
    bookForm.reset();
  })
  .catch(err => console.error(err));
});

// Eliminar libro
function deleteBook(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => fetchBooks())
    .catch(err => console.error(err));
}

// Editar libro (simple prompt)
function editBook(book) {
  const newTitle = prompt('Nuevo título', book.title);
  const newDescription = prompt('Nueva descripción', book.description);

  if (!newTitle || !newDescription) return;

  fetch(`${API_URL}/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle, description: newDescription })
  })
  .then(res => res.json())
  .then(() => fetchBooks())
  .catch(err => console.error(err));
}
