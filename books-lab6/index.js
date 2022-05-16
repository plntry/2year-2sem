const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const Book = require('./models/book')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('book', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :book'))

app.get('/info', (request, response) => {
  Book.find({}).then(books => {
    response.send(`
      <p>Library has info for ${books.length} books</p>
      <p>${new Date()}</p>
    `)
  })  
})

app.get('/api/books', (request, response) => {
  Book.find({}).then(books => {
    response.json(books)
  })
})

app.get('/api/books/:id', (request, response, next) => {
  Book.findById(request.params.id)
    .then(book => {
      if (book) {
        response.json(book)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/books/:id', (request, response, next) => {
  const body = request.body

  const book = {
    name: body.name,
    number: body.number
  }

  Book.findByIdAndUpdate(request.params.id, book, { new: true })
    .then(updatedBook => {
      response.json(updatedBook)
    })
    .catch(error => next(error))
})

app.delete('/api/books/:id', (request, response, next) => {
  Book.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/books', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'missing name or number of pages' })
  }

  const book = new Book({
    name: body.name,
    number: body.number
  })

  book.save().then(savedBook => {
    response.json(savedBook)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})