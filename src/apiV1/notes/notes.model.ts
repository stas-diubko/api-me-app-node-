import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotesScheme = Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        text: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
        useNestedStrict: true
    }
);

export default mongoose.model("Note", NotesScheme);