const { model, Schema } = require('mongoose');

const newsSchema = new Schema(
  {
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    }
  },
  { versionKey: false, timestamps: true }
);

module.exports = model('new', newsSchema);
