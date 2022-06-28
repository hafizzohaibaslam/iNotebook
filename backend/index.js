const connectToMongo = require('./db');
connectToMongo();
var cors = require('cors');

const express = require('express')
const app = express()
const port = 5000


app.use(express.json());


const auth = require('./routes/auth');
const { eventWrapper } = require('@testing-library/user-event/dist/utils');
app.use(express.json())

// Available Routes 

app.use('/api/auth',auth)
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})