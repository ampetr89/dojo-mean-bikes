const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Post title must be provided"],
    minlength: [8, 'Title must have at least 8 characters']
  },
  price:{
    type: Number,
    required: [true, 'Price is required'],
    min: [1, "Price must be at least $1"]
  },
  description: {
    type: String,
    required: [true, 'Must provide description of this bike'],
    maxlength: [200, 'Description should be less than 200 characters.']
  },
  location: {
    type: String,
    required: [true, 'Location must be provided']
  },
  img_url: {
    type: String,
    required: true,
    default: "https://maxcdn.icons8.com/Share/icon/Transport//bicycle1600.png"
  },
  creator: {
    type: String,
    required: [true, 'Must provide oid of post creator']
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
