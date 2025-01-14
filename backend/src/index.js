require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors');
const port = process.env.PORT;
const indexRouter = require('./routes/auth.route');
app.use(cors());
app.use('/', indexRouter);




app.listen(port, () =>{
    console.log(`app listening on port ${port}`);
})