const db = require('../database/config');
const Book = require('../domain/Book.model');

// Crear libro
exports.createBook = (req, res) => {
  const { title, description } = req.body;
  const sql = "INSERT INTO books (title, description) VALUES (?, ?)";

  db.query(sql, [title, description], (err, result) => {
    if (err) {
      console.error('Error al crear libro:', err);
      return res.status(500).json({ error: 'Error al crear libro' });
    }

    const newBook = new Book(result.insertId, title, description);
    res.status(201).json({ message: 'Libro creado correctamente', book: newBook });
  });
};

// Obtener todos los libros
exports.getAllBooks = (req, res) => {
  const sql = 'SELECT * FROM books';

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error al obtener libros:', err);
      return res.status(500).json({ error: 'Error al obtener libros' });
    }

    const books = rows.map(row => new Book(row.id, row.title, row.description));
    res.json(books);
  });
};

// Actualizar libro
exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const sql = 'UPDATE books SET title=?, description=? WHERE id=?';

  db.query(sql, [title, description, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar libro:', err);
      return res.status(500).json({ error: 'Error al actualizar libro' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    const updatedBook = new Book(id, title, description);
    res.json({ message: 'Libro actualizado correctamente', book: updatedBook });
  });
};

// Eliminar libro
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM books WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar libro:', err);
      return res.status(500).json({ error: 'Error al eliminar libro' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json({ message: 'Libro eliminado correctamente' });
  });
};
