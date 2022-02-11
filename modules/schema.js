const mongoose = require('mongoose');


const schemaBook = new mongoose.Schema(
    {
      title: {
        type: String,
        default: "not provided"
      },
      author: {
        type: String,
        default: "announ"
      },

      year: {
        type: String,
        default: 1900,
      },
      rating: {
        type: String,
        default: 4,
      },
      price: {
        type: String,
        default: 15,
      },
      img: {
          type: String,
          default: "https://via.placeholder.com/300",
      },
    
    description: {
      type: String,
      default: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, similique numquam. Eveniet non culpa fugit quod magnam minus sint cum! Doloribus laudantium cum, commodi repellat pariatur atque suscipit voluptatum nam?"
    }},
    { versionKey: false }
  );
  const Book = mongoose.model("books", schemaBook);

  module.exports = Book;