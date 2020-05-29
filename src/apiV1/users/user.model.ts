import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

UserSchema.set('toJSON', {
  transform: (doc, ret, _options) => {
    // Hide the password, facebookAccountId, googleAccountId.
    delete ret.password;
    return ret;
  }
})
export default mongoose.model("User", UserSchema);