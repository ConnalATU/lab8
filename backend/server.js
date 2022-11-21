const express = require('express')
const app = express()
const port = 4000


const bodyParser = require('body-parser'); //imported and installed body parser
const cors = require('cors'); //installed cors 
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Adding mongoose to project
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb+srv://connal:test123@cluster0.afzhdiu.mongodb.net/?retryWrites=true&w=majority');
    // await mongoose.connect('mongodb://connal:test123@localhost:27017/test');
}

const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String


});

const bookModel = mongoose.model('books', bookSchema);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())





app.get('/', (req, res) => {
    res.send('Hello World!')
})


// displaying json with get
app.get('/api/books', (req, res) => {
    // const books = [
    //     {
    //         "title": "Learn Git in a Month of Lunches",
    //         "isbn": "1617292419",
    //         "pageCount": 0,
    //         "thumbnailUrl":
    //             "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/umali.jpg",
    //         "status": "MEAP",
    //         "authors": ["Rick Umali"],
    //         "categories": []
    //     },
    //     {
    //         "title": "MongoDB in Action, Second Edition",
    //         "isbn": "1617291609",
    //         "pageCount": 0,
    //         "thumbnailUrl":
    //             "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/banker2.jpg",
    //         "status": "MEAP",
    //         "authors": [
    //             "Kyle Banker",
    //             "Peter Bakkum",
    //             "Tim Hawkins",
    //             "Shaun Verch",
    //             "Douglas Garrett"
    //         ],
    //         "categories": []
    //     },
    //     {
    //         "title": "Getting MEAN with Mongo, Express, Angular, and Node",
    //         "isbn": "1617292036",
    //         "pageCount": 0,
    //         "thumbnailUrl":
    //             "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/sholmes.jpg",
    //         "status": "MEAP",
    //         "authors": ["Simon Holmes"],
    //         "categories": []
    //     }
    // ];

    //call back function to retrive data and log to the console
    bookModel.find((err, data) => {
        console.log(data);
        res.json(data)
    })

    //searching data base fro book by id
    app.get('/api/books/:id', (req, res) => {
        console.log(req.params.id);
        bookModel.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    })


})

//getting information from the form and logging to the console using post method

app.post('/api/books/', (req, res) => {
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    }).then()
    console.log(req.body);
})

//creating put to update books updates and outputs to console 
app.put('/api/books/:id', (req, res) => {
    console.log("update" + req.params.id);
    bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, data) => {
        res.send(data);
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)


})