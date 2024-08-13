// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const router = require('./routes/router')
// const mongoose = require('mongoose')
// require('dotenv/config')

// const app =  express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))

// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200
// }

// app.use(cors(corsOptions))
// app.use('/', router)

// const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
// mongoose.connect(process.env.DB_URI, dbOptions)
// .then(() => console.log('DB Connected!'))
// .catch(err => console.log(err))

// const port = process.env.PORT || 5000
// const server = app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// })
// /*const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 8888;

// // Replace this with your MongoDB connection string
// const mongoUri = process.env.DB_URI || 'mongodb+srv://harshilaggarwal0207:toTK427wXgpGuRSD@cluster1.rrnch.mongodb.net/';

// app.use(cors());
// app.use(bodyParser.json());

// // Updated connection code without deprecated options
// mongoose.connect(mongoUri)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Could not connect to MongoDB', err));

// const dataSchema = new mongoose.Schema({}, { strict: false });
// const Data = mongoose.model('Data', dataSchema);

// app.get('/api/data', async (req, res) => {
//     try {
//         const data = await Data.find({});
//         res.json(data);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });*/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

const app =  express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router)

const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => console.log('DB Connected!'))
.catch(err => console.log(err))

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})