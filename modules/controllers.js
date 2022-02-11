const express = require('express');
const adminRoutes = express.Router();
const Book = require('./schema');

  adminRoutes.post("/", function (req, res) {
    const { title, year, rating, author, price  } = req.query;
    if (title) {
      const book = new Book({
        title: title,
        year: year,
        rating: rating,
        author: author,
        price: price,
      });
      book.save().then(() => {
        res.redirect('/books');
      });
    } else
      res.send({
        status: 403,
        error: true,
        message: "something went wrong",
      });
  });

  adminRoutes.delete("/:id", async (req, res) => {
    try {
      await Book.findOneAndDelete({title: req.params.id}).then(res.redirect("/books"));
    } catch (err) {
      res.send({
        status: 404,
        error: true,
        message: "this book does not exist",
      });
    }
  });

  adminRoutes.put("/:id", async (req, res) => {
    try {
    await Book.findOneAndReplace(
        {title: req.params.id}, req.query
      ).then(res.send("updated"))
    } catch (err) {
      res.send(err);
    }
  });


  module.exports = adminRoutes