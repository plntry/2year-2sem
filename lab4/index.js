const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3000

const countryRouter = require('./routers/countryRouter')
const tourTypeRouter = require('./routers/tourTypeRouter')
const tourRouter = require('./routers/tourRouter')

app.use('/country', countryRouter)
app.use('/tourtype', tourTypeRouter)
app.use('/tour', tourRouter)

app.listen(port, () => {
    console.clear()
    console.log(`Listening on port ${port}`)
})
