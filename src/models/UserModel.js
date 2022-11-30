const { model, Schema } = require('mongoose');
const gravatar = require('gravatar');

const phoneRegexp = /^\+380\d{9}$/;
const birthdayRegexp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'DB: Name is required.']
    },
    email: {
      type: String,
      required: [true, 'DB: Email is required.']
    },
    password: {
      type: String,
      required: [true, 'DB: Password is required.']
    },
    city: {
      type: String,
      required: [true, 'DB: City is required.']
    },
    phone: {
      type: String,
      required: [true, 'DB: Phone is required.'],
      match: phoneRegexp
    },
    birthday: {
      type: String,
      match: birthdayRegexp
    },
    avatar: {
      type: String
    },
    token: {
      type: String,
      default: null
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'pet'
      }
    ],
    notices: [
      {
        type: Schema.Types.ObjectId,
        ref: 'notice'
      }
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'notice'
      }
    ]
  },

  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('user', userSchema);
