const express = require('express');
const dboperations = require('./dbFiles/dbOperation')
const cors = require('cors');

const API_PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

app.get('/', async (req,res) => {
    console.log('Called')
    res.send(await dboperations.getAllPercentStats(req.query.id, req.query.startDate, req.query.endDate))
})


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))
