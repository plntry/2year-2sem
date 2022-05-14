import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Book from './components/Book'
import BooksForm from './components/BooksForm'
import Notification from './components/Notification'
import bookService from './services/books'
import './index.css'

const App = () => {
  const [books, setBooks] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

  const hook = () => {
    bookService
      .getAll()
      .then(initialBooks => {
        setBooks(initialBooks)
      })
  }

  useEffect(hook, [])

  const removeBook = (id) => {
    const book = books.find(b => b.id === id)
    const answer = window.confirm(`Delete ${book.name}?`)

    if (answer) {
      bookService
        .remove(id)
        .then(() => {
          setBooks(books.filter(b => b !== id))
          setMessage(`${book.name} has removed`)
        })
        .catch((error) => {
          setMessage(`Information of ${book.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)

          setBooks(books.filter(b => b.id !== id))
        })
    }
  }

  const addNew = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (!(books.some((book) => book.name === newName))) {
      bookService
        .create(nameObject)
        .then(returnedBook => {
          setMessage(
            `Added ${returnedBook.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)

          setBooks(books.concat(returnedBook))
          setNewName('')
          setNewNumber('')
        })
      
    } else {
      const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (answer) {
        const book = books.find(b => b.name === nameObject.name)
        const changedBook = { ...book, number: newNumber }

        bookService
          .update(book.id, changedBook)
          .then(returnedBook => {
            setMessage(
              `Edited ${returnedBook.name}'s number`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)

            setBooks(books.map(book => book.id !== changedBook.id ? book : returnedBook))
          })
          .catch(error => {
            alert(
              `the number '${book.number}' was already deleted from server`
              )
              setBooks(books.filter(b => b.id !== changedBook.id))
          })
      }

    }
        
  } 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
  }

  const booksToShow = showAll
    ? books
    : books.filter(book => {
    return book.name.toLowerCase().includes(filter.toLowerCase())
    })

  return (
    <div>
      <h2>Book fund of the library</h2>
      <Notification message={message} />
      <Filter onChange={handleFilterChange} />
      <BooksForm onSubmit={addNew}
        valueName={newName} onChangeName={handleNameChange}
        valueNumber={newNumber} onChangeNumber={handleNumberChange}
      />
      <h2>Books</h2>
      {booksToShow.map(book => 
        <Book
          key={book.id}
          book={book}
          removeBook={removeBook}
        />
      )}
    </div>
  )
}

export default App