const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rabih:123@cluster0.jjhrj.mongodb.net/bookland?retryWrites=true&w=majority')
    .then((result) => console.log('connected to mongodb'))
    .catch((err) => console.log(err))

const Schema = mongoose.Schema
const BookSchema = new Schema({

    img: {
        type: String,
    },
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },

    year: {
        type: Number,
        require: true
    },

    desc: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        default: 15,
    },
    rating: {
        type: Number,
        default: 4,
    },

})


var Books = mongoose.model('books', BookSchema);


app.get("/books", function (req, res) {
    const category = req.query.category;

    if (category) {
        if (category == "all") {
            Books.find()
                .then((result) => res.send(result))
                .catch((err) => console.log(err));
        } else {
            Books.find({ category: category })
                .then((result) => res.send(result))
                .catch((err) => console.log(err));
        }
    } else {
        Books.find()
            .then((result) => res.send(result))
            .catch((err) => console.log(err));
    }

});

app.get("/book/:id", function (req, res) {
    Books.findById(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
})


app.get("/books/:id", function (req, res) {
    const category = req.params.id;
    if (category) {
        if (category == "all") {
            Books.find()
                .then((result) => res.send(result))
                .catch((err) => console.log(err));
        } else {
            Books.find({ category: category })
                .then((result) => res.send(result))
                .catch((err) => console.log(err));
        }
    } else {
        Books.find()
            .then((result) => res.send(result))
            .catch((err) => console.log(err));
    }

})

app.delete("/books/delete/:id", (req, res) => {
    const id = req.params.id
    Books.findByIdAndDelete(id).then(deleteBook => {
        Books.find()
            .then((result) => res.send(result))
            .catch((err) => console.log(err));
    }).catch((err) => console.log(err));
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`your application is listen on port: ${PORT}`)
})