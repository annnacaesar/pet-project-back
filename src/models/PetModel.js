// животные, которые привязываются к конкретному пользователю
const { model, Schema } = require('mongoose');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'DB: Name is required.']
    },
    dateOfBirth: {
      type: String,
      required: [true, 'DB: Date of birth is required.']
    },
    breed: {
      type: String,
      required: [true, 'DB: Breed is required.']
    },
    comments: {
      type: String,
      required: [true, 'DB: Comments is required.']
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

module.exports = model('pet', petSchema);
