const { model, Schema } = require('mongoose');

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'DB: Title of add is required.']
    },
    name: {
      type: String
    },
    dateOfBirth: {
      type: String
    },
    breed: {
      type: String
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'DB: Sex is required.']
    },
    location: {
      type: String,
      required: [true, 'DB: Location is required.']
    },
    price: {
      type: String
    },
    comments: {
      type: String
    },
    category: {
      type: String,
      enum: ['lost-found', 'inGoodHands', 'sell'],
      required: [true, 'DB: Category is required.']
    },
    petImage: {
      type: String
    },
    owner: {
      type: Object,
      ref: 'user',
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('notice', NoticeSchema);
