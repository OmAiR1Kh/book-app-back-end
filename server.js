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

app.get('/books/delete/:id', (req, res)=>{
  if (req.params.id) {
    Books.findOneAndDelete({ [Books._id] : req.params.id })
        .then(deletedBook => {
            if (!deletedBook) return res.status(404).json({ status: 404, error: true, message: `The movie ${req.params.id} does not exist` });
            Books.find()
                .then(books => {
                    res.status(200).json({ status: 200, data: books })
                })
                .catch(err => {
                    res.status(404).json(err);
                })
        })
        .catch(err => {
            res.status(404).json(err);
        })
}
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`your application is listen on port: ${PORT}`)
})