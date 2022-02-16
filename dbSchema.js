const schemaBook = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        author: {
            type: String,
        },

        year: {
            type: Number,
            default: 1900,
        },
        rating: {
            type: Number,
            default: 4,
        },
        price: {
            type: Number,
            default: 15,
        },

        description: {
            type: String,

        }
        img: {
            type: String,
            default: "https://via.placeholder.com/300",
        }
    },