import * as mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const RolesSchema = Schema(
    {
        userId: {
            type: ObjectId,
            required: true,
        },

        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }
)

export default mongoose.model("Roles", RolesSchema);