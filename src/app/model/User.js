import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
},{
    timestamps: true
});

UserSchema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

export default mongoose.model("User", UserSchema);