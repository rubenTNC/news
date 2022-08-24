import mongoose from "mongoose";


const NewSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        src: {
            type: String
        }
    }
);



export default mongoose.model("New", NewSchema);